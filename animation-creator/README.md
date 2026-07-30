# Animation Creator

A Claude skill that generates a complete, production-quality motion system from brand inputs.

**Give it a brand-config (or URL) + what to animate → get a live motion guide + tokens back.**

---

## What It Generates

Two outputs simultaneously, every time:

### 1. Interactive HTML Motion Guide
A beautiful, shareable, standalone HTML file with **live animations** — not mockups. Dark sidebar navigation, numbered sections, Replay controls, and copy-paste snippets.

| Section | What's Inside |
|---|---|
| 01 Motion Tokens | Temperament, easing curves, duration / stagger / distance scales, CSS variables |
| 02 Hero Entrance | Choreographed first-paint sequence with timeline + Replay |
| 03 Scroll Reveals | Viewport-triggered fade-ups, staggered cards, split headlines |
| 04 Micro-interactions | Buttons, pills, cards, inputs — light & dark contexts |
| 05 Stats & Counters | Count-ups, meters, mono labels |
| 06 Loading & Progress | Skeletons, dots, determinate bars |
| 07 CTA Attention Loops | Soft pulse / nudge with hover pause |
| 08 Social / Ad Loop | Optional 9:16 or 1:1 screen-recordable stage |
| 09 Overlays | Modal, toast, section crossfade patterns |
| 10 Do / Don't | Live mini-examples of motion rules |
| 11 Snippet Pack | Ready-to-paste CSS / JS / optional React or Tailwind |

### 2. `animation-config.md`
A structured, machine-readable config that feeds directly into:
- Landing page builds (Claude Code / Design)
- The **Ad Creator skill** (motion notes for reels & carousels)
- Any AI-assisted UI or marketing workflow

Pairs with `brand-config.md` from **Brand Style Creator**.

---

## How To Use

### Option A — You already have a brand config
```
"Build a motion system for [company]. Here's brand-config.md:"
[Paste or attach brand-config.md]
"Animate the landing hero, scroll reveals, and primary CTA."
```
The skill skips brand research and goes straight to motion questions.

### Option B — You have a URL only
```
"Create animations for [company]. Site: [url].
I need hero entrance + button micro-interactions."
```
The skill extracts brand tokens, then interviews for motion temperament.

### Option C — One focused animation
```
"Animate this hero section — precise & restrained, intensity 3, CSS/JS only."
[Paste HTML or screenshot]
```
Still returns a mini motion guide + animation-config scoped to that surface.

---

## Output Structure

```
[company-name]/
├── motion-guide.html       ← Live, shareable, self-contained
└── animation-config.md     ← Machine-readable tokens + handoff block
```

---

## Motion Temperaments

| Temperament | Feels like | Duration bias |
|---|---|---|
| Precise & restrained | Linear / Stripe | Short, decisive |
| Warm & springy | Friendly product UI | Soft overshoot |
| Bold & punchy | Launch / campaign | Snappy snaps |
| Editorial & slow | Luxury / longform | Long reveals |

Intensity (1–5) controls distance, opacity, and stagger — not random bounce.

---

## Defaults That Keep Quality High

- Animate **transform + opacity** only (GPU-friendly)
- Always ship **`prefers-reduced-motion`** fallbacks
- Zero dependencies by default (HTML/CSS/vanilla JS)
- No layout-shifting reveals
- No generic AI motion tropes (purple glow, endless shimmer, bounce-everywhere)

---

## Part of the Marketing Skills Portfolio

```
brand-style-creator/   ← Look (colors, type, voice)
      ↓
animation-creator/     ← You are here (motion)
      ↓
ad-creator/            ← Consumes brand + animation configs
      ↓
ads-ab-testing/        ← Analyzes performance after 7–14 days
```

---

## What You Can Build With The Output

| Use Case | How |
|---|---|
| Landing heroes | Paste hero choreography + tokens into page builds |
| Scroll storytelling | Reuse reveal helper + stagger scale |
| Product UI polish | Micro-interaction snippets match marketing tempo |
| Paid social loops | Screen-record the ad stage from the HTML guide |
| Pitch / demo moments | Stat counters + restrained entrances |
| Engineer handoff | CSS variables + snippets without a rewrite |

---

*Built by Nidhi Dumian — [Instagram](https://www.instagram.com/nidhi.dumian/) · [LinkedIn](https://www.linkedin.com/in/nidhi-dumian/) · [X](https://x.com/DumianNidhi)*
*Part of the [marketing-skills](../) portfolio of Claude skills*
