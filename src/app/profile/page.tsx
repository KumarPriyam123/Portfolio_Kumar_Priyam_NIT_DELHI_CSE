import type { Metadata } from 'next';
import Link from 'next/link';
import { bio, education, numbers, skills } from '@/data/profile';
import { CTA_LABEL, PORTRAIT_SRC, RESUMES, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Kumar Priyam, B.Tech Computer Science at NIT Delhi (Class of 2027): AI engineering, software development and data engineering.',
  alternates: { canonical: '/profile' },
};

export default function ProfilePage() {
  return (
    <div className="kp-page pb-[var(--sc-section)]">
      <div className="sc-wrap">
        <header className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end" data-sc-in>
          <div>
            <h1 className="kp-display kp-h1">About Kumar</h1>
            <p className="kp-lede mt-6 max-w-[40ch]">{bio.lede}</p>
          </div>
          {PORTRAIT_SRC ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={PORTRAIT_SRC} alt="Kumar Priyam" width={640} height={800} className="w-full max-w-sm rounded-[var(--sc-r-md)] object-cover lg:justify-self-end" style={{ height: 'auto' }} />
          ) : (
            <dl className="kp-dl">
              <dt>Based in</dt>
              <dd>{SITE.location}</dd>
              <dt>Studying</dt>
              <dd>
                B.Tech CSE, {SITE.institution}, {SITE.years}
              </dd>
              <dt>Status</dt>
              <dd>{SITE.status}: AI Engineer, SDE, Data Engineer</dd>
            </dl>
          )}
        </header>

        <div className="kp-spread mt-16" data-sc-in>
          <h2 className="kp-spread__k">How I work</h2>
          <div className="kp-prose">
            {bio.body.map((b) => (
              <p key={b}>{b}</p>
            ))}
          </div>
        </div>

        <section className="kp-spread" aria-labelledby="numbers-title" data-sc-in>
          <h2 id="numbers-title" className="kp-spread__k">
            By the numbers
          </h2>
          <dl className="grid gap-8 sm:grid-cols-3">
            {numbers.map((n) => (
              <div key={n.label}>
                <dt className="sr-only">{n.label}</dt>
                <dd className="kp-stat kp-stat--lg">
                  {n.value}
                  {n.suffix && <small>{n.suffix}</small>}
                </dd>
                <dd className="kp-soft mt-2" aria-hidden="true">
                  {n.label}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="kp-spread" aria-labelledby="stack-title" data-sc-in>
          <h2 id="stack-title" className="kp-spread__k">
            Stack
          </h2>
          <dl className="kp-dl">
            {skills.map((s) => (
              <div key={s.category} className="contents">
                <dt>{s.category}</dt>
                <dd>{s.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="kp-spread" aria-labelledby="edu-title" data-sc-in>
          <h2 id="edu-title" className="kp-spread__k">
            Education
          </h2>
          <div>
            <p className="kp-display kp-h3">{education.school}</p>
            <p className="kp-soft mt-2">
              {education.degree} · {education.years}
            </p>
            <ul className="mt-5 grid gap-2">
              {education.notes.map((n) => (
                <li key={n} className="kp-prose">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="resume" className="kp-spread" aria-labelledby="resume-title" data-sc-in>
          <h2 id="resume-title" className="kp-spread__k">
            Résumé
          </h2>
          <div>
            <ul className="kp-list">
              {RESUMES.map((r, i) => (
                <li key={r.id}>
                  <span className="kp-list__n">{String.fromCharCode(65 + i)}</span>
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="group block">
                    <span className="kp-lead group-hover:text-accent">{r.label} ↗</span>
                    <span className="kp-soft block text-sm">{r.blurb}</span>
                  </a>
                </li>
              ))}
            </ul>
            <Link href="/connect" className="kp-btn kp-btn--accent mt-8">
              {CTA_LABEL}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
