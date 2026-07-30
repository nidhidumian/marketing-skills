---
name: animation-creator
description: >
  Creates a complete motion system for any brand — two outputs simultaneously:
  (1) a beautiful interactive HTML motion guide with live CSS/JS animations you can
  preview, copy, and ship, and (2) a structured animation-config.md that feeds into
  landing pages, Ad Creator, and other marketing skills. Use this skill whenever
  someone wants marketing animations, landing-page motion, micro-interactions,
  scroll reveals, hero entrances, CTA loops, loading states, or a motion design
  system. Trigger on "animate this", "add motion", "hero animation", "scroll
  animation", "micro-interactions", "motion guide", "animation system", or
  "make it feel alive." Works for any company — B2B SaaS, agency, startup,
  freelancer. Prefer brand-config.md from Brand Style Creator when available;
  otherwise research or interview for brand tokens first.
---

# Animation Creator

Generates a complete, production-quality motion system from brand inputs.
Outputs two files simultaneously: a polished interactive HTML motion guide
(live demos + copyable code) + a structured animation-config.md.

This skill sits next to Brand Style Creator in the marketing-skills portfolio.
Brand defines *how it looks*. Animation defines *how it moves*.

---

## STEP 0 — BRANCH ON WHAT THE USER HAS

Start every session with this exact question:

> "Do you already have a `brand-config.md` (from Brand Style Creator)?
> Or should I pull brand tokens from a URL / existing assets first?"

**Branch A — Has brand-config.md:** Load colors, fonts, radius, voice, and
CTA patterns from it. Skip brand research. Jump to the motion interview.

**Branch B — Has URL / assets only:** Extract brand tokens first (colors,
fonts, radius, personality) via web_fetch / uploads — same depth as Brand
Style Creator Step 1, but lighter. Then proceed to the motion interview.

**Branch C — Has neither, wants a one-off animation:** Ask for the single
surface to animate (hero, button, card, ad loop, etc.), gather minimum brand
tokens (2–3 colors + 1 font + corner style), and produce a focused HTML demo
+ snippet pack. Still generate both outputs, scoped to that surface.

---

## STEP 1 — LOAD OR INFER BRAND TOKENS

From `brand-config.md` or research, lock these before designing motion:

| Token | Why it matters for motion |
|---|---|
| Primary / accent hex | Accent drives CTA pulses, highlights, progress fills |
| Darkest / surface colors | Hero + dark-context choreography |
| Fonts (serif / sans / mono) | Kinetic type, staggered headlines, label ticks |
| Border radius | Sharp brands get snappy ease; soft brands get springier motion |
| Personality words | Maps to motion temperament (see Step 3) |
| Primary CTA copy | Used in CTA attention loops and hero CTAs |
| Anti-patterns | What motion must never do (e.g. no bounce, no purple glow) |

Tell the user: "Here's the brand motion baseline I'm using — [3–5 bullets].
I'll ask a few questions about *how* it should move."

---

## STEP 2 — MOTION INTERVIEW (8–10 QUESTIONS, ONE AT A TIME)

Ask conversationally, one at a time. Skip anything already known.

**Q1 — Surfaces to animate**
"What should we animate first? Pick all that apply:
- Landing hero entrance
- Scroll-triggered section reveals
- Buttons / micro-interactions
- Feature cards / staggered lists
- Stats / number counters
- Loading / skeleton / progress
- Modal / overlay transitions
- Social / ad loop (screen-recordable HTML)
- Something else (describe it)"

**Q2 — Motion temperament**
"If the motion had a personality matching the brand, which fits best?
- Precise & restrained (Linear / Stripe energy)
- Warm & springy (friendly product, soft landings)
- Bold & punchy (launch energy, short snaps)
- Editorial & slow (luxury / long reveals)
Pick one primary + optional secondary."

**Q3 — Intensity**
"On a 1–5 scale, how noticeable should motion be?
1 = almost invisible polish · 3 = clear but professional · 5 = cinematic / demo-reel"

**Q4 — Primary use case**
"Where will this ship first?
- Marketing site / landing page
- Product UI
- Paid social / ads (loop)
- Pitch deck / sales demo
- Email (limited — CSS only, very light)"

**Q5 — Duration budget**
"For the hero / first impression, what's the max time before the page feels 'ready'?
(Typical: 600–1200ms for SaaS; 1500–2500ms for editorial.)"

**Q6 — Scroll vs load**
"Should storytelling happen mostly on first paint (choreographed entrance),
mostly on scroll (reveals as you move), or both?"

