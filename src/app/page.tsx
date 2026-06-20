'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = 'Kumar Priyam | Data Engineering & Full-Stack Developer';
  }, []);

  /* ── Featured Highlight Cards Data ── */
  const highlights = [
    {
      label: 'ENGINEERING_PROJECTS',
      icon: 'terminal',
      stat: '4+ Systems Built',
      description:
        'ETL pipelines, real-time platforms, and AI-driven architectures',
      href: '/projects',
    },
    {
      label: 'RESEARCH_WORK',
      icon: 'paper',
      stat: 'MARL-MAPS Paper',
      description:
        'Multi-agent RL for optimized RAG with 91% over-search reduction',
      href: '/research',
    },
    {
      label: 'PROFILE_SKILLS',
      icon: 'badge',
      stat: '6 Tech Domains',
      description:
        'From Apache Airflow to WebRTC — production-grade engineering stack',
      href: '/profile',
    },
  ];

  /* ── Quick Stats Data ── */
  const stats = [
    { value: '1542', label: 'LeetCode Rating' },
    { value: '300+', label: 'Problems Solved' },
    { value: '5th Place', label: 'Cas-a-thon 3.0' },
  ];

  /* ── Icon renderer for highlight cards ── */
  const renderIcon = (type: string) => {
    switch (type) {
      case 'terminal':
        return (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      case 'paper':
        return (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      case 'badge':
        return (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* ═══════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════ */}
      <section
        className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden py-16 sm:py-24"
        aria-label="Introduction"
      >
        {/* Subtle grid background pattern */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]"
          aria-hidden="true"
        />

        {/* Radial gradient blur */}
        <div
          className="absolute top-1/4 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 right-1/4 -z-10 h-[200px] w-[200px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 font-mono text-xs font-medium text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Open to AI Engineer · SDE · Data Engineer Roles</span>
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl text-zinc-950 dark:text-white">
            Kumar Priyam
            <span className="block mt-3 text-xl sm:text-2xl md:text-3xl font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
              AI Engineer · SDE · Data Engineer
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            B.Tech Computer Science student at NIT Delhi (Class of 2027).
            Building multi-agent AI systems, full-stack platforms, and scalable
            data pipelines — from RAG architectures to production ETL.
          </p>

          {/* Terminal widget */}
          <div className="mx-auto mt-8 max-w-lg overflow-hidden rounded-lg border border-zinc-200 bg-white/50 text-left font-mono text-xs shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 border-b border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900/80">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 text-[10px] text-zinc-400">
                bash • pipeline_monitor
              </span>
            </div>
            <div className="p-4 space-y-1 text-zinc-500 dark:text-zinc-400">
              <p>
                <span className="text-emerald-500 dark:text-emerald-400">$</span>{' '}
                python -m pipeline_run --tenant=all
              </p>
              <p className="text-zinc-700 dark:text-zinc-300">
                <span className="text-indigo-500">import</span> airflow,
                RAG_DDR, Dec_POMDP
              </p>
              <p className="text-zinc-700 dark:text-zinc-300">
                Status:{' '}
                <span className="text-emerald-500">
                  Ingested 100K+ records/day
                </span>
              </p>
              <p className="text-emerald-600 dark:text-emerald-400">
                {'// Ready to design high-throughput data infrastructure.'}
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 transition-all"
            >
              View My Work
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <button
              onClick={() => setShowResumeModal(true)}
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all cursor-pointer"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURED HIGHLIGHTS SECTION (Bento Cards)
      ═══════════════════════════════════════════════ */}
      <section
        className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 border-t border-zinc-100 dark:border-zinc-900"
        aria-label="Featured Highlights"
      >
        <div className="flex flex-col items-center text-center mb-12">
          <span className="font-mono text-xs font-semibold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest">
            SYSTEM_MODULES
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
            Featured Highlights
          </h2>
          <div className="mt-4 h-1 w-12 rounded bg-emerald-500 dark:bg-emerald-400" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-emerald-600/50 dark:hover:shadow-zinc-950/50"
            >
              {/* Decorative dots */}
              <div
                className="absolute right-3 top-3 flex gap-1"
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
              </div>

              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
                {renderIcon(card.icon)}
              </div>

              {/* Monospace label */}
              <span className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                {card.label}
              </span>

              {/* Stat */}
              <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {card.stat}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {card.description}
              </p>

              {/* Arrow indicator */}
              <div className="mt-4 flex items-center font-mono text-xs text-emerald-600 dark:text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">
                <span>explore()</span>
                <svg
                  className="ml-1 h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          QUICK STATS ROW
      ═══════════════════════════════════════════════ */}
      <section
        className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8"
        aria-label="Quick Statistics"
      >
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800 sm:flex-row sm:divide-x sm:divide-y-0">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-1 flex-col items-center justify-center px-6 py-6 text-center"
              >
                <span
                  className={`font-mono text-2xl font-bold tracking-tight ${
                    mounted ? 'text-zinc-900 dark:text-white' : 'text-zinc-900'
                  }`}
                >
                  {stat.value}
                </span>
                <span className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          RESUME SELECTION MODAL
      ═══════════════════════════════════════════════ */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-zinc-950/65 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
            onClick={() => setShowResumeModal(false)}
          />
          
          {/* Modal Container */}
          <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900 transition-all duration-300 transform scale-100 animate-scaleIn">
            
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/80">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  resume_selector.sh
                </span>
              </div>
              <button
                onClick={() => setShowResumeModal(false)}
                className="rounded p-1 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                Select Resume Variation
              </h3>
              <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                Choose the professional profile tailored for the engineering domain:
              </p>

              <div className="mt-6 space-y-4">
                {/* Data Engineering Option */}
                <a
                  href="https://drive.google.com/file/d/1XJmW1XJ5lQ17fY251xmbZpC3lzsZgviR/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowResumeModal(false)}
                  className="group flex items-center gap-4 rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/20 dark:hover:border-emerald-600/50 dark:hover:bg-zinc-900"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="font-mono text-sm font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors block">
                      Data Engineering Resume
                    </span>
                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                      ETL pipelines, Airflow, and distributed data systems
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 text-zinc-300 dark:text-zinc-600 transition-colors group-hover:text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>

                {/* SDE + GenAI Option */}
                <a
                  href="https://drive.google.com/file/d/1lPMTdrULT4iWPU5typRmVDVlBtF81wHf/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowResumeModal(false)}
                  className="group flex items-center gap-4 rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-white hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/20 dark:hover:border-indigo-600/50 dark:hover:bg-zinc-900"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400 transition-colors group-hover:bg-indigo-500/20">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="font-mono text-sm font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors block">
                      SDE + GenAI Resume
                    </span>
                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                      Full-stack engineering, LLMs, and agentic workflows
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 text-zinc-300 dark:text-zinc-600 transition-colors group-hover:text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="border-t border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950/40 text-center">
              <button
                onClick={() => setShowResumeModal(false)}
                className="font-mono text-xs text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              >
                close_selector()
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
