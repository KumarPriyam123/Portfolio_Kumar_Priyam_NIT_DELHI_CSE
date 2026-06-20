'use client';

import React from 'react';
import Link from 'next/link';

const categoryLabel: Record<string, string> = {
  'data-engineering': 'Data Engineering',
  'ai-research': 'AI Research',
  fullstack: 'Full-Stack',
};

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  problem: string;
  approach: string;
  outcome: string;
  githubUrl?: string;
  liveUrl?: string;
  slug: string;
  category: 'data-engineering' | 'ai-research' | 'fullstack';
}

export default function ProjectCard({
  title,
  description,
  tags,
  problem,
  approach,
  outcome,
  githubUrl,
  liveUrl,
  slug,
  category,
}: ProjectCardProps) {
  const label = categoryLabel[category] || categoryLabel.fullstack;

  return (
    <article className="group flex flex-col border border-rule bg-surface p-7 transition-colors duration-300 hover:border-accent sm:p-8">
      <header>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          {label}
        </span>
        <h3 className="mt-3 font-display text-2xl font-light tracking-tight text-ink">
          <Link href={`/projects/${slug}`} className="transition-colors group-hover:text-accent">
            {title}
          </Link>
        </h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
          {description}
        </p>
      </header>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5" aria-label="Technologies used">
        {tags.map((tag) => (
          <span key={tag} className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
            {tag}
          </span>
        ))}
      </div>

      <dl className="mt-6 space-y-4 border-t border-rule pt-5">
        <div>
          <dt className="eyebrow">Problem</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-muted">{problem}</dd>
        </div>
        <div>
          <dt className="eyebrow text-accent">Approach</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-muted">{approach}</dd>
        </div>
        <div>
          <dt className="eyebrow">Outcome</dt>
          <dd className="mt-1.5 border-l-2 border-accent pl-3 text-sm font-medium leading-relaxed text-ink">
            {outcome}
          </dd>
        </div>
      </dl>

      <footer className="mt-6 flex items-center gap-5 border-t border-rule pt-4 font-mono text-[11px] uppercase tracking-[0.14em]">
        <Link href={`/projects/${slug}`} className="text-ink link-underline">
          Read more
        </Link>
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-accent" aria-label={`${title} source on GitHub`}>
            Source ↗
          </a>
        )}
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-accent" aria-label={`${title} live demo`}>
            Live ↗
          </a>
        )}
      </footer>
    </article>
  );
}
