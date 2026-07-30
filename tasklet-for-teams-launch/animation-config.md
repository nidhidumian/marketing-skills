# Tasklet for Teams — Launch Animation Config
# Version: 2026-07-30
# Source: https://tasklet.ai/blog/2026-06-04-tasklet-for-teams
# Delivery: Remotion (`TaskletForTeams` composition)

---

## IDENTITY

company_name: Tasklet
product_name: Tasklet for Teams
promise: "Your company's AI command center."
cta: "Available now"
brand_config_ref: inline

---

## FILM

job: feature-drop
aspect: "16:9"
duration_s: 20
fps: 30
width: 1920
height: 1080
temperament: soft-product
delivery: remotion
audio: silent
composition_id: TaskletForTeams

---

## BRAND TOKENS

colors:
  bg_light: "#F5F5F5"
  bg_white: "#FFFFFF"
  bg_dark: "#121215"
  bg_deep: "#09342A"
  fern: "#4E814E"
  mint: "#C0FFAB"
  orange: "#FF7542"
  lavender: "#9AA2FF"
  text_on_light: "#121215"
  text_muted: "#5C635C"
  text_on_dark: "#F5F5F5"

fonts:
  display: "Season Mix, Georgia, serif"
  body: "Inter, system-ui, sans-serif"
  mono: "ui-monospace, SFMono-Regular, Menlo, monospace"

radius:
  pill: 999px
  card: 24px
  device: 28px

---

## MOTION TOKENS

easing:
  out: "cubic-bezier(0.22, 1, 0.36, 1)"
  punch: "cubic-bezier(0.16, 1, 0.3, 1)"
  cut_fade_frames: 8

duration:
  type_char_ms: ~40
  scene_min_s: 2.2
  end_hold_s: ~2.5

---

## BEAT SHEET

beats:
  - { t: [0.0, 2.4], id: hook, component: TypeHook, copy: "Introducing", notes: "caret typing on light bg" }
  - { t: [2.2, 4.6], id: name, component: NameLockup, copy: "Tasklet for Teams", notes: "fern accent arc" }
  - { t: [4.4, 7.0], id: thesis, component: ThesisLine, copy: "Your company's AI command center.", notes: "dark + node field" }
  - { t: [6.8, 9.5], id: tools, component: UIChrome, copy: "Connect once. Share safely.", notes: "CRM/Calendar/Projects/Files pills" }
  - { t: [9.3, 12.0], id: knowledge, component: GlassCard, copy: "Every agent knows the business.", notes: "Workspace Knowledge list" }
  - { t: [11.8, 14.4], id: agents, component: PunchWord, copy: "Build once. The whole team upgrades.", notes: "24/7 live pulse" }
  - { t: [14.2, 16.6], id: models, component: UIChrome, copy: "Unlock every model. Control every dollar.", notes: "Claude/GPT/Gemini chips" }
  - { t: [16.4, 20.0], id: end, component: EndCard, copy: "Available now · tasklet.ai", notes: "mint CTA hold" }

---

## DO / DON'T

do:
  - one idea per scene
  - Season Mix for display type, Inter for UI/body
  - mint + fern accents sparingly on deep green / light surfaces
  - end on a static hold

dont:
  - purple AI glow / generic sludge
  - dashboard-dense first frames
  - animating layout size for reveals
  - unreadable type under ~1.2s

---

## HANDOFF BLOCK

product_name: Tasklet for Teams
launch_promise: Your company's AI command center.
cta: Available now
temperament: soft-product
duration_s: 20
aspect: 16:9
signature_moves: ["type-caret-hook", "name-arc", "ui-pills", "knowledge-card", "live-pulse", "model-chips", "mint-cta"]
accent: "#C0FFAB"
fern: "#4E814E"
fonts: "Season Mix / Inter"
blog_source: https://tasklet.ai/blog/2026-06-04-tasklet-for-teams
preview: npm run dev
render: npx remotion render TaskletForTeams out/tasklet-for-teams.mp4
