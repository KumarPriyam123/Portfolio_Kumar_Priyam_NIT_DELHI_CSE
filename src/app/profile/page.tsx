'use client';

import React, { useEffect } from 'react';

const skills = [
  { category: 'Languages', items: ['Python', 'TypeScript', 'SQL', 'C++', 'JavaScript', 'C'] },
  { category: 'AI & ML', items: ['PyTorch', 'LoRA', 'GRPO', 'NumPy', 'Pandas', 'Scikit-learn', 'OpenAI API', 'Google Gemini API'] },
  { category: 'Frameworks & APIs', items: ['Next.js', 'React.js', 'FastAPI', 'Node.js', 'LangChain', 'RAG Pipelines', 'Multi-Agent LLM Orchestration'] },
  { category: 'Data Engineering', items: ['Apache Airflow', 'ETL/ELT Pipelines', 'Data Partitioning', 'Schema Validation', 'Data Quality Checks'] },
  { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Pinecone (Vector DB)', 'pgvector', 'Supabase'] },
  { category: 'Infrastructure', items: ['Docker', 'Linux', 'Git', 'GitHub', 'Cloudflare Tunnel', 'Vercel', 'Postman', 'VS Code'] },
];

const achievements = [
  { value: '5ᵗʰ', label: 'Cas-a-thon 3.0 — out of 200+ teams (2024)' },
  { value: '1542', label: 'LeetCode peak rating — 300+ DSA problems' },
  { value: '∞', label: 'Top performer, institute coding events (Codeforces / GFG)' },
];

const RESUMES = {
  aiSde: 'https://drive.google.com/file/d/1lPMTdrULT4iWPU5typRmVDVlBtF81wHf/view',
  data: 'https://drive.google.com/file/d/1XJmW1XJ5lQ17fY251xmbZpC3lzsZgviR/view',
};

export default function ProfilePage() {
  useEffect(() => {
    document.title = 'Profile — Kumar Priyam';
  }, []);

  return (
    <div>
      {/* Masthead */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-20">
          <span className="reveal eyebrow">Section 01 — Profile</span>
          <h1 className="reveal delay-1 mt-6 font-display text-5xl font-light tracking-[-0.02em] text-ink sm:text-7xl">
            About
          </h1>
        </div>
      </section>

      {/* Bio + Education / Achievements */}
      <section className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          {/* Bio */}
          <div className="md:col-span-7">
            <p className="dropcap font-display text-2xl font-light leading-[1.5] tracking-tight text-ink">
              Kumar Priyam is a Computer Science student at NIT Delhi (Class of
              2027), working across AI engineering, software development, and
              data engineering — from multi-agent RL and RAG architectures to
              full-stack platforms and multi-tenant ETL pipelines.
            </p>
            <div className="mt-7 space-y-5 text-[1.05rem] leading-relaxed text-muted">
              <p>
                I build production-grade systems end to end: training
                role-specific LoRA adapters and orchestration policies on one
                side, shipping FastAPI&nbsp;+&nbsp;Next.js products and reliable
                data infrastructure on the other.
              </p>
              <p>
                I compete in algorithmic programming to keep my problem-solving
                sharp, applying that same mathematical rigour to large-scale data
                ingestion and the latency constraints of real systems.
              </p>
            </div>

            {/* Education */}
            <div className="mt-12 border-t border-rule pt-8">
              <p className="eyebrow text-faint">Education</p>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-light tracking-tight text-ink">
                    National Institute of Technology Delhi
                  </h3>
                  <p className="mt-1.5 text-muted">B.Tech, Computer Science &amp; Engineering</p>
                </div>
                <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] text-faint">
                  2023 — 2027
                </span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <aside className="md:col-span-5 md:border-l md:border-rule md:pl-10">
            <p className="eyebrow text-faint">By the numbers</p>
            <dl className="mt-6 divide-y divide-rule">
              {achievements.map((a) => (
                <div key={a.label} className="flex items-baseline gap-5 py-6">
                  <dt className="font-display text-4xl font-light leading-none text-accent">
                    {a.value}
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted">{a.label}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* Skills index */}
      <section className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex items-baseline justify-between border-b border-rule pb-5">
            <h2 className="font-display text-3xl font-light tracking-tight text-ink">
              Capabilities
            </h2>
            <span className="eyebrow text-faint">Stack</span>
          </div>
          <dl>
            {skills.map((group) => (
              <div key={group.category} className="grid grid-cols-1 gap-3 border-b border-rule py-6 md:grid-cols-12 md:gap-8">
                <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent md:col-span-3">
                  {group.category}
                </dt>
                <dd className="flex flex-wrap gap-x-5 gap-y-2 md:col-span-9">
                  {group.items.map((item) => (
                    <span key={item} className="font-serif text-[15px] text-ink">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Résumé */}
      <section className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex items-baseline justify-between border-b border-rule pb-5">
          <h2 className="font-display text-3xl font-light tracking-tight text-ink">Résumé</h2>
          <span className="eyebrow text-faint">2 editions</span>
        </div>
        <div className="grid border border-rule sm:grid-cols-2">
          <a href={RESUMES.aiSde} target="_blank" rel="noopener noreferrer" className="group border-b border-rule p-8 transition-colors hover:bg-surface sm:border-b-0 sm:border-r">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow text-accent">Edition A</span>
              <span className="font-mono text-xs text-faint transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-light text-ink transition-colors group-hover:text-accent">
              AI&nbsp;+&nbsp;SDE
            </h3>
            <p className="mt-2 text-sm text-muted">AI engineering, full-stack, LLM orchestration</p>
          </a>
          <a href={RESUMES.data} target="_blank" rel="noopener noreferrer" className="group p-8 transition-colors hover:bg-surface">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow text-accent">Edition B</span>
              <span className="font-mono text-xs text-faint transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-light text-ink transition-colors group-hover:text-accent">
              Data Engineering
            </h3>
            <p className="mt-2 text-sm text-muted">ETL pipelines, Airflow, data infrastructure</p>
          </a>
        </div>
      </section>
    </div>
  );
}
