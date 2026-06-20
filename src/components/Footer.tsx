import Link from 'next/link';

const footerNavLinks = [
  { name: 'Profile', href: '/profile' },
  { name: 'Projects', href: '/projects' },
  { name: 'Research', href: '/research' },
  { name: 'Connect', href: '/connect' },
];

const socialLinks = [
  {
    name: 'github',
    href: 'https://github.com/KumarPriyam123',
    ariaLabel: 'GitHub Profile',
  },
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/in/kumar-priyam-71bbb82a7/',
    ariaLabel: 'LinkedIn Profile',
  },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-900 dark:bg-zinc-950 transition-colors duration-300"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Copyright / Brand */}
          <div className="font-mono text-sm font-bold text-zinc-950 dark:text-white">
            Kumar Priyam{' '}
            <span className="font-normal text-zinc-400">© 2026</span>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Footer Navigation">
            <div className="flex gap-6 text-sm">
              {footerNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-450 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100 transition-colors duration-200"
                aria-label={social.ariaLabel}
              >
                <span className="font-mono text-xs">
                  &lt;{social.name}&gt;
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 text-center text-[10px] text-zinc-400 dark:text-zinc-600 font-mono">
          Designed &amp; built with Next.js &amp; Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}
