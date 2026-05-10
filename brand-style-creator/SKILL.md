---
name: brand-style-creator
description: >
  Creates a complete brand style guide for any company — two outputs simultaneously:
  (1) a beautiful interactive HTML brand guide (like AirOps at airops-style-guide.vercel.app)
  and (2) a structured brand-config.md that feeds directly into the Ad Creator and other
  marketing skills. Use this skill whenever someone wants to build a brand guide, create a
  brand system, define visual identity, document brand colors/typography/voice, or set up
  a design system for a company. Trigger this skill even if the user says "brand kit",
  "style guide", "brand guidelines", "visual identity doc", or "I want to document my brand."
  Works for any company — B2B SaaS, agency, startup, freelancer. The HTML output is
  shareable as a standalone portfolio piece. The brand-config.md is machine-readable and
  feeds into the Ad Creator skill, Claude Design, and any AI-assisted content workflow.
---

# Brand Style Creator

Generates a complete, AirOps-quality brand style system from minimal inputs. Outputs two
files simultaneously: a polished interactive HTML brand guide + a structured brand-config.md.

---

## STEP 0 — BRANCH ON WHAT THE USER HAS

Start every session with this exact question:

> "Do you have existing brand assets (colors, fonts, a deck, logo files, screenshots)?
> Or should I start by researching the company from a URL?"

**Branch A — Has assets:** Accept uploads (screenshots, PDFs, decks, logo files).
Ask targeted follow-up questions to fill gaps only. Skip URL scraping.

**Branch B — Has URL only:** Scrape the URL first using web search + web_fetch.
Extract everything visible: colors, fonts, tone, taglines, product description,
target audience, imagery style. Then ask follow-up questions for what couldn't be inferred.

---

## STEP 1 — RESEARCH (URL BRANCH ONLY)

If the user provides a URL:
1. `web_fetch` the homepage
2. `web_fetch` the /about page
3. `web_search` "[company name] brand fonts colors design"
4. `web_search` "[company name] target audience product"

Extract from research:
- Primary and secondary colors (note hex values if visible in source)
- Font families used (check CSS if accessible)
- Tagline and brand voice from homepage copy
- Product description and value proposition
- Target audience from messaging
- Competitor mentions
- Imagery style (photography vs illustration, editorial vs stock, dark vs light)

After research, tell the user: "Here's what I found — I'll ask you a few questions
to fill in what I couldn't infer."

---

## STEP 2 — INTERVIEW (10–12 QUESTIONS, ONE AT A TIME)

Ask questions conversationally, one at a time. Skip any question if the answer
was already found in research or assets. Adapt based on what's known.

### Core questions (always ask if not already known):

**Q1 — Company basics**
"What is [company name]'s product and who is it for? Give me the one-sentence version."

**Q2 — Brand personality**
"If [company name] were a person at a dinner party, how would you describe them?
Pick 3–5 words. (Examples: sharp and direct / warm and approachable /
bold and irreverent / quiet and authoritative)"

**Q3 — Primary colors**
"What are your primary brand colors? Share hex codes if you have them.
If not, describe them — 'deep navy', 'electric green', 'warm off-white', etc."

**Q4 — Secondary / accent colors**
"Any secondary or accent colors? (These appear on CTAs, hover states, pills, highlights.)"

**Q5 — Typography**
"What fonts does [company name] use?
- Headline / display font (the big dramatic one)?
- Body / UI font (the readable everyday one)?
- Mono / label font (for tags, pills, code, eyebrows)?
If you don't know, say so and I'll infer from the website or suggest based on brand personality."

**Q6 — Button + component style**
"Are your corners sharp (0px radius) or rounded? Do buttons feel pill-shaped,
square, or somewhere in between? What's your primary button color?"

**Q7 — Imagery style**
"What kinds of images represent your brand?
- Real people in real work contexts?
- Abstract / conceptual illustrations?
- Product UI screenshots?
- Data visualizations / charts?
- What to NEVER use? (e.g., stock photo handshakes, purple gradient AI aesthetics)"

