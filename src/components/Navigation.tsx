'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CTA_LABEL, RESUMES, SITE } from '@/lib/site';
import { clearQuery, useQuery } from '@/lib/query-store';

const LINKS = [
  { href: '/projects', label: 'Work' },
  { href: '/research', label: 'Research' },
  { href: '/profile', label: 'Profile' },
];

function ResumeMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        ref.current?.querySelector('button')?.focus();
      }
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);
  return (
    <div className="kp-menu kp-hide-sm" ref={ref}>
      <button type="button" className="kp-btn kp-btn--ghost kp-btn--sm" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)}>
        Résumé
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : undefined, transition: 'transform 160ms' }}>
          <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
      {open && (
        <div className="kp-menu__panel" role="menu">
          {RESUMES.map((r) => (
            <a key={r.id} role="menuitem" className="kp-menu__item" href={r.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
              <span className="block font-medium">{r.label}</span>
              <span className="block text-[0.8rem] text-soft">{r.blurb}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const q = useQuery();
  const [solid, setSolid] = useState(false);
  const [pastHero, setPastHero] = useState(pathname !== '/');
  const [sheet, setSheet] = useState(false);

  useEffect(() => {
    const on = () => {
      setSolid(scrollY > 8);
      setPastHero(pathname !== '/' || scrollY > innerHeight * 0.62);
    };
    on();
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, [pathname]);

  useEffect(() => setSheet(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = sheet ? 'hidden' : '';
  }, [sheet]);

  const showChip = q.source === 'user' && q.text.trim().length > 0;

  return (
    <header className="kp-nav" data-solid={solid || sheet ? 'true' : 'false'}>
      <nav className="kp-nav__inner" aria-label="Primary">
        {/* On the home hero the name is already on screen at full scale. */}
        <Link href="/" className="kp-wordmark" data-hidden={!pastHero && !sheet ? 'true' : 'false'} aria-label={`${SITE.name}, home`}>
          {SITE.name}
        </Link>
        <div className="kp-navlinks">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="kp-navlink" aria-current={pathname.startsWith(l.href) ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="kp-nav__right">
          {showChip && (
            <span className="kp-qchip kp-hide-sm" title={`Your query: ${q.text}`}>
              <Link href="/projects" className="kp-qchip__text">
                <span className="sr-only">Your query: </span>“{q.text}”
              </Link>
              <button type="button" className="kp-qchip__x" onClick={clearQuery} aria-label="Clear your query">
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                  <path d="M2 2l6 6M8 2 2 8" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
            </span>
          )}
          <ResumeMenu />
          <Link href="/connect" className="kp-btn kp-btn--accent kp-btn--sm kp-hide-sm">
            {CTA_LABEL}
          </Link>
          <button type="button" className="kp-burger" aria-expanded={sheet} aria-controls="kp-sheet" aria-label={sheet ? 'Close menu' : 'Open menu'} onClick={() => setSheet((s) => !s)}>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              {sheet ? <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.5" /> : <path d="M3 7h14M3 13h14" stroke="currentColor" strokeWidth="1.5" />}
            </svg>
          </button>
        </div>
      </nav>
      <div id="kp-sheet" className="kp-sheet" data-open={sheet ? 'true' : 'false'}>
        <Link className="kp-sheet__link" href="/">
          Home
        </Link>
        {LINKS.map((l) => (
          <Link key={l.href} className="kp-sheet__link" href={l.href}>
            {l.label}
          </Link>
        ))}
        <Link className="kp-sheet__link" href="/connect">
          {CTA_LABEL}
        </Link>
        <div className="mt-8 grid gap-3">
          <p className="kp-label">Résumé</p>
          {RESUMES.map((r) => (
            <a key={r.id} className="kp-btn kp-btn--ghost justify-between" href={r.href} target="_blank" rel="noopener noreferrer">
              {r.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
          {showChip && (
            <p className="mt-4 text-sm text-soft">
              Your query: <span className="text-ink">“{q.text}”</span>{' '}
              <button type="button" className="kp-clear" onClick={clearQuery}>
                Clear
              </button>
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
