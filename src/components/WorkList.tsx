'use client';

// The work as ranked records. Ranked by the visitor's query when there is one
// (with the matched terms shown as the reason), curated order otherwise.
// Re-ranks animate with FLIP: transform only, under 300ms.

import Link from 'next/link';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { Project } from '@/data/projects';
import { rank } from '@/lib/search';
import { clearQuery, setQuery, useQuery } from '@/lib/query-store';
import { splitTitle } from '@/lib/site';

const CATEGORY: Record<Project['category'], string> = {
  fullstack: 'Full-Stack + AI',
  'ai-research': 'AI Research',
  'data-engineering': 'Data Engineering',
};
const FILTERS: { value: Project['category'] | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'fullstack', label: 'Full-Stack + AI' },
  { value: 'ai-research', label: 'AI Research' },
  { value: 'data-engineering', label: 'Data Engineering' },
];

export default function WorkList({ variant, headingId }: { variant: 'home' | 'index'; headingId: string }) {
  const q = useQuery();
  const [filter, setFilter] = useState<Project['category'] | 'all'>('all');
  const { results, hasQuery, parsed } = useMemo(() => rank(q.text), [q.text]);
  const shown = results.filter((r) => filter === 'all' || r.project.category === filter);
  const matchSet = useMemo(() => new Set(results.flatMap((r) => r.matched.map((m) => m.toLowerCase()))), [results]);

  // FLIP
  const rows = useRef(new Map<string, HTMLLIElement>());
  const prev = useRef(new Map<string, number>());
  const orderKey = shown.map((r) => r.project.slug).join('|');
  useLayoutEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    rows.current.forEach((el, slug) => {
      const top = el.getBoundingClientRect().top;
      const was = prev.current.get(slug);
      if (!reduce && was !== undefined && Math.abs(was - top) > 1) {
        el.style.transition = 'none';
        el.style.transform = `translate3d(0, ${was - top}px, 0)`;
        requestAnimationFrame(() => {
          el.style.transition = 'transform 280ms cubic-bezier(0.23, 1, 0.32, 1)';
          el.style.transform = '';
        });
      }
    });
    const next = new Map<string, number>();
    rows.current.forEach((el, slug) => next.set(slug, el.getBoundingClientRect().top));
    prev.current = next;
  }, [orderKey]);

  const tagMatches = (tag: string) => {
    const t = tag.toLowerCase();
    for (const m of matchSet) if (m.length > 2 && t.includes(m)) return true;
    return false;
  };

  return (
    <div>
      <div className="kp-work__head">
        <div>
          <h2 id={headingId} className={variant === 'home' ? 'kp-display kp-h1' : 'kp-display kp-h1'}>
            {variant === 'home' ? 'The work' : 'Projects'}
          </h2>
          <p className="kp-work__status" aria-live="polite">
            {hasQuery ? (
              <>
                <span>
                  Ranked for <q>{q.text.trim()}</q>
                  {q.source === 'demo' && <span> (sample)</span>}
                </span>
                <span className="kp-mono">
                  {parsed.direct.length + parsed.expanded.length} terms · {results.length} projects · BM25
                </span>
                <button type="button" className="kp-clear" onClick={clearQuery}>
                  Clear
                </button>
              </>
            ) : (
              <span>Six systems, in the order I would walk you through them. Search to re-rank.</span>
            )}
          </p>
        </div>
        <form
          className="kp-search kp-search--sm w-full md:w-[22rem]"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0 text-soft">
            <circle cx="7.5" cy="7.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11.6 11.6 16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <label htmlFor={`${headingId}-q`} className="sr-only">
            Rank projects by role or stack
          </label>
          <input
            id={`${headingId}-q`}
            type="search"
            autoComplete="off"
            spellCheck={false}
            placeholder="Rank by role or stack"
            value={q.source === 'user' ? q.text : ''}
            onChange={(e) => setQuery(e.target.value, 'user')}
          />
        </form>
      </div>

      {variant === 'index' && (
        <div className="kp-filters" role="group" aria-label="Filter by category">
          {FILTERS.map((f) => (
            <button key={f.value} type="button" className="kp-preset" aria-pressed={filter === f.value} onClick={() => setFilter(f.value)}>
              {f.label}
            </button>
          ))}
        </div>
      )}

      <ol className="kp-rows" data-sc-in={variant === 'home' ? '' : undefined}>
        {shown.map((r, i) => {
          const p = r.project;
          const { name, sub } = splitTitle(p.title);
          return (
            <li
              key={p.slug}
              className="kp-row"
              ref={(el) => {
                if (el) rows.current.set(p.slug, el);
                else rows.current.delete(p.slug);
              }}
            >
              <span className="kp-row__rank">{String(i + 1).padStart(2, '0')}</span>
              <div className="min-w-0">
                <Link href={`/projects/${p.slug}`} className="kp-row__title">
                  {name}
                </Link>
                <span className="kp-row__subtitle">{sub ?? CATEGORY[p.category]}</span>
                <p className="kp-row__desc">{p.description}</p>
                <p className="kp-tags">
                  {p.tags.map((t) => (
                    <span key={t} className={hasQuery && tagMatches(t) ? 'is-match' : undefined}>
                      {t}
                    </span>
                  ))}
                </p>
              </div>
              {p.metrics && (
                <dl className="kp-metrics">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="sr-only">{m.label}</dt>
                      <dd className="kp-metric__v">{m.value}</dd>
                      <dd className="kp-metric__l" aria-hidden="true">
                        {m.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              <div className="kp-row__side">
                {hasQuery ? (
                  <>
                    <span className="kp-row__rel">{r.score > 0 ? `relevance ${Math.round(r.rel * 100)}` : 'no match'}</span>
                    <span className="kp-bar" aria-hidden="true">
                      <i style={{ ['--rel' as string]: r.rel.toFixed(3) }} />
                    </span>
                    {r.matched.length > 0 && <span className="kp-mono text-accent">{r.matched.slice(0, 3).join(' · ')}</span>}
                  </>
                ) : (
                  <span className="kp-row__rel">{CATEGORY[p.category]}</span>
                )}
                <span className="kp-row__links">
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
