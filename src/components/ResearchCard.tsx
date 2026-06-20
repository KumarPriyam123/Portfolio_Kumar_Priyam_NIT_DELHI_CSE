import Link from 'next/link';

interface ResearchCardProps {
  title: string;
  authors: string[];
  institution: string;
  date: string;
  abstract: string;
  tags: string[];
  slug: string;
}

export default function ResearchCard({
  title,
  authors,
  institution,
  date,
  abstract,
  tags,
  slug,
}: ResearchCardProps) {
  const truncated = abstract.length > 280 ? abstract.slice(0, 280) + '…' : abstract;

  return (
    <article className="group relative border border-rule bg-surface p-8 transition-colors duration-300 hover:border-accent sm:p-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="eyebrow text-accent">Publication</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          {institution} · {date}
        </span>
      </div>

      <h3 className="mt-5 font-display text-3xl font-light leading-[1.1] tracking-tight text-ink transition-colors group-hover:text-accent sm:text-4xl">
        <Link href={`/research/${slug}`}>
          <span className="absolute inset-0 z-10" aria-hidden="true" />
          {title}
        </Link>
      </h3>

      <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
        {authors.join(', ')}
      </p>

      <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-muted">
        {truncated}
      </p>

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5" aria-label="Research topics">
        {tags.map((tag) => (
          <span key={tag} className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
            {tag}
          </span>
        ))}
      </div>

      <span className="relative z-20 mt-8 inline-flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
        <span className="link-underline">Read full paper</span>
        <span aria-hidden="true">→</span>
      </span>
    </article>
  );
}
