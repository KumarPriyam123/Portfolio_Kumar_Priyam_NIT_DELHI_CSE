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

`ThemeContext.tsx` manages dark/light mode. On mount it reads `localStorage` (key `"theme"`), falls back to `prefers-color-scheme`. It applies `dark` class to `<html>` and sets `colorScheme`. Default is `'dark'`. The `<html>` tag has `suppressHydrationWarning` to avoid SSR/client mismatch on the class.

All pages use `'use client'` — there are no Server Components.

### Styling conventions

- **Accent palette**: emerald (primary), indigo (secondary), zinc (neutrals)
- **Dark mode**: all elements carry both light and `dark:` variants via Tailwind
- **Typography**: `font-mono` = Fira Code, `font-sans` = Inter (configured in `tailwind.config.ts`)
- **Terminal aesthetic**: monospace section labels use `// SCREAMING_SNAKE` style (e.g. `// SYSTEM_PROFILE`)
- The `darkMode: 'class'` strategy is set in `tailwind.config.ts`

### Layout shell

`src/app/layout.tsx` wraps every page in `ThemeProvider → Navigation → <main> → Footer`. Metadata (title template, OG tags, keywords) is defined here.

### Resume links (hardcoded)

Two Google Drive resume URLs appear in multiple files:
- **Data Engineering**: `https://drive.google.com/file/d/1XJmW1XJ5lQ17fY251xmbZpC3lzsZgviR/view`
- **SDE + GenAI**: `https://drive.google.com/file/d/1sDOkbyz0YaCgN3EzVKoCykDRa7ZAyBo9/view`

These are repeated in `page.tsx`, `profile/page.tsx`, and `connect/page.tsx`. Update all three when the resume changes.
