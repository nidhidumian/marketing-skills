/**
 * Chrome Web Bridge — service worker
 * Connects to the local bridge server over WebSocket and executes browser commands.
 */

const DEFAULT_WS_URL = 'ws://127.0.0.1:8765';
const KEEPALIVE_MS = 20_000;
const RECONNECT_MS = 3_000;

let webSocket = null;
let keepaliveTimer = null;
let reconnectTimer = null;
let connected = false;
let bridgeUrl = DEFAULT_WS_URL;

chrome.runtime.onInstalled.addListener(async () => {
  const stored = await chrome.storage.local.get(['bridgeUrl', 'autoConnect']);
  if (!stored.bridgeUrl) {
    await chrome.storage.local.set({ bridgeUrl: DEFAULT_WS_URL, autoConnect: true });
  }
  if (stored.autoConnect !== false) {
    connect();
  }
});

chrome.runtime.onStartup.addListener(async () => {
  const { autoConnect = true } = await chrome.storage.local.get('autoConnect');
  if (autoConnect) connect();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'reconnect' && !connected) {
    connect();
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  (async () => {
    switch (message.type) {
      case 'getStatus':
        sendResponse({ connected, bridgeUrl });
        break;
      case 'connect':
        if (message.bridgeUrl) {
          bridgeUrl = message.bridgeUrl;
          await chrome.storage.local.set({ bridgeUrl });
        }
        await connect();
        sendResponse({ connected, bridgeUrl });
        break;
      case 'disconnect':
        disconnect();
        sendResponse({ connected: false, bridgeUrl });
        break;
      default:
        sendResponse({ error: 'Unknown message type' });
    }
  })();
  return true;
});

async function loadConfig() {
  const stored = await chrome.storage.local.get(['bridgeUrl']);
  bridgeUrl = stored.bridgeUrl || DEFAULT_WS_URL;
}

async function connect() {
  await loadConfig();
  if (webSocket && (webSocket.readyState === WebSocket.OPEN || webSocket.readyState === WebSocket.CONNECTING)) {
    return;
  }

  clearReconnect();
  try {
    webSocket = new WebSocket(bridgeUrl);
  } catch (err) {
    console.error('WebSocket create failed', err);
    scheduleReconnect();
    return;
  }

  webSocket.addEventListener('open', () => {
    connected = true;
    setBadge(true);
    startKeepalive();
    send({ type: 'hello', role: 'extension', version: chrome.runtime.getManifest().version });
  });

  webSocket.addEventListener('message', async (event) => {
    let msg;
    try {
      msg = JSON.parse(event.data);
    } catch {
      return;
    }
    if (msg.type === 'ping') {
      send({ type: 'pong', id: msg.id });
      return;
    }
    if (msg.type === 'command') {
      const result = await handleCommand(msg);
      send({ type: 'result', id: msg.id, ...result });
    }
  });

  webSocket.addEventListener('close', () => {
    connected = false;
    setBadge(false);
    stopKeepalive();
    webSocket = null;
    scheduleReconnect();
  });

  webSocket.addEventListener('error', () => {
    // close handler will reconnect
  });
}

function disconnect() {
  clearReconnect();
  stopKeepalive();
  if (webSocket) {
    webSocket.close();
    webSocket = null;
  }
  connected = false;
  setBadge(false);
}

function send(payload) {
  if (webSocket && webSocket.readyState === WebSocket.OPEN) {
    webSocket.send(JSON.stringify(payload));
  }
}

function startKeepalive() {
  stopKeepalive();
  keepaliveTimer = setInterval(() => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      send({ type: 'keepalive' });
    } else {
      stopKeepalive();
    }
  }, KEEPALIVE_MS);
}

function stopKeepalive() {
  if (keepaliveTimer) {
    clearInterval(keepaliveTimer);
    keepaliveTimer = null;
  }
}

function scheduleReconnect() {
  clearReconnect();
  reconnectTimer = setTimeout(() => connect(), RECONNECT_MS);
  chrome.alarms.create('reconnect', { when: Date.now() + RECONNECT_MS });
}

function clearReconnect() {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  chrome.alarms.clear('reconnect');
}

function setBadge(isOn) {
  chrome.action.setBadgeText({ text: isOn ? 'ON' : 'OFF' });
  chrome.action.setBadgeBackgroundColor({ color: isOn ? '#0d9488' : '#64748b' });
}

async function handleCommand(msg) {
  const { action, params = {} } = msg;
  try {
    switch (action) {
      case 'ping':
        return { ok: true, data: { pong: true } };
      case 'list_tabs':
        return { ok: true, data: await listTabs() };
      case 'new_tab':
        return { ok: true, data: await newTab(params) };
      case 'close_tab':
        return { ok: true, data: await closeTab(params) };
      case 'activate_tab':
        return { ok: true, data: await activateTab(params) };
      case 'navigate':
        return { ok: true, data: await navigate(params) };
      case 'get_page':
        return { ok: true, data: await getPage(params) };
      case 'get_html':
        return { ok: true, data: await getHtml(params) };
      case 'click':
        return { ok: true, data: await click(params) };
      case 'type':
        return { ok: true, data: await typeText(params) };
      case 'press_key':
        return { ok: true, data: await pressKey(params) };
      case 'scroll':
        return { ok: true, data: await scroll(params) };
      case 'wait':
        return { ok: true, data: await waitFor(params) };
      case 'evaluate':
        return { ok: true, data: await evaluate(params) };
      case 'screenshot':
        return { ok: true, data: await screenshot(params) };
      default:
        return { ok: false, error: `Unknown action: ${action}` };
    }
  } catch (err) {
    return { ok: false, error: err?.message || String(err) };
  }
}

