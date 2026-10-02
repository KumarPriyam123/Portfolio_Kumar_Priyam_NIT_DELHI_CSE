export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  category: 'data-engineering' | 'ai-research' | 'fullstack';
  problem: string;
  approach: string;
  outcome: string;
  githubUrl?: string;
  liveUrl?: string;
  highlights?: string[];
  metrics?: { value: string; label: string }[];
}

export const projects: Project[] = [
  {
    slug: 'jobmatch',
    title: 'JobMatch: Semantic Job-Matching Platform',
    description:
      'Multi-tenant platform ranking remote jobs against your résumé via Gemini vector embeddings and pgvector.',
    tags: [
      'Next.js 15',
      'FastAPI',
      'Supabase/pgvector',
      'Google Gemini',
      'n8n',
      'Docker',
      'Cloudflare Tunnel',
    ],
    category: 'fullstack',
    problem:
      'Keyword job boards flood candidates with noise while the roles that actually fit their experience get buried. Matching by keyword overlap fails to capture whether a job truly aligns with a résumé, and single-user automation scripts cannot serve multiple users with isolated, private data.',
    approach:
      'Treated matching as a semantic retrieval problem: embedded both résumés and job descriptions into the same 768-dimension Gemini vector space and ranked every job by pgvector cosine similarity. Built an idempotent n8n ingestion pipeline pulling from Adzuna and RemoteOK daily with SHA-256 URL-hash deduplication, and enforced true multi-tenancy with Postgres Row-Level Security and asymmetric ES256/JWKS JWT verification.',
    outcome:
      'Shipped a live multi-user product self-hosted on a DigitalOcean droplet behind a Cloudflare Tunnel (zero open inbound ports) with the Next.js frontend on Vercel. First live ingestion pulled 72 real jobs into the shared pool; matching, auth isolation, dedup, ingestion, and the opt-in nightly email digest were each verified end to end.',
    githubUrl: 'https://github.com/KumarPriyam123/JobAutomation',
    liveUrl: 'https://jobmatch.kpriyam.me/login',
    metrics: [
      { value: '768-d', label: 'vector match' },
      { value: '0', label: 'inbound ports' },
      { value: 'Live', label: 'multi-tenant' },
    ],
    highlights: [
      'Semantic matching over keyword search — Gemini 768-d L2-normalized embeddings (RETRIEVAL_QUERY for résumés, RETRIEVAL_DOCUMENT for jobs) ranked by pgvector ivfflat cosine index',
      'Database-enforced multi-tenancy via Postgres Row-Level Security — per-request transaction sets request.jwt.claims and SET LOCAL role authenticated so auth.uid() resolves inside the DB',
      'Asymmetric JWT verification — caches Supabase JWKS public keyset and verifies ES256 tokens locally, no per-request round-trip to the auth server',
      'Idempotent daily ingestion in n8n from Adzuna + RemoteOK with SHA-256 url_hash dedup enforced at the DB level (ON CONFLICT DO NOTHING)',
      'Multi-résumé support with best-fit attribution — DISTINCT ON … ORDER BY score DESC surfaces each job once under its strongest-matching résumé',
      'Opt-in nightly email digest (off by default) of top matches, enforced at the query layer and toggled per user',
      'Self-hosted FastAPI in Docker Compose behind a Cloudflare Tunnel on a custom .me domain — API binds only to loopback, no inbound ports open',
    ],
  },
  {
    slug: 'clinicq',
    title: 'ClinicQ: WhatsApp Virtual Queue for Clinics',
    description:
      'WhatsApp-native token queue for single-doctor Indian clinics: patients book, track live ETA, and check in with no app, while reception runs the queue from a one-thumb PWA.',
    tags: [
      'WhatsApp Cloud API',
      'FastAPI',
      'Next.js 14 PWA',
      'PostgreSQL/Supabase',
      'APScheduler',
      'Gemini / Claude Haiku',
      'Docker',
      'Cloudflare Tunnel',
    ],
    category: 'fullstack',
    problem:
      'Small Indian clinics run on paper tokens and verbal estimates: patients wait blind for hours, absentees stall the doctor while present patients sit idle, and after-hours enquiries are simply lost. Patients will not install an app, and receptionists working on cheap Android phones, interrupted constantly, need something that works with one thumb.',
    approach:
      'Met patients where they already are: the entire booking, live position/ETA, check-in and cancel journey runs on WhatsApp buttons and lists, with an LLM parsing only free-text Hinglish/Devanagari into a strict intent schema. Underneath sits a pure, side-effect-free queue engine built on three rules: sort by a clamped priority_time rather than booking order, compute ETAs by a forward walk from the doctor\'s live clock, and at call time serve the first patient who has actually arrived. The clinic drives everything from a bilingual, mobile-first PWA with one big NEXT button and a 5-second undo on every action.',
    outcome:
      'Built in phased, test-gated milestones (schema → engine → WhatsApp layer → conversation/LLM → scheduler jobs → panel) and deployed: FastAPI in Docker on a DigitalOcean droplet behind a Cloudflare Tunnel, Postgres on Supabase, and the panel on Vercel. Verified with a full live WhatsApp round-trip and a session simulator, backed by 160+ backend tests that run against a real Postgres (pg-skipped tests are a hard failure, not a green bar). Pilot-ready, with no-show, after-hours-capture and wait-time metrics queryable straight from the append-only event log.',
    githubUrl: 'https://github.com/KumarPriyam123/Clinic-Automation',
    liveUrl: 'https://clinic-automation-ten.vercel.app',
    metrics: [
      { value: '0', label: 'apps to install' },
      { value: 'hi/en', label: 'bilingual' },
      { value: '160+', label: 'tests' },
    ],
    highlights: [
      'Pure queue engine (no WhatsApp/LLM/web imports, enforced by a test) that returns notifications as data — a single dispatcher is the only bridge to WhatsApp',
      'Priority-time ordering clamped to max(now, session start) so nobody can claim a past slot to leapfrog the waiting room or book into a session that is closed',
      'ETA as a forward walk from the doctor\'s live clock; patients are pinged only when their ETA shifts by more than 10 minutes, keeping messaging calm',
      '"Present beats absent": NEXT serves the first ARRIVED patient, absentees are skipped instantly with a grace window — and held, not skipped, when nobody has arrived',
      'Self-learning consult time via an EMA (0.7/0.3) bounded to 30s–45min, after a forgotten NEXT tap once produced a 26-hour "consult" that poisoned every ETA',
      'Gap pull-forward when a cancellation frees the doctor: auto-call an arrived patient, otherwise offer the slot to remote patients within a 30-minute horizon with a 5-minute expiry',
      'LLM confined to intent parsing (Gemini Flash or Claude Haiku, temperature 0, strict JSON): it never mutates state, re-asks with buttons below 0.7 confidence, and routes medical questions to a fixed safe reply',
      'WhatsApp layer with a single send() gateway, 24-hour-window template fallback, wamid-deduped webhooks, idempotent per-entry notification stamps, and a DPDP-compliant STOP/delete flow',
      'Concurrency-safe Postgres with no ORM and no Redis: SELECT … FOR UPDATE session locks, race-safe token numbers, and an append-only events table behind every state change',
      'Receptionist PWA in Hindi-first, bilingual copy with 56px touch targets, a fixed 72px NEXT button, 4s polling with optimistic updates, offline read-only cache and JWT slug + PIN auth',
      'Production hardening: strict panel CORS allow-list, bearer-guarded /metrics that fails closed, single-instance scheduler guard to prevent duplicate patient sends',
    ],
  },
  {
    slug: 'marl-maps',
    title: 'MARL-MAPS: Dynamic Multi-Agent RL for Optimized RAG',
    description:
      'Decentralized Reinforcement Learning policy architecture eliminating RAG Context Tax.',
    tags: ['Python', 'Multi-Agent RL', 'RAG-DDR', 'Dec-POMDP', 'LangChain'],
    category: 'ai-research',
    problem:
      'Traditional Retrieval-Augmented Generation (RAG) pipelines suffer from a "Context Tax"—bloating LLM input with noisy documents which spikes latency and increases hallucination risks. Furthermore, strict, sequential one-way pipelines prevent adaptive backtracking when early retrieval steps fail.',
    approach:
      'Formalized the RAG process as a Decentralized Partially Observable Markov Decision Process (Dec-POMDP) driven by a learnable Orchestrator policy. Implemented a Shared Global Working Memory (SGWM) to prevent context drift and established a "Confidence as Currency" bi-directional negotiation protocol.',
    outcome:
      'Slashed the over-search rate by 91% (dropping from 27% to 2.3%), eliminating unnecessary retrieval rounds. Improved exact match and F1 scores significantly while achieving a 42% faster average inference time.',
    githubUrl: 'https://github.com/KumarPriyam123',
    metrics: [
      { value: '91%', label: 'less over-search' },
      { value: '42%', label: 'faster inference' },
    ],
    highlights: [
      'Formalized RAG as Dec-POMDP — each module (query rewriter, retriever, selector, generator) acts as an autonomous agent under partial observability',
      'Shared Global Working Memory (SGWM) provides centralized state representation preventing redundant information gathering and context drift',
      '"Confidence as Currency" bi-directional negotiation protocol enables adaptive backtracking when confidence is low',
      'RAG-DDR integration with Differentiable Data Rewards and DPO (Direct Preference Optimization) for end-to-end pipeline optimization',
      'Over-search rate reduced by 91% (27% → 2.3%)',
      '42% faster average inference time',
      'Significant improvement in exact match and F1 scores',
    ],
  },
  {
    slug: 'intelligent-interview',
    title: 'Intelligent Interview System',
    description:
      'Low-latency candidate evaluation platform utilizing multi-agent AI consensus pipelines.',
    tags: [
      'MERN Stack',
      'Google Gemini API',
      'WebRTC',
      'Redis',
      'BullMQ',
      'Socket.io',
      'Monaco Editor',
    ],
    category: 'fullstack',
    problem:
      'Existing technical hiring platforms face functional fragmentation, scalability constraints under high concurrent user loads, and static assessments that fail to adapt in real-time to candidate performance.',
    approach:
      'Co-architected a full-stack low-latency platform using the MERN stack and Google Gemini API. Engineered a multi-agent MockLLM framework to dynamically adjust questioning, backed by Redis caching and BullMQ job queues for async orchestration. Integrated WebRTC and Socket.io with Monaco Editor for a real-time collaborative workspace.',
    outcome:
      'Delivered bidirectional code synchronization with <70ms latency and a multi-language code execution engine boasting a 1.4s average response time. Reduced overall API latency by 46% (890ms to 420ms) and improved candidate answer quality by 12.3% during pilot evaluations.',
    githubUrl: 'https://github.com/KumarPriyam123/Interview-Platforms_Users',
    metrics: [
      { value: '<70ms', label: 'code sync' },
      { value: '46%', label: 'lower API latency' },
      { value: '+12.3%', label: 'answer quality' },
    ],
    highlights: [
      'Multi-agent MockLLM framework dynamically adjusts questioning difficulty based on real-time candidate performance analysis',
      'WebRTC + Socket.io integration delivers bidirectional code synchronization with <70ms latency',
      'Monaco Editor provides full IDE experience with syntax highlighting and multi-language support',
      'Redis caching + BullMQ job queues handle async orchestration and high concurrent loads',
      'Multi-language code execution engine with 1.4s average response time',
      'API latency reduced by 46% (890ms → 420ms)',
      'Candidate answer quality improved by 12.3% in pilot evaluations',
    ],
  },
  {
    slug: 'multi-tenant-pipeline',
    title: 'Multi-Tenant Data Pipeline System',
    description:
      'Highly isolated, Airflow-driven ingestion system with automated LLM fault classification.',
    tags: [
      'Apache Airflow',
      'PostgreSQL',
      'Groq API',
      'ETL/ELT Pipelines',
      'Docker',
    ],
    category: 'data-engineering',
    problem:
      'Managing data ingestion for multiple clients requires strict tenant-level isolation, scalable data partitioning, and robust error handling to prevent manual debugging bottlenecks.',
    approach:
      'Built a multi-tenant ETL system utilizing Apache Airflow and PostgreSQL with isolated, JSON-driven DAG configurations. Integrated the Groq API to automatically parse system logs and classify pipeline failures, enforcing a two-phase execution flow to validate AI suggestions.',
    outcome:
      'Successfully processed over 100K records per day while cutting new-tenant onboarding time to under 5 minutes. Reduced mean pipeline resolution time from roughly 30 minutes to under 10 minutes with an 85%+ accuracy rate in failure classification.',
    githubUrl: 'https://github.com/KumarPriyam123',
    metrics: [
      { value: '100K+', label: 'records / day' },
      { value: '<5 min', label: 'tenant onboarding' },
      { value: '85%+', label: 'fault accuracy' },
    ],
    highlights: [
      'JSON-driven DAG configurations enable strict tenant-level isolation without code changes',
      'Groq API integration automatically parses system logs and classifies pipeline failures',
      'Two-phase execution flow validates AI-suggested fixes before applying them',
      'Processes 100K+ records per day with tenant-isolated partitioning',
      'New-tenant onboarding reduced to under 5 minutes',
      'Mean pipeline resolution time cut from ~30 min to under 10 min',
      '85%+ accuracy rate in automated failure classification',
    ],
  },
  {
    slug: 'rag-document-qa',
    title: 'RAG-Based Document Q&A System',
    description:
      'Highly concurrent vector retrieval pipeline packaged for instant deployment.',
    tags: ['FastAPI', 'Python', 'Pinecone', 'Docker', 'Vector Embeddings'],
    category: 'data-engineering',
    problem:
      'Querying large, unstructured document corpora requires an architecture capable of handling concurrent ingestion and retrieval requests without blocking system throughput.',
    approach:
      'Designed a highly concurrent retrieval-augmented generation pipeline using FastAPI and Python. Implemented document chunking, embedding, and optimized index writes to a Pinecone Vector Database, packaging the entire environment into Docker containers with configurable worker counts.',
    outcome:
      'Achieved consistent retrieval latency and relevance scores under high concurrent load in a production-like environment.',
    githubUrl: 'https://github.com/KumarPriyam123',
    metrics: [
      { value: 'Async', label: 'concurrent retrieval' },
      { value: 'Docker', label: 'instant deploy' },
    ],
    highlights: [
      'FastAPI async endpoints handle concurrent ingestion and retrieval without blocking',
      'Intelligent document chunking with overlap for context preservation',
      'Optimized batch index writes to Pinecone Vector Database',
      'Docker containers with configurable worker counts for horizontal scaling',
      'Consistent retrieval latency under high concurrent load',
      'Production-grade environment packaging for instant deployment',
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(
  category: Project['category'] | 'all'
): Project[] {
  if (category === 'all') return projects;
  return projects.filter((project) => project.category === category);
}
