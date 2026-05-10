# Brand Style Creator

A Claude skill that generates a complete, AirOps-quality brand style system from minimal inputs.

**Give it a company name + URL (or your existing assets) → get a full brand system back.**

---

## What It Generates

Two outputs simultaneously, every time:

### 1. Interactive HTML Brand Guide
A beautiful, shareable, standalone HTML file — like [AirOps Brand Guidelines](https://airops-style-guide.vercel.app). Covers all 10 sections:

| Section | What's Inside |
|---|---|
| 01 Colors | Primary palette, special use, secondary palette, CSS variables |
| 02 Typography | Three-typeface system, full type scale, font families, CSS |
| 03 Components | Buttons, pills, cards, form inputs, data tables, component rules |
| 04 Logo & Imagery | Logo on backgrounds, photo rules, data viz guidelines |
| 05 Spacing & Layout | 8px grid, layout rules, max-widths, padding system |
| 06 CSS Snippets | Ready-to-paste: hero, section, card, pill, table, form |
| 07 Container Styles | Light, Canvas, Dark, Accent — all with token summary |
| 08 Data Viz | Chart types, global tokens, palette, typography, rules |
| 09 Brand Strategy | Beliefs, mission, positioning, audience, attributes, persona |
| 10 Copy, Voice & Tone | Voice principles, tone guide, copy examples, rules |

### 2. `brand-config.md`
A structured, machine-readable config that feeds directly into:
- The **Ad Creator skill** (same repo)
- **Claude Design** (`claude.ai/design`) — paste it, build on-brand visuals
- Any AI-assisted content or code workflow

---

## How To Use

### Option A — You have nothing (just a URL)
```
"Build a brand style guide for [company]. Here's their URL: [url]"
```
The skill scrapes the site, then asks ~10 targeted follow-up questions.

### Option B — You have some assets
```
"Build a brand style guide for [company]. Here's what I have:"
[Upload screenshots, PDFs, deck, or paste color/font info]
```
The skill accepts uploads and only asks about what's missing.

---

## Output Structure

```
[company-name]/
├── brand-guide.html          ← Beautiful, shareable, self-contained
└── brand-config.md           ← Machine-readable, feeds Ad Creator + Claude Design
```

---

## What You Can Build With The Output

Once you have a `brand-config.md`:

| Use Case | How |
|---|---|
| Landing pages | Paste config → brief Claude Code to build with brand CSS |
| Ad creatives | Feed into Ad Creator skill → static + carousel + reel |
| Social creatives | Exact colors, fonts, tone per platform |
| Blog / articles | Voice, tone, headline formulas all defined |
| Case studies | Data viz rules, table styles, typography hierarchy |
| Email campaigns | Button styles, CTA copy, subject line tone |
| Claude Design visuals | Paste config → on-brand images instantly |
| Product UI | Component rules, spacing grid, CSS variables |

---

## Part of the Marketing Skills Portfolio

```
brand-style-creator/   ← You are here (foundation)
      ↓
ad-creator/            ← Consumes brand-config.md
      ↓
ads-ab-testing/        ← Analyzes performance after 7–14 days
```

---

## Pre-Built Examples

See `/examples/` for three complete brand configs:

- `spellbook-brand-config.md` — Legal AI (B2B SaaS, Claude-powered)
- `basetwo-brand-config.md` — Digital twins for manufacturing (engineering-led)
- `bonsai-brand-config.md` — Freelancer business management (creator economy)

These show the expected depth and format of output.

---

*Built by Nidhi Dumian — [Instagram](https://www.instagram.com/nidhi.dumian/) · [LinkedIn](https://www.linkedin.com/in/nidhi-dumian/) · [X](https://x.com/DumianNidhi)*
*Part of the [marketing-skills](../) portfolio of Claude skills*
