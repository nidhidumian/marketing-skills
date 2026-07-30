const bridgeUrlInput = document.getElementById('bridgeUrl');
const autoConnectInput = document.getElementById('autoConnect');
const statusEl = document.getElementById('status');
const connectBtn = document.getElementById('connectBtn');
const disconnectBtn = document.getElementById('disconnectBtn');

async function refresh() {
  const stored = await chrome.storage.local.get(['bridgeUrl', 'autoConnect']);
  bridgeUrlInput.value = stored.bridgeUrl || 'ws://127.0.0.1:8765';
  autoConnectInput.checked = stored.autoConnect !== false;

  const status = await chrome.runtime.sendMessage({ type: 'getStatus' });
  setStatus(Boolean(status?.connected));
}

function setStatus(connected) {
  statusEl.textContent = connected ? 'ON' : 'OFF';
  statusEl.classList.toggle('on', connected);
  statusEl.classList.toggle('off', !connected);
}

connectBtn.addEventListener('click', async () => {
  const bridgeUrl = bridgeUrlInput.value.trim() || 'ws://127.0.0.1:8765';
  await chrome.storage.local.set({
    bridgeUrl,
    autoConnect: autoConnectInput.checked,
  });
  const status = await chrome.runtime.sendMessage({ type: 'connect', bridgeUrl });
  setStatus(Boolean(status?.connected));
});

disconnectBtn.addEventListener('click', async () => {
  await chrome.storage.local.set({ autoConnect: autoConnectInput.checked });
  await chrome.runtime.sendMessage({ type: 'disconnect' });
  setStatus(false);
});

autoConnectInput.addEventListener('change', async () => {
  await chrome.storage.local.set({ autoConnect: autoConnectInput.checked });
});

refresh();
setInterval(refresh, 2000);
