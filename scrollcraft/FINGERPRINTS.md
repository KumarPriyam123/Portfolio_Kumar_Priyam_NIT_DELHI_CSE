# Fingerprints

Every site you build with **scroll-craft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| kpriyam (Oct 2026) | Query index (new): the visitor's query is the navigation | Slim bar + a query chip that carries the visitor's query across every page | Name at composition scale over a WebGL point field in its noise state; lines mask up on load | flow (hero + authored silence) > pin 2.6 (peak) > flow > pin 1.9 + count > pan 2.5 > flow; 7 beats, 11.7vh desktop | Real inquiry form pre-filled with the visitor's query and top matches; footer below | The field answers your query: matching stack terms turn amber, pull forward and draw rays from the input while the projects re-rank by BM25 | Computed: dark blue-black latent space, amber relevance | Next.js 15 app |

---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

- **Query index** grammar, and any "type your need, the page ranks itself" signature.
- A fixed WebGL point field that condenses noise into labelled clusters on scroll.
- A unit-grid figure whose cells go dark from `--sc-p` in step with a `count`.
- The query chip in the nav that carries state across pages.

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the scroll-craft repository. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.
