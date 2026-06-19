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
  const truncatedAbstract =
    abstract.length > 200 ? abstract.slice(0, 200) + '...' : abstract;

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-emerald-700/60 dark:hover:shadow-zinc-950/50">
      {/* Publication Label */}
      <div>
        <span className="inline-block font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
          Publication
        </span>

        {/* Title */}
        <h3 className="mt-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
          <Link href={`/research/${slug}`} className="focus:outline-none">
            <span className="absolute inset-0 z-10" aria-hidden="true" />
            {title}
          </Link>
        </h3>

        {/* Authors, Institution, Date */}
        <div className="mt-2 space-y-0.5">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            {authors.join(', ')}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {institution} &middot; {date}
          </p>
        </div>

        {/* Abstract Preview */}
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {truncatedAbstract}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Research topics">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 font-mono text-xs font-medium text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Read More Link */}
      <footer className="mt-6 border-t border-zinc-100 pt-4 dark:border-zinc-800/60">
        <Link
          href={`/research/${slug}`}
          className="relative z-20 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200"
          aria-label={`Read full paper: ${title}`}
        >
          <span>Read Full Paper</span>
          <svg
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </footer>
    </article>
  );
}
