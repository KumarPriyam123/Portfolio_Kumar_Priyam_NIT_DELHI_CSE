import type { Metadata } from 'next';
import { ThemeProvider } from '../components/ThemeContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Kumar Priyam | Data Engineering & Full-Stack Developer',
    template: '%s | Kumar Priyam',
  },
  description:
    'B.Tech Computer Science student at NIT Delhi (Class of 2027). Building scalable ETL pipelines, multi-tenant data systems, and Agentic AI workflows.',
  keywords: [
    'Kumar Priyam',
    'NIT Delhi',
    'Data Engineering',
    'ETL Pipelines',
    'Apache Airflow',
    'Multi-Agent RL',
    'RAG-DDR',
    'Full-Stack Developer',
    'FastAPI',
    'PostgreSQL',
    'MERN Stack',
  ],
  authors: [{ name: 'Kumar Priyam' }],
  openGraph: {
    title: 'Kumar Priyam | Data Engineering & Full-Stack Developer',
    description:
      'B.Tech CS @ NIT Delhi. Building scalable ETL pipelines, multi-tenant data systems, and Agentic AI workflows.',
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
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
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