**Q8 — Voice and tone**
"Describe how [company name] writes. Pick what fits:
- Expert and authoritative vs warm and conversational
- Serious and precise vs playful with wit
- Bold claims with data vs humble and understated
What words or phrases does the brand NEVER use?"

**Q9 — Target audience**
"Who reads your content? (job titles, company stage, technical level, platform they're on)"

**Q10 — Brand mission and beliefs**
"What does [company name] fundamentally believe that competitors don't?
What's the 'why now' — why does this product exist at this moment?"

**Q11 — CTA patterns**
"What actions do you want visitors to take?
What's your primary CTA? (Book a demo / Start free / Download / Get access)"

**Q12 — What NOT to do**
"What are your biggest brand anti-patterns — things that would look off-brand,
sound wrong, or make your team cringe?"

---

## STEP 3 — INFER WHAT'S MISSING

Before generating, fill in any remaining gaps by inference:

- If no fonts given → suggest based on brand personality (e.g., editorial/luxury brands →
  serif headlines; tech/SaaS → clean sans-serif; bold startups → variable display fonts)
- If no hex codes → derive from brand description ("electric green" → ~#00e676 range)
- If no component style → infer from brand words (sharp/direct → 0px radius;
  warm/approachable → generous border-radius)
- If no data viz style → default to brand primary palette, sharp corners for enterprise,
  rounded for consumer
- Always tell the user what you inferred and why

---

## STEP 4 — GENERATE BOTH OUTPUTS

Generate simultaneously:

### Output 1: Interactive HTML Brand Guide

A single self-contained HTML file. Structure it exactly like AirOps:
dark sidebar with logo + "BRAND STYLE GUIDE" + numbered navigation,
main content area with full sections. Must look shareable and professional.

**Required sections in order:**

#### Hero Section
- Dark background (brand primary dark color)
- Eyebrow pill tag: "[COMPANY] BRAND SYSTEM"
- Large serif headline: "Build on *brand*, every time." (adapt for company)
- Subtext: "Everything you need to ship pages, apps, and campaigns that look
  unmistakably [Company]. Copy the code. Follow the rules. Ship it."

#### 01 Colors
**Primary Palette** — show each as a color swatch block with:
- Color name (ALL CAPS label)
- Hex code
- Usage description (e.g., "Hero sections, sidebar, dark cards" /
  "CTAs, interactive states, accents" / "Hover states, section fills" /
  "Page backgrounds, card fills")

**Special Use Colors** — Label yellow, white, near-black UI, body secondary

**Secondary Palette** — grid of supplementary colors with hex codes

**CSS Variables block** (dark code block):
```css
/* CSS Variables */
--primary: #hex;
--primary-dark: #hex;
--primary-light: #hex;
--accent: #hex;        /* CTAs, interactive states */
--surface-light: #hex; /* hover, section fills */
--background: #hex;
--text-primary: #hex;
--text-secondary: #hex;
--border: #hex;
```

#### 02 Typography
**Three-typeface system** (or two if brand only uses two):

For each typeface show:
- Role (Headline / Body / Label+Tags)
- Font family name
- Size, weight, tracking, line-height
- Sample text rendered in that style

**Type hierarchy table** — two-column layout:
Left: role name + font specs
Right: live rendered example text

Roles to include:
- Eyebrow / Small Text: mono, 14px, ALL CAPS, tracking 0.06em, line-height 1.3
- Large Headline (H1): serif or bold sans, 96px, tracking -0.02em, line-height 1.0
- H1 Sans variant: sans-serif, 72px, tracking -0.02em, line-height 1.0
- H2 Serif: 56px, tracking -0.02em
- H5 / Feature headline: 40px, tracking -0.02em, line-height 1.04
- Large Body: 24px, tracking 0.02em, line-height 1.3
- Body: 16px, tracking -0.02em, line-height 1.4
- Small Text / Eyebrow: mono, 14px, ALL CAPS

**Full Scale Reference block** — stacked rows showing each size live

**Font Families CSS block:**
```css
/* Typography */
--font-serif: 'FontName', Georgia, serif;
--font-sans: 'FontName', 'Helvetica Neue', sans-serif;
--font-mono: 'FontName', 'DM Mono', monospace;

h1 { font-family: var(--font-serif); letter-spacing: -2px; }
body { font-family: var(--font-sans); }
.label { font-family: var(--font-mono); text-transform: uppercase; }
```

#### 03 Components

**Buttons — Light Context:**
Show live rendered: Primary Button → | Secondary Button → | ← Back | Text Button → | SMALL BUTTON →

**Buttons — Dark Context:**
Same buttons on dark background

**Pills & Tags:** Always mono font, ALL CAPS, show multiple variants
(default, colored, dark fill, accent fill)

**Cards — Normal, Dark, Accent:**
Show 3 card variants with:
- Tag/eyebrow pill
- Headline
- Body text
Each in: white bg / dark bg / accent color bg

**Form Inputs:**
Show:
- Text input field (email, company name)
- Helper text below
- Primary CTA button

**Data Tables:**
Show sample table with:
- Column headers (ALL CAPS mono)
- Alternating row colors
- Accent color for positive trends
- Red for negative trends

**Component Rules CSS block:**
```css
/* Component Rules */

/* Border radius — adapt to brand */
border-radius: [0 for sharp / 8px for rounded];

/* Brand border */
border: 1px solid var(--border);

/* Pills */
.pill {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 8px 16px;
  border: 1px solid;
}

/* Primary button */
.btn-primary {
  background: var(--accent);
  color: var(--primary-dark);
  border-radius: [58px for pill / 4px for rounded / 0 for sharp];
}

/* Secondary button */
.btn-secondary {
  background: var(--surface-light);
  color: var(--primary-dark);
}
```

#### 04 Logo & Imagery

**Logo on Different Backgrounds:**
Show logo name/wordmark rendered in 4 quadrants:
- On white / light background
- On brand dark background
- On near-black
- On accent / interaction color

**Imagery Guidelines** (dark code block):
```
Photos & illustrations:
✓ [Brand-specific: e.g., Real people, real work contexts]
✓ [Brand-specific: e.g., High contrast, editorial style]
✓ [Brand-specific: e.g., Brand color overlays on dark backgrounds]
✗ Stock photo clichés (handshakes, lightbulbs, "teamwork" poses)
✗ [Brand anti-pattern: e.g., Purple/blue gradient AI aesthetics]

Data viz (charts, graphs):
✓ [Specify: sharp or rounded corners]
✓ Brand palette: [lightest] → [darkest], accent [highlight color]
✓ [Serif/Sans] headlines on charts
✓ Mono ALL-CAPS labels
✓ 1px [border color] borders, [bg color] background
```

#### 05 Spacing & Layout

**8px Base Grid** — visual bar chart showing spacing scale:
4px (xs) / 8px (sm) / 16px (md) / 24px (lg) / 32px (xl) / 48px (2xl)

**Layout Rules CSS block:**
```css
/* Layout Rules */
Max content width:    1200px
Page horizontal pad:  64px desktop, 24px mobile
Section padding:      72px 64px
Card padding:         28–32px
Component gap:        [2px tight / 8px standard / 16px relaxed]
Border-radius:        [0 sharp / 4px subtle / 8px rounded / full pill]
```

#### 06 CSS Snippets

Ready-to-paste snippets for Claude Code. Include:

**Dark hero section** (use on landing pages)
**Light section container**
**Card component**
**Pill/tag**
**Data table row**
**Form input**

Each as a labeled dark code block.

#### 07 Container Styles

Four surface variants — each shown as a full-width live preview block:
Content structure per container: Eyebrow pill → H2 (serif line 1 + sans line 2) → Body → Buttons

1. **Light** — white/light bg
2. **Canvas** — white bg + dot grid pattern
3. **Dark** — brand dark bg, off-white text
4. **Accent** — brand accent bg (or secondary brand color)

**Container Token Summary** (dark code block):
```
/* Light */
bg: #fff | text: [primary dark]
pill: bg [light tint] / border+text [brand mid]

/* Canvas */
bg: #fff + radial-gradient([border color] 1px, transparent 1px) 24px
text: [primary dark]

/* Dark */
bg: [darkest brand color] | text: [off-white]
double inset border: 1px solid [mid brand]

/* Accent */
bg: [accent color] | text: [dark]
pill: bg rgba(0,0,0,0.1) / border+text [contrast]

/* Shared H2 pattern */
line-1: [Serif font] | line-2: [Sans font]
size: 72px | tracking: -0.03em | line-height: 1
```

#### 08 Data Viz

**Global Tokens — All Chart Types** (two-column):

Left column — Typography:
- Headline: [brand serif], 40–56px, tracking -0.02em
- Subhead: [mono], 18–24px
- Axis labels: [mono] Regular, 14–18px, [muted color]
- Value callouts: [sans/mono] Medium, 16–20px, [primary dark]
- Legend: [sans] Medium, 14px
- Footnote: [mono] Medium, 14–18px, 80% opacity

Right column — Palette swatches:
- Primary bar/fill (light)
- Primary line/stroke
- Highlight/accent
- Near black (text)
- Background (light)
- Background (dark)
- Axes/grid lines

**Chart Examples — 4 types:**

1. **Table Infographic** — numbered list format
   Show a 3-row sample table: col header bg = brand primary,
   alternating row fills, numbered items in brand accent

2. **Numbered List** — two-column, large serif number
   Brand color number column, alternating rows

3. **Equation / Formula Visualization** — stacked blocks
   X + Y + Z = Result (result row = solid brand primary fill, white text)

4. **Line Chart** — time series with projection
   Brand primary line, accent comparison line, dashed projection

**Data Viz Rules** (dark code block):
```
Always:
- [Sharp/rounded] corners on bars, containers, chart frames
- Outer border: 1px solid [brand border color]
- Axes: [mono font], [muted color]
- Value callouts: [sans/mono Medium], [primary text color]

Never:
- [Rounded/sharp] bars (opposite of brand choice)
- Drop shadows on chart elements
- Gradients on fills
- Mixing chart palette with web palette
```

#### 09 Brand Strategy

Subsections with ALL CAPS mono eyebrow labels:

**OUR CORE BELIEFS** — What does the company fundamentally believe?
**WHY NOW?** — The market timing / reason this product exists now
**WHO WE SERVE** — Primary and secondary audience descriptions
**MISSION** — One-sentence mission statement
**BRAND POSITIONING** — How the company differs from generic alternatives
**BRAND PROMISE** — What customers can always count on
**CORE NARRATIVES** — 3–5 story frameworks the brand uses repeatedly
**BRAND ATTRIBUTES** — 4–5 personality traits with descriptions
**OUR BRAND PERSONA** — The "friend at dinner party" description
**WHAT WE'RE NOT** — 4–5 explicit anti-positioning statements

All content rendered in bordered content blocks on off-white background.

#### 10 Copy, Voice & Tone

**What is [Company]?** — Three versions:
- Long (for sales calls, PR, partnerships)
- Medium (for internal docs, one-pagers)
- Short (for social, podcast intros, bios)

**Brand Pillars** — 4–6 core beliefs that anchor all content

**Voice Overview** — personality, how it never changes

**Voice Principles** — 3–4 principles, each with ✓ Do / ✗ Don't examples

**What We're Not** — explicit denials (e.g., "We're not AI doomsday believers")

**Writing Principles** — how to approach complex subjects, acronyms, jargon

**AI Writing Tropes to Avoid** — with ✓/✗ examples:
- Em dashes as dramatic pause
- "If X, then Y" construction
- "In today's world" openers
- "Delve into" / "Leverage" / hollow affirmations
- Three-part list "and beyond"
- Overly formal transitions ("Furthermore," "Moreover,")

**Tone Guide** — table: Tone | Use For | Examples
Map different tones to contexts (functional vs empowering vs aspirational vs witty)

**Copy Examples by Channel:**
- Email subject lines (5–6 examples)
- Hero brand headlines (4–5 examples)
- Product feature copy (per feature)
- CTA copy rules

**Copy Rules** (dark code block):
```
✓ Sentence case for headlines
✓ Oxford comma
✓ Product names capitalized
✓ CTA copy: short imperatives ("Get a demo" not "Click here to learn more")
✓ En dash (–) for ranges
✗ Never: "synergize," "robust," "comprehensive," "seamless"
✗ Never start with: "We are excited to announce..."
✗ Never: hollow affirmations ("Great question!" "Absolutely!" "Certainly!")
```

---

## STEP 5 — GENERATE brand-config.md

Generate this alongside the HTML. It is machine-readable and feeds directly
into the Ad Creator skill, Claude Design, and other AI workflows.

```markdown
# [Company Name] Brand Config
# Version: [date]
# Use this file to brief AI tools, Claude Design, and ad creation workflows.

---

## IDENTITY

company_name: [Name]
tagline: [One-line tagline]
product_description: [2–3 sentence product description]
website: [URL]
industry: [Category]

---

## AUDIENCE

primary_audience:
  titles: [Job titles]
  company_stage: [Enterprise / SMB / Startup / Individual]
  technical_level: [High / Medium / Low]
  platforms: [LinkedIn / Reddit / Instagram / etc]
  pain_points:
    - [Pain 1]
    - [Pain 2]
    - [Pain 3]

secondary_audience:
  titles: [Job titles]
  notes: [Context]

---

## COLORS

primary:
  darkest: "#hex"    # Deep backgrounds, hero sections
  dark: "#hex"       # Sidebar, dark cards
  mid: "#hex"        # Labels, links, accents on light
  accent: "#hex"     # CTAs, interactive states — PRIMARY CTA COLOR
  light: "#hex"      # Hover states, section fills
  muted: "#hex"      # Muted backgrounds
  off_white: "#hex"  # Page backgrounds, card fills

special:
  highlight: "#hex"  # Pill labels (use with mono font only)
  white: "#ffffff"
  ui_dark: "#hex"    # UI text, primary buttons
  text_secondary: "#hex"  # Secondary text, descriptions

border_color: "#hex"
background_default: "#hex"

---

## TYPOGRAPHY

fonts:
  serif: "[Font Name], Georgia, serif"     # Headlines, display
  sans: "[Font Name], Helvetica Neue, sans-serif"  # Body, UI
  mono: "[Font Name], DM Mono, monospace"  # Labels, pills, tags, eyebrows

type_scale:
  h1_size: "96px"
  h1_tracking: "-0.02em"
  h1_line_height: "1.0"
  h2_size: "56px"
  body_size: "16px"
  body_tracking: "-0.02em"
  body_line_height: "1.4"
  label_size: "14px"
  label_case: "uppercase"
  label_tracking: "0.06em"

---

## COMPONENTS

border_radius:
  default: "[0px / 4px / 8px]"   # sharp / subtle / rounded
  buttons_primary: "[58px / 8px / 0px]"  # pill / rounded / sharp
  pills: "[5px / 9999px]"

button_primary:
  background: "#hex"  # = accent color
  text: "#hex"        # = darkest brand color (high contrast)
  hover: "#hex"

button_secondary:
  background: "#hex"
  text: "#hex"

spacing_base: "8px"
max_content_width: "1200px"
page_padding_desktop: "64px"
section_padding: "72px 64px"

---

## BRAND VOICE

personality: "[3–5 adjectives]"

tone_primary: "[Expert / Warm / Witty / Empowering]"
tone_secondary: "[Collaborative / Aspirational / Functional]"

headline_formulas:
  - "Pain + before-time: [example]"
  - "Contrast / negation: [example]"
  - "Stat as headline: [example]"
  - "Identity first: [example]"
  - "Speed claim: [example]"
  - "Reframe the objection: [example]"

cta_primary: "[CTA text for cold audience → lead magnet]"
cta_warm: "[CTA text for warm audience → demo/trial]"

words_never_use:
  - synergize
  - robust
  - comprehensive
  - [brand-specific additions]

never_write:
  - "We are excited to announce..."
  - Em dash as dramatic pause
  - "Delve into"
  - "Leveraging" as default verb
  - Hollow affirmations ("Great question!")

---

## BRAND STRATEGY

mission: "[One sentence]"

positioning: "[How brand differs from generic alternatives]"

core_beliefs:
  - "[Belief 1]"
  - "[Belief 2]"
  - "[Belief 3]"

brand_enemies: "[What the brand explicitly stands against]"

what_we_are_not:
  - "[Anti-pattern 1]"
  - "[Anti-pattern 2]"

---

## IMAGERY

photography:
  do:
    - "[Brand-specific do]"
    - "[Brand-specific do]"
  never:
    - "Stock photo clichés (handshakes, lightbulbs)"
    - "[Brand-specific never]"

data_viz:
  corner_style: "[sharp / rounded]"
  primary_line_color: "#hex"
  accent_color: "#hex"
  background: "#hex"
  border: "1px solid #hex"
  typography: "[mono font], ALL CAPS labels"

---

## AD CREATOR HANDOFF

# Copy-paste this block when using the Ad Creator skill:

brand_name: [Company]
primary_cta_cold: [Lead magnet CTA]
primary_cta_warm: [Demo/trial CTA]
brand_color_primary: "#hex"
brand_color_accent: "#hex"
font_headline: "[Font]"
font_body: "[Font]"
platform_priority: [Primary platform, Secondary, Tertiary]
audience_primary: [Job title / persona]
pain_point_primary: [Top pain]
voice_in_3_words: [Word1 / Word2 / Word3]
```

---

## SKILL BEHAVIOR RULES

- Never assume — always ask or infer explicitly with explanation
- When inferring, say: "I inferred [X] from [Y] — does that match?"
- Always generate BOTH outputs (HTML + brand-config.md) in the same response
- The HTML must be genuinely beautiful — not a placeholder template
- Use the brand's actual colors, not generic greens
- CSS variables must use the brand's real hex codes
- The brand-config.md must be immediately usable in the Ad Creator skill
- If the company is one of Spellbook / Basetwo AI / Bonsai, load the pre-built
  examples from the /examples folder — do not re-interview from scratch

---

## EXAMPLES FOLDER

See /examples/ for three pre-built brand configs:

- `spellbook-brand-config.md` — Legal AI, Claude-powered, purple/navy palette
- `basetwo-brand-config.md` — Digital twins for manufacturing, industrial blue
- `bonsai-brand-config.md` — Freelancer business management, warm and approachable

These serve as quality references for the expected output depth.

---

## WHAT THIS SKILL ENABLES

Once a brand-config.md exists, use it to brief AI for:

**Design & Visual**
- Landing pages (layout, copy, CSS — all on-brand)
- Ad creatives — static, carousel, reel (via Ad Creator skill)
- Social media creatives (exact colors, fonts, tone per platform)
- Claude Design prompts (paste config → builds on-brand visuals)
- Pitch decks and investor materials

**Content & Copy**
- Blog posts and articles (voice, tone, headline formulas)
- Case studies (data viz style, table formats)
- Email campaigns (button styles, CTA rules, subject line tone)
- Social copy (platform-matched voice)

**Product & Code**
- Product UI (component rules, spacing grid, CSS variables)
- Documentation (typography hierarchy, brand-consistent formatting)
- Onboarding flows (component style, CTA patterns)

The brand-config.md is the single source of truth that makes
every output unmistakably on-brand.
