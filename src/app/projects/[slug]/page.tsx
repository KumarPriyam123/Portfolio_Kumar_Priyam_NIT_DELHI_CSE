import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/data/projects';
import Marked, { MatchNote } from '@/components/Marked';
import { clean, splitLead, splitTitle } from '@/lib/site';

const CATEGORY: Record<string, string> = {
  fullstack: 'Full-Stack + AI',
  'ai-research': 'AI Research',
  'data-engineering': 'Data Engineering',
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) return { title: 'Not found' };
  const { name } = splitTitle(p.title);
  return {
    title: name,
    description: p.description,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: `${name} · Kumar Priyam`, description: p.description, url: `/projects/${p.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) notFound();
  const { name, sub } = splitTitle(p.title);
  const i = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="kp-page">
      <div className="sc-wrap">
        <Link href="/projects" className="kp-crumb">
          <span aria-hidden="true">←</span> All work
        </Link>

        <header className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end">
          <div data-sc-in>
            <p className="kp-label">{CATEGORY[p.category]}</p>
            <h1 className="kp-display kp-h1 mt-4">{name}</h1>
            {sub && <p className="kp-lede mt-4">{sub}</p>}
            <p className="kp-body mt-4">{p.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {p.liveUrl && (
                <a className="kp-btn kp-btn--accent" href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                  Open live
                  <span className="kp-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              )}
              {p.githubUrl && (
                <a className="kp-btn kp-btn--ghost" href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                  Source on GitHub
                  <span className="kp-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              )}
            </div>
          </div>
          {p.metrics && (
            <dl className="grid grid-cols-3 gap-6 border-t border-[var(--sc-hairline-strong)] pt-5" data-sc-in>
              {p.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="kp-stat">{m.value}</dd>
                  <dd className="kp-metric__l" aria-hidden="true">
                    {m.label}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </header>

        <MatchNote slug={p.slug} />

        <div className="mt-14">
          <dl className="kp-dl" data-sc-in>
            <dt>Stack</dt>
            <dd className="flex flex-wrap gap-x-4 gap-y-1">
              {p.tags.map((t) => (
                <span key={t}>
                  <Marked text={t} />
                </span>
              ))}
            </dd>
            <dt>Category</dt>
            <dd>{CATEGORY[p.category]}</dd>
          </dl>
        </div>

        <section className="mt-16" aria-label="Case study">
          {(
            [
              ['Problem', p.problem],
              ['Approach', p.approach],
              ['Outcome', p.outcome],
            ] as const
          ).map(([k, v]) => (
            <div key={k} className="kp-spread" data-sc-in>
              <h2 className="kp-spread__k">{k}</h2>
              <p className={k === 'Problem' ? 'kp-lede max-w-[60ch]' : 'kp-prose'}>
                <Marked text={clean(v)} />
              </p>
            </div>
          ))}
        </section>

        {p.highlights && p.highlights.length > 0 && (
          <section className="kp-spread" aria-labelledby="hl-title">
            <h2 id="hl-title" className="kp-spread__k">
              Engineering detail
            </h2>
            <ol className="kp-list" data-sc-in>
              {p.highlights.map((h, n) => {
                const { lead, detail } = splitLead(h);
                return (
                  <li key={n}>
                    <span className="kp-list__n">{String(n + 1).padStart(2, '0')}</span>
                    <p>
                      <span className="kp-lead">
                        <Marked text={clean(lead)} />
                      </span>
                      {detail && (
                        <span className="kp-soft">
                          . <Marked text={detail} />
                        </span>
                      )}
                    </p>
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        <nav className="kp-pager mt-10" aria-label="More work">
          <Link href={`/projects/${prev.slug}`}>
            <span className="kp-label">Previous</span>
            <span className="kp-pager__t">{splitTitle(prev.title).name}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="text-right">
            <span className="kp-label">Next</span>
            <span className="kp-pager__t">{splitTitle(next.title).name}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
