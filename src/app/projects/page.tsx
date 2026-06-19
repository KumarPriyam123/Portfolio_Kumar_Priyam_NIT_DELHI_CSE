'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { projects, getProjectsByCategory } from '@/data/projects';
import type { Project } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';

const categories = [
  { label: 'All', value: 'all' as const },
  { label: 'Data Engineering', value: 'data-engineering' as const },
  { label: 'AI Research', value: 'ai-research' as const },
  { label: 'Full-Stack', value: 'fullstack' as const },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Project['category'] | 'all'>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  useEffect(() => {
    document.title = 'Projects | Kumar Priyam';
  }, []);

  useEffect(() => {
    setFilteredProjects(getProjectsByCategory(activeCategory));
  }, [activeCategory]);

  return (
    <div className="animate-fade-in-up">
      {/* Page Header */}
      <section className="border-b border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <span className="font-mono text-xs font-semibold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest">
            ENGINEERING_RECORDS
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
            All Projects
          </h1>
          <div className="mt-4 h-1 w-12 rounded bg-emerald-500 dark:bg-emerald-400" />
          <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Core technical systems highlighting scalable data architecture,
            pipeline isolation, and optimization benchmarks.
          </p>
        </div>
      </section>

      {/* Filter Tabs + Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Category Filter Tabs */}
        <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
          {categories.map((cat) => (
            <button
              key={cat.value}
              role="tab"
              aria-selected={activeCategory === cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`rounded-lg px-4 py-2 font-mono text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                activeCategory === cat.value
                  ? 'bg-emerald-500 text-white shadow-sm dark:bg-emerald-500'
                  : 'border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 transition-all">
          {filteredProjects.map((proj) => (
            <ProjectCard
              key={proj.slug}
              slug={proj.slug}
              title={proj.title}
              description={proj.description}
              tags={proj.tags}
              category={proj.category}
              problem={proj.problem}
              approach={proj.approach}
              outcome={proj.outcome}
              githubUrl={proj.githubUrl}
              liveUrl={proj.liveUrl}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900">
              <svg className="mx-auto h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="mt-4 font-mono text-sm text-zinc-500 dark:text-zinc-400">
              No projects in this category yet.
            </p>
          </div>
        )}

        {/* Add More Projects Note */}
        <div className="mt-16 rounded-lg border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-700">
          <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
            // More engineering records are being compiled and will be deployed soon.
          </p>
        </div>
      </section>
    </div>
  );
}
