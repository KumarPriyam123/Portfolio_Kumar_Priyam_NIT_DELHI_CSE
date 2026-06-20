import Link from 'next/link';

const footerNavLinks = [
  { name: 'Profile', href: '/profile' },
  { name: 'Projects', href: '/projects' },
  { name: 'Research', href: '/research' },
  { name: 'Connect', href: '/connect' },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/KumarPriyam123' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/kumar-priyam-71bbb82a7/' },
  { name: 'Email', href: 'mailto:kpriyam2005p@gmail.com' },
];

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-paper transition-colors duration-500" role="contentinfo">
      <div className="mx-auto max-w-editorial px-5 sm:px-8">
        {/* Big editorial sign-off */}
        <div className="grid gap-10 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-7">
            <p className="eyebrow text-faint">— Colophon</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Let&rsquo;s build something
              <span className="italic text-accent"> worth shipping.</span>
            </h2>
            <Link
              href="/connect"
              className="mt-7 inline-flex items-baseline gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink"
            >
              <span className="link-underline">Start a conversation</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-5">
            <div>
              <p className="eyebrow text-faint">Index</p>
              <ul className="mt-4 space-y-2.5">
                {footerNavLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="font-serif text-[15px] text-muted transition-colors hover:text-ink"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-faint">Elsewhere</p>
              <ul className="mt-4 space-y-2.5">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="font-serif text-[15px] text-muted transition-colors hover:text-ink"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Fine print */}
        <div className="flex flex-col gap-3 border-t border-rule py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Kumar Priyam</span>
          <span>Set in Fraunces &amp; Newsreader · Built with Next.js</span>
          <span>New Delhi, India</span>
        </div>
      </div>
    </footer>
  );
}
