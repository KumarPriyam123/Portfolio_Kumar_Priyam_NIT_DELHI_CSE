'use client';

// The work, mixed on purpose: software, AI and data projects share one grid,
// each card tagged with the crafts it shows. Filter by craft, or search by
// stack (BM25 over the case studies, in the browser) to re-rank. Re-ranks
// animate with FLIP, transform only.

import Link from 'next/link';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { PROJECT_ROLES, type RoleId } from '@/data/roles';
import { rank } from '@/lib/search';
import { clearQuery, setQuery, useQuery } from '@/lib/query-store';
import { splitTitle } from '@/lib/site';
import RoleBadges from '@/components/RoleBadges';
import ProjectGlyph from '@/components/art/ProjectGlyph';

type Filter = RoleId | 'all';
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'sde', label: 'Software' },
  { id: 'ai', label: 'AI' },
  { id: 'data', label: 'Data' },
];
// Column spans on a 12-column grid, by how many cards are showing.
const SPANS: Record<number, number[]> = {
  1: [12],
  2: [6, 6],
  3: [4, 4, 4],
  4: [7, 5, 5, 7],
  5: [7, 5, 4, 4, 4],
  6: [7, 5, 5, 7, 6, 6],
};

export default function WorkGrid({ variant, headingId }: { variant: 'home' | 'index'; headingId: string }) {
  const q = useQuery();
  const [filter, setFilter] = useState<Filter>('all');
  const { results, hasQuery } = useMemo(() => rank(q.text), [q.text]);
  const shown = results.filter((r) => filter === 'all' || (PROJECT_ROLES[r.project.slug] ?? []).includes(filter));
  const spans = SPANS[shown.length] ?? [];

  const cards = useRef(new Map<string, HTMLLIElement>());
  const prev = useRef(new Map<string, DOMRect>());
  const orderKey = shown.map((r) => r.project.slug).join('|');
  useLayoutEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    cards.current.forEach((el, slug) => {
      const now = el.getBoundingClientRect();
      const was = prev.current.get(slug);
      if (!reduce && was && (Math.abs(was.top - now.top) > 1 || Math.abs(was.left - now.left) > 1)) {
        el.style.transition = 'none';
        el.style.transform = `translate3d(${was.left - now.left}px, ${was.top - now.top}px, 0)`;
        requestAnimationFrame(() => {
          el.style.transition = 'transform 320ms cubic-bezier(0.23, 1, 0.32, 1)';
          el.style.transform = '';
        });
      }
    });
    const next = new Map<string, DOMRect>();
    cards.current.forEach((el, slug) => next.set(slug, el.getBoundingClientRect()));
    prev.current = next;
  }, [orderKey]);

  const spot = (e: React.PointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div>
      <div className="kp-work__head">
        <div>
          <h2 id={headingId} className="kp-display kp-h1">
            {variant === 'home' ? 'Selected work' : 'Projects'}
          </h2>
          <p className="kp-work__status" aria-live="polite">
            {hasQuery ? (
              <>
                <span>
                  Ranked for <q>{q.text.trim()}</q>
                </span>
                <span className="kp-mono">BM25 over the case studies</span>
                <button type="button" className="kp-clear" onClick={clearQuery}>
                  Clear
                </button>
              </>
            ) : (
              <span>Six systems across software, AI and data. Most of them are more than one.</span>
            )}
          </p>
        </div>
        <div className="kp-work__tools">
          <div className="kp-seg" role="group" aria-label="Filter by craft">
            {FILTERS.map((f) => (
              <button key={f.id} type="button" className="kp-seg__b" data-for={f.id} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.id !== 'all' && <i aria-hidden="true" />}
                {f.label}
              </button>
            ))}
          </div>
          <form className="kp-search kp-search--sm" role="search" onSubmit={(e) => e.preventDefault()}>
            <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0 text-soft">
              <circle cx="7.5" cy="7.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11.6 11.6 16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <label htmlFor={`${headingId}-q`} className="sr-only">
              Search projects by role or stack
            </label>
            <input
              id={`${headingId}-q`}
              type="search"
              autoComplete="off"
              spellCheck={false}
              placeholder="Search: backend, RAG, Postgres"
              value={q.source === 'user' ? q.text : ''}
              onChange={(e) => setQuery(e.target.value, 'user')}
            />
          </form>
        </div>
      </div>

      <ol className="kp-grid" data-sc-in={variant === 'home' ? '' : undefined}>
        {shown.map((r, i) => {
          const p = r.project;
          const { name, sub } = splitTitle(p.title);
          const primary = (PROJECT_ROLES[p.slug] ?? ['sde'])[0];
          const miss = hasQuery && r.score === 0;
          return (
            <li
              key={p.slug}
              className="kp-card"
              data-for={primary}
              data-miss={miss ? 'true' : undefined}
              style={{ ['--span' as string]: spans[i] ?? 6 }}
              onPointerMove={spot}
              ref={(el) => {
                if (el) cards.current.set(p.slug, el);
                else cards.current.delete(p.slug);
              }}
            >
              <div className="kp-card__top">
                <RoleBadges slug={p.slug} />
                <ProjectGlyph slug={p.slug} />
              </div>
              <h3 className="kp-card__h">
                <Link href={`/projects/${p.slug}`} className="kp-card__title">
                  {name}
                </Link>
              </h3>
              {sub && <p className="kp-card__sub">{sub}</p>}
              <p className="kp-card__desc">{p.description}</p>
              {p.metrics && (
                <dl className="kp-card__metrics">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="sr-only">{m.label}</dt>
                      <dd className="kp-card__mv">{m.value}</dd>
                      <dd className="kp-card__ml" aria-hidden="true">
                        {m.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              <div className="kp-card__foot">
                {hasQuery ? (
                  <span className="kp-card__why kp-mono">{r.matched.length ? `matched ${r.matched.slice(0, 3).join(' · ')}` : 'no match'}</span>
                ) : (
                  <p className="kp-card__tags kp-mono">{p.tags.slice(0, 4).join(' · ')}</p>
                )}
                <span className="kp-card__links">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name}, live site`}>
                      Live ↗
                    </a>
                  )}
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name}, source on GitHub`}>
                      Code ↗
                    </a>
                  )}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
