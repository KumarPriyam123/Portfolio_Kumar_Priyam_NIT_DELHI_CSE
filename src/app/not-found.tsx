import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="kp-page pb-[var(--sc-section)]">
      <div className="sc-wrap min-h-[52svh]">
        <p className="kp-label">404</p>
        <h1 className="kp-display kp-h1 mt-4">Record not found.</h1>
        <p className="kp-lede mt-5">The page you asked for is not in this index.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="kp-btn kp-btn--accent">
            See all work
          </Link>
          <Link href="/" className="kp-btn kp-btn--ghost">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
