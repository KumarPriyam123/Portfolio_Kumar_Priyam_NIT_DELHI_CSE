# CLAUDE.md

Guidance for Claude Code in this repo.

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # production build (type-checks + emits). No test suite.
```

## Stack

Next.js 15 App Router, React 19, TypeScript, Tailwind 3 (layout only). All pages are statically generated; there is no backend. `portfolio.html` is a separate, older single-file version and is not part of the build.

## Design system: "Three crafts" (v2) on scroll-craft

The site is built with the **scroll-craft** skill (`.claude/skills/scroll-craft/`). Read its `SKILL.md` before changing anything on the home page. The design brief, feeling curve and score live in `scrollcraft/builds/kpriyam/BRIEF.md`; the fingerprint registry is `scrollcraft/FINGERPRINTS.md`.

| Rule | Detail |
|---|---|
| Engine is never edited | `public/scrollcraft/scrollcraft.js` and `src/styles/scrollcraft.css` are verbatim copies of the skill's engine. Bespoke behaviour goes in page code, driven off `--sc-p` and our own markup. |
| Theme = tokens | Colours + faces in `src/app/globals.css` under `html:root` (must stay `html:root`: the engine CSS lands later in the bundle and wins a `:root` tie). |
| Colours | canvas `#070a10`, surface `#0e141e`, ink `#e8edf5`, ink-soft `#93a1b6`. Accent is a bright neutral `#eef2f8` (CTAs, focus). Each craft owns a colour: Software `--kp-sde` teal, AI `--kp-ai` amber, Data `--kp-data` coral; anything with `data-for="sde|ai|data"` gets it as `--kp-c`. Green `--kp-live` only for the status dot. Dark only. |
| Type | Archivo variable (display, `font-stretch` 104–118%), Geist (text), Geist Mono (data and labels only). All vendored in `src/app/fonts` (OFL); no font packages. |
| Classes | Our classes are `kp-*`. Never restyle `.sc-stage`, `.sc-copy` or `[data-sc-*]` selectors. |
| Copy | No em dashes in visible text (`clean()` / `splitLead()` in `src/lib/site.ts` handle data that has them). No `Section 01` kickers, no scroll cues, no invented numbers. One CTA label: `Start a conversation` (`CTA_LABEL`). |

The engine is mounted per route by `src/components/ScrollCraftMount.tsx` (destroy + mount on navigation, re-layout on body resize).

## Home page score (`src/app/page.tsx`)

| Act | Component | Device | Notes |
|---|---|---|---|
| Hero | `home/RoleHero.tsx` | portrait canvas + load mask | Client. Cycles Software 7s → AI 7s → Data 6s; tabs take over; pauses on hover/focus, off screen; static under reduced motion. |
| Crafts | `home/Crafts.tsx` | flow + `data-sc-in` | Software and AI side by side at equal size, Data band below. Diagrams in `art/CraftFigs.tsx`. |
| Work | `components/WorkGrid.tsx` | flow + `data-sc-in` | Mixed bento grid, craft badges, filter + BM25 search, FLIP re-rank. Shared with `/projects`. |
| Research | `home/ResearchAct.tsx` | `pin` + `count` | Cells go dark from CSS reading `--sc-p`. Wears the AI colour. |
| Timeline | `home/TimelineAct.tsx` | `pan` | Data in `src/data/profile.ts`. Stacks as a list under reduced motion. |
| About | `home/About.tsx` | flow | The real photo. |
| Close | `components/ContactPanel.tsx` | flow | Web3Forms POST; works without JS. |

## The portrait

- `public/portrait/kumar-cutout.{png,webp}`: background-removed photo (413×531). Source of every rendering and the OG image.
- `src/lib/portrait/portrait.ts`: `RolePortrait` canvas engine. Three layers (code / graph / streams), each pre-rendered once and animated with a light overlay; block dissolve between modes; DPR capped by pixel budget. Under ~1180px the art sits in flow between name and copy.
- `src/lib/portrait/code.ts`: the code text the Software portrait is typeset from (texture, not a claim).
- `src/data/roles.ts`: the three crafts (title, line, metrics, claims, stack, flagships) and `PROJECT_ROLES` (which crafts each project shows).

## Search and the carried query

- `src/lib/search.ts`: BM25 over project text + a small alias table for role words. Labelled honestly on the page. To test ranking: `npx tsx` a script that calls `rank('backend, postgres')`.
- `src/lib/query-store.ts`: the visitor's query. Only `source: 'user'` persists (sessionStorage) and travels to the nav chip, case studies (`Marked`, `MatchNote`) and the contact message.

## Content

| What | Where |
|---|---|
| Projects (order = curated order) | `src/data/projects.ts` |
| Research | `src/data/research.ts` |
| Bio, skills, numbers, timeline | `src/data/profile.ts` |
| Crafts and project → craft map | `src/data/roles.ts` |
| Identity, links, résumé URLs, Web3Forms key, portrait | `src/lib/site.ts` (single source; `PORTRAIT_SRC`) |

Adding a project: append to `projects.ts`, add its crafts to `PROJECT_ROLES` and a mark to `art/ProjectGlyph.tsx`. Routes, sitemap and ranking update automatically.

## Verify before shipping

Run the skill's harness against a production build (needs `npm i --no-save playwright-core` and Chrome):

```bash
npm run build && npx next start -p 4500
node .claude/skills/scroll-craft/scripts/shoot.mjs --url http://localhost:4500 --out lab/shots
node .claude/skills/scroll-craft/scripts/shoot.mjs --url http://localhost:4500 --out lab/mobile --width 390 --height 844
node .claude/skills/scroll-craft/scripts/shoot.mjs --url http://localhost:4500 --out lab/reduced --reduced-motion
```

Then read each `sheet.png`. A green run does not cover a real phone.
