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
    document.title = 'Projects — Kumar Priyam';
  }, []);

  useEffect(() => {
    setFilteredProjects(getProjectsByCategory(activeCategory));
  }, [activeCategory]);

  return (
    <div>
      {/* Masthead */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-20">
          <div className="reveal flex items-baseline justify-between">
            <span className="eyebrow">Section 02 — Index</span>
            <span className="eyebrow text-faint">{`(${projects.length})`}</span>
          </div>
          <h1 className="reveal delay-1 mt-6 font-display text-5xl font-light tracking-[-0.02em] text-ink sm:text-6xl">
            Projects
          </h1>
          <p className="reveal delay-2 mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted">
            Systems I&rsquo;ve designed and shipped across AI, software, and data
            engineering — each entry documents the problem, the approach, and the
            measured outcome.
          </p>
        </div>
      </section>

      {/* Filter + grid */}
      <section className="mx-auto max-w-editorial px-5 py-12 sm:px-8 sm:py-16">
        <div
          className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-rule pb-4"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              role="tab"
              aria-selected={activeCategory === cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`font-mono text-[12px] uppercase tracking-[0.14em] transition-colors focus:outline-none ${
                activeCategory === cat.value
                  ? 'text-accent'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <span className={activeCategory === cat.value ? 'link-underline' : ''}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
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

        {filteredProjects.length === 0 && (
          <div className="border border-dashed border-rule py-20 text-center">
            <p className="font-mono text-sm text-muted">
              No projects in this category yet.
            </p>
          </div>
        )}

        <p className="mt-14 border-t border-rule pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          More engineering records are being compiled.
        </p>
      </section>
    </div>
  );
}
