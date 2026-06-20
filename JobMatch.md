# JobMatch — Semantic Job-Matching Platform

> A multi-user web app that ranks remote jobs against your résumé using vector
> embeddings, with an automated nightly ingestion-and-digest pipeline — built on
> FastAPI, Next.js, Supabase/pgvector, and Google Gemini, self-hosted behind a
> Cloudflare Tunnel on a custom domain.

**Live:** Web → `https://jobmatch.kpriyam.me/login`, `https://job-automation-orcin.vercel.app` · API → `https://api.kpriyam.me`
**Repo:** `github.com/KumarPriyam123/JobAutomation`

---

## One-liner

A multi-user semantic job-matching platform: upload your résumé, get remote jobs
ranked by meaning (not keywords) via Gemini vector embeddings and pgvector cosine
similarity, plus an automated daily ingestion pipeline and an opt-in nightly email
digest of your top matches.

## Short summary (project card)

JobMatch is a full-stack semantic job-matching platform. Users upload résumés, which
are converted to 768-dimension Gemini embeddings and matched against a continuously
ingested pool of remote jobs via pgvector cosine similarity. An n8n automation pulls
fresh listings from multiple job APIs every morning, and an opt-in nightly digest
emails each user their top matches. The backend (FastAPI) runs in Docker on a
DigitalOcean droplet, exposed through a Cloudflare Tunnel at `api.kpriyam.me`, with the
Next.js frontend on Vercel. Auth and per-user data isolation are enforced end-to-end
with Supabase Auth (asymmetric ES256 JWTs) and Postgres Row-Level Security.

---

## Overview

**JobMatch** solves a real problem in a job search: relevance. Keyword job boards flood
you with noise, while the jobs that actually fit your experience get buried. JobMatch
treats matching as a **semantic retrieval problem** — it embeds both résumés and job
descriptions into the same vector space and ranks every job by cosine similarity to
your résumé, so "fit" is measured by meaning, not keyword overlap.

The project began as a single-user n8n job-application pipeline and was re-architected
into a **multi-tenant product** with authentication, per-user data isolation, a real web
UI, and an automated ingestion + notification backbone.

## How it works (end to end)

1. **Ingestion (automated, daily 07:00 IST).** An n8n workflow queries multiple
   legitimate job feeds — **Adzuna** (primary volume) and **RemoteOK** — across three
   role tracks (Data Engineering, AI/ML, SDE). A Code node normalizes every posting to a
   common shape, strips HTML, canonicalizes the URL, and computes a SHA-256 `url_hash`
   for deduplication. The batch is POSTed to the API over an internal Docker network,
   authenticated with a shared secret header.

2. **Embedding + storage.** The API embeds each job description with **Google Gemini
   (`gemini-embedding-001`, 768 dimensions, L2-normalized)** using the
   `RETRIEVAL_DOCUMENT` task type, and upserts into Supabase Postgres with
   `ON CONFLICT (url_hash) DO NOTHING` — so the same job is never processed or stored
   twice, ever.

3. **Résumé upload.** A signed-in user uploads a résumé (PDF/DOCX). The API extracts
   text, embeds it with the `RETRIEVAL_QUERY` task type (the query side of retrieval),
   and stores it scoped to that user under Row-Level Security.

4. **Matching.** A cosine-similarity search (`pgvector`'s `<=>` operator over an
   `ivfflat` index) ranks every job in the pool against the user's résumé vector. Users
   can hold multiple résumés (one per target role); the ranking deduplicates to the
   **single best-fit résumé per job** via a `DISTINCT ON … ORDER BY score DESC` query, so
   each job appears once, attributed to whichever résumé scores it highest.

5. **Digest (automated, opt-in, nightly 21:00 IST).** A second n8n workflow calls a
   server-side `/digest` endpoint that returns each opted-in user's top-N matches joined
   to their email, builds a styled HTML table, and sends it via Gmail. Users control this
   with a **per-user toggle on the dashboard** — the email is strictly opt-in (off by
   default), enforced at the database query level.

## Key features

- **Semantic matching** over keyword search — embeddings capture meaning, so an
  "LLM/NLP Engineer" résumé matches relevant ML roles regardless of exact wording.
- **Multi-résumé support** with best-fit attribution — upload one résumé per role; each
  job is ranked by your strongest match.
- **Automated daily ingestion** from real job APIs with database-level deduplication.
- **Opt-in daily email digest** of top matches, controlled per user.
- **True multi-tenancy** — every row of user data is isolated by Postgres Row-Level
  Security, not just application code.
- **Human-in-the-loop by design** — nothing auto-applies; the product surfaces ranked
  jobs and the user applies themselves.

## Architecture

```
                      ┌─────────────────────────────┐
   Vercel             │  Next.js 15 (App Router)     │
   (frontend)         │  Tailwind v4 · dark-first UI │
                      └──────────────┬──────────────┘
                                     │ HTTPS + Supabase JWT (Bearer)
                                     ▼
   Cloudflare Tunnel  ┌─────────────────────────────┐
   api.kpriyam.me ───▶│  FastAPI (Python 3.13)       │
                      │  uvicorn · psycopg3 pool     │
                      │  JWKS/ES256 verify · RLS     │
                      └───────┬──────────────┬───────┘
                              │              │
              Gemini embeddings│              │ SQL (RLS-scoped)
                              ▼              ▼
                   ┌──────────────┐   ┌──────────────────────┐
                   │ Google Gemini│   │ Supabase Postgres     │
                   │ 768-d vectors│   │ + pgvector (ivfflat)  │
                   └──────────────┘   └──────────────────────┘
                                              ▲
   DigitalOcean droplet (Docker Compose)      │ ingest / digest (internal net)
   ┌───────────────────────────────────┐      │
   │  n8n  ── daily 07:00 ingest ───────┼──────┘
   │       ── nightly 21:00 digest ─────┼──▶ Gmail
   └───────────────────────────────────┘
        (Adzuna + RemoteOK feeds)
```

