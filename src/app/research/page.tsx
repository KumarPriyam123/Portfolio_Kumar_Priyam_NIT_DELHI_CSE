import React from 'react';
import type { Metadata } from 'next';
import { researchPapers } from '@/data/research';
import ResearchCard from '@/components/ResearchCard';

export const metadata: Metadata = {
  title: 'Research — Kumar Priyam',
  description:
    'Academic research exploring multi-agent systems, reinforcement learning, and AI retrieval optimization by Kumar Priyam at NIT Delhi.',
};

export default function ResearchPage() {
  return (
    <div>
      {/* Masthead */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-20">
          <div className="reveal flex items-baseline justify-between">
            <span className="eyebrow">Section 03 — Research</span>
            <span className="eyebrow text-faint">{`(${researchPapers.length})`}</span>
          </div>
          <h1 className="reveal delay-1 mt-6 font-display text-5xl font-light tracking-[-0.02em] text-ink sm:text-6xl">
            Research &amp; Publications
          </h1>
          <p className="reveal delay-2 mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted">
            Work exploring multi-agent systems, reinforcement learning, and the
            optimization of retrieval-augmented generation.
          </p>
        </div>
      </section>

      {/* Papers */}
      <section className="mx-auto max-w-editorial px-5 py-12 sm:px-8 sm:py-16">
        <div className="space-y-6">
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

        <p className="mt-14 border-t border-rule pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          This index is actively maintained — further reports will be added as completed.
        </p>
      </section>
    </div>
  );
}
