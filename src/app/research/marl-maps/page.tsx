import type { Metadata } from 'next';
import Link from 'next/link';
import { getResearchBySlug } from '@/data/research';
import { clean, splitTitle } from '@/lib/site';

const paper = getResearchBySlug('marl-maps')!;
const { name, sub } = splitTitle(paper.title);

export const metadata: Metadata = {
  title: `${name}: ${sub}`,
  description: 'MARL-MAPS formalises RAG as a Dec-POMDP with a learnable orchestrator, cutting over-search from 27% to 2.3% and inference time by 42%.',
  alternates: { canonical: '/research/marl-maps' },
};

export default function MarlMapsPage() {
  const [overSearch, speed, ...quality] = paper.results;
  return (
    <article className="kp-page pb-[var(--sc-section)]">
      <div className="sc-wrap">
        <Link href="/research" className="kp-crumb">
          <span aria-hidden="true">←</span> Research
        </Link>

        <header className="mt-10" data-sc-in>
          <p className="kp-label">
            Research paper · {paper.institution} · {paper.date}
          </p>
          <h1 className="kp-display kp-h1 mt-4">{name}</h1>
          <p className="kp-lede mt-4">{sub}</p>
          <p className="kp-soft mt-3">By {paper.authors.join(', ')}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a className="kp-btn kp-btn--accent" href={paper.documentLinks.report} target="_blank" rel="noopener noreferrer">
              Full report
              <span className="kp-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a className="kp-btn kp-btn--ghost" href={paper.documentLinks.presentation} target="_blank" rel="noopener noreferrer">
              Slides
              <span className="kp-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </header>

        <section className="mt-16 grid gap-10 border-t border-[var(--sc-hairline-strong)] pt-10 md:grid-cols-2" aria-label="Key results" data-sc-in>
          <div>
            <p className="kp-big kp-num">
              91
              <small>%</small>
            </p>
            <p className="mt-3 font-medium">less over-search</p>
            <p className="kp-soft mt-1">{overSearch.description}.</p>
          </div>
          <div>
            <p className="kp-big kp-num">
              42
              <small>%</small>
            </p>
            <p className="mt-3 font-medium">faster average inference</p>
            <p className="kp-soft mt-1">{speed.description}.</p>
          </div>
        </section>

        <div className="kp-spread mt-16" data-sc-in>
          <h2 className="kp-spread__k">Abstract</h2>
          <p className="kp-prose">{clean(paper.abstract)}</p>
        </div>

        <div className="kp-spread" data-sc-in>
          <h2 className="kp-spread__k">Method</h2>
          <ol className="kp-list">
            {paper.methodology.map((m, i) => (
              <li key={m.title}>
                <span className="kp-list__n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="kp-lead">{m.title.replace(/"/g, '')}</h3>
                  <p className="kp-soft mt-1">{clean(m.description)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="kp-spread" data-sc-in>
          <h2 className="kp-spread__k">Accuracy</h2>
          <dl className="kp-dl">
            {quality.map((r) => (
              <div key={r.metric} className="contents">
                <dt>{r.metric}</dt>
                <dd>
                  <span className="kp-lead">Improved.</span> <span className="kp-soft">{r.description}.</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="kp-spread" data-sc-in>
          <h2 className="kp-spread__k">Built upon</h2>
          <div>
            <p className="kp-lead">{paper.basePaper.title}</p>
            <p className="kp-soft mt-1">
              {paper.basePaper.authors} · {paper.basePaper.venue}
            </p>
            <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <a className="kp-link" href={paper.basePaper.link} target="_blank" rel="noopener noreferrer">
                arXiv ↗
              </a>
              <a className="kp-link" href={paper.documentLinks.basePaper} target="_blank" rel="noopener noreferrer">
                PDF ↗
              </a>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
