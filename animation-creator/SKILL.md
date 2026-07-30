---
name: animation-creator
description: >
  Creates product launch videos and motion films in the style of modern tech
  launch films (X / Grok / Benji Taylor motion-team quality) — two outputs
  simultaneously: (1) a self-contained HTML launch film you can preview and
  screen-record to MP4, and (2) a structured animation-config.md with scene
  beats, timing, and handoff notes. Use whenever someone wants a launch video,
  product reveal, feature announcement film, kinetic typography reel, "Introducing"
  animation, Now-live CTA film, or motion like Benji Taylor / X launch videos.
  Trigger on "launch video", "product reveal", "make a launch animation",
  "like the X launch video", "kinetic type", "announcement film", or "motion
  design for launch." Prefers brand-config.md from Brand Style Creator when
  available. Default delivery is zero-dependency HTML/CSS/JS timeline.
---

# Animation Creator

Generates a **product launch motion film** — the kind of high-end announcement
video used when shipping a major product, model, or feature.

Reference quality bar: X / xAI launch films (kinetic type, UI reveals, high-
contrast editorial cuts, ~20–30s). Great products deserve great launches.

Outputs two files every time:
1. `launch-film.html` — self-contained, timeline-driven HTML film (preview + screen-record)
2. `animation-config.md` — machine-readable scene board, tokens, handoff block

Brand Style Creator defines *how it looks*. This skill defines *how the launch moves*.

---

## STEP 0 — BRANCH ON WHAT THE USER HAS

Start every session with this exact question:

> "Do you already have a `brand-config.md` (from Brand Style Creator)?
> And what are we launching — product name, one-line promise, and any UI
> screenshots or feature bullets?"

**Branch A — Has brand-config.md + launch brief:** Load tokens. Skip brand research.
Interview only for story / scenes / duration / aspect.

**Branch B — Has URL + launch brief:** Extract brand tokens from the site
(colors, fonts, product UI chrome). Then motion interview.

**Branch C — Reference video provided (e.g. an X launch film link):**
Study the reference for *structure and craft* (scene types, pacing, contrast,
type treatment) — do **not** copy proprietary UI, logos, or product claims.
Rebuild the *grammar* for the user's product.

**Branch D — One-shot "make me a launch video":**
Ask for: product name, tagline, 3 feature beats, primary CTA ("Now live" /
"Available now" / "Get started"), light vs dark bias, aspect (16:9 default).

---

## STEP 1 — LOCK BRAND + LAUNCH INPUTS

Before writing scenes, lock:

| Input | Why |
|---|---|
| Product / feature name | Hero type + end card |
| One-line promise | Hook / thesis line |
| 3–5 feature beats | Mid-film scene cards |
| CTA line | Closer ("Now live", "Available today") |
| Brand colors (darkest, surface, accent, text) | Scene palettes |
| Fonts (display + body + mono) | Kinetic type |
| UI screenshots / mock copy (optional) | Device / chrome scenes |
| Anti-patterns | What the film must never look like |

Tell the user: "Launch baseline — [product], [promise], [N] beats, [CTA],
[temperament]. Next I'll confirm the film structure."

---

## STEP 2 — LAUNCH INTERVIEW (6–8 QUESTIONS, ONE AT A TIME)

Skip anything already known.

**Q1 — Film job**
"What's the job of this film?
- Major product launch (cinematic, ~25–30s)
- Feature drop / update (tight, ~12–18s)
- Model / version announce (type-led, ~15–25s)
- Paid social cutdown (loop-friendly, 6–10s)
- Recap montage of multiple launches (compilation)"

**Q2 — Aspect + delivery**
"Aspect ratio?
- 16:9 (default — Twitter/X, LinkedIn, site hero)
- 9:16 (Reels / Shorts / Stories)
- 1:1 (feed)
Delivery: HTML timeline to screen-record (default), or Remotion project?"

**Q3 — Visual temperament**
"Match the craft to the brand:
- Editorial mono (X/Grok energy — black/white, kinetic type, sparse UI)
- Soft product (warm surfaces, gentle springs, friendly UI chrome)
- Bold campaign (punchy cuts, big type, high contrast accent)
- Industrial / precision (grid, meters, monospace labels)"

