'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { getResearchBySlug } from '@/data/research';

export default function MarlMapsPage() {
  const paper = getResearchBySlug('marl-maps');

  useEffect(() => {
    document.title = 'MARL-MAPS — Kumar Priyam';
  }, []);

  if (!paper) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-mono text-muted">Paper not found.</p>
      </div>
    );
  }

  const documents = [
    { label: 'Full Research Report', meta: 'Google Docs', href: paper.documentLinks.report },
    { label: 'Presentation Slides', meta: 'Google Slides', href: paper.documentLinks.presentation },
    { label: 'Base Paper · IJCAI 2020', meta: 'Google Drive', href: paper.documentLinks.basePaper },
  ];

  return (
    <div>
      <div className="mx-auto max-w-editorial px-5 pt-10 sm:px-8">
        <Link href="/research" className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent">
          ← Research
        </Link>
      </div>

      {/* Header */}
      <section className="mx-auto max-w-editorial px-5 py-10 sm:px-8 sm:py-14">
        <span className="reveal eyebrow text-accent">Research Paper</span>
        <h1 className="reveal delay-1 mt-5 max-w-4xl font-display text-4xl font-light leading-[1.05] tracking-[-0.02em] text-ink sm:text-6xl">
          {paper.title}
        </h1>
        <div className="reveal delay-2 mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
          <span className="text-ink">{paper.authors.join(', ')}</span>
          <span className="text-faint">/</span>
          <span>{paper.institution}</span>
          <span className="text-faint">/</span>
          <span>{paper.date}</span>
        </div>
        <div className="reveal delay-3 mt-6 flex flex-wrap gap-x-5 gap-y-1.5">
          {paper.tags.map((tag) => (
            <span key={tag} className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Abstract — pull quote */}
      <section className="border-y border-rule bg-surface">
        <div className="mx-auto max-w-editorial px-5 py-14 sm:px-8 sm:py-16">
          <p className="eyebrow text-faint">Abstract</p>
          <p className="mt-6 max-w-4xl font-display text-2xl font-light leading-[1.5] tracking-tight text-ink">
            {paper.abstract}
          </p>
        </div>
      </section>

      {/* Base paper */}
      <section className="mx-auto max-w-editorial px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-4 border border-rule p-8 md:grid-cols-12 md:gap-8">
          <p className="eyebrow text-accent md:col-span-3">Built upon</p>
          <div className="md:col-span-9">
            <h3 className="font-display text-xl font-normal text-ink">{paper.basePaper.title}</h3>
            <p className="mt-2 text-sm text-muted">{paper.basePaper.authors}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
              {paper.basePaper.venue} · {paper.basePaper.year}
            </p>
            <a href={paper.basePaper.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-ink link-underline">
              View on arXiv ↗
            </a>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="mx-auto max-w-editorial px-5 pb-12 sm:px-8 sm:pb-16">
        <div className="flex items-baseline justify-between border-b border-rule pb-5">
          <h2 className="font-display text-3xl font-light tracking-tight text-ink">Methodology</h2>
          <span className="eyebrow text-faint">{`(${paper.methodology.length})`}</span>
        </div>
        <ol>
          {paper.methodology.map((step, idx) => (
            <li key={idx} className="grid gap-3 border-b border-rule py-8 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-4">
                <span className="font-mono text-xs text-accent">{String(idx + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-xl font-light tracking-tight text-ink">
                  {step.title}
                </h3>
              </div>
              <p className="md:col-span-8 text-[15px] leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Key results */}
      <section className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-editorial px-5 py-14 sm:px-8 sm:py-16">
          <p className="eyebrow text-faint">Key results</p>
          <div className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {paper.results.map((result, idx) => (
              <div key={idx} className="bg-paper p-7">
                <div className="font-display text-4xl font-light tracking-tight text-accent">
                  {result.value}
                </div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
                  {result.metric}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {result.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="mx-auto max-w-editorial px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex items-baseline justify-between border-b border-rule pb-5">
          <h2 className="font-display text-3xl font-light tracking-tight text-ink">
            Documents &amp; Resources
          </h2>
        </div>
        <div className="grid border border-rule sm:grid-cols-3">
          {documents.map((doc, i) => (
            <a
              key={doc.label}
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group p-8 transition-colors hover:bg-surface ${
                i < documents.length - 1 ? 'border-b border-rule sm:border-b-0 sm:border-r' : ''
              }`}
            >
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 font-display text-lg font-normal text-ink transition-colors group-hover:text-accent">
                {doc.label}
              </h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                {doc.meta} ↗
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
