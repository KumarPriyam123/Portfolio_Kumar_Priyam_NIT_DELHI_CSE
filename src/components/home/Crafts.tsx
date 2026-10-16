import Link from "next/link";
import { projects } from "@/data/projects";
import { ROLE, type Role } from "@/data/roles";
import { splitTitle } from "@/lib/site";
import { AiFig, DataFig, SdeFig } from "@/components/art/CraftFigs";

// Software and AI side by side at equal weight, data underneath both.
// Every number comes from roles.ts, which takes it from the case studies.

const nameOf = (slug: string) =>
  splitTitle(projects.find((p) => p.slug === slug)?.title ?? slug).name;

function Craft({
  r,
  n,
  fig,
  wide = false,
}: {
  r: Role;
  n: string;
  fig: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <article
      className="kp-craft"
      data-for={r.id}
      data-wide={wide ? "true" : undefined}
      aria-labelledby={`craft-${r.id}`}
    >
      <div className="kp-craft__body">
        <div className="kp-craft__main">
          <header className="kp-craft__head">
            <span className="kp-craft__n kp-mono">{n}</span>
            <h3 id={`craft-${r.id}`} className="kp-craft__t">
              {r.title}
            </h3>
          </header>
          <p className="kp-craft__line">{r.line}</p>
          <dl className="kp-craft__metrics">
            {r.metrics.map((m) => (
              <div key={m.l}>
                <dt className="sr-only">{m.l}</dt>
                <dd className="kp-craft__mv">{m.v}</dd>
                <dd className="kp-craft__ml" aria-hidden="true">
                  {m.l}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="kp-craft__more">
          <ul className="kp-craft__claims">
            {r.claims.map((c) => (
              <li key={c.k}>
                <span className="kp-craft__ck">{c.k}</span>
                <span className="kp-craft__cv">{c.v}</span>
              </li>
            ))}
          </ul>
          <p className="kp-chips" aria-label={`${r.title} stack`}>
            {r.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </p>
          <p className="kp-craft__links">
            <span className="kp-mono kp-soft">See it in</span>
            {r.flagships.map((slug) => (
              <Link key={slug} href={`/projects/${slug}`} className="kp-link">
                {nameOf(slug)}
              </Link>
            ))}
          </p>
        </div>
      </div>
      <div className="kp-craft__fig">{fig}</div>
    </article>
  );
}

export default function Crafts() {
  return (
    <section
      id="crafts"
      className="kp-sheet-section kp-crafts"
      data-sc-act="flow"
      aria-labelledby="crafts-title"
    >
      <div className="sc-wrap">
        <div className="kp-crafts__head" data-sc-in>
          <h2 id="crafts-title" className="kp-display kp-h1">
            What I build
          </h2>
          <p className="kp-lede">
            Products people use, the models inside them, and the pipelines that
            feed both.
          </p>
        </div>
        <div className="kp-crafts__pair" data-sc-in data-sc-stagger="90">
          <Craft r={ROLE.sde} n="01" fig={<SdeFig />} />
          <Craft r={ROLE.ai} n="02" fig={<AiFig />} />
        </div>
        <div data-sc-in>
          <Craft r={ROLE.data} n="03" fig={<DataFig />} wide />
        </div>
      </div>
    </section>
  );
}