## Deployment & infrastructure

- **Backend** runs as a Docker container on a **DigitalOcean droplet**, defined in a
  multi-service **Docker Compose** stack (FastAPI + n8n + Postgres for n8n's own state).
- **Cloudflare Tunnel** exposes the API publicly at **`api.kpriyam.me`** (a custom `.me`
  domain) without opening any inbound ports on the droplet — the tunnel makes an
  outbound connection to Cloudflare's edge, which also provides TLS and DDoS protection.
  The API container binds only to loopback (`127.0.0.1:8000`); nothing else is
  internet-reachable.
- **Frontend** is deployed on **Vercel**, with `NEXT_PUBLIC_*` config inlined at build
  time and all server secrets kept server-side only.
- **n8n** (self-hosted in the same Compose stack) orchestrates both scheduled workflows
  and reaches the API over the internal Docker network. Server secrets live only in
  environment files and n8n credentials — never in workflow JSON or version control.

## Engineering challenges solved

These are the problems that made this more than a CRUD app:

- **Database-enforced multi-tenancy.** Rather than filtering by `user_id` in application
  code (easy to forget, easy to bypass), isolation is enforced by **Postgres Row-Level
  Security**. The API verifies the Supabase JWT, then opens a per-request transaction
  that sets `request.jwt.claims` and switches to the `authenticated` role with
  `SET LOCAL` — replicating exactly what Supabase's PostgREST layer does — so
  `auth.uid()` resolves inside the database and RLS policies guarantee a user can only
  ever touch their own rows. Verified live: user A sees their matches, user B sees zero.

- **Asymmetric JWT verification.** Auth uses Supabase's **ES256 (JWKS) signing**, with
  the API fetching and caching the public keyset from the `.well-known/jwks.json`
  endpoint and verifying tokens locally — no shared secret, no round-trip to the auth
  server per request.

- **pgvector schema isolation.** To avoid colliding with the retired pipeline's tables,
  all app tables live in a dedicated `jobmatch` schema, with the connection `search_path`
  pinned to include `extensions` (where Supabase installs the `vector` type) so the type
  and operators resolve correctly.

- **IPv6-only DB connectivity.** Supabase's direct database endpoint is IPv6-only, but
  the droplet had no IPv6 route — connections timed out. Diagnosed and fixed by switching
  to Supabase's **IPv4 session pooler**, and resolved a follow-on libpq parsing bug by
  URL-encoding special characters in the database password.

- **CORS errors that were actually 500s.** Unhandled server exceptions bypass Starlette's
  CORS middleware, so the browser mislabels them as CORS failures. Added a catch-all
  error middleware *inside* the CORS layer so every response — errors included — carries
  the right headers and surfaces the real status.

- **Idempotent, resumable pipeline.** Deduplication happens at the database level
  (`url_hash UNIQUE` + `ON CONFLICT DO NOTHING`), and the ingestion is driven by status,
  so a crashed or re-run job picks up cleanly and never double-processes or double-emails.

## Tech stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn-style components, deployed on Vercel |
| **Backend** | FastAPI, Python 3.13, uvicorn, psycopg3 + connection pooling, Pydantic |
| **Database** | Supabase (managed Postgres) + pgvector (`vector(768)`, `ivfflat` cosine index) |
| **Auth** | Supabase Auth, ES256 / JWKS JWT verification, Postgres Row-Level Security |
| **AI / Embeddings** | Google Gemini `gemini-embedding-001` (768-d, L2-normalized) |
| **Automation** | n8n (self-hosted) — scheduled ingestion + digest workflows |
| **Job sources** | Adzuna API, RemoteOK |
| **Infrastructure** | Docker / Docker Compose, DigitalOcean droplet, Cloudflare Tunnel, custom `.me` domain |
| **Notifications** | Gmail (OAuth2 via n8n) |

## Résumé bullets

- Built a multi-tenant semantic job-matching platform (Next.js + FastAPI + Supabase) that
  ranks jobs by **Gemini vector-embedding cosine similarity** over pgvector, isolating
  every user's data with Postgres **Row-Level Security** and asymmetric (ES256/JWKS) JWT
  auth.
- Designed an **idempotent, automated ingestion pipeline** in n8n pulling from multiple
  job APIs daily, with SHA-256 URL-hash deduplication enforced at the database level
  (`ON CONFLICT DO NOTHING`).
- Self-hosted the containerized backend on a DigitalOcean droplet behind a **Cloudflare
  Tunnel** on a custom domain — zero open inbound ports — with the frontend on Vercel.
- Shipped an **opt-in nightly email digest** of each user's top matches, controlled by a
  per-user toggle and enforced in the query layer.

## Notes & metrics

- First live ingestion pulled **72 real jobs** (67 from Adzuna, 5 from RemoteOK) into the
  shared pool.
- Embeddings are 768-dimensional and L2-normalized (verified norm ≈ 1.0).
- Matching, auth isolation, dedup, ingestion, and the email digest were each verified
  live end to end.

---

*Built by Kumar Priyam. Stack: Next.js · FastAPI · Supabase/pgvector · Google Gemini ·
n8n · Docker · Cloudflare Tunnel.*
