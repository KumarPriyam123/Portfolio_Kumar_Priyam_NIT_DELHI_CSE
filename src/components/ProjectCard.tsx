'use client';

import React from 'react';
import Link from 'next/link';

const categoryConfig: Record<string, { bg: string; text: string; label: string }> = {
  'data-engineering': { bg: 'bg-indigo-500/10', text: 'text-indigo-600 dark:text-indigo-400', label: 'Data Engineering' },
  'ai-research': { bg: 'bg-violet-500/10', text: 'text-violet-600 dark:text-violet-400', label: 'AI Research' },
  fullstack: { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', label: 'Full-Stack' },
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
  const cat = categoryConfig[category] || categoryConfig.fullstack;

  return (
    <article 
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700/80 dark:hover:shadow-zinc-950/50"
    >
      {/* Decorative top grid lines/cyber dots */}
      <div className="absolute right-3 top-3 flex gap-1" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-800"></span>
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-800"></span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80"></span>
      </div>

      <div>
        {/* Category Badge + Project Header */}
        <header className="mb-4">
          <span className={`inline-flex items-center rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold ${cat.bg} ${cat.text} mb-2`}>
            {cat.label}
          </span>
          <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
            <Link href={`/projects/${slug}`} className="hover:underline underline-offset-4">
              {title}
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        </header>

        {/* Tech Stack Tags */}
        <div className="mb-6 flex flex-wrap gap-2" aria-label="Technologies used">
          {tags.map((tag) => (
            <span 
              key={tag}
              className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 font-mono text-xs font-medium text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/30 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Structured Engineering Details (Problem, Approach, Outcome) */}
        <div className="space-y-4 border-t border-zinc-100 pt-4 dark:border-zinc-800/60">
          {/* Problem */}
          <div className="space-y-1">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              // PROBLEM
            </span>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
              {problem}
            </p>
          </div>

          {/* Approach */}
          <div className="space-y-1">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-500/90 dark:text-emerald-400/90">
              // APPROACH
            </span>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
              {approach}
            </p>
          </div>

          {/* Outcome */}
          <div className="space-y-1">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
              // OUTCOME
            </span>
            <p className="text-sm text-zinc-800 dark:text-zinc-200 font-sans font-medium leading-relaxed bg-zinc-50 dark:bg-zinc-950/40 p-2 rounded border border-zinc-100 dark:border-zinc-800/40">
              {outcome}
            </p>
          </div>
        </div>
      </div>

      {/* Action Links */}
      <footer className="mt-6 flex items-center justify-end gap-4 border-t border-zinc-100 pt-4 dark:border-zinc-800/60">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            aria-label={`View ${title} source code on GitHub`}
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span>source_code</span>
          </a>
        )}

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
            aria-label={`View live demo of ${title}`}
          >
            <span>live_demo</span>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </footer>
    </article>
  );
}
