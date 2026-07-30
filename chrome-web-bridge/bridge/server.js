#!/usr/bin/env node
/**
 * Chrome Web Bridge — local HTTP + WebSocket server
 *
 * Agents call HTTP endpoints; the Chrome extension connects over WebSocket
 * and executes browser commands in your real Chrome session.
 *
 *   npm start
 *   curl http://127.0.0.1:8765/health
 *   curl -X POST http://127.0.0.1:8765/command -H 'content-type: application/json' \
 *     -d '{"action":"navigate","params":{"url":"https://example.com"}}'
 */

import http from 'node:http';
import crypto from 'node:crypto';
import { URL } from 'node:url';

const HOST = process.env.BRIDGE_HOST || '127.0.0.1';
const PORT = Number(process.env.BRIDGE_PORT || 8765);
const TOKEN = process.env.BRIDGE_TOKEN || '';
const COMMAND_TIMEOUT_MS = Number(process.env.BRIDGE_TIMEOUT_MS || 60_000);

/** @type {Set<import('node:net').Socket>} */
const extensionSockets = new Set();
/** @type {Map<string, { resolve: Function, reject: Function, timer: NodeJS.Timeout }>} */
const pending = new Map();

const ACTIONS = [
  'ping',
  'list_tabs',
  'new_tab',
  'close_tab',
  'activate_tab',
  'navigate',
  'get_page',
  'get_html',
  'click',
  'type',
  'press_key',
  'scroll',
  'wait',
  'evaluate',
  'screenshot',
];

function log(...args) {
  const ts = new Date().toISOString();
  console.log(`[${ts}]`, ...args);
}

function json(res, status, body) {
  const payload = JSON.stringify(body, null, 2);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type, authorization, x-bridge-token',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function authOk(req) {
  if (!TOKEN) return true;
  const header = req.headers.authorization || '';
  const bearer = header.startsWith('Bearer ') ? header.slice(7) : '';
  const custom = req.headers['x-bridge-token'];
  return bearer === TOKEN || custom === TOKEN;
}

function sendToExtension(message) {
  const payload = Buffer.from(JSON.stringify(message), 'utf8');
  let sent = 0;
  for (const socket of extensionSockets) {
    try {
      wsSend(socket, payload);
      sent += 1;
    } catch (err) {
      log('Failed to send to extension socket', err.message);
    }
  }
  return sent;
}

