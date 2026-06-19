interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = 'left',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-12 ${isCenter ? 'flex flex-col items-center text-center' : ''}`}
    >
      {label && (
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
          {label}
        </span>
      )}

      <h2
        className={`${label ? 'mt-2' : ''} text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl`}
      >
        {title}
      </h2>

      <div
        className={`mt-4 h-1 w-12 rounded bg-emerald-500 dark:bg-emerald-400 ${isCenter ? 'mx-auto' : ''}`}
        aria-hidden="true"
      />

      {subtitle && (
        <p
          className={`mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 ${isCenter ? 'max-w-2xl' : 'max-w-xl'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
