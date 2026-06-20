# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build (type-checks + emits)
npm run lint     # ESLint via next lint
npm run start    # Serve the production build
```

There is no test suite. Type-checking is implicit in `npm run build`.

## Architecture

This is a **Next.js 15 App Router** portfolio site (React 19, TypeScript, Tailwind CSS v3). There is no backend — all content is static data, all pages are client components.

**Two separate artifacts live in this repo:**
- The Next.js app under `src/` — the primary, multi-page portfolio
- `portfolio.html` — a standalone self-contained single-file version (inline CSS + JS, no build step, open directly in a browser)

### Data layer

All site content lives in `src/data/`:
- `projects.ts` — exports a typed `Project[]` array plus `getProjectBySlug()` and `getProjectsByCategory()` helpers. Adding a project means appending to this array; the projects list page and the dynamic detail page both read from it automatically.
- `research.ts` — exports `ResearchPaper[]` with the same pattern.

No API calls, no CMS, no database. Pages import from `src/data/` directly.

### Routing

| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | Hero, highlight cards, stats, resume modal |
| `/profile` | `src/app/profile/page.tsx` | Bio, education, skills grid, resume downloads |
| `/projects` | `src/app/projects/page.tsx` | Filtered project cards |
| `/projects/[slug]` | `src/app/projects/[slug]/page.tsx` | Dynamic detail via `useParams()` + `getProjectBySlug()` |
| `/research` | `src/app/research/page.tsx` | Research card listing |
| `/research/marl-maps` | `src/app/research/marl-maps/page.tsx` | Static MARL-MAPS deep-dive |
| `/connect` | `src/app/connect/page.tsx` | Contact form + social links |

### Theme system

`ThemeContext.tsx` manages dark/light mode. On mount it reads `localStorage` (key `"theme"`), falls back to `prefers-color-scheme`. It applies `dark` class to `<html>` and sets `colorScheme`. Default is `'light'` (the editorial design is light-primary; dark is a warm-ink variant). The `<html>` tag has `suppressHydrationWarning` to avoid SSR/client mismatch on the class.

All pages use `'use client'` except `research/page.tsx` (server component with exported `metadata`) — most pages are client components.

### Styling conventions ("Engineering Editorial" design system)

- **Semantic colors via CSS variables** — the theme is defined once in `globals.css` as `:root` / `.dark` custom properties (`--paper --surface --ink --muted --faint --rule --accent`) and exposed as Tailwind colors in `tailwind.config.ts` (`bg-paper text-ink border-rule text-accent` …). **Do NOT use literal `zinc-`/`emerald-` classes or `dark:` variants** — the variables flip automatically on `.dark`, so every element is themed with a single set of classes.
- **Accent**: terracotta/vermilion (`--accent`), one accent only — used sparingly.
- **Typography**: `font-display` = Fraunces (serif headings), `font-serif` = Newsreader (body, default on `<body>`), `font-mono` = JetBrains Mono (labels/meta). Loaded via Google Fonts `<link>` in `layout.tsx`.
- **Editorial primitives** in `globals.css` `@layer components`: `.eyebrow` (mono uppercase kicker), `.link-underline` (animated underline), `.dropcap` (first-letter), plus `.reveal`/`.reveal-fade`/`.draw-line` staggered load animations with `.delay-1`…`.delay-6`. A `.grain` overlay sits on `<body>`.
- Section labels read like editorial kickers (`Section 01 — Profile`), not terminal `// SNAKE_CASE`.
- The `darkMode: 'class'` strategy is set in `tailwind.config.ts`. `max-w-editorial` is the standard page width.
- `SectionHeader.tsx` is unused dead code (still on the old palette); ignore it.

### Layout shell

`src/app/layout.tsx` wraps every page in `ThemeProvider → Navigation → <main> → Footer`. Metadata (title template, OG tags, keywords) is defined here.

### Resume links (hardcoded)

Two Google Drive resume URLs appear in multiple files (each page defines a local `RESUMES` constant):
- **AI + SDE**: `https://drive.google.com/file/d/1lPMTdrULT4iWPU5typRmVDVlBtF81wHf/view`
- **Data Engineering**: `https://drive.google.com/file/d/1XJmW1XJ5lQ17fY251xmbZpC3lzsZgviR/view`

These are repeated in `page.tsx` (résumé modal), `profile/page.tsx`, and `connect/page.tsx`. Update all three when the resume changes. The contact form on `/connect` posts to Web3Forms (access key inline in `connect/page.tsx`).
