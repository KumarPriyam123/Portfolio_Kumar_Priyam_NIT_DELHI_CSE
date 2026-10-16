# BRIEF: kpriyam.me

> **v2 (17 Oct 2026) supersedes v1 below.** Kept for history. Feedback from Kumar *(his)*: v1 read as "AI engineer only"; Software and AI must weigh equally and separately, Data too; open on Software, then AI, mixed rather than all-SDE; use his photo, animated, and make it look cool.

## v2: Three crafts

| | Decision |
|---|---|
| Belief | He is a software engineer **and** an AI engineer **and** a data engineer, with real numbers for each. |
| Colour | Each craft owns one: Software teal `#5eead4`, AI amber `#f2b544`, Data coral `#ff8a65`. The site accent becomes a bright neutral, so no craft dominates. Green `#4ade80` only for "open to roles". |
| Hero (peak) | His photo, background removed, drawn live on canvas three ways: **Software** typeset from code that types itself in, **AI** a neural graph with activations walking its edges (pointer = attention), **Data** streamlines displaced by the face with records flowing. Block dissolve between them. Cycles Software 7s → AI 7s → Data 6s; tabs take over; pauses on hover/focus, off screen, and entirely under reduced motion (static renders). Giant name sits behind the head. |
| Order | Hero → What I build (Software and AI side by side at equal size, Data band below, each with an animated diagram) → Selected work (mixed bento grid, craft badges, filter + BM25 search) → Research (pin + count) → Since 2023 (pan) → About (real photo) → Contact. |
| Kept from v1 | Query carry-over (nav chip, case-study marks, contact prefill), research and timeline acts, copy rules, CTA label. |
| Dropped | WebGL term field, scroll-typed query act. |
| Numbers | All from `src/data/projects.ts` via `src/data/roles.ts`. None invented. |

---

# v1 (16 Oct 2026, superseded)

**Self-authored under explicit creative delegation** ("redesign UI and deep think to make UI world class", 16 Oct 2026).
Seeded with decisions Kumar had already recorded for the rebuild; those are marked *(his)*. Everything else is an authored decision.

## The eight topics

| # | Topic | Answer |
|---|---|---|
| 1 | Vibe | Latent space at night. Precise, calm, then intense when it answers you. References: a planetarium dome, an instrument datasheet, an embedding projector's point cloud. |
| 2 | Journey | Who he is → his stack resolves out of noise → the visitor's own query → the work, ranked → the research result → four years in order → talk to him. |
| 3 | Energy | Quiet open, quiet hold, **loud at the query**, firm through the work, one held breath on the research number, brisk timeline, still close. |
| 4 | Feeling + one moment | See curve and peak below. |
| 5 | The one thing no other site does | You type the role you're hiring for and his work ranks itself against your query, like the retrieval systems he builds. |
| 6 | Range | Premium-minimal, edging into *dense* for the work list (information-forward, real numbers). |
| 7 | One world or scenes | Scenes. The field is one place for the first two beats, then the page cuts to records. |
| 8 | Assets | No photo or footage. The world is **computed**: a WebGL point field built from his real stack terms. Palette *(his)*: dark blue-black "Latent Space". Motion *(his)*: hero lines mask up on load, fade-in on scroll, 3D particle atmosphere. |

**Dropped from his earlier brief:** section snap scrolling. It jumps over pinned acts and fights a scroll-driven timeline.

## Visitor, belief, action

- **Who:** recruiters, hiring engineers, founders. 30 to 90 seconds.
- **Believe by the end:** he takes AI systems from research to production, and every number is checkable.
- **One action, one label:** `Start a conversation`.

## Grammar: Query index (new)

| | |
|---|---|
| Organising logic | The page is an index over one person's work. The visitor's query is the navigation. Sections are result sets, not chapters. |
| Nav | Slim bar. The distinctive part is the **query chip**: the visitor's active query rides in the nav on every page. |
| Hero | Name at composition scale over the field in its noise state. |
| Sequence | Field → query → ranked records → research → timeline → inquiry. |
| Close | An actual input. The visitor's query and top matches pre-fill the message. |
| Bans | `scrub` and all video, scrims (text is kept off dense field regions instead), `spotlight`, `magnet`, cards as page structure, invented numbers, eyebrows on more than one in three sections. |