**Q7 — Interaction feedback**
"Which interactions need motion feedback?
Hover · press/click · success · error · drag · focus · none yet"

**Q8 — Tech constraints**
"What can we ship?
- Self-contained HTML/CSS/JS (default — no build step)
- CSS-only (no JS)
- React + Motion/Framer
- Tailwind utility classes
Say the stack if you know it."

**Q9 — Reduced motion**
"Confirm: every animation must respect `prefers-reduced-motion: reduce`
(static or instant final state). Any surfaces that must stay fully static?"

**Q10 — What NOT to animate**
"Motion anti-patterns for this brand? Examples:
no bounce, no infinite spinner on content, no parallax, no autoplay video,
no purple glow, no emoji bursts, no layout-shifting height animations."

---

## STEP 3 — MAP PERSONALITY → MOTION TOKENS

Before generating, derive a motion token set. Always show the user what you inferred.

### Temperament → easing & spring

| Temperament | Default easing | Spring feel | Duration bias |
|---|---|---|---|
| Precise & restrained | `cubic-bezier(0.22, 1, 0.36, 1)` | low bounce | short (180–400ms) |
| Warm & springy | `cubic-bezier(0.34, 1.3, 0.64, 1)` | soft overshoot | medium (280–600ms) |
| Bold & punchy | `cubic-bezier(0.16, 1, 0.3, 1)` | snappy, little settle | short (120–320ms) |
| Editorial & slow | `cubic-bezier(0.65, 0, 0.35, 1)` | no bounce | long (500–1200ms) |

### Intensity → opacity / distance / stagger

| Intensity | Enter distance | Opacity floor | Stagger |
|---|---|---|---|
| 1–2 | 8–12px | 0.85 → 1 | 30–50ms |
| 3 | 16–24px | 0 → 1 | 60–90ms |
| 4–5 | 32–48px + slight scale | 0 → 1 | 80–120ms |

### Hard rules (always)

1. Animate only `transform` and `opacity` by default (GPU-friendly).
2. Never animate `width` / `height` / `top` / `left` for entrance motion.
3. Every demo must include a `@media (prefers-reduced-motion: reduce)` kill-switch.
4. No layout shift: reserve space; don't reveal by expanding height from 0.
5. Loops for ads/social must have a clean 4–8s cycle with a hold on the CTA.
6. Match brand radius and type — motion inherits visual identity, never fights it.
7. Avoid AI-default looks: purple glow, endless shimmer, bounce-everywhere, emoji confetti.

---

## STEP 4 — GENERATE BOTH OUTPUTS

Generate simultaneously:

### Output 1: Interactive HTML Motion Guide

A single self-contained HTML file. Structure it like the Brand Style Guide:
dark sidebar with logo/wordmark + "MOTION SYSTEM" + numbered navigation,
main content with live demos. Must look shareable and professional.

**Required sections in order:**

#### Hero Section
- Brand dark (or brand hero) background
- Eyebrow pill: "[COMPANY] MOTION SYSTEM"
- Large headline using brand display font: "Make it *move* on purpose."
  (adapt wording to brand voice)
- Subtext: "Live demos, tokens, and copy-paste snippets so every page,
  ad, and UI feels unmistakably [Company]."
- One primary CTA in the hero that itself demonstrates the brand's
  press/hover micro-interaction

#### 01 Motion Tokens
Live swatches / chips for:
- Temperament name + 1-line description
- Easing curves (show CSS `cubic-bezier(...)` + a small animated preview bar)
- Duration scale: micro (120–180ms) · UI (200–320ms) · enter (400–700ms) · story (800–1400ms)
- Stagger scale: tight / standard / cinematic
- Distance scale: xs / sm / md / lg (px values)
- Spring notes (if warm/punchy): stiffness / damping in plain language

**CSS Variables block** (dark code block):
```css
:root {
  /* Motion tokens — [Company] */
  --ease-out-brand: cubic-bezier(...);
  --ease-in-out-brand: cubic-bezier(...);
  --ease-spring-brand: cubic-bezier(...); /* only if temperament needs it */

  --dur-micro: 160ms;
  --dur-ui: 240ms;
  --dur-enter: 560ms;
  --dur-story: 1000ms;

  --stagger-1: 60ms;
  --stagger-2: 90ms;
  --stagger-3: 120ms;

  --rise-sm: 12px;
  --rise-md: 24px;
  --rise-lg: 40px;

  --fade-from: 0;
}
```