async function resolveTabId(tabId) {
  if (tabId != null) return tabId;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) throw new Error('No active tab');
  return tab.id;
}

async function listTabs() {
  const tabs = await chrome.tabs.query({});
  return tabs.map((t) => ({
    id: t.id,
    windowId: t.windowId,
    title: t.title,
    url: t.url,
    active: t.active,
    pinned: t.pinned,
    status: t.status,
  }));
}

async function newTab({ url = 'about:blank', active = true } = {}) {
  const tab = await chrome.tabs.create({ url, active });
  return { id: tab.id, url: tab.url, title: tab.title };
}

async function closeTab({ tabId } = {}) {
  const id = await resolveTabId(tabId);
  await chrome.tabs.remove(id);
  return { closed: id };
}

async function activateTab({ tabId } = {}) {
  const id = await resolveTabId(tabId);
  const tab = await chrome.tabs.get(id);
  await chrome.windows.update(tab.windowId, { focused: true });
  await chrome.tabs.update(id, { active: true });
  return { id, url: tab.url, title: tab.title };
}

async function navigate({ url, tabId, waitUntil = 'complete' } = {}) {
  if (!url) throw new Error('url is required');
  const id = await resolveTabId(tabId);
  await chrome.tabs.update(id, { url });
  if (waitUntil !== 'none') {
    await waitTabComplete(id);
  }
  const tab = await chrome.tabs.get(id);
  return { id, url: tab.url, title: tab.title, status: tab.status };
}

function waitTabComplete(tabId, timeoutMs = 30_000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      chrome.tabs.onUpdated.removeListener(listener);
      reject(new Error('Navigation timeout'));
    }, timeoutMs);

    function listener(updatedId, info) {
      if (updatedId === tabId && info.status === 'complete') {
        clearTimeout(timer);
        chrome.tabs.onUpdated.removeListener(listener);
        resolve();
      }
    }
    chrome.tabs.onUpdated.addListener(listener);
  });
}

async function ensureContentScript(tabId) {
  try {
    await chrome.tabs.sendMessage(tabId, { type: 'ping' });
  } catch {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['content.js'],
    });
  }
}

async function sendToTab(tabId, payload) {
  await ensureContentScript(tabId);
  return chrome.tabs.sendMessage(tabId, payload);
}

async function getPage({ tabId, maxLength = 50_000 } = {}) {
  const id = await resolveTabId(tabId);
  const tab = await chrome.tabs.get(id);
  const page = await sendToTab(id, { type: 'getPage', maxLength });
  return {
    id,
    url: tab.url,
    title: tab.title || page.title,
    text: page.text,
    links: page.links,
  };
}

async function getHtml({ tabId, maxLength = 100_000 } = {}) {
  const id = await resolveTabId(tabId);
  const tab = await chrome.tabs.get(id);
  const page = await sendToTab(id, { type: 'getHtml', maxLength });
  return { id, url: tab.url, title: tab.title, html: page.html };
}

async function click({ selector, tabId, text } = {}) {
  const id = await resolveTabId(tabId);
  return sendToTab(id, { type: 'click', selector, text });
}

async function typeText({ selector, text, tabId, clear = true, submit = false } = {}) {
  if (text == null) throw new Error('text is required');
  const id = await resolveTabId(tabId);
  return sendToTab(id, { type: 'type', selector, text, clear, submit });
}

async function pressKey({ key, tabId, selector } = {}) {
  if (!key) throw new Error('key is required');
  const id = await resolveTabId(tabId);
  return sendToTab(id, { type: 'pressKey', key, selector });
}

async function scroll({ tabId, direction = 'down', amount = 600, selector } = {}) {
  const id = await resolveTabId(tabId);
  return sendToTab(id, { type: 'scroll', direction, amount, selector });
}

async function waitFor({ tabId, selector, timeoutMs = 10_000 } = {}) {
  if (!selector) throw new Error('selector is required');
  const id = await resolveTabId(tabId);
  return sendToTab(id, { type: 'waitFor', selector, timeoutMs });
}

async function evaluate({ code, tabId } = {}) {
  if (!code) throw new Error('code is required');
  const id = await resolveTabId(tabId);
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: id },
    world: 'MAIN',
    func: (source) => {
      // eslint-disable-next-line no-eval
      return eval(source);
    },
    args: [code],
  });
  return { result };
}

async function screenshot({ tabId, format = 'png' } = {}) {
  const id = await resolveTabId(tabId);
  const tab = await chrome.tabs.get(id);
  await chrome.windows.update(tab.windowId, { focused: true });
  await chrome.tabs.update(id, { active: true });
  // brief pause so the tab is painted
  await new Promise((r) => setTimeout(r, 150));
  const dataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, {
    format: format === 'jpeg' ? 'jpeg' : 'png',
    quality: format === 'jpeg' ? 85 : undefined,
  });
  return { id, url: tab.url, title: tab.title, dataUrl };
}

// Auto-connect on worker wake
loadConfig().then(() => connect());
