'use client';

import React, { useEffect } from 'react';

export default function ProfilePage() {
  useEffect(() => {
    document.title = 'Profile | Kumar Priyam';
  }, []);

  /* ── Skills Data ── */
  const skills = [
    {
      category: 'Languages',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      items: ['Python', 'SQL', 'C++', 'JavaScript', 'C'],
    },
    {
      category: 'Data Engineering',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      items: [
        'Apache Airflow',
        'ETL/ELT Pipelines',
        'Data Partitioning',
        'Schema Validation',
        'Data Quality Checks',
      ],
    },
    {
      category: 'Frameworks & APIs',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      items: [
        'FastAPI',
        'Node.js',
        'LangChain',
        'RAG Pipelines',
        'Multi-Agent LLM Orchestration',
      ],
    },
    {
      category: 'Databases',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      items: ['PostgreSQL', 'MongoDB', 'Redis', 'Pinecone (Vector DB)'],
    },
    {
      category: 'Infrastructure',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      items: ['Docker', 'Linux', 'Git', 'GitHub', 'Postman', 'VS Code'],
    },
    {
      category: 'Data & ML',
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      items: [
        'NumPy',
        'Pandas',
        'Scikit-learn',
        'OpenAI API',
        'Google Gemini API',
      ],
    },
  ];

  /* ── Achievement Stats Data ── */
  const achievements = [
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'emerald',
      value: '5th Place',
      label: 'Cas-a-thon 3.0 Hackathon (out of 200+ teams, 2024)',
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      color: 'indigo',
      value: '1542 Rating',
      label: 'LeetCode peak (300+ Problems Solved)',
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'amber',
      value: 'Top Performer',
      label: 'Institute coding events (Codeforces/GFG)',
    },
  ];

  /* ── Achievement color map ── */
  const colorMap: Record<string, { bg: string; text: string }> = {
    emerald: {
      bg: 'bg-emerald-500/10 dark:bg-emerald-400/10',
      text: 'text-emerald-600 dark:text-emerald-400',
    },
    indigo: {
      bg: 'bg-indigo-500/10 dark:bg-indigo-400/10',
      text: 'text-indigo-600 dark:text-indigo-400',
    },
    amber: {
      bg: 'bg-amber-500/10 dark:bg-amber-400/10',
      text: 'text-amber-600 dark:text-amber-400',
    },
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* ═══════════════════════════════════════════════
            PAGE HEADER
        ═══════════════════════════════════════════════ */}
        <div className="mb-12">
          <span className="font-mono text-xs font-semibold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest">
            SYSTEM_PROFILE
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
            About Me
          </h1>
          <div className="mt-4 h-1 w-12 rounded bg-emerald-500 dark:bg-emerald-400" />
        </div>

        {/* ═══════════════════════════════════════════════
            MAIN GRID: Bio+Education (left) | Stats (right)
        ═══════════════════════════════════════════════ */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* ─── Left Column: Bio + Education ─── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
                {'// BIO'}
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                <p>
                  I am a Data Engineering student at{' '}
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    NIT Delhi
                  </span>{' '}
                  (Class of 2027) with hands-on experience building ETL
                  pipelines, multi-tenant data systems, and RAG-based retrieval
                  architectures.
                </p>
                <p>
                  My focus lies in contributing to production-grade data
                  infrastructure, ensuring pipeline reliability, and solving
                  complex architectural challenges like context overloading in AI
                  systems.
                </p>
                <p>
                  I actively participate in competitive programming to
                  continuously sharpen my problem-solving skills and algorithmic
                  efficiency, applying mathematical rigor to tackle large-scale
                  data ingestion and latency constraints.
                </p>
              </div>
            </div>

            {/* Education Card */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
                {'// EDUCATION'}
              </h2>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  {/* University icon */}
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
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
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      National Institute of Technology Delhi
                    </h3>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      B.Tech in Computer Science &amp; Engineering
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-zinc-400 dark:text-zinc-500">
                      2023 — 2027
                    </p>
                  </div>
                </div>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-900/20 dark:text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Currently Enrolled
                </span>
              </div>
            </div>
          </div>

          {/* ─── Right Column: Achievements / Stats ─── */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 flex flex-col justify-between h-full">
              <div>
                <span className="font-mono text-xs font-semibold text-emerald-500 dark:text-emerald-400">
                  METRICS_LOGGER
                </span>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  Achievements
                </h2>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Algorithmic statistics and competitive engineering
                  achievements.
                </p>
              </div>

              <div className="my-8 space-y-4">
                {achievements.map((ach, idx) => {
                  const colors = colorMap[ach.color];
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 rounded-xl border border-zinc-100 dark:border-zinc-800/40 bg-zinc-50/60 dark:bg-zinc-950/30 p-4"
                    >
                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${colors.bg} ${colors.text}`}
                      >
                        {ach.icon}
                      </div>
                      <div>
                        <div className="font-mono text-xl font-bold text-zinc-900 dark:text-white">
                          {ach.value}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                          {ach.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Console log box */}
              <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950 p-3 font-mono text-[10px] text-zinc-400 dark:text-zinc-500 border border-zinc-200/60 dark:border-zinc-800/60">
                <p className="text-emerald-500 dark:text-emerald-400">
                  {'// env.nit_delhi_cse_2027'}
                </p>
                <p>Status: ready_to_contribute</p>
                <p>Focus: Distributed systems &amp; pipelines</p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            SKILLS GRID (Full Width - 2x3 or 3x2)
        ═══════════════════════════════════════════════ */}
        <section className="mt-12" aria-label="Technical Skills">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-zinc-950 dark:text-white font-mono">
              {'// SYSTEM_ABILITIES'}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="rounded-xl border border-zinc-200/60 bg-white/50 p-5 dark:border-zinc-800/60 dark:bg-zinc-900/30 transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                    {skillGroup.icon}
                  </div>
                  <h3 className="font-mono text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                    {skillGroup.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.map((item) => (
                    <span
                      key={item}
                      className="inline-block rounded-md bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-1 text-xs text-zinc-800 dark:text-zinc-300 font-sans border border-zinc-200/30 dark:border-zinc-700/20 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            RESUME DOWNLOADS
        ═══════════════════════════════════════════════ */}
        <section className="mt-12" aria-label="Resume Downloads">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-zinc-950 dark:text-white font-mono">
              {'// DOWNLOAD_ARTIFACTS'}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Data Engineering Resume */}
            <a
              href="https://drive.google.com/file/d/1XJmW1XJ5lQ17fY251xmbZpC3lzsZgviR/view"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-emerald-600/50"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <span className="font-mono text-sm font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Data Engineering Resume
                </span>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                  ETL pipelines, Airflow, data infrastructure
                </p>
              </div>
              <svg
                className="ml-auto h-5 w-5 flex-shrink-0 text-zinc-300 dark:text-zinc-600 transition-colors group-hover:text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>

            {/* SDE + GenAI Resume */}
            <a
              href="https://drive.google.com/file/d/1sDOkbyz0YaCgN3EzVKoCykDRa7ZAyBo9/view"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-indigo-600/50"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400 transition-colors group-hover:bg-indigo-500/20">
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <span className="font-mono text-sm font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  SDE + GenAI Resume
                </span>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                  Full-stack development, LLM orchestration
                </p>
              </div>
              <svg
                className="ml-auto h-5 w-5 flex-shrink-0 text-zinc-300 dark:text-zinc-600 transition-colors group-hover:text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
