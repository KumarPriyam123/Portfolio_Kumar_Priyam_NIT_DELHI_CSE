import type { Metadata } from 'next';
import Link from 'next/link';
import { researchPapers } from '@/data/research';
import { splitTitle } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Research',
  description: 'Research by Kumar Priyam at NIT Delhi on multi-agent systems, reinforcement learning and the optimisation of retrieval-augmented generation.',
  alternates: { canonical: '/research' },
};

export default function ResearchPage() {
  return (
    <div className="kp-page pb-[var(--sc-section)]">
      <div className="sc-wrap">
        <header data-sc-in>
          <h1 className="kp-display kp-h1">Research</h1>
          <p className="kp-lede mt-5">Multi-agent systems, reinforcement learning, and making retrieval-augmented generation cheaper and more accurate.</p>
        </header>

        <ol className="kp-rows">
          {researchPapers.map((paper, i) => {
            const { name, sub } = splitTitle(paper.title);
            const headline = paper.results.slice(0, 2);
            return (
              <li key={paper.slug} className="kp-row" data-sc-in>
                <span className="kp-row__rank">{String(i + 1).padStart(2, '0')}</span>
                <div className="min-w-0">
                  <Link href={`/research/${paper.slug}`} className="kp-row__title">
                    {name}
                  </Link>
                  <span className="kp-row__subtitle">{sub}</span>
                  <p className="kp-row__desc">
                    {paper.authors.join(', ')} · {paper.institution} · {paper.date}
                  </p>
                  <p className="kp-tags">
                    {paper.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </p>
                </div>
                <dl className="kp-metrics">
                  {headline.map((r) => (
                    <div key={r.metric}>
                      <dt className="sr-only">{r.metric}</dt>
                      <dd className="kp-metric__v">{r.value}</dd>
                      <dd className="kp-metric__l" aria-hidden="true">
                        {r.metric.toLowerCase()}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="kp-row__side">
                  <span className="kp-row__rel">Paper</span>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="kp-note mt-8">This index is actively maintained. Further reports will be added as they are completed.</p>
      </div>
    </div>
  );
}