function command(action, params = {}, timeoutMs = COMMAND_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    if (extensionSockets.size === 0) {
      reject(new Error('No Chrome extension connected. Open Chrome, load the extension, and click Connect.'));
      return;
    }

    const id = crypto.randomUUID();
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Command timed out after ${timeoutMs}ms: ${action}`));
    }, timeoutMs);

    pending.set(id, {
      resolve: (value) => {
        clearTimeout(timer);
        pending.delete(id);
        resolve(value);
      },
      reject: (err) => {
        clearTimeout(timer);
        pending.delete(id);
        reject(err);
      },
      timer,
    });

    const sent = sendToExtension({ type: 'command', id, action, params });
    if (!sent) {
      pending.get(id)?.reject(new Error('Failed to reach extension'));
    }
  });
}

function handleExtensionMessage(raw) {
  let msg;
  try {
    msg = JSON.parse(raw.toString('utf8'));
  } catch {
    return;
  }

  if (msg.type === 'keepalive' || msg.type === 'pong' || msg.type === 'hello') {
    if (msg.type === 'hello') log('Extension hello', msg.version || '');
    return;
  }

  if (msg.type === 'result' && msg.id) {
    const waiter = pending.get(msg.id);
    if (!waiter) return;
    if (msg.ok === false) {
      waiter.reject(new Error(msg.error || 'Command failed'));
    } else {
      waiter.resolve(msg.data ?? msg);
    }
  }
}

/* ---------- minimal WebSocket server (no deps) ---------- */

function acceptWebSocket(req, socket, head) {
  const key = req.headers['sec-websocket-key'];
  if (!key) {
    socket.write('HTTP/1.1 400 Bad Request\r\n\r\n');
    socket.destroy();
    return;
  }

  const accept = crypto
    .createHash('sha1')
    .update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
    .digest('base64');

  socket.write(
    'HTTP/1.1 101 Switching Protocols\r\n' +
      'Upgrade: websocket\r\n' +
      'Connection: Upgrade\r\n' +
      `Sec-WebSocket-Accept: ${accept}\r\n` +
      '\r\n'
  );

  socket.__wsBuffer = Buffer.alloc(0);
  extensionSockets.add(socket);
  log(`Extension connected (${extensionSockets.size} total)`);

  if (head?.length) {
    socket.__wsBuffer = Buffer.concat([socket.__wsBuffer, head]);
    consumeWs(socket);
  }

  socket.on('data', (chunk) => {
    socket.__wsBuffer = Buffer.concat([socket.__wsBuffer, chunk]);
    consumeWs(socket);
  });

  socket.on('close', () => {
    extensionSockets.delete(socket);
    log(`Extension disconnected (${extensionSockets.size} total)`);
  });

  socket.on('error', () => {
    extensionSockets.delete(socket);
  });
}

function consumeWs(socket) {
  while (true) {
    const buf = socket.__wsBuffer;
    if (buf.length < 2) return;

    const first = buf[0];
    const second = buf[1];
    const opcode = first & 0x0f;
    const masked = (second & 0x80) !== 0;
    let payloadLen = second & 0x7f;
    let offset = 2;

    if (payloadLen === 126) {
      if (buf.length < 4) return;
      payloadLen = buf.readUInt16BE(2);
      offset = 4;
    } else if (payloadLen === 127) {
      if (buf.length < 10) return;
      const big = buf.readBigUInt64BE(2);
      payloadLen = Number(big);
      offset = 10;
    }

    const maskLen = masked ? 4 : 0;
    const total = offset + maskLen + payloadLen;
    if (buf.length < total) return;

    let payload = buf.subarray(offset + maskLen, total);
    if (masked) {
      const mask = buf.subarray(offset, offset + 4);
      payload = Buffer.from(payload);
      for (let i = 0; i < payload.length; i++) {
        payload[i] ^= mask[i % 4];
      }
    }

    socket.__wsBuffer = buf.subarray(total);

    if (opcode === 0x8) {
      socket.end();
      return;
    }
    if (opcode === 0x9) {
      // ping -> pong
      wsSend(socket, payload, 0xA);
      continue;
    }
    if (opcode === 0x1 || opcode === 0x2) {
      handleExtensionMessage(payload);
    }
  }
}

function wsSend(socket, data, opcode = 0x1) {
  const payload = Buffer.isBuffer(data) ? data : Buffer.from(data);
  const len = payload.length;
  let header;

  if (len < 126) {
    header = Buffer.alloc(2);
    header[0] = 0x80 | opcode;
    header[1] = len;
  } else if (len < 65536) {
    header = Buffer.alloc(4);
    header[0] = 0x80 | opcode;
    header[1] = 126;
    header.writeUInt16BE(len, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x80 | opcode;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(len), 2);
  }

  socket.write(Buffer.concat([header, payload]));
}

/* ---------- HTTP API ---------- */

async function handleHttp(req, res) {
  if (req.method === 'OPTIONS') {
    return json(res, 204, {});
  }

  const url = new URL(req.url || '/', `http://${HOST}:${PORT}`);

  if (url.pathname === '/health' || url.pathname === '/') {
    return json(res, 200, {
      ok: true,
      service: 'chrome-web-bridge',
      version: '1.0.0',
      extensionConnected: extensionSockets.size > 0,
      connections: extensionSockets.size,
      actions: ACTIONS,
    });
  }

  if (!authOk(req)) {
    return json(res, 401, { ok: false, error: 'Unauthorized' });
  }

  if (url.pathname === '/actions' && req.method === 'GET') {
    return json(res, 200, { ok: true, actions: ACTIONS });
  }

  if (url.pathname === '/tabs' && req.method === 'GET') {
    try {
      const data = await command('list_tabs');
      return json(res, 200, { ok: true, data });
    } catch (err) {
      return json(res, 503, { ok: false, error: err.message });
    }
  }

  if (url.pathname === '/command' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const action = body.action;
      if (!action) return json(res, 400, { ok: false, error: 'action is required' });
      if (!ACTIONS.includes(action)) {
        return json(res, 400, { ok: false, error: `Unknown action: ${action}`, actions: ACTIONS });
      }
      const data = await command(action, body.params || {}, body.timeoutMs || COMMAND_TIMEOUT_MS);
      return json(res, 200, { ok: true, action, data });
    } catch (err) {
      const status = /No Chrome extension connected/.test(err.message) ? 503 : 500;
      return json(res, status, { ok: false, error: err.message });
    }
  }

  // Convenience REST-ish shortcuts
  const shortcuts = {
    '/navigate': 'navigate',
    '/page': 'get_page',
    '/html': 'get_html',
    '/click': 'click',
    '/type': 'type',
    '/screenshot': 'screenshot',
    '/new_tab': 'new_tab',
    '/evaluate': 'evaluate',
  };

  if (req.method === 'POST' && shortcuts[url.pathname]) {
    try {
      const body = await readBody(req);
      const data = await command(shortcuts[url.pathname], body, body.timeoutMs || COMMAND_TIMEOUT_MS);
      return json(res, 200, { ok: true, data });
    } catch (err) {
      const status = /No Chrome extension connected/.test(err.message) ? 503 : 500;
      return json(res, status, { ok: false, error: err.message });
    }
  }

  return json(res, 404, {
    ok: false,
    error: 'Not found',
    endpoints: [
      'GET /health',
      'GET /actions',
      'GET /tabs',
      'POST /command',
      'POST /navigate',
      'POST /page',
      'POST /html',
      'POST /click',
      'POST /type',
      'POST /screenshot',
      'POST /new_tab',
      'POST /evaluate',
    ],
  });
}

const server = http.createServer((req, res) => {
  handleHttp(req, res).catch((err) => {
    log('HTTP error', err);
    json(res, 500, { ok: false, error: err.message });
  });
});

server.on('upgrade', (req, socket, head) => {
  const url = new URL(req.url || '/', `http://${HOST}:${PORT}`);
  if (url.pathname !== '/' && url.pathname !== '/ws') {
    socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
    socket.destroy();
    return;
  }
  if (!authOk(req)) {
    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    socket.destroy();
    return;
  }
  acceptWebSocket(req, socket, head);
});

server.listen(PORT, HOST, () => {
  log(`Chrome Web Bridge listening on http://${HOST}:${PORT}`);
  log(`WebSocket endpoint: ws://${HOST}:${PORT}`);
  if (TOKEN) log('Auth token is enabled (BRIDGE_TOKEN)');
  log('Waiting for Chrome extension connection…');
});
