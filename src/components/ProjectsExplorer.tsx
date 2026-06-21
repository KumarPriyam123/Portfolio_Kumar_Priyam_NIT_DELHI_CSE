'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/data/projects';

const categories = [
  { label: 'All', value: 'all' as const },
  { label: 'Data Engineering', value: 'data-engineering' as const },
  { label: 'AI Research', value: 'ai-research' as const },
  { label: 'Full-Stack', value: 'fullstack' as const },
];

const categoryLabel: Record<string, string> = {
  'data-engineering': 'Data Engineering',
  'ai-research': 'AI Research',
  fullstack: 'Full-Stack',
};

/* ── Shared detail body (master-detail pane + mobile accordion) ── */
function ProjectDetail({ project }: { project: Project }) {
  const rows = [
    { label: 'Problem', body: project.problem, accent: false },
    { label: 'Approach', body: project.approach, accent: true },
    { label: 'Outcome', body: project.outcome, accent: false },
  ];

  return (
    <div>
      <dl className="divide-y divide-rule border-y border-rule">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-1 gap-1.5 py-4 sm:grid-cols-12 sm:gap-4">
            <dt className={`font-mono text-[10px] uppercase tracking-[0.18em] sm:col-span-3 ${r.accent ? 'text-accent' : 'text-faint'}`}>
              {r.label}
            </dt>
            <dd className={`sm:col-span-9 text-[14.5px] leading-relaxed ${r.accent ? 'text-ink' : 'text-muted'}`}>
              {r.body}
            </dd>
          </div>
        ))}
      </dl>

      {/* Drill-down: highlights accordion */}
      {project.highlights && project.highlights.length > 0 && (
        <details className="group mt-4 border-b border-rule pb-4">
          <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink marker:hidden">
            <span>Technical highlights ({project.highlights.length})</span>
            <span className="text-accent transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
              +
            </span>
          </summary>
          <ul className="mt-1 space-y-2.5">
            {project.highlights.map((h, i) => (
              <li key={i} className="grid grid-cols-12 gap-2 text-[13.5px] leading-relaxed text-muted">
                <span className="col-span-1 font-mono text-[10px] text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="col-span-11">{h}</span>
              </li>
            ))}
          </ul>
        </details>
      )}

      {/* Actions */}
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
        <Link href={`/projects/${project.slug}`} className="text-ink link-underline">
          Full case study →
        </Link>
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-accent">
            Source ↗
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-accent">
            Live ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<Project['category'] | 'all'>('all');
  const [selectedSlug, setSelectedSlug] = useState<string>(projects[0]?.slug ?? '');
  const [openMobile, setOpenMobile] = useState<string>(projects[0]?.slug ?? '');

  const filtered = useMemo(
    () =>
      activeCategory === 'all'
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [projects, activeCategory]
  );

  const selected =
    filtered.find((p) => p.slug === selectedSlug) ?? filtered[0];

  const onFilter = (value: Project['category'] | 'all') => {
    setActiveCategory(value);
    const next = value === 'all' ? projects : projects.filter((p) => p.category === value);
    if (next[0]) {
      setSelectedSlug(next[0].slug);
      setOpenMobile(next[0].slug);
    }
  };

  return (
    <div>
      {/* Filter */}
      <div
        className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-rule pb-4"
        role="tablist"
        aria-label="Filter projects by category"
      >
        {categories.map((cat) => (
          <button
            key={cat.value}
            role="tab"
            aria-selected={activeCategory === cat.value}
            onClick={() => onFilter(cat.value)}
            className={`font-mono text-[12px] uppercase tracking-[0.14em] transition-colors ${
              activeCategory === cat.value ? 'text-accent' : 'text-muted hover:text-ink'
            }`}
          >
            <span className={activeCategory === cat.value ? 'link-underline' : ''}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>

      {/* ── Desktop: master-detail ── */}
      <div className="hidden gap-10 md:grid md:grid-cols-12">
        {/* Master list */}
        <ul className="md:col-span-5" role="tablist" aria-label="Projects" aria-orientation="vertical">
          {filtered.map((p, i) => {
            const active = selected?.slug === p.slug;
            return (
              <li key={p.slug}>
                <button
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedSlug(p.slug)}
                  className={`group w-full border-b border-rule py-6 pl-4 pr-2 text-left transition-colors ${
                    active ? 'border-l-2 border-l-accent bg-surface' : 'border-l-2 border-l-transparent hover:bg-surface/60'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-[10px] text-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                      {categoryLabel[p.category]}
                    </span>
                  </div>
                  <h3 className={`mt-2 font-display text-xl font-light tracking-tight transition-colors ${active ? 'text-accent' : 'text-ink group-hover:text-accent'}`}>
                    {p.title}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-[13.5px] text-muted">
                    {p.description}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Detail pane (sticky, self-scrolling) */}
        <div className="md:col-span-7">
          {selected && (
            <div
              key={selected.slug}
              className="reveal-fade sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1"
              aria-live="polite"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {categoryLabel[selected.category]}
              </span>
              <h2 className="mt-3 font-display text-3xl font-light leading-[1.08] tracking-tight text-ink">
                {selected.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {selected.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                {selected.tags.map((t) => (
                  <span key={t} className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <ProjectDetail project={selected} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile: accordion ── */}
      <ul className="md:hidden">
        {filtered.map((p, i) => {
          const open = openMobile === p.slug;
          return (
            <li key={p.slug} className="border-b border-rule">
              <button
                onClick={() => setOpenMobile(open ? '' : p.slug)}
                aria-expanded={open}
                className="flex w-full items-start justify-between gap-3 py-5 text-left"
              >
                <span>
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                      {categoryLabel[p.category]}
                    </span>
                  </span>
                  <span className={`mt-1.5 block font-display text-2xl font-light tracking-tight ${open ? 'text-accent' : 'text-ink'}`}>
                    {p.title}
                  </span>
                  {!open && (
                    <span className="mt-1 block line-clamp-1 text-[13.5px] text-muted">
                      {p.description}
                    </span>
                  )}
                </span>
                <span className={`mt-1 font-mono text-accent transition-transform duration-300 ${open ? 'rotate-45' : ''}`} aria-hidden="true">
                  +
                </span>
              </button>
              {open && (
                <div className="pb-7">
                  <p className="text-[15px] leading-relaxed text-muted">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5">
                    <ProjectDetail project={p} />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