Why the other seven lost: *filmic* has no reason here (no product film); *chaptered* is the old Engineering Editorial site; *live surface* bans the kinetic hero he asked for; *continuous world* needs a flown video world; *typographic poster* can't carry six case studies; *gallery* bans the kinetic hero and the single claim; *split stage* forces one side to win, but AI and SDE must weigh equally; *cutlist* is the wrong energy.

## Signature move

**The field answers your query.** Type a role ("backend, Postgres, real-time") or pick a preset. Matching stack terms turn amber and pull toward you, retrieval rays draw to them, and the six projects re-rank with the matched terms shown as the reason. The query then carries into the nav, the case studies and the contact message.
Honesty: BM25 over the text of the case studies, computed in the browser, with a small alias table. Labelled as such on the page.

**It's the site where** you type the job you're hiring for and his projects rank themselves against it.

## Feeling curve

| Act | Feeling | What causes it | Device |
|---|---|---|---|
| 1 Hero | Curiosity | Name lifts in line by line over a quiet field of unsorted points | load mask + fixed WebGL field |
| 2 Hold (silence) | Clarity | Scroll condenses the noise into three named clusters: AI, Software, Data. Almost no copy. | bespoke, page-scroll driven |
| 3 Query **(peak)** | Agency | Scroll types a sample query, or you type yours; the field re-forms around it | `pin` span 2.6, `cue` |
| 4 Work | Confidence | Six records land, ranked, with real numbers | `flow` + `in`, FLIP re-rank |
| 5 Research | Respect | Over-search falls from 27 to 2.3 per 100 queries as lit cells go dark | `pin` + `count` + `reveal` |
| 6 Timeline | Momentum | 2023 to now travels sideways | `pan` |
| 7 Close | Resolve | Your query becomes the first line of a message to him | `flow` + `in`, real form |

**Peak:** "I typed what we're hiring for and his whole stack lit up and ranked his projects for me." Act 3, largest span on the page.
**Authored silence:** the end of act 2, roughly 0.3 viewport of labelled field and no copy, directly before the query rises. Not dead scroll.

## Layer contract (hero)

| Plane | What | Movement | Rule |
|---|---|---|---|
| Far | ~30% dust points on a distant shell | slowest rotation | never above 0.3 alpha behind the headline |
| Mid | term clouds | condense noise → cluster on scroll | cluster centres sit right of the headline on desktop |
| Focal | ~26 term nodes, real HTML labels | travel to data-derived positions | labels appear only after condensation |
| Near | ~40 large defocused points | strongest parallax, pass the camera on dolly | sparse, kept out of the headline box |
| Atmosphere | grain + ground drift | slow | no full-frame darkening |
| Type | h1, sub, two actions | stable, exits at 1x | full name readable at first paint |

Term positions are derived from the data: each term sits at the weighted mean of the domain anchors of the projects that use it, so FastAPI and Docker drift toward the middle.

## Score totals

Acts 7 · ~9.5 viewport-heights on desktop · device families: kinetic-on-load, pin, cue, flow/in, count, reveal, pan, drift (8) · no family twice in a row · 0 scrub.

## Verification (16 Oct 2026)

| Check | Result |
|---|---|
| Harness, desktop 1440×900 | No dead scroll. All cues ≥ 4.5:1 at worst frame. 29 samples. |
| Harness, phone 390×844 | Same. 13.3vh. Research act re-laid out (figure first) after the first pass cut the grid off. |
| Harness, reduced motion | Same. First pass hid the hero subline and buttons (fade keyframe faded 0 → 0), and the timeline pin was dead scroll; both fixed. |
| No WebGL | Canvas 2D fallback draws the same scene from the same math. |
| Query carry-over | Typed query → nav chip → case study ("ranks this 1 of 6", matched words marked) → contact message pre-filled. |
| Keyboard | Logical tab order; "/" jumps to and focuses the search; hidden wordmark becomes visible on focus. |
| Not verified | A real phone (iOS Safari, Android Chrome), a real GPU at 60fps, the live Web3Forms send. |

## Feel check (cold scroll, one word per act)

Curiosity · clarity · **agency** · confidence · respect · momentum · resolve. Matches the intended curve. Changes made after it: labels in the field collided at the silence moment (now placed greedily, collisions fade out), and hit labels were unreadable inside amber clusters (now on a knocked-out ground).
