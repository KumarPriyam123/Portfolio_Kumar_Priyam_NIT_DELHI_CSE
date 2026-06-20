'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { projects, getProjectBySlug } from '@/data/projects';

const categoryLabel: Record<string, string> = {
  'data-engineering': 'Data Engineering',
  'ai-research': 'AI Research',
  fullstack: 'Full-Stack',
};

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const project = getProjectBySlug(slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  useEffect(() => {
    if (project) document.title = `${project.title} — Kumar Priyam`;
  }, [project]);

  if (!project) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-editorial flex-col items-center justify-center px-5 text-center">
        <span className="eyebrow text-accent">Error 404</span>
        <h1 className="mt-4 font-display text-4xl font-light text-ink">Record not found</h1>
        <p className="mt-2 text-muted">The requested engineering record does not exist.</p>
        <Link href="/projects" className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-ink link-underline">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const label = categoryLabel[project.category] || categoryLabel.fullstack;
  const sections = [
    { no: '01', label: 'Problem', body: project.problem, accent: false },
    { no: '02', label: 'Approach', body: project.approach, accent: true },
    { no: '03', label: 'Outcome', body: project.outcome, accent: false },
  ];

  return (
    <div>
      <div className="mx-auto max-w-editorial px-5 pt-10 sm:px-8">
        <Link href="/projects" className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent">
          ← Index
        </Link>
      </div>

      {/* Header */}
      <section className="mx-auto max-w-editorial px-5 py-10 sm:px-8 sm:py-14">
        <span className="reveal eyebrow text-accent">{label}</span>
        <h1 className="reveal delay-1 mt-5 max-w-4xl font-display text-4xl font-light leading-[1.06] tracking-[-0.02em] text-ink sm:text-6xl">
          {project.title}
        </h1>
        <p className="reveal delay-2 mt-6 max-w-2xl text-xl font-light leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="reveal delay-3 mt-8 flex flex-wrap gap-x-5 gap-y-1.5" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
              {tag}
            </span>
          ))}
        </div>

        {(project.githubUrl || project.liveUrl) && (
          <div className="reveal delay-4 mt-8 flex flex-wrap gap-4">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-rule px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-accent hover:text-accent">
                View Source ↗
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent">
                Live Demo ↗
              </a>
            )}
          </div>
        )}
      </section>

      {/* Problem / Approach / Outcome */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-editorial px-5 sm:px-8">
          {sections.map((s) => (
            <div key={s.no} className="grid gap-4 border-b border-rule py-10 md:grid-cols-12 md:gap-8 md:py-14">
              <div className="md:col-span-4">
                <span className="font-mono text-xs text-accent">{s.no}</span>
                <h2 className="mt-3 font-display text-2xl font-light tracking-tight text-ink">
                  {s.label}
                </h2>
              </div>
              <p className={`md:col-span-8 text-lg font-light leading-relaxed ${s.accent ? 'text-ink' : 'text-muted'}`}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <section className="mx-auto max-w-editorial px-5 py-14 sm:px-8 sm:py-20">
          <div className="flex items-baseline justify-between border-b border-rule pb-5">
            <h2 className="font-display text-2xl font-light tracking-tight text-ink">
              Technical Highlights
            </h2>
            <span className="eyebrow text-faint">{`(${project.highlights.length})`}</span>
          </div>
          <ul>
            {project.highlights.map((h, idx) => (
              <li key={idx} className="grid grid-cols-12 gap-4 border-b border-rule py-5">
                <span className="col-span-2 font-mono text-xs text-accent sm:col-span-1">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="col-span-10 text-[15px] leading-relaxed text-muted sm:col-span-11">
                  {h}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Prev / Next */}
      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-editorial grid-cols-1 sm:grid-cols-2">
          <Link href={`/projects/${prevProject.slug}`} className="group border-b border-rule px-5 py-8 transition-colors hover:bg-surface sm:border-b-0 sm:border-r sm:px-8">
            <span className="eyebrow text-faint">← Previous</span>
            <p className="mt-2 font-display text-xl font-light text-ink transition-colors group-hover:text-accent">
              {prevProject.title}
            </p>
          </Link>
          <Link href={`/projects/${nextProject.slug}`} className="group px-5 py-8 text-right transition-colors hover:bg-surface sm:px-8">
            <span className="eyebrow text-faint">Next →</span>
            <p className="mt-2 font-display text-xl font-light text-ink transition-colors group-hover:text-accent">
              {nextProject.title}
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