#### 02 Hero Entrance
Live demo of the recommended first-paint choreography:
- Eyebrow → headline (line stagger) → subcopy → CTA group → optional visual
- Timeline callouts (ms marks)
- Play / Replay button
- Reduced-motion note: show the static end-state path

Include a labeled dark code block with the exact HTML/CSS/JS used.

#### 03 Scroll Reveals
Live demo section that animates as it enters the viewport:
- Fade-up blocks
- Staggered feature row (3 cards)
- Optional split headline (serif line + sans line if brand uses both)

Implementation preference order:
1. CSS `@scroll-timeline` / `animation-timeline: view()` when sufficient
2. Lightweight IntersectionObserver + class toggle otherwise
Never require a heavy library unless the user asked for React/Motion.

#### 04 Micro-interactions
Live controls on light AND dark surfaces:
- Primary button hover / press / focus-visible
- Secondary button
- Pill / tag hover
- Card lift (subtle translateY + optional border accent — no heavy shadow stacks)
- Input focus ring (brand accent, not default blue)

Each with duration + easing labeled under the control.

#### 05 Stats & Counters
- Number count-up on enter (JS, respects reduced motion → snap to final)
- Optional progress bar / meter fill using transform: scaleX
- Caption styling with brand mono labels

#### 06 Loading & Progress
- Skeleton shimmer (opacity-only, brand-tinted — not purple)
- Dot pulse loader
- Determinate progress bar
Rules: never block content longer than necessary; prefer skeletons over spinners for page content.

#### 07 CTA Attention Loops
For marketing sites and ads:
- Soft pulse on primary CTA (scale 1 → 1.02 → 1, slow, capped)
- Optional arrow nudge
- Must pause on hover/focus
- Must disable under reduced motion

#### 08 Social / Ad Loop (if requested in Q1)
A framed 9:16 or 1:1 stage inside the guide:
- 4–8 second seamless loop
- Beat structure: Hook → Value → Proof → CTA hold
- Brand colors/fonts only
- Replay + aspect toggle if useful
- Note: "Screen-record this stage for paid social; or export frames later."

#### 09 Page & Overlay Transitions
- Modal enter/exit (opacity + slight scale)
- Toast / notice slide
- Route/section crossfade pattern (documented even if single-page demo)

#### 10 Do / Don't
Two-column rules with live mini-examples:
- ✓ Transform + opacity · ✗ Animating height/width
- ✓ Short UI feedback · ✗ 2s button hovers
- ✓ Staggered meaningful groups · ✗ Everything bouncing independently
- ✓ Reduced-motion fallbacks · ✗ Motion-only information
- ✓ Brand-tempo easing · ✗ Default `ease` / `linear` everywhere
- ✓ One hero choreography · ✗ Competing loops in the first viewport

#### 11 Copy-paste Snippet Pack
Ready-to-paste labeled blocks:
1. Motion CSS variables
2. Hero entrance (HTML + CSS + JS)
3. Scroll reveal helper (IO or CSS)
4. Button micro-interaction
5. Stagger utility classes
6. Reduced-motion reset
7. React + Motion variants (only if Q8 selected React)
8. Tailwind keyframes config (only if Q8 selected Tailwind)

---

### Output 2: animation-config.md

Generate alongside the HTML. Machine-readable. Feeds landing-page work,
Ad Creator motion notes, and Claude Design motion briefs.

