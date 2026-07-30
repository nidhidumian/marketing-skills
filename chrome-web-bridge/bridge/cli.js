#!/usr/bin/env node
/**
 * Tiny CLI for Chrome Web Bridge.
 *
 *   node cli.js health
 *   node cli.js tabs
 *   node cli.js navigate https://example.com
 *   node cli.js page
 *   node cli.js command list_tabs
 *   node cli.js command get_page '{"maxLength":20000}'
 */

const BASE = process.env.BRIDGE_URL || 'http://127.0.0.1:8765';
const TOKEN = process.env.BRIDGE_TOKEN || '';

async function request(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (TOKEN) headers['X-Bridge-Token'] = TOKEN;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok || data.ok === false) {
    console.error(JSON.stringify(data, null, 2));
    process.exit(1);
  }
  console.log(JSON.stringify(data, null, 2));
}

const [,, cmd, ...rest] = process.argv;

async function main() {
  switch (cmd) {
    case 'health':
      return request('/health');
    case 'tabs':
      return request('/tabs');
    case 'navigate': {
      const url = rest[0];
      if (!url) throw new Error('Usage: cli.js navigate <url>');
      return request('/navigate', { method: 'POST', body: { url } });
    }
    case 'page':
      return request('/page', { method: 'POST', body: {} });
    case 'screenshot':
      return request('/screenshot', { method: 'POST', body: {} });
    case 'command': {
      const action = rest[0];
      if (!action) throw new Error('Usage: cli.js command <action> [json-params]');
      const params = rest[1] ? JSON.parse(rest[1]) : {};
      return request('/command', { method: 'POST', body: { action, params } });
    }
    default:
      console.log(`Chrome Web Bridge CLI

Usage:
  node cli.js health
  node cli.js tabs
  node cli.js navigate <url>
  node cli.js page
  node cli.js screenshot
  node cli.js command <action> [json-params]

Env:
  BRIDGE_URL   default http://127.0.0.1:8765
  BRIDGE_TOKEN optional shared secret
`);
      process.exit(cmd ? 1 : 0);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
