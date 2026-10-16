import Link from 'next/link';

// Respect, not spectacle: one held breath on a real number. 27 of every 100
// queries over-searched before MARL-MAPS; 2.3 after. The cells go dark from
// CSS alone, reading the act progress (--sc-p) the engine publishes, on the
// same smoothstep the engine's counter uses, so number and grid stay in step.
const SPAN = 1.9;

export default function ResearchAct() {
  return (
    <section
      className="kp-research kp-sheet-section"
      data-sc-act="pin"
      data-sc-span={SPAN}
      data-sc-drift="#06090e"
      style={{ height: `${SPAN * 100}vh` }}
      aria-labelledby="research-title"
    >
      <div className="sc-stage kp-research__stage" data-sc-stage>
        <div className="kp-research__grid">
          <div className="kp-research__copy" data-sc-cue="0 1 0 0.06">
            <p className="kp-label">Research · NIT Delhi · 2025</p>
            <h2 id="research-title" className="kp-display kp-h1 mt-4">
              MARL-MAPS
            </h2>
            <p className="kp-lede mt-5">Multi-agent reinforcement learning that teaches a RAG pipeline when to stop retrieving.</p>
            <p className="kp-body mt-4">
              RAG pipelines pay a context tax: noisy documents bloat the prompt, add latency and raise hallucination risk. MARL-MAPS treats the pipeline as a
              Dec-POMDP. Each module is an agent, they share one working memory, and they trade confidence to decide whether another search is worth it.
            </p>
            <div className="kp-research__side">
              <span className="kp-display kp-h3 kp-num">42%</span>
              <span className="kp-soft">faster average inference</span>
            </div>
            <Link href="/research/marl-maps" className="kp-btn kp-btn--ghost mt-7">
              Read the paper
              <span className="kp-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <figure className="kp-research__fig" aria-labelledby="research-fig-cap">
            <p className="kp-label">Over-searched queries, per 100</p>
            <p className="kp-big mt-3" aria-hidden="true">
              <span data-sc-count="27.0 2.3" data-sc-count-at="0.12 0.68">
                27.0
              </span>
              <small>%</small>
            </p>
            <div className="kp-units" aria-hidden="true">
              {Array.from({ length: 100 }, (_, i) => (
                <span key={i} className="kp-unit" style={{ ['--i' as string]: i }} />
              ))}
            </div>
            <figcaption id="research-fig-cap" className="kp-note">
              Over-search rate fell from 27% to 2.3% of queries, a 91% reduction in unnecessary retrieval rounds.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
