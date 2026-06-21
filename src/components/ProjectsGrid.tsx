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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col bg-paper p-6 transition-colors hover:bg-surface sm:p-7"
    >
      {/* Index + category */}
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[10px] text-faint">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
          {categoryLabel[project.category]}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-4 font-display text-xl font-light leading-snug tracking-tight text-ink transition-colors group-hover:text-accent">
        {project.title}
      </h3>

      {/* Summary */}
      <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-muted">
        {project.description}
      </p>

      {/* Impact metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.metrics.map((m) => (
            <span
              key={m.label}
              className="inline-flex items-baseline gap-1.5 border border-rule px-2 py-1"
            >
              <span className="font-display text-[15px] font-normal leading-none text-ink">
                {m.value}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-faint">
                {m.label}
              </span>
            </span>
          ))}
        </div>
      )}

      {/* Tags */}
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
        {project.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Affordance */}
      <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors group-hover:text-accent">
        Case study
        <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] =
    useState<Project['category'] | 'all'>('all');

  const filtered = useMemo(
    () =>
      activeCategory === 'all'
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [projects, activeCategory]
  );

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
            onClick={() => setActiveCategory(cat.value)}
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

      {/* Card grid — hairline editorial grid */}
      <div className="reveal-fade grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </div>
  );
}
