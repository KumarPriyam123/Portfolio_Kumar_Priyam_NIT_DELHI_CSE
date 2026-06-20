'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { projects } from '@/data/projects';

const RESUMES = {
  aiSde: 'https://drive.google.com/file/d/1lPMTdrULT4iWPU5typRmVDVlBtF81wHf/view',
  data: 'https://drive.google.com/file/d/1XJmW1XJ5lQ17fY251xmbZpC3lzsZgviR/view',
};

const stats = [
  { value: '1542', label: 'LeetCode peak' },
  { value: '300+', label: 'DSA problems' },
  { value: '5ᵗʰ', label: 'Cas-a-thon 3.0 / 200+ teams' },
];

const capabilities = [
  {
    no: '01',
    title: 'AI Engineering',
    body: 'Multi-agent RL, RAG architectures, LoRA fine-tuning and orchestration policies — MARL-MAPS cut redundant retrieval by 91%.',
  },
  {
    no: '02',
    title: 'Software Engineering',
    body: 'Full-stack platforms on FastAPI, Next.js and the MERN stack — real-time systems with sub-70ms sync and 46% lower API latency.',
  },
  {
    no: '03',
    title: 'Data Engineering',
    body: 'Multi-tenant ETL on Apache Airflow with strict isolation, schema validation and automated fault classification at 100K+ records/day.',
  },
];

export default function Home() {
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    document.title = 'Kumar Priyam — AI Engineer · SDE · Data Engineer';
  }, []);

  useEffect(() => {
    if (!showResumeModal) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setShowResumeModal(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [showResumeModal]);

  const featured = projects.slice(0, 4);

  return (
    <div>
      {/* ══════════════════════════ HERO / COVER ══════════════════════════ */}
      <section className="mx-auto max-w-editorial px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
        <div className="reveal flex items-center justify-between border-b border-rule pb-4">
          <span className="eyebrow">Portfolio — Vol. 01</span>
          <span className="eyebrow inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Open to roles
          </span>
        </div>

        <div className="grid gap-10 pt-10 md:grid-cols-12 md:gap-8 md:pt-14">
          {/* Headline */}
          <div className="md:col-span-8">
            <h1 className="font-display text-[2.6rem] font-light leading-[1.04] tracking-[-0.02em] text-ink sm:text-6xl md:text-[4.6rem]">
              <span className="reveal delay-1 block">I build</span>
              <span className="reveal delay-2 block italic text-accent">
                multi-agent AI,
              </span>
              <span className="reveal delay-3 block">full-stack platforms</span>
              <span className="reveal delay-4 block">
                &amp; data pipelines.
              </span>
            </h1>
          </div>

          {/* Meta column */}
          <div className="reveal delay-4 flex flex-col gap-7 md:col-span-4 md:pt-3">
            <p className="font-display text-lg font-medium tracking-tight text-ink">
              Kumar Priyam
            </p>
            <p className="text-[1.05rem] leading-relaxed text-muted">
              B.Tech Computer Science at NIT Delhi, Class of 2027. I work end to
              end — from RAG architectures and reinforcement learning to
              production ETL.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent"
              >
                Selected Work
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
              <button
                onClick={() => setShowResumeModal(true)}
                className="inline-flex items-center gap-2 border border-rule px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Résumé
              </button>
            </div>
          </div>
        </div>

        {/* Stat ticker */}
        <div className="reveal delay-5 mt-14 grid grid-cols-3 border-t border-rule">
          {stats.map((s) => (
            <div key={s.label} className="border-r border-rule py-5 pr-4 last:border-r-0">
              <div className="font-display text-3xl font-light text-ink sm:text-4xl">
                {s.value}
              </div>
              <div className="eyebrow mt-2 normal-case tracking-[0.08em] text-faint">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════ SELECTED WORK ══════════════════════════ */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex items-baseline justify-between border-b border-rule pb-5">
            <h2 className="font-display text-2xl font-light tracking-tight text-ink sm:text-3xl">
              Selected Work
            </h2>
            <span className="eyebrow text-faint">{`(${featured.length})`}</span>
          </div>

          <ul>
            {featured.map((p, i) => (
              <li key={p.slug} className="group border-b border-rule">
                <Link
                  href={`/projects/${p.slug}`}
                  className="grid grid-cols-12 items-baseline gap-4 py-7 transition-colors sm:py-9"
                >
                  <span className="col-span-2 font-mono text-xs text-faint sm:col-span-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="col-span-10 sm:col-span-7">
                    <h3 className="font-display text-2xl font-light tracking-tight text-ink transition-colors group-hover:text-accent sm:text-[2rem]">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">
                      {p.description}
                    </p>
                  </div>
                  <div className="col-span-10 col-start-3 flex flex-wrap gap-x-4 gap-y-1 sm:col-span-4 sm:col-start-9 sm:justify-end">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/projects"
            className="mt-8 inline-flex items-baseline gap-2 font-mono text-xs uppercase tracking-[0.16em] text-ink"
          >
            <span className="link-underline">All projects</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════ CAPABILITIES ══════════════════════════ */}
      <section className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-24">
          <p className="eyebrow text-faint">— What I do</p>
          <div className="mt-10 grid gap-px border border-rule bg-rule md:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.no} className="bg-paper p-7 sm:p-9">
                <span className="font-mono text-xs text-accent">{c.no}</span>
                <h3 className="mt-4 font-display text-xl font-normal tracking-tight text-ink">
                  {c.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ RÉSUMÉ MODAL ══════════════════════════ */}
      {showResumeModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Select résumé"
        >
          <div
            className="reveal-fade absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setShowResumeModal(false)}
          />
          <div className="reveal relative w-full max-w-lg border border-rule bg-paper shadow-2xl">
            <div className="flex items-center justify-between border-b border-rule px-6 py-4">
              <span className="eyebrow">Résumé — Select edition</span>
              <button
                onClick={() => setShowResumeModal(false)}
                className="text-muted transition-colors hover:text-accent"
                aria-label="Close"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="divide-y divide-rule">
              <a
                href={RESUMES.aiSde}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowResumeModal(false)}
                className="group flex items-baseline justify-between gap-4 px-6 py-6 transition-colors hover:bg-surface"
              >
                <div>
                  <h3 className="font-display text-xl font-normal text-ink transition-colors group-hover:text-accent">
                    AI&nbsp;+&nbsp;SDE
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    AI engineering, full-stack, LLM orchestration
                  </p>
                </div>
                <span className="font-mono text-xs text-faint transition-transform group-hover:translate-x-1" aria-hidden="true">
                  ↗
                </span>
              </a>
              <a
                href={RESUMES.data}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowResumeModal(false)}
                className="group flex items-baseline justify-between gap-4 px-6 py-6 transition-colors hover:bg-surface"
              >
                <div>
                  <h3 className="font-display text-xl font-normal text-ink transition-colors group-hover:text-accent">
                    Data Engineering
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    ETL pipelines, Airflow, data infrastructure
                  </p>
                </div>
                <span className="font-mono text-xs text-faint transition-transform group-hover:translate-x-1" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
