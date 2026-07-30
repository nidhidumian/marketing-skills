# Tasklet for Teams — Launch Film (5 styles)

20-second Remotion launch films for [Tasklet for Teams](https://tasklet.ai/blog/2026-06-04-tasklet-for-teams).

Craft reference: [Benji Taylor / X launch motion](https://x.com/benjitaylor/status/2082515001949221152) — same story, five visual languages.

Built with **animation-creator** + [Remotion agent skills](https://www.remotion.dev/docs/ai/skills).

## Styles

| Composition | Style | What it borrows from the X film |
|---|---|---|
| `Style-SoftBrand` | Tasklet brand | Season Mix + fern/mint (original) |
| `Style-EditorialMono` | Editorial mono | Pure B/W Inter, kinetic type, dashed-ring punches, node fields |
| `Style-TerminalPrompt` | Terminal | `›` prompt, caret typing, ghost autocomplete, light↔dark flips |
| `Style-UIChrome` | UI chrome | Floating pills, black CTA capsules, prompt bars |
| `Style-PunchCut` | Punch cut | Rapid word punches, motion-path arcs, alternating black/white |

All: **1920×1080 · 20s · 30fps · silent**

## Preview

```bash
cd tasklet-for-teams-launch
npm i
npm run dev
```

Open any `Style-*` composition in the Studio.

## Render

```bash
npx remotion render Style-EditorialMono out/Style-EditorialMono.mp4
npx remotion render Style-TerminalPrompt out/Style-TerminalPrompt.mp4
npx remotion render Style-UIChrome out/Style-UIChrome.mp4
npx remotion render Style-PunchCut out/Style-PunchCut.mp4
npx remotion render Style-SoftBrand out/tasklet-for-teams.mp4
```

See `animation-config.md` for beat sheets and tokens.