```markdown
# [Company Name] Animation Config
# Version: [date]
# Pair with brand-config.md from Brand Style Creator when available.

---

## IDENTITY

company_name: [Name]
brand_config_ref: [path or "inline tokens below"]
motion_temperament: [precise | warm | bold | editorial]
intensity: [1-5]
primary_surfaces:
  - [hero | scroll | micro | stats | loading | cta-loop | ad-loop | overlays]

---

## BRAND TOKENS (MOTION-RELEVANT)

colors:
  darkest: "#hex"
  accent: "#hex"
  surface: "#hex"
  text: "#hex"

fonts:
  display: "[Font]"
  body: "[Font]"
  mono: "[Font]"

radius:
  button: "[px]"
  card: "[px]"

---

## MOTION TOKENS

easing:
  out: "cubic-bezier(...)"
  in_out: "cubic-bezier(...)"
  spring: "cubic-bezier(...)" # or null

duration:
  micro: "160ms"
  ui: "240ms"
  enter: "560ms"
  story: "1000ms"

stagger:
  tight: "60ms"
  standard: "90ms"
  cinematic: "120ms"

distance:
  sm: "12px"
  md: "24px"
  lg: "40px"

---

## CHOREOGRAPHY

hero:
  max_ready_ms: [number]
  sequence:
    - { at: 0,    target: "eyebrow",  anim: "fade-up" }
    - { at: 80,   target: "h1-line-1", anim: "fade-up" }
    - { at: 160,  target: "h1-line-2", anim: "fade-up" }
    - { at: 280,  target: "subcopy",  anim: "fade-up" }
    - { at: 400,  target: "cta-group", anim: "fade-up" }
  notes: "[brand-specific]"

scroll:
  trigger: "view-timeline | intersection-observer"
  default_anim: "fade-up"
  card_stagger: "standard"

micro:
  button_hover: { dur: "ui", ease: "out", lift: "2px" }
  button_press: { dur: "micro", scale: "0.98" }
  card_hover: { dur: "ui", lift: "4px" }

cta_loop:
  enabled: [true|false]
  cycle_ms: 2400
  scale_peak: 1.02
  pause_on_hover: true

ad_loop:
  enabled: [true|false]
  aspect: "9:16"
  duration_ms: 6000
  beats: ["hook", "value", "proof", "cta-hold"]

---

## ACCESSIBILITY

prefers_reduced_motion: "disable decorative motion; keep opacity crossfades ≤150ms or snap to end state"
motion_never_required_for_meaning: true
pause_loops_on_hover_focus: true

---

## ANTI-PATTERNS

never:
  - animate width/height for entrances
  - infinite content spinners
  - [brand-specific never]
  - purple glow / generic AI shimmer
  - layout-shifting reveals

---

## STACK

delivery: "[html-css-js | css-only | react-motion | tailwind]"
dependencies: "[none | motion | gsap — only if requested]"

---

## HANDOFF BLOCK

# Paste into landing-page or Ad Creator briefs:

brand_name: [Company]
motion_temperament: [..]
ease_out: cubic-bezier(...)
dur_ui: 240ms
dur_enter: 560ms
hero_ready_ms: [..]
scroll_reveal: fade-up + stagger
cta_loop: [on|off]
reduced_motion: required
```

---

## STEP 5 — QUALITY BAR BEFORE SHIPPING

Self-check every HTML guide:

- [ ] First viewport has intentional motion (or a clear Replay to show it)
- [ ] At least 2–3 distinct motion moments (hero, scroll/micro, CTA or loader)
- [ ] Brand colors/fonts/radius used — not generic purple/Inter defaults
- [ ] All decorative animation disabled under `prefers-reduced-motion`
- [ ] No layout shift during entrances
- [ ] Sidebar nav jumps to each section
- [ ] Code blocks match the live demos exactly
- [ ] Works on mobile (no hover-only essential feedback; focus-visible present)
- [ ] Ad/social loop (if included) is seamless and CTA-readable at the end of each cycle
- [ ] `animation-config.md` tokens match the HTML CSS variables 1:1

---

## SKILL BEHAVIOR RULES

- Prefer `brand-config.md` when it exists — do not re-interview brand colors/fonts
- When inferring motion temperament from brand personality, say so explicitly
- Always generate BOTH outputs (HTML + animation-config.md) in the same response
- The HTML must be genuinely beautiful and *actually animate* — not screenshots of motion
- Default stack is self-contained HTML/CSS/vanilla JS with zero dependencies
- Only introduce Motion/GSAP/Tailwind when the user asks or the repo already uses them
- Keep first-viewport motion within the agreed ready-time budget
- One job per section in the guide; don't clutter demos with unrelated marketing chrome
- If the user asks for a single component animation, still return a mini guide + config,
  scoped tightly to that component
- Never ship motion that fights Brand Style Creator rules (wrong colors, forbidden tropes)

---

## PORTFOLIO FIT

```
brand-style-creator/   → brand-config.md (look)
      ↓
animation-creator/     → animation-config.md + motion-guide.html (move)
      ↓
ad-creator/            → static + carousel + reel (consumes both configs)
      ↓
ads-ab-testing/        → performance after 7–14 days
```

When Ad Creator (or landing-page work) runs after this skill, paste the
HANDOFF BLOCK from animation-config.md alongside brand-config.md.

---

## WHAT THIS SKILL ENABLES

**Marketing site**
- Hero choreography, scroll storytelling, CTA polish

**Product UI**
- Micro-interactions, loaders, overlays consistent with marketing motion

**Ads / social**
- Screen-recordable HTML loops with brand-true timing

**Sales / decks**
- Stat counters, restrained entrance motion for demos

**Handoff to engineers**
- Tokens + snippets that paste into existing codebases without a rewrite

The animation-config.md is the single source of truth for *how the brand moves*.
