import type { Metadata } from 'next';
import { ThemeProvider } from '../components/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Kumar Priyam — AI Engineer · SDE · Data Engineer',
    template: '%s — Kumar Priyam',
  },
  description:
    'B.Tech Computer Science student at NIT Delhi (Class of 2027). Building multi-agent AI systems, full-stack platforms, and scalable data pipelines — from RAG architectures to production ETL.',
  keywords: [
    'Kumar Priyam',
    'NIT Delhi',
    'AI Engineer',
    'Software Engineer',
    'Data Engineering',
    'Multi-Agent RL',
    'RAG Pipelines',
    'LangChain',
    'FastAPI',
    'Next.js',
    'Full-Stack Developer',
    'Apache Airflow',
  ],
  authors: [{ name: 'Kumar Priyam' }],
  openGraph: {
    title: 'Kumar Priyam — AI Engineer · SDE · Data Engineer',
    description:
      'B.Tech CS @ NIT Delhi. Building multi-agent AI systems, full-stack platforms, and scalable data pipelines.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..600&family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..500&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain font-serif antialiased bg-paper text-ink transition-colors duration-500">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
