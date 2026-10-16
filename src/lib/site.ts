// One place for identity, links and résumés. Previously these were duplicated
// across three pages; change them here only.

export const SITE = {
  name: 'Kumar Priyam',
  url: 'https://kpriyam.me',
  role: 'Software Engineer · AI Engineer · Data Engineer',
  status: 'Open to roles',
  location: 'New Delhi, India',
  institution: 'NIT Delhi',
  institutionLong: 'National Institute of Technology Delhi',
  degree: 'B.Tech, Computer Science & Engineering',
  years: '2023–2027',
  classOf: '2027',
  email: 'kpriyam2005p@gmail.com',
  phone: '+91 97735 93089',
  phoneHref: 'tel:+919773593089',
  github: 'https://github.com/KumarPriyam123',
  linkedin: 'https://www.linkedin.com/in/kumar-priyam-71bbb82a7/',
  description:
    'B.Tech Computer Science at NIT Delhi, Class of 2027. Building full-stack platforms, AI systems and data pipelines, from real-time products and RAG to production ETL.',
} as const;

// One per craft, in craft order. `id` matches RoleId in src/data/roles.ts so
// the hero can link the résumé for the craft on screen.
export const RESUMES = [
  {
    id: 'sde',
    label: 'Software Engineer',
    blurb: 'Full-stack, backend and real-time systems',
    href: 'https://drive.google.com/file/d/1sDOkbyz0YaCgN3EzVKoCykDRa7ZAyBo9/view',
  },
  {
    id: 'ai',
    label: 'AI Engineer',
    blurb: 'RAG, multi-agent RL and LLM systems',
    href: 'https://drive.google.com/file/d/1lPMTdrULT4iWPU5typRmVDVlBtF81wHf/view',
  },
  {
    id: 'data',
    label: 'Data Engineer',
    blurb: 'ETL pipelines, Airflow, data infrastructure',
    href: 'https://drive.google.com/file/d/1XJmW1XJ5lQ17fY251xmbZpC3lzsZgviR/view',
  },
] as const;

export const resumeFor = (id: string) => RESUMES.find((r) => r.id === id) ?? RESUMES[0];

// Background-removed cutout (413×531). The hero portrait is generated from it.
export const PORTRAIT_SRC: string | null = '/portrait/kumar-cutout.webp';

export const WEB3FORMS_KEY = '79001377-2d40-48d5-af4c-4a629bedb258';

// The one primary action, one label, everywhere.
export const CTA_LABEL = 'Start a conversation';

/** Visible copy never carries an em dash. Data written with them is cleaned at render. */
export function clean(s: string): string {
  return s.replace(/\s+—\s+/g, ': ').replace(/—/g, ', ');
}

/** "Lead — detail" highlights render as a strong lead and a soft detail. */
export function splitLead(s: string): { lead: string; detail: string | null } {
  const i = s.indexOf(' — ');
  if (i === -1) return { lead: s, detail: null };
  return { lead: s.slice(0, i), detail: clean(s.slice(i + 3)) };
}

/** "JobMatch: Semantic Job-Matching Platform" → name + subtitle. */
export function splitTitle(t: string): { name: string; sub: string | null } {
  const i = t.indexOf(': ');
  if (i === -1) return { name: t, sub: null };
  return { name: t.slice(0, i), sub: t.slice(i + 2) };
}
