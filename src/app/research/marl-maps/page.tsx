'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { getResearchBySlug } from '@/data/research';

const resultColors = [
  { bg: 'bg-emerald-500/10 dark:bg-emerald-400/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200/50 dark:border-emerald-800/30' },
  { bg: 'bg-indigo-500/10 dark:bg-indigo-400/10', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-200/50 dark:border-indigo-800/30' },
  { bg: 'bg-amber-500/10 dark:bg-amber-400/10', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200/50 dark:border-amber-800/30' },
  { bg: 'bg-rose-500/10 dark:bg-rose-400/10', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-200/50 dark:border-rose-800/30' },
];

export default function MarlMapsPage() {
  const paper = getResearchBySlug('marl-maps');

  useEffect(() => {
    document.title = 'MARL-MAPS Research | Kumar Priyam';
  }, []);

  if (!paper) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-mono text-zinc-500">Paper not found.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      {/* Back Link */}
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href="/research"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Research
        </Link>
      </div>

      {/* Paper Header */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <span className="font-mono text-xs font-semibold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest">
          RESEARCH PAPER
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl lg:text-5xl leading-tight">
          {paper.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          <span className="font-medium text-zinc-900 dark:text-zinc-200">
            {paper.authors.join(', ')}
          </span>
          <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>
          <span>{paper.institution}</span>
          <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>
          <span className="font-mono text-xs">{paper.date}</span>
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {paper.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-zinc-100 px-2.5 py-1 font-mono text-xs font-medium text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Abstract */}
      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white mb-4">
          Abstract
        </h2>
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30">
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 italic">
            {paper.abstract}
          </p>
        </div>
      </section>

      {/* Base Paper Citation */}
      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-indigo-200/50 bg-indigo-50/20 p-6 dark:border-indigo-800/30 dark:bg-indigo-950/10">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
                Built Upon
              </span>
              <h3 className="mt-1 text-base font-bold text-zinc-900 dark:text-zinc-100">
                {paper.basePaper.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {paper.basePaper.authors}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 font-mono">
                {paper.basePaper.venue} • {paper.basePaper.year}
              </p>
              <a
                href={paper.basePaper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 font-mono text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                View on arXiv
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Timeline */}
      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white mb-8">
          Methodology
        </h2>
        <div className="relative space-y-8 pl-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-zinc-200 dark:before:bg-zinc-800">
          {paper.methodology.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-8 top-1 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-emerald-500 bg-white dark:border-emerald-400 dark:bg-zinc-950">
                <span className="font-mono text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Content card */}
              <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Results */}
      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white mb-8">
          Key Results
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {paper.results.map((result, idx) => {
            const color = resultColors[idx % resultColors.length];
            return (
              <div
                key={idx}
                className={`rounded-xl border ${color.border} bg-white p-6 shadow-sm dark:bg-zinc-900/50`}
              >
                <div className={`font-mono text-4xl font-extrabold tracking-tighter ${color.text}`}>
                  {result.value}
                </div>
                <div className="mt-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {result.metric}
                </div>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {result.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Documents & Resources */}
      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white mb-8">
          Documents &amp; Resources
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Full Report */}
          <a
            href={paper.documentLinks.report}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-emerald-600/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <span className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Full Research Report
            </span>
            <span className="mt-1 font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
              Google Docs
            </span>
          </a>

          {/* Presentation */}
          <a
            href={paper.documentLinks.presentation}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-indigo-600/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
            </div>
            <span className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Presentation Slides
            </span>
            <span className="mt-1 font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
              Google Slides
            </span>
          </a>

          {/* Base Paper */}
          <a
            href={paper.documentLinks.basePaper}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-amber-600/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400 group-hover:bg-amber-500/20 transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <span className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Base Paper (IJCAI 2020)
            </span>
            <span className="mt-1 font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
              Google Drive
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
