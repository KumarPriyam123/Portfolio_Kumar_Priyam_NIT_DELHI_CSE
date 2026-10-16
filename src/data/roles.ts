// The three crafts, weighted equally. Every number here is from the case
// studies in projects.ts; nothing is invented for the page.

export type RoleId = 'sde' | 'ai' | 'data';

export type Role = {
  id: RoleId;
  title: string;
  tab: string;
  short: string;
  color: string;
  line: string;
  metrics: { v: string; l: string }[];
  stack: string[];
  claims: { k: string; v: string }[];
  flagships: string[]; // project slugs
};

export const ROLES: Role[] = [
  {
    id: 'sde',
    title: 'Software Engineer',
    tab: 'Software',
    short: 'SDE',
    color: '#5eead4',
    line: 'Full-stack products and real-time systems, shipped and tested.',
    metrics: [
      { v: '<70ms', l: 'code sync' },
      { v: '46%', l: 'lower API latency' },
      { v: '160+', l: 'backend tests' },
    ],
    stack: ['Next.js', 'React', 'Node.js', 'FastAPI', 'PostgreSQL', 'Redis', 'WebRTC', 'Docker'],
    claims: [
      { k: 'Full-stack', v: 'Next.js, React and MERN on the front, FastAPI and Node behind them' },
      { k: 'Real-time', v: 'WebRTC and Socket.io code sync under 70ms; Redis and BullMQ queues' },
      { k: 'Production', v: 'Docker, Cloudflare Tunnel, zero open ports, 160+ tests on a real Postgres' },
    ],
    flagships: ['clinicq', 'intelligent-interview', 'jobmatch'],
  },
  {
    id: 'ai',
    title: 'AI Engineer',
    tab: 'AI',
    short: 'AI',
    color: '#f2b544',
    line: 'RAG, multi-agent RL and LLM systems that run in production.',
    metrics: [
      { v: '91%', l: 'less over-search' },
      { v: '42%', l: 'faster inference' },
      { v: '768-d', l: 'semantic matching' },
    ],
    stack: ['PyTorch', 'LangChain', 'RAG', 'LoRA', 'pgvector', 'Pinecone', 'Gemini'],
    claims: [
      { k: 'Retrieval', v: 'Gemini embeddings on pgvector, Pinecone indexes, RAG pipelines' },
      { k: 'Multi-agent RL', v: 'RAG as a Dec-POMDP: over-search from 27% to 2.3%' },
      { k: 'LLM systems', v: 'Intent parsing, multi-agent questioning, LoRA adapters' },
    ],
    flagships: ['marl-maps', 'jobmatch', 'rag-document-qa'],
  },
  {
    id: 'data',
    title: 'Data Engineer',
    tab: 'Data',
    short: 'Data',
    color: '#ff8a65',
    line: 'Multi-tenant pipelines with automated fault triage.',
    metrics: [
      { v: '100K+', l: 'records a day' },
      { v: '<5 min', l: 'tenant onboarding' },
      { v: '85%+', l: 'fault classification' },
    ],
    stack: ['Airflow', 'PostgreSQL', 'n8n', 'ETL/ELT', 'Groq'],
    claims: [
      { k: 'Pipelines', v: 'Airflow ETL with JSON-driven tenant isolation' },
      { k: 'Reliability', v: 'LLM log triage cut resolution from ~30 to under 10 minutes' },
      { k: 'Ingestion', v: 'Idempotent n8n ingestion with SHA-256 dedup for JobMatch' },
    ],
    flagships: ['multi-tenant-pipeline', 'jobmatch'],
  },
];

export const ROLE: Record<RoleId, Role> = Object.fromEntries(ROLES.map((r) => [r.id, r])) as Record<RoleId, Role>;

// Which crafts each project shows, primary first. Most are mixed on purpose.
export const PROJECT_ROLES: Record<string, RoleId[]> = {
  jobmatch: ['sde', 'ai', 'data'],
  clinicq: ['sde', 'ai'],
  'marl-maps': ['ai'],
  'intelligent-interview': ['sde', 'ai'],
  'multi-tenant-pipeline': ['data', 'ai'],
  'rag-document-qa': ['ai', 'data'],
};
