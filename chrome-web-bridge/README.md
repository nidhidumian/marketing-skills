# Chrome Web Bridge

Give AI coding agents (Cursor, Claude Code, Codex, etc.) controlled access to **your real Google Chrome** — including logged-in sessions.

```
AI Agent ──HTTP──▶ Local Bridge (Node) ──WebSocket──▶ Chrome Extension ──▶ Your tabs
```

---

## What you get

| Capability | Action |
|---|---|
| List open tabs | `list_tabs` |
| Open / close / focus tabs | `new_tab`, `close_tab`, `activate_tab` |
| Go to a URL | `navigate` |
| Read page text + links | `get_page` |
| Read raw HTML | `get_html` |
| Click by CSS selector or visible text | `click` |
| Type into inputs | `type` |
| Press keys / scroll / wait | `press_key`, `scroll`, `wait` |
| Run JS in the page | `evaluate` |
| Capture visible tab | `screenshot` |

This is **not** a headless browser. It drives the Chrome profile you already use.

---

## Quick start (3 steps)

### 1. Start the local bridge

```bash
cd chrome-web-bridge/bridge
npm start
```

You should see:

```
Chrome Web Bridge listening on http://127.0.0.1:8765
Waiting for Chrome extension connection…
```

### 2. Load the Chrome extension

1. Open `chrome://extensions`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `chrome-web-bridge/extension` folder
5. Pin the extension, open its popup, click **Connect**
6. Badge should show **ON** (teal)

### 3. Try it

```bash
# Health + connection status
curl http://127.0.0.1:8765/health

# Open a page
curl -X POST http://127.0.0.1:8765/navigate \
  -H 'content-type: application/json' \
  -d '{"url":"https://example.com"}'

# Read the page as text for an LLM
curl -X POST http://127.0.0.1:8765/page \
  -H 'content-type: application/json' \
  -d '{}'
```

Or use the CLI:

```bash
cd chrome-web-bridge/bridge
node cli.js health
node cli.js navigate https://example.com
node cli.js page
node cli.js tabs
```

---

## API

Base URL: `http://127.0.0.1:8765`

### `GET /health`
Returns bridge status and whether the extension is connected.

### `GET /tabs`
Lists open tabs.

### `POST /command`
Generic command runner:

```json
{
  "action": "navigate",
  "params": { "url": "https://example.com" }
}
```

### Shortcuts
Same params as the matching action:

- `POST /navigate` → `{ "url": "..." }`
- `POST /page` → `{ "tabId"?, "maxLength"? }`
- `POST /html`
- `POST /click` → `{ "selector"? , "text"? }`
- `POST /type` → `{ "selector", "text", "clear"?, "submit"? }`
- `POST /screenshot`
- `POST /new_tab` → `{ "url"?, "active"? }`
- `POST /evaluate` → `{ "code": "document.title" }`

### Optional auth

```bash
BRIDGE_TOKEN=secret npm start
```

Send header `X-Bridge-Token: secret` or `Authorization: Bearer secret`.

---

## For Cursor / Claude agents

See [`SKILL.md`](./SKILL.md). Tell your agent:

> Use Chrome Web Bridge at `http://127.0.0.1:8765` to browse. Check `/health` first; if the extension is disconnected, ask me to Connect it.

**Important:** This works with **local** agents (Cursor Desktop, Claude Code on your machine). Cloud agents running remotely cannot reach your laptop's `127.0.0.1` unless you deliberately expose the bridge (not recommended without auth + tunnel lockdown).

---

## Folder layout

```
chrome-web-bridge/
├── README.md
├── SKILL.md
├── extension/          ← Load unpacked in Chrome
│   ├── manifest.json
│   ├── background.js
│   ├── content.js
│   ├── popup.html
│   ├── popup.js
│   ├── popup.css
│   └── icons/
└── bridge/             ← Local Node server (no npm deps)
    ├── package.json
    ├── server.js
    └── cli.js
```

---

## Security notes

- The bridge binds to **localhost only** by default.
- The extension can read and interact with pages you open — treat it like DevTools access.
- Prefer `BRIDGE_TOKEN` if anything beyond your user account can hit localhost.
- Do not expose port `8765` to the public internet without a strong auth story.
- `evaluate` runs arbitrary JavaScript in the page — only use with trusted agents.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `/health` says `extensionConnected: false` | Open the extension popup → Connect. Confirm bridge is running. |
| Badge stays OFF | Check bridge URL is `ws://127.0.0.1:8765`. Restart bridge, then reconnect. |
| Command fails on `chrome://` pages | Chrome blocks content scripts on internal pages. Use a normal `https://` URL. |
| Service worker sleeps | Keepalive runs every 20s while connected (Chrome 116+). Click the extension icon to wake it if needed. |

---

*Part of the [marketing-skills](../) portfolio*
