import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollCraftMount from '@/components/ScrollCraftMount';
import { SITE } from '@/lib/site';
import '@/styles/scrollcraft.css';
import './globals.css';

// All faces are vendored in ./fonts (OFL), so the site needs no font packages
// and no network at build time.
const geistSans = localFont({ src: './fonts/Geist-Variable.woff2', variable: '--font-geist-sans', weight: '100 900', display: 'swap' });
const geistMono = localFont({ src: './fonts/GeistMono-Variable.woff2', variable: '--font-geist-mono', weight: '100 900', display: 'swap' });

const archivo = localFont({
  src: './fonts/Archivo-wdth.woff2',
  variable: '--font-archivo',
  weight: '100 900',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '62% 125%' }],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}: AI Engineer, SDE, Data Engineer`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'Kumar Priyam',
    'NIT Delhi',
    'AI Engineer',
    'Software Engineer',
    'SDE',
    'Data Engineering',
    'Multi-Agent RL',
    'RAG Pipelines',
    'LangChain',
    'FastAPI',
    'Next.js',
    'Full-Stack Developer',
    'Apache Airflow',
    'pgvector',
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${SITE.name}: AI Engineer, SDE, Data Engineer`,
    description: 'B.Tech CS at NIT Delhi. Multi-agent AI systems, full-stack platforms and data pipelines, from research to production.',
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image', title: `${SITE.name}: AI Engineer, SDE, Data Engineer` },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#070a10',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <noscript>
          {/* Without the engine nothing would ever fade in. Show everything. */}
          <style>{`[data-sc-cue],[data-sc-in],[data-sc-stagger]>*{opacity:1!important;transform:none!important}.kp-field{display:none}`}</style>
        </noscript>
        <a className="kp-skip" href="#main">
          Skip to content
        </a>
        <div className="kp-grain" aria-hidden="true" />
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
        <ScrollCraftMount />
      </body>
    </html>
  );
}
