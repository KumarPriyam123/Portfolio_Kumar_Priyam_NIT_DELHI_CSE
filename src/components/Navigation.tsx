'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeContext';

const navLinks = [
  { name: 'Profile', href: '/profile', index: '01' },
  { name: 'Projects', href: '/projects', index: '02' },
  { name: 'Research', href: '/research', index: '03' },
  { name: 'Connect', href: '/connect', index: '04' },
];

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-rule bg-paper/85 backdrop-blur-md transition-colors duration-500"
      aria-label="Main Navigation"
    >
      <div className="mx-auto max-w-editorial px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Masthead wordmark */}
          <Link href="/" className="group flex items-baseline gap-3" aria-label="Kumar Priyam — Home">
            <span className="font-display text-xl font-medium tracking-tight text-ink">
              Kumar&nbsp;Priyam
            </span>
            <span className="hidden border-l border-rule pl-3 eyebrow text-faint sm:inline">
              AI · SDE · Data
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`group inline-flex items-baseline gap-1.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em] transition-colors ${
                      isActive(link.href)
                        ? 'text-accent'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    <span className="text-[9px] text-faint">{link.index}</span>
                    <span className="link-underline">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <span className="h-5 w-px bg-rule" aria-hidden="true" />

            <div className="flex items-center gap-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              <a
                href="https://github.com/KumarPriyam123"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline transition-colors hover:text-ink"
                aria-label="GitHub Profile"
              >
                GH
              </a>
              <a
                href="https://www.linkedin.com/in/kumar-priyam-71bbb82a7/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline transition-colors hover:text-ink"
                aria-label="LinkedIn Profile"
              >
                IN
              </a>
              <button
                onClick={toggleTheme}
                className="grid h-7 w-7 place-items-center rounded-full border border-rule text-ink transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleTheme}
              className="grid h-8 w-8 place-items-center rounded-full border border-rule text-ink transition-colors hover:border-accent hover:text-accent"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="grid h-8 w-8 place-items-center text-ink focus:outline-none"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isOpen ? 'block' : 'hidden'} border-t border-rule bg-paper md:hidden`}
        id="mobile-menu"
      >
        <ul className="px-5 py-4">
          {navLinks.map((link) => (
            <li key={link.name} className="border-b border-rule/60 last:border-0">
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-baseline gap-3 py-3 font-mono text-sm uppercase tracking-[0.14em] ${
                  isActive(link.href) ? 'text-accent' : 'text-ink'
                }`}
              >
                <span className="text-[10px] text-faint">{link.index}</span>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-5 border-t border-rule px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          <a href="https://github.com/KumarPriyam123" target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/kumar-priyam-71bbb82a7/" target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            LinkedIn
          </a>
        </div>
      </div>
    </nav>
  );
}
