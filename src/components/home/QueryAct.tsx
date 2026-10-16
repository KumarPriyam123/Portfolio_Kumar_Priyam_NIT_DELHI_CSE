'use client';

// The peak. A pinned act where the visitor's query re-forms the field and
// ranks the work. Until the visitor touches it, the scroll types a sample query
// so the mechanism is visible without any effort; the moment they focus the
// input or pick a preset, the scroll lets go and their query is the one that
// travels (nav chip, case studies, contact message).

import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { DEMO_QUERY, PRESETS, rank } from '@/lib/search';
import { getQuery, setQuery, useQuery } from '@/lib/query-store';
import { splitTitle } from '@/lib/site';

const SPAN = 2.6;

export default function QueryAct() {
  const q = useQuery();
  const touched = useRef(false);
  const actRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { results, hasQuery } = useMemo(() => rank(q.text), [q.text]);
  // With a query, only projects that actually matched are listed.
  const top = hasQuery ? results.filter((r) => r.score > 0).slice(0, 3) : results.slice(0, 3);

  // A query the visitor chose earlier in the session wins over the sample.
  useEffect(() => {
    if (getQuery().source === 'user') touched.current = true;
  }, []);

  // Scroll types the sample query, letter by letter, across p 0.1 to 0.48.
  useEffect(() => {
    const el = actRef.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      if (touched.current) return;
      const r = el.getBoundingClientRect();
      const travel = Math.max(r.height - innerHeight, 1);
      const p = Math.min(1, Math.max(0, -r.top / travel));
      const x = Math.min(1, Math.max(0, (p - 0.1) / 0.38));
      // Half-typed tokens simply match nothing, so the ranking only moves when
      // a whole term lands.
      const text = DEMO_QUERY.slice(0, Math.round(DEMO_QUERY.length * x));
      const cur = getQuery();
      if (cur.source !== 'user' && cur.text !== text) setQuery(text, text ? 'demo' : 'none');
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    addEventListener('scroll', on, { passive: true });
    on();
    return () => {
      removeEventListener('scroll', on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // "/" focuses the search from anywhere on the home page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key !== '/' || t.closest('input, textarea, [contenteditable]')) return;
      e.preventDefault();
      const el = actRef.current;
      if (el) {
        // Land inside the pin, where the panel is fully lit.
        const travel = Math.max(el.offsetHeight - innerHeight, 1);
        scrollTo({ top: el.offsetTop + travel * 0.55, behavior: 'instant' as ScrollBehavior });
      }
      touched.current = true;
      inputRef.current?.focus({ preventScroll: true });
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);

  const take = () => {
    touched.current = true;
  };

  return (
    <section
      id="query"
      ref={actRef}
      className="kp-query"
      data-sc-act="pin"
      data-sc-span={SPAN}
      data-sc-drift="#080c14"
      style={{ height: `${SPAN * 100}vh` }}
      aria-labelledby="query-title"
    >
      {/* In-page links land here: inside the pin, where the panel is already lit. */}
      <span id="search" aria-hidden="true" style={{ position: 'absolute', top: '32vh', left: 0 }} />
      <div className="sc-stage kp-query__stage" data-sc-stage>
        <div className="kp-query__inner">
          {/* Fades in over the first 10% of the act and holds until the end. */}
          <div id="query-panel" className="kp-query__panel" data-sc-cue="0 1 0.1 0.04">
            <h2 id="query-title" className="kp-display">
              What are you hiring for?
            </h2>
            <p className="kp-query__intro">Type a role or a stack. My work ranks itself against your query, the way the retrieval systems I build rank documents.</p>

            <form
              id="query-search"
              className="kp-search"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                take();
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0 text-soft">
                <circle cx="7.5" cy="7.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11.6 11.6 16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <label htmlFor="query-input" className="sr-only">
                Search Kumar&apos;s work by role or stack
              </label>
              <input
                ref={inputRef}
                id="query-input"
                type="search"
                autoComplete="off"
                spellCheck={false}
                placeholder="e.g. backend, Postgres, real-time"
                value={q.text}
                onFocus={(e) => {
                  if (getQuery().source === 'demo') e.currentTarget.select();
                  take();
                }}
                onChange={(e) => {
                  take();
                  setQuery(e.target.value, 'user');
                }}
              />
              <span className="kp-kbd hidden sm:inline" aria-hidden="true">
                /
              </span>
              <button type="submit" className="kp-btn kp-btn--ghost kp-btn--sm">
                Rank
              </button>
            </form>

            <div className="kp-presets" role="group" aria-label="Example queries">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  className="kp-preset"
                  aria-pressed={q.source === 'user' && q.text === p}
                  onClick={() => {
                    take();
                    setQuery(p, 'user');
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="kp-top" aria-live="polite">
              <div className="kp-top__head">
                <p className="kp-label">{hasQuery ? 'Best matches' : 'Selected work'}</p>
                <p className="kp-mono text-soft">{q.source === 'demo' ? 'sample query' : hasQuery ? `${results.filter((r) => r.score > 0).length} of ${results.length} matched` : 'curated order'}</p>
              </div>
              {hasQuery && top.length === 0 && <p className="mt-3 text-sm text-soft">Nothing in my case studies mentions that yet. Try a role, or a stack like FastAPI or Postgres.</p>}
              <ol>
                {top.map((r, i) => {
                  const { name } = splitTitle(r.project.title);
                  return (
                    <li key={r.project.slug}>
                      <span className="kp-mono text-soft">{String(i + 1).padStart(2, '0')}</span>
                      <span className="min-w-0">
                        <Link href={`/projects/${r.project.slug}`} className="kp-top__name hover:text-accent">
                          {name}
                        </Link>
                        {hasQuery && r.matched.length > 0 && <span className="kp-top__why">{r.matched.join(' · ')}</span>}
                        {!hasQuery && <span className="kp-top__why text-soft" style={{ color: 'var(--sc-ink-soft)' }}>{r.project.tags.slice(0, 3).join(' · ')}</span>}
                      </span>
                      <span className="kp-bar" aria-hidden="true">
                        <i style={{ ['--rel' as string]: hasQuery ? r.rel.toFixed(3) : 0 }} />
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
            <p className="kp-note">BM25 over the text of my case studies, computed in your browser, with a small alias table for role words. Nothing you type leaves this page.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
