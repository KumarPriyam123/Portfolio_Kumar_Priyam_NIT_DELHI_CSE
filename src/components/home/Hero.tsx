import { RESUMES, SITE } from '@/lib/site';

// Server-rendered on purpose: the name lifts in line by line with CSS alone, so
// it is on screen at first paint, without JavaScript, and never re-rendered by
// React after the engine touches the page.
export default function Hero() {
  return (
    <section className="kp-hero" data-sc-act="flow" aria-labelledby="hero-name">
      <div className="kp-hero__frame">
        <div id="hero-copy" className="w-fit max-w-full">
          <p className="kp-status kp-rise" style={{ ['--d' as string]: '80ms' }}>
            <span className="kp-status__dot" aria-hidden="true" />
            {SITE.status} · AI Engineer · SDE · Class of {SITE.classOf}, {SITE.institution}
          </p>
          <h1 id="hero-name" className="kp-name">
            <span className="kp-line" style={{ ['--i' as string]: 0 }}>
              <span>Kumar</span>
            </span>{' '}
            <span className="kp-line" style={{ ['--i' as string]: 1 }}>
              <span>Priyam</span>
            </span>
          </h1>
          <p className="kp-hero__sub kp-rise" style={{ ['--d' as string]: '560ms' }}>
            I build AI systems end to end, from multi-agent research to products running in production.
          </p>
          <div className="kp-hero__actions kp-rise" style={{ ['--d' as string]: '700ms' }}>
            <a className="kp-btn kp-btn--accent" href="#search">
              Search my work
            </a>
            <a className="kp-btn kp-btn--ghost" href={RESUMES[0].href} target="_blank" rel="noopener noreferrer">
              Résumé, {RESUMES[0].label}
              <span className="kp-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="kp-hero__silence" aria-hidden="true" />
    </section>
  );
}
