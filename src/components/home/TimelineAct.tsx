import Link from 'next/link';
import { timeline } from '@/data/profile';

// Momentum: four years travel sideways. Lateral reads as breadth over time.
const SPAN = 2.5;

export default function TimelineAct() {
  return (
    <section className="kp-tl kp-sheet-section" data-sc-act="pan" data-sc-span={SPAN} data-sc-drift="#070a10" style={{ height: `${SPAN * 100}vh` }} aria-labelledby="tl-title">
      <div className="sc-stage kp-tl__stage" data-sc-stage>
        <ol className="kp-tl__rail" data-sc-pan="0.04">
          <li className="kp-tl__lead">
            <h2 id="tl-title" className="kp-display kp-h1">
              Since 2023
            </h2>
            <p className="kp-body mt-5">A degree at NIT Delhi, then research, then systems running in production. Each step is linked to its case study.</p>
          </li>
          {timeline.map((t, k) => (
            <li key={t.title} className="kp-tl__item" style={{ ['--k' as string]: k }}>
              <p className="kp-tl__when">{t.when}</p>
              <h3 className="kp-tl__title">
                {t.href ? (
                  <Link href={t.href} className="kp-link">
                    {t.title}
                  </Link>
                ) : (
                  t.title
                )}
              </h3>
              {t.where && <p className="kp-tl__where">{t.where}</p>}
              <ul className="kp-tl__facts">
                {t.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </li>
          ))}
          <li className="kp-tl__end">
            <p className="kp-tl__when">2027</p>
            <p className="kp-tl__title">Graduating. Open to AI Engineer, SDE and Data Engineer roles.</p>
            <p className="kp-tl__facts">Alongside it all: LeetCode peak 1542, 300+ problems, Codeforces and GFG.</p>
          </li>
        </ol>
      </div>
    </section>
  );
}
