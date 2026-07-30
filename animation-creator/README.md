# Animation Creator

A Claude skill that generates **product launch films** — kinetic typography, UI proof scenes, and CTA holds in the craft language of modern tech launch videos (X / Grok–quality motion).

**Give it a brand config (or URL) + what you're launching → get a playable HTML film + beat sheet back.**

Reference energy: [Benji Taylor / X launch motion](https://x.com/benjitaylor/status/2082515001949221152) — great products deserve great launches.

---

## What It Generates

Two outputs simultaneously, every time:

### 1. `launch-film.html`
A self-contained, timeline-driven HTML film you can preview in a browser and screen-record to MP4.

| Beat | What you see |
|---|---|
| Hook | Kinetic type — "Introducing" + caret |
| Name | Product lockup, optional accent arc |
| Thesis | One promise line + sparse abstract viz |
| Proof | Floating UI chrome and/or device frames |
| Punches | Single-word / short-phrase cards |
| Depth | Glass code card, chat, waveform, etc. |
| Closer | "Now live" / CTA + brand mark hold |

Includes Play / Pause / Replay, scrubber, and timecode. Zero dependencies by default.

### 2. `animation-config.md`
Machine-readable beat sheet + motion tokens that feed:
- Social cutdowns (9:16, 1:1)
- The **Ad Creator** skill
- Landing-page hero loops
- Editor / engineer handoff

Pairs with `brand-config.md` from **Brand Style Creator**.

---

## How To Use

### Option A — Brand config + launch brief
```
"Make a launch video for [Product]. Here's brand-config.md:"
[Paste brand-config.md]
"Promise: [one line]. Beats: [3 bullets]. CTA: Now live."
```

### Option B — URL only
```
"Launch film for [company]. Site: [url].
We're announcing [feature]. Temperament: editorial mono."
```

### Option C — Match a reference film's craft
```
"Same craft as this launch video, but for our product:"
[Link to reference]
[Product name + promise + beats]
```
The skill copies **structure and craft** (pacing, type treatment, contrast) — never logos, UI, or claims from the reference.

---

## Output Structure

```
[company-or-product]/
├── launch-film.html        ← Playable, screen-recordable
└── animation-config.md     ← Beat sheet + tokens + handoff
```

---

## Film Temperaments

| Temperament | Feels like |
|---|---|
| Editorial mono | Black/white, kinetic type, sparse UI (X launch energy) |
| Soft product | Warm surfaces, gentle springs, friendly chrome |
| Bold campaign | Punchy cuts, big type, accent flashes |
| Industrial | Grids, meters, monospace tickers |

---

## Craft Rules (built into the skill)

- One idea per scene — no dashboard frames
- Type is the star; negative space is intentional
- Animate transform + opacity only
- End on a ≥1.5s static hold for clean exports
- No purple AI glow, emoji confetti, or bounce-everywhere
- Silent by default (captions carry the story)

---

## Optional Cutdowns

After the hero 16:9 film, ask for:
- **9:16** vertical
- **6–10s** social loop
- **Poster stills** at name / punch / end timestamps

Remotion scaffolding only when you ask for it.

---

## Part of the Marketing Skills Portfolio

```
brand-style-creator/   ← Look (colors, type, voice)
      ↓
animation-creator/     ← You are here (launch motion)
      ↓
ad-creator/            ← Consumes brand + animation configs
      ↓
ads-ab-testing/        ← Analyzes performance after 7–14 days
```

---

*Built by Nidhi Dumian — [Instagram](https://www.instagram.com/nidhi.dumian/) · [LinkedIn](https://www.linkedin.com/in/nidhi-dumian/) · [X](https://x.com/DumianNidhi)*
*Part of the [marketing-skills](../) portfolio of Claude skills*
