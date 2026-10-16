// Profile content. Source of truth: PORTFOLIO_CONTENT.md §3, §5, §6, §7, §8.

export const bio = {
  lede:
    'Kumar Priyam is a Computer Science student at NIT Delhi (Class of 2027), working across AI engineering, software development and data engineering: from multi-agent RL and RAG architectures to full-stack platforms and multi-tenant ETL pipelines.',
  body: [
    'I build production-grade systems end to end: training role-specific LoRA adapters and orchestration policies on one side, shipping FastAPI and Next.js products and reliable data infrastructure on the other.',
    'I compete in algorithmic programming to keep my problem-solving sharp, applying that same mathematical rigour to large-scale data ingestion and the latency constraints of real systems.',
  ],
};

export const skills: { category: string; items: string[] }[] = [
  { category: 'Languages', items: ['Python', 'TypeScript', 'SQL', 'C++', 'JavaScript', 'C'] },
  {
    category: 'AI & ML',
    items: ['PyTorch', 'LoRA', 'GRPO', 'Vector Embeddings', 'Semantic Search', 'NumPy', 'Pandas', 'Scikit-learn', 'OpenAI API', 'Google Gemini API'],
  },
  {
    category: 'Frameworks & APIs',
    items: ['Next.js', 'React.js', 'FastAPI', 'Node.js', 'LangChain', 'RAG Pipelines', 'Multi-Agent LLM Orchestration'],
  },
  {
    category: 'Data Engineering',
    items: ['Apache Airflow', 'n8n Automation', 'ETL/ELT Pipelines', 'Data Partitioning', 'Schema Validation', 'Data Quality Checks'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Pinecone (Vector DB)', 'pgvector', 'Supabase', 'Row-Level Security'],
  },
  {
    category: 'Infrastructure',
    items: ['Docker', 'Linux', 'Git', 'GitHub', 'Cloudflare Tunnel', 'DigitalOcean', 'Vercel', 'Postman', 'VS Code'],
  },
];

// Real figures only. The old "∞" tile is gone: it was not a number.
export const numbers = [
  { value: '5', suffix: 'th', label: 'Cas-a-thon 3.0, out of 200+ teams (2024)' },
  { value: '1,542', suffix: '', label: 'LeetCode peak rating' },
  { value: '300', suffix: '+', label: 'DSA problems solved' },
];

export const education = {
  school: 'National Institute of Technology Delhi',
  degree: 'B.Tech, Computer Science & Engineering',
  years: '2023–2027',
  notes: [
    'Focusing on distributed systems, data engineering and applied ML',
    'LeetCode 1542 peak rating, 300+ problems solved, active on Codeforces and GFG',
    'Top performer in institute coding events (Codeforces, GFG)',
  ],
};

export type TimelineItem = { when: string; title: string; where?: string; facts: string[]; href?: string };

export const timeline: TimelineItem[] = [
  {
    when: '2023',
    title: 'B.Tech, Computer Science',
    where: 'NIT Delhi',
    facts: ['Distributed systems, data engineering, applied ML'],
  },
  {
    when: '2024',
    title: '5th of 200+ teams',
    where: 'Cas-a-thon 3.0',
    facts: ['National-level engineering hackathon', 'Production-ready build under time pressure'],
  },
  {
    when: '2024',
    title: 'Multi-tenant data pipeline',
    where: 'Data engineering',
    facts: ['Airflow ETL at 100K+ records a day', 'Tenant onboarding under 5 minutes'],
    href: '/projects/multi-tenant-pipeline',
  },
  {
    when: '2024–25',
    title: 'Intelligent interview platform',
    where: 'Full-stack + AI',
    facts: ['Under 70ms bidirectional code sync', 'API latency down 46%, 890ms to 420ms'],
    href: '/projects/intelligent-interview',
  },
  {
    when: '2025',
    title: 'MARL-MAPS research',
    where: 'NIT Delhi',
    facts: ['Over-search 27% to 2.3%', '42% faster average inference'],
    href: '/research/marl-maps',
  },
  {
    when: '2026',
    title: 'JobMatch, live',
    where: 'jobmatch.kpriyam.me',
    facts: ['768-d semantic matching on pgvector', 'Zero inbound ports behind a Cloudflare Tunnel'],
    href: '/projects/jobmatch',
  },
  {
    when: '2026',
    title: 'ClinicQ, deployed',
    where: 'WhatsApp-native queue',
    facts: ['No app for patients to install', '160+ tests against a real Postgres'],
    href: '/projects/clinicq',
  },
];
