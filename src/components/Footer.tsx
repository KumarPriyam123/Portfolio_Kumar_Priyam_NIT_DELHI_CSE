import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="kp-foot">
      <div className="sc-wrap kp-foot__inner">
        <p>
          © 2026 {SITE.name} · {SITE.location}
        </p>
        <p className="flex flex-wrap gap-x-5 gap-y-1">
          <a href={`mailto:${SITE.email}`}>Email</a>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <span>Set in Archivo and Geist · Built with Next.js</span>
        </p>
      </div>
    </footer>
  );
}
