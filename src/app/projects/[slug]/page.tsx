'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { projects, getProjectBySlug } from '@/data/projects';

const categoryStyles: Record<string, { bg: string; text: string; label: string }> = {
  'data-engineering': {
    bg: 'bg-indigo-500/10 dark:bg-indigo-400/10',
    text: 'text-indigo-600 dark:text-indigo-400',
    label: 'Data Engineering',
  },
  'ai-research': {
    bg: 'bg-violet-500/10 dark:bg-violet-400/10',
    text: 'text-violet-600 dark:text-violet-400',
    label: 'AI Research',
  },
  fullstack: {
    bg: 'bg-emerald-500/10 dark:bg-emerald-400/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    label: 'Full-Stack',
  },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const project = getProjectBySlug(slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Kumar Priyam`;
    }
  }, [project]);

  if (!project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center animate-fade-in-up">
        <div className="rounded-xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
          <h1 className="text-2xl font-bold text-zinc-950 dark:text-white">Project Not Found</h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 font-mono">
            Error 404: The requested engineering record does not exist.
          </p>
          <Link
            href="/projects"
            className="mt-6 inline-flex items-center rounded-lg bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 transition-all"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const catStyle = categoryStyles[project.category] || categoryStyles.fullstack;

  return (
    <div className="animate-fade-in-up">
      {/* Back Link */}
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Projects
        </Link>
      </div>

      {/* Project Header */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Category Badge */}
        <span className={`inline-flex items-center rounded-md px-2.5 py-1 font-mono text-xs font-semibold ${catStyle.bg} ${catStyle.text}`}>
          {catStyle.label}
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-zinc-100 px-2.5 py-1 font-mono text-xs font-medium text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all"
              aria-label={`View ${project.title} on GitHub`}
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              View Source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 transition-all"
              aria-label={`View live demo of ${project.title}`}
            >
              Live Demo
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </section>

      {/* Problem / Approach / Outcome Detail Grid */}
      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Problem */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              // PROBLEM
            </span>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {project.problem}
            </p>
          </div>

          {/* Approach */}
          <div className="rounded-xl border border-emerald-200/50 bg-emerald-50/30 p-6 dark:border-emerald-800/30 dark:bg-emerald-950/10">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
              // APPROACH
            </span>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {project.approach}
            </p>
          </div>

          {/* Outcome */}
          <div className="rounded-xl border border-indigo-200/50 bg-indigo-50/30 p-6 dark:border-indigo-800/30 dark:bg-indigo-950/10">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
              // OUTCOME
            </span>
            <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
              {project.outcome}
            </p>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white mb-6">
            Key Technical Highlights
          </h2>
          <div className="space-y-3">
            {project.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-zinc-100 bg-white p-4 dark:border-zinc-800/60 dark:bg-zinc-900/30"
              >
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Project Navigation */}
      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-t border-zinc-100 pt-8 sm:flex-row sm:justify-between dark:border-zinc-900">
          {prevProject && (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
            >
              <svg className="h-4 w-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <div>
                <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase">
                  Previous
                </span>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {prevProject.title}
                </p>
              </div>
            </Link>
          )}
          {nextProject && (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-5 py-4 text-right transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 sm:ml-auto"
            >
              <div>
                <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase">
                  Next
                </span>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {nextProject.title}
                </p>
              </div>
              <svg className="h-4 w-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
