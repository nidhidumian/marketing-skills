---
name: chrome-web-bridge
description: >
  Gives AI agents controlled access to the user's real Google Chrome via a local
  HTTP bridge + Chrome extension. Use whenever the user wants you to browse the
  web in their Chrome, open URLs, read page content, click, type, take screenshots,
  or automate a logged-in site. Trigger on phrases like "use my Chrome", "browse
  this site", "open this URL in Chrome", "read the page", "click the button", or
  "Chrome Web Bridge". Requires the local bridge running on localhost:8765 and the
  extension connected (badge ON).
---

# Chrome Web Bridge — Agent Skill

Drive the user's **real Chrome** (cookies, logins, extensions) through a local HTTP API.

## Preconditions

1. Bridge running: `cd chrome-web-bridge/bridge && npm start`
2. Extension loaded + connected (popup badge **ON**)
3. Confirm with:

```bash
curl -s http://127.0.0.1:8765/health
```

If `extensionConnected` is `false`, ask the user to open the extension popup and click **Connect**. Do not invent page content.

## Base URL

`http://127.0.0.1:8765`

Optional header if they set `BRIDGE_TOKEN`: `X-Bridge-Token: <token>`

## Workflow

1. `GET /health` — fail fast if bridge/extension is down
2. `POST /navigate` with the target URL (or `POST /new_tab`)
3. `POST /page` — use returned `text` + `links` as your grounding
4. Interact with `click` / `type` / `scroll` / `wait` as needed
5. Re-read with `/page` after navigation or major UI changes
6. Use `/screenshot` only when visual layout matters (forms, canvas, charts)

Prefer `/page` (clean text) over `/html` unless you need structure or attributes.

## Command reference

### Navigate
```bash
curl -s -X POST http://127.0.0.1:8765/command \
  -H 'content-type: application/json' \
  -d '{"action":"navigate","params":{"url":"https://example.com"}}'
```

### Read page (LLM-friendly)
```bash
curl -s -X POST http://127.0.0.1:8765/page \
  -H 'content-type: application/json' \
  -d '{"maxLength":40000}'
```

### Click
```bash
# by CSS
curl -s -X POST http://127.0.0.1:8765/click \
  -H 'content-type: application/json' \
  -d '{"selector":"button.submit"}'

# by visible text
curl -s -X POST http://127.0.0.1:8765/click \
  -H 'content-type: application/json' \
  -d '{"text":"Sign in"}'
```

### Type
```bash
curl -s -X POST http://127.0.0.1:8765/type \
  -H 'content-type: application/json' \
  -d '{"selector":"#email","text":"user@example.com","clear":true}'
```

### List tabs
```bash
curl -s http://127.0.0.1:8765/tabs
```

### Evaluate JS
```bash
curl -s -X POST http://127.0.0.1:8765/evaluate \
  -H 'content-type: application/json' \
  -d '{"code":"document.title"}'
```

### Screenshot
```bash
curl -s -X POST http://127.0.0.1:8765/screenshot \
  -H 'content-type: application/json' \
  -d '{}'
```
Returns `dataUrl` (PNG). Save to a file if you need to inspect it.

## Actions (POST /command)

| action | key params |
|---|---|
| `ping` | — |
| `list_tabs` | — |
| `new_tab` | `url`, `active` |
| `close_tab` | `tabId` |
| `activate_tab` | `tabId` |
| `navigate` | `url`, `tabId?`, `waitUntil?` |
| `get_page` | `tabId?`, `maxLength?` |
| `get_html` | `tabId?`, `maxLength?` |
| `click` | `selector?` or `text?`, `tabId?` |
| `type` | `selector`, `text`, `clear?`, `submit?` |
| `press_key` | `key`, `selector?` |
| `scroll` | `direction`, `amount?` |
| `wait` | `selector`, `timeoutMs?` |
| `evaluate` | `code` |
| `screenshot` | `format?` (`png`\|`jpeg`) |

## Rules

- Never claim you browsed a page unless `/health` showed a connected extension and a command succeeded.
- Do not use this for credential stuffing, bypassing paywalls, or violating site ToS.
- Avoid `evaluate` unless selectors/text clicks are insufficient.
- Cloud/remote agents usually **cannot** reach the user's localhost — say so and ask them to run a local agent, or to paste page content if they only have a cloud session.
- After `click`/`type` that triggers navigation, wait briefly then call `/page` again.

## CLI alternative

```bash
cd chrome-web-bridge/bridge
node cli.js health
node cli.js navigate https://example.com
node cli.js page
node cli.js command click '{"text":"More information"}'
```
