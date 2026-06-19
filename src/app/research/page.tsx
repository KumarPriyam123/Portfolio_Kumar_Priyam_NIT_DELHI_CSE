import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { researchPapers } from '@/data/research';
import ResearchCard from '@/components/ResearchCard';

export const metadata: Metadata = {
  title: 'Research | Kumar Priyam',
  description:
    'Academic research exploring multi-agent systems, reinforcement learning, and AI retrieval optimization by Kumar Priyam at NIT Delhi.',
};

export default function ResearchPage() {
  return (
    <div className="animate-fade-in-up">
      {/* Page Header */}
      <section className="border-b border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <span className="font-mono text-xs font-semibold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest">
            RESEARCH_LOG
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
            Research &amp; Publications
          </h1>
          <div className="mt-4 h-1 w-12 rounded bg-emerald-500 dark:bg-emerald-400" />
          <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Academic research exploring multi-agent systems, reinforcement
            learning, and AI retrieval optimization.
          </p>
        </div>
      </section>

      {/* Research Cards Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6">
          {researchPapers.map((paper) => (
            <ResearchCard
              key={paper.slug}
              title={paper.title}
              authors={paper.authors}
              institution={paper.institution}
              date={paper.date}
              abstract={paper.abstract}
              tags={paper.tags}
              slug={paper.slug}
            />
          ))}
        </div>

        {/* Active Maintenance Note */}
        <div className="mt-16 rounded-lg border border-dashed border-zinc-300 bg-zinc-50/50 p-6 dark:border-zinc-700 dark:bg-zinc-900/30">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                // ACTIVE_INDEX
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                This research index is actively maintained. Additional
                publications and technical reports will be added as they are
                completed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
