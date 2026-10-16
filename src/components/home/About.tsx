import Link from 'next/link';
import { numbers } from '@/data/profile';
import { ROLES } from '@/data/roles';
import { PORTRAIT_SRC, SITE } from '@/lib/site';

// The real photo, once, after the work has made the case.
export default function About() {
  return (
    <section id="about" className="kp-sheet-section kp-about" data-sc-act="flow" aria-labelledby="about-title">
      <div className="sc-wrap kp-about__grid">
        <figure className="kp-about__fig" data-sc-in>
          <div className="kp-about__frame">
            <span className="kp-about__ring" aria-hidden="true" />
            {PORTRAIT_SRC && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={PORTRAIT_SRC} alt="Kumar Priyam" width={413} height={531} loading="lazy" decoding="async" className="kp-about__img" />
            )}
          </div>
          <figcaption className="kp-about__cap kp-mono">
            {SITE.location} · {SITE.institution}, {SITE.years}
          </figcaption>
        </figure>

        <div className="kp-about__copy" data-sc-in>
          <h2 id="about-title" className="kp-display kp-h1">
            Hi, I&rsquo;m Kumar.
          </h2>
          <p className="kp-lede mt-6">
            I study Computer Science at NIT Delhi, Class of {SITE.classOf}. I like owning the whole system: the product people touch, the model inside it, and the
            pipeline that feeds it.
          </p>
          <p className="kp-body mt-4">
            I compete in algorithmic programming to keep my problem solving sharp, and bring the same rigour to latency budgets, data quality and tests that run against
            real databases.
          </p>
          <p className="kp-about__roles">
            <span className="kp-mono kp-soft">Open to</span>
            {ROLES.map((r) => (
              <span key={r.id} className="kp-role" data-for={r.id} data-size="md">
                <i aria-hidden="true" />
                {r.title}
              </span>
            ))}
          </p>
          <dl className="kp-about__nums">
            {numbers.map((n) => (
              <div key={n.label}>
                <dt className="sr-only">{n.label}</dt>
                <dd className="kp-stat">
                  {n.value}
                  {n.suffix && <small>{n.suffix}</small>}
                </dd>
                <dd className="kp-soft mt-2 text-sm" aria-hidden="true">
                  {n.label}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/profile" className="kp-btn kp-btn--ghost">
              Full profile
              <span className="kp-arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <a href={SITE.github} className="kp-btn kp-btn--ghost" target="_blank" rel="noopener noreferrer">
              GitHub
              <span className="kp-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a href={SITE.linkedin} className="kp-btn kp-btn--ghost" target="_blank" rel="noopener noreferrer">
              LinkedIn
              <span className="kp-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
