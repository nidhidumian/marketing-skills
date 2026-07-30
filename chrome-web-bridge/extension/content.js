/**
 * Content script — DOM read/write helpers for Chrome Web Bridge.
 */

if (!globalThis.__chromeWebBridgeContentLoaded) {
  globalThis.__chromeWebBridgeContentLoaded = true;

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    (async () => {
      try {
        const data = await handle(message);
        sendResponse({ ok: true, ...data });
      } catch (err) {
        sendResponse({ ok: false, error: err?.message || String(err) });
      }
    })();
    return true;
  });
}

async function handle(message) {
  switch (message.type) {
    case 'ping':
      return { pong: true };
    case 'getPage':
      return getPage(message.maxLength ?? 50_000);
    case 'getHtml':
      return getHtml(message.maxLength ?? 100_000);
    case 'click':
      return click(message);
    case 'type':
      return typeText(message);
    case 'pressKey':
      return pressKey(message);
    case 'scroll':
      return scroll(message);
    case 'waitFor':
      return waitFor(message);
    default:
      throw new Error(`Unknown content message: ${message.type}`);
  }
}

function getPage(maxLength) {
  const clone = document.body ? document.body.cloneNode(true) : document.documentElement.cloneNode(true);
  clone.querySelectorAll('script, style, noscript, svg, iframe').forEach((el) => el.remove());
  let text = (clone.innerText || clone.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
  if (text.length > maxLength) {
    text = text.slice(0, maxLength) + '\n\n[truncated]';
  }

  const links = [...document.querySelectorAll('a[href]')]
    .slice(0, 100)
    .map((a) => ({
      text: (a.innerText || a.textContent || '').trim().slice(0, 120),
      href: a.href,
    }))
    .filter((l) => l.href && l.text);

  return {
    title: document.title,
    text,
    links,
  };
}

function getHtml(maxLength) {
  let html = document.documentElement?.outerHTML || '';
  if (html.length > maxLength) {
    html = html.slice(0, maxLength) + '\n<!-- truncated -->';
  }
  return { html, title: document.title };
}

function findElement({ selector, text }) {
  if (selector) {
    const el = document.querySelector(selector);
    if (!el) throw new Error(`No element matching selector: ${selector}`);
    return el;
  }
  if (text) {
    const candidates = [...document.querySelectorAll('a, button, [role="button"], input, label, summary')];
    const match = candidates.find((el) => {
      const t = (el.innerText || el.value || el.getAttribute('aria-label') || '').trim();
      return t.toLowerCase().includes(String(text).toLowerCase());
    });
    if (!match) throw new Error(`No clickable element with text: ${text}`);
    return match;
  }
  throw new Error('selector or text is required');
}

function click({ selector, text }) {
  const el = findElement({ selector, text });
  el.scrollIntoView({ block: 'center', inline: 'center' });
  el.focus?.();
  el.click();
  return {
    clicked: true,
    tag: el.tagName.toLowerCase(),
    text: (el.innerText || el.value || '').trim().slice(0, 120),
  };
}

function typeText({ selector, text, clear = true, submit = false }) {
  const el = selector ? document.querySelector(selector) : document.activeElement;
  if (!el) throw new Error(selector ? `No element matching selector: ${selector}` : 'No focused element');

  el.focus();
  if (clear) {
    if ('value' in el) el.value = '';
    else el.textContent = '';
  }

  if ('value' in el) {
    el.value = (el.value || '') + text;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  } else if (el.isContentEditable) {
    el.textContent = (el.textContent || '') + text;
    el.dispatchEvent(new InputEvent('input', { bubbles: true, data: text }));
  } else {
    throw new Error('Element is not editable');
  }

  if (submit) {
    const form = el.closest('form');
    if (form) form.requestSubmit ? form.requestSubmit() : form.submit();
    else {
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    }
  }

  return { typed: true, length: text.length };
}

function pressKey({ key, selector }) {
  const el = selector ? document.querySelector(selector) : document.activeElement || document.body;
  if (!el) throw new Error('No target element');
  el.focus?.();
  const opts = { key, bubbles: true, cancelable: true };
  el.dispatchEvent(new KeyboardEvent('keydown', opts));
  el.dispatchEvent(new KeyboardEvent('keypress', opts));
  el.dispatchEvent(new KeyboardEvent('keyup', opts));
  return { pressed: key };
}

function scroll({ direction = 'down', amount = 600, selector }) {
  const target = selector ? document.querySelector(selector) : window;
  if (!target) throw new Error(`No element matching selector: ${selector}`);

  const delta =
    direction === 'up' ? -amount :
    direction === 'left' ? -amount :
    amount;

  if (target === window) {
    if (direction === 'left' || direction === 'right') {
      window.scrollBy(delta, 0);
    } else {
      window.scrollBy(0, delta);
    }
  } else if (direction === 'left' || direction === 'right') {
    target.scrollLeft += delta;
  } else {
    target.scrollTop += delta;
  }

  return {
    scrolled: true,
    x: window.scrollX,
    y: window.scrollY,
  };
}

function waitFor({ selector, timeoutMs = 10_000 }) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(selector);
    if (existing) {
      resolve({ found: true, tag: existing.tagName.toLowerCase() });
      return;
    }

    const timer = setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Timeout waiting for selector: ${selector}`));
    }, timeoutMs);

    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        clearTimeout(timer);
        observer.disconnect();
        resolve({ found: true, tag: el.tagName.toLowerCase() });
      }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
  });
}
