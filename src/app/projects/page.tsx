'use client';

import React, { useEffect } from 'react';
import { projects } from '@/data/projects';
import ProjectsGrid from '@/components/ProjectsGrid';

export default function ProjectsPage() {
  useEffect(() => {
    document.title = 'Projects — Kumar Priyam';
  }, []);

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
            Scan every project&apos;s stack and measured impact at a glance —
            open any card for the full case study.
          </p>
        </div>
      </section>

      {/* Project card grid */}
      <section className="mx-auto max-w-editorial px-5 py-12 sm:px-8 sm:py-16">
        <ProjectsGrid projects={projects} />
      </section>
    </div>
  );
}