**Q4 — Scene mix**
"Which scene types should dominate? Pick 3–5:
- Kinetic typography (typing cursor, single-word punches)
- Floating UI chrome (prompt bars, pills, buttons)
- Device frames (phone / desktop product shots)
- Abstract data viz (nodes, bars, waveforms)
- Code / terminal glass cards
- Chat / agent conversation
- Logo / wordmark end card"

**Q5 — Voice of type**
"How should type feel?
- Typed with caret (terminal / introducing)
- Instant hard cuts (editorial)
- Soft fade-up (restrained SaaS)
- Word-by-word stagger (cinematic)"

**Q6 — Proof assets**
"Do you have screenshots, UI copy, or stats to show?
If not, I'll generate tasteful *generic* UI chrome that matches the brand —
never fake real customer names or misleading metrics."

**Q7 — Audio**
"Silent film (captions carry it — default) or leave a beat markers track
for the editor to score later?"

**Q8 — What NOT to do**
"Launch anti-patterns for this brand? e.g. no bounce, no purple AI glow,
no stock handshake B-roll, no emoji confetti, no fake 3D liquid blobs."

---

## STEP 3 — MAP TO LAUNCH FILM GRAMMAR

Use this grammar (inspired by modern tech launch films — adapt, don't clone):

### Canonical beat sheet (~24–28s @ 16:9)

| t (s) | Beat | Visual |
|---|---|---|
| 0.0–2.5 | Hook | Kinetic type: "Introducing" (caret) on white or black |
| 2.5–5.0 | Name | Product name locks; optional subtle motion path / accent arc |
| 5.0–8.0 | Thesis | One promise line; sparse abstract nodes or grid |
| 8.0–14.0 | Product proof | 2–3 UI chrome / device scenes, hard or soft cuts |
| 14.0–19.0 | Capability punches | Single-word or short-phrase cards ("Faster.", "On-brand.") |
| 19.0–22.5 | Depth | One richer scene (chat, code glass, waveform, agent builder) |
| 22.5–26.0 | Closer | "Now live" / CTA + brand mark; hold |

Short films (12–18s) compress to: Hook → Name → 2 proofs → Punch → Closer.
Social loops (6–10s): Hook → One proof → CTA hold (seamless).

### Craft rules (non-negotiable)

1. **One idea per scene.** Never stack headline + UI + stats + CTA in one frame.
2. **Negative space is a feature.** Centered type, generous margins.
3. **Contrast over decoration.** Prefer pure black / pure white / brand surface; one accent max per scene.
4. **Type is the star.** Display font for punches; mono only for labels, carets, terminal.
5. **Motion = transform + opacity.** No layout thrash; no animating width/height for reveals.
6. **UI chrome must look real** but simplified — rounded bars, pills, send buttons, subtle shadows — not dense dashboards.
7. **No hero overlays** — no floating badges, stickers, or promo chips on product shots.
8. **Cuts with intention.** Hold long enough to read (min ~1.2s for a short phrase; ~2s for a sentence).
9. **End on a hold.** Final CTA/brand frame static for ≥1.5s so screen-recordings trim cleanly.
10. **Respect reduced motion** in the HTML preview (instant scene swaps); the exported film timing stays as authored.

### Temperament → easing

| Temperament | Ease | Cut style |
|---|---|---|
| Editorial mono | `cubic-bezier(0.22, 1, 0.36, 1)` | Hard cuts + short fades (120–200ms) |
| Soft product | `cubic-bezier(0.34, 1.2, 0.64, 1)` | Soft crossfades (280–400ms) |
| Bold campaign | `cubic-bezier(0.16, 1, 0.3, 1)` | Snappy cuts, scale 0.98→1 |
| Industrial | `cubic-bezier(0.65, 0, 0.35, 1)` | Linear wipes, mono tickers |

Show the inferred beat sheet to the user before generating. Adjust on feedback.

---

## STEP 4 — GENERATE BOTH OUTPUTS

### Output 1: `launch-film.html`

A single self-contained HTML file. Full-viewport stage. Auto-plays on load.
Includes: Play / Pause / Replay, scrubber, timecode, aspect letterboxing,
optional 9:16 crop guide toggle if useful.

**Implementation standard (default stack):**
- Zero dependencies
- CSS variables for brand + motion tokens
- JS timeline: array of `{ t, id, action }` or scene classes toggled by `currentTime`
- `requestAnimationFrame` clock; spacebar to play/pause
- Scenes are absolutely stacked full-bleed sections; only one active
- Kinetic type via span/caret or `steps()` typing helper
- Device frames via pure CSS (rounded rect + optional notch) — no image required
- Abstract viz via inline SVG (nodes, bars, waveform) animated with CSS/JS

**Required scene components to implement as reusable blocks:**

1. **TypeHook** — "Introducing" + blinking caret; optional terminal `>` prefix
2. **NameLockup** — product name, optional icon/mark, accent under-arc
3. **ThesisLine** — one sentence + sparse node field
4. **UIChrome** — prompt bar / pill row / primary CTA button (brand radius)
5. **DeviceFrame** — phone or desktop bezel with simplified product UI inside
6. **PunchWord** — single word/phrase on black or white ("Faster.", "Now live")
7. **GlassCard** — translucent code or settings card (blur + border)
8. **Waveform / Bars** — audio or metric viz using brand accent
9. **EndCard** — CTA + wordmark; long hold

**Preview chrome (outside the stage):**
- Title: "[Product] — Launch Film"
- Duration, aspect, temperament
- Keyboard hints
- "Screen-record the stage at 1x for MP4" note
- Snippet of scene board

**Quality bar for the HTML film:**
- [ ] Reads as one composition per scene (not a dashboard)
- [ ] Brand name / product name is hero-level in name + end scenes
- [ ] No Inter/Roboto/Arial defaults if brand fonts are known — use brand or close Google Fonts match
- [ ] Backgrounds are intentional (solid brand surfaces, soft gradient atmospheres, or real UI contexts) — not flat generic gray only
- [ ] At least 2–3 intentional motion languages (type, UI enter, abstract viz)
- [ ] Works at 1280×720 and scales; mobile preview letterboxes
- [ ] Replay returns to t=0 cleanly
- [ ] No purple glow / generic AI sludge / emoji / bounce-everywhere

---

### Output 2: `animation-config.md`

```markdown
# [Company / Product] Launch Animation Config
# Version: [date]
# Pair with brand-config.md when available.
# Reference craft: modern tech launch films (kinetic type + UI proof + punch + CTA)

---

## IDENTITY

company_name: [Name]
product_name: [Product]
promise: "[One line]"
cta: "[Now live / Available now / …]"
brand_config_ref: [path or inline]

---

## FILM

job: [major-launch | feature-drop | model-announce | social-cutdown]
aspect: "16:9"
duration_s: 26
fps: 30
temperament: [editorial-mono | soft-product | bold-campaign | industrial]
delivery: [html-timeline | remotion]
audio: silent

---

## BRAND TOKENS

colors:
  bg_light: "#ffffff"
  bg_dark: "#000000"
  surface: "#hex"
  text_on_light: "#hex"
  text_on_dark: "#hex"
  accent: "#hex"

fonts:
  display: "[Font]"
  body: "[Font]"
  mono: "[Font]"

radius:
  pill: "[px]"
  card: "[px]"
  device: "[px]"

---

## MOTION TOKENS

easing:
  out: "cubic-bezier(...)"
  cut_fade_ms: 160

duration:
  type_char_ms: 42
  scene_min_s: 1.2
  end_hold_s: 1.8

---

## BEAT SHEET

# t_start_s, t_end_s, scene_id, component, copy, notes

beats:
  - { t: [0.0, 2.4], id: hook, component: TypeHook, copy: "Introducing", notes: "caret, light bg" }
  - { t: [2.4, 5.0], id: name, component: NameLockup, copy: "[Product]", notes: "accent arc" }
  - { t: [5.0, 7.8], id: thesis, component: ThesisLine, copy: "[Promise]", notes: "node field" }
  - { t: [7.8, 11.0], id: ui_1, component: UIChrome, copy: "[Prompt example]", notes: "prompt bar" }
  - { t: [11.0, 14.2], id: device, component: DeviceFrame, copy: "[UI caption]", notes: "phone" }
  - { t: [14.2, 16.4], id: punch_1, component: PunchWord, copy: "[Beat 1]", notes: "dark" }
  - { t: [16.4, 18.6], id: punch_2, component: PunchWord, copy: "[Beat 2]", notes: "light" }
  - { t: [18.6, 22.2], id: depth, component: GlassCard, copy: "[Depth line]", notes: "code/chat" }
  - { t: [22.2, 26.0], id: end, component: EndCard, copy: "[CTA]", notes: "hold" }

---

## DO / DON'T

do:
  - one idea per scene
  - kinetic type with real reading time
  - brand accent used sparingly
  - end on a static hold

dont:
  - dashboard-style first frames
  - purple AI glow / generic sludge
  - animating layout size for reveals
  - unreadable type (<1.2s on screen)
  - [brand-specific never]

---

## HANDOFF BLOCK

# Paste into Ad Creator / social cutdowns / landing hero loops:

product_name: [..]
launch_promise: [..]
cta: [..]
temperament: [..]
duration_s: [..]
aspect: 16:9
signature_moves: ["type-caret-hook", "ui-chrome-proof", "punch-word", "end-hold"]
accent: "#hex"
fonts: "[display] / [body]"
```

---

## STEP 5 — OPTIONAL CUTDOWNS

After the hero 16:9 film, offer (don't force):

1. **9:16 vertical** — re-layout type safe-areas; stack UI; keep same audio-less timing
2. **6–10s social loop** — Hook → best proof → CTA hold, seamless
3. **Still poster frames** — export instructions for t=name, t=punch, t=end (ffmpeg friendly)

If the user asks for Remotion, scaffold a minimal Remotion composition that mirrors the beat sheet — but only when requested.

---

## STEP 6 — QUALITY CHECK BEFORE SHIPPING

- [ ] Beat sheet shown to user and reflected exactly in HTML + config
- [ ] Film is readable muted (type carries the story)
- [ ] Product/brand is unmistakable without the tweet caption
- [ ] Scenes match brand radius, colors, fonts
- [ ] No stolen logos/UI from reference films
- [ ] HTML autoplays, replays, scrubs without breaking
- [ ] `animation-config.md` beat times match the timeline clock
- [ ] Screen-record path documented in the HTML chrome

---

## SKILL BEHAVIOR RULES

- Prefer `brand-config.md` when present — don't re-litigate colors/fonts
- When a reference launch video is linked, extract **craft patterns**, not assets
- Always generate BOTH outputs in one response
- Default stack: HTML/CSS/vanilla JS, zero dependencies
- Never invent fake customer logos, app-store rankings, or misleading benchmarks
- Keep copy short — launch films fail from too many words, not too few
- One composition per scene; brand/product name is hero-level on name + end cards
- If the user only wants website micro-interactions (not a launch film), say so and
  produce a slim motion-snippet pack instead — still with animation-config.md —
  but bias toward launch films when the ask is ambiguous and a launch reference was given

---

## PORTFOLIO FIT

```
brand-style-creator/   → brand-config.md (look)
      ↓
animation-creator/     → launch-film.html + animation-config.md (launch motion)
      ↓
ad-creator/            → static + carousel + reel cutdowns (consumes both)
      ↓
ads-ab-testing/        → performance after 7–14 days
```

---

## WHAT THIS SKILL ENABLES

**Product launches**
- 16:9 announcement films for X/LinkedIn/YouTube
- Site hero background loops / launch page embeds (screen-recorded or HTML)

**Feature drops**
- Short "Now live" films with 1–2 UI proofs

**Social**
- 9:16 and square cutdowns from the same beat sheet

**Sales / fundraising**
- Silent films that play under a founder voiceover

**Handoff**
- Beat sheet + tokens engineers or editors can re-time without redesigning

The animation-config.md is the single source of truth for *how the launch moves*.
