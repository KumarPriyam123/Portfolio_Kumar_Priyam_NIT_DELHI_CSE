# CLAUDE.md

Guidance for Claude Code in this repo.

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # production build (type-checks + emits). No test suite.
```

## Stack

Next.js 15 App Router, React 19, TypeScript, Tailwind 3 (layout only). All pages are statically generated; there is no backend. `portfolio.html` is a separate, older single-file version and is not part of the build.

## Design system: "Latent Space" on scroll-craft

The site is built with the **scroll-craft** skill (`.claude/skills/scroll-craft/`). Read its `SKILL.md` before changing anything on the home page. The design brief, feeling curve and score live in `scrollcraft/builds/kpriyam/BRIEF.md`; the fingerprint registry is `scrollcraft/FINGERPRINTS.md`.

| Rule | Detail |
|---|---|
| Engine is never edited | `public/scrollcraft/scrollcraft.js` and `src/styles/scrollcraft.css` are verbatim copies of the skill's engine. Bespoke behaviour goes in page code, driven off `--sc-p` and our own markup. |
| Theme = tokens | Six colours + faces in `src/app/globals.css` under `html:root` (must stay `html:root`: the engine CSS lands later in the bundle and wins a `:root` tie). |
| Colours | canvas `#070a10`, surface `#0e141e`, ink `#e8edf5`, ink-soft `#93a1b6`, ONE accent amber `#f2b544` (means relevance / attention). Dark only. |
| Type | Archivo variable (display, `font-stretch` 104–118%), Geist (text), Geist Mono (data and labels only). All vendored in `src/app/fonts` (OFL); no font packages. |
| Classes | Our classes are `kp-*`. Never restyle `.sc-stage`, `.sc-copy` or `[data-sc-*]` selectors. |
| Copy | No em dashes in visible text (`clean()` / `splitLead()` in `src/lib/site.ts` handle data that has them). No `Section 01` kickers, no scroll cues, no invented numbers. One CTA label: `Start a conversation` (`CTA_LABEL`). |

The engine is mounted per route by `src/components/ScrollCraftMount.tsx` (destroy + mount on navigation, re-layout on body resize).

## Home page score (`src/app/page.tsx`)

| Act | Component | Device | Notes |
|---|---|---|---|
| Hero | `home/Hero.tsx` | flow + CSS line mask on load | Server component. Do not re-render after the engine touches it. |
| Silence | same | page scroll | The field condenses noise → three clusters. Authored silence, not dead scroll. |
| Query (peak) | `home/QueryAct.tsx` | `pin` span 2.6 | Scroll types `DEMO_QUERY` until the visitor touches the input. |
| Work | `components/WorkList.tsx` | flow + `data-sc-in` | Ranked by the query, FLIP re-rank. Shared with `/projects`. |
| Research | `home/ResearchAct.tsx` | `pin` + `count` | Cells go dark from CSS reading `--sc-p`. |
| Timeline | `home/TimelineAct.tsx` | `pan` | Data in `src/data/profile.ts`. Stacks as a list under reduced motion. |
| Close | `components/ContactPanel.tsx` | flow | Web3Forms POST; works without JS. |

## The signature move: query → field → ranking

- `src/lib/terms.ts`: the 31 field terms (real stack), each with a regex used for both docs and queries.
- `src/lib/search.ts`: BM25 over project text + a small alias table for role words. Labelled honestly on the page. To test ranking: `npx tsx` a script that calls `rank('backend, postgres')`.
- `src/lib/query-store.ts`: the visitor's query. Only `source: 'user'` persists (sessionStorage) and travels to the nav chip, case studies (`Marked`, `MatchNote`) and the contact message.
- `src/lib/field/field.ts`: WebGL point field + HTML labels with collision avoidance; identical Canvas 2D fallback when WebGL is missing. Term positions are derived from which projects use each term.

## Content

| What | Where |
|---|---|
| Projects (order = curated order) | `src/data/projects.ts` |
| Research | `src/data/research.ts` |
| Bio, skills, numbers, timeline | `src/data/profile.ts` |
| Identity, links, résumé URLs, Web3Forms key, portrait | `src/lib/site.ts` (single source; set `PORTRAIT_SRC` after adding `public/portrait.jpg`) |

Adding a project: append to `projects.ts`. Routes, sitemap, ranking and the field update automatically. If it uses a tool not in `TERMS`, add the term (max 31).

## Verify before shipping

Run the skill's harness against a production build (needs `npm i --no-save playwright-core` and Chrome):

```bash
npm run build && npx next start -p 4500
node .claude/skills/scroll-craft/scripts/shoot.mjs --url http://localhost:4500 --out lab/shots
node .claude/skills/scroll-craft/scripts/shoot.mjs --url http://localhost:4500 --out lab/mobile --width 390 --height 844
node .claude/skills/scroll-craft/scripts/shoot.mjs --url http://localhost:4500 --out lab/reduced --reduced-motion
```

Then read each `sheet.png`. A green run does not cover a real phone.
