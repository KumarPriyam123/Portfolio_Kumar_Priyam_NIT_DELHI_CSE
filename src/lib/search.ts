// BM25 over the text of the case studies, with a small, visible alias table.
// Runs in the browser; nothing leaves the page. This is lexical retrieval, and
// the page says so: it is not presented as embeddings.

import { projects, type Project } from '@/data/projects';

const STOP = new Set(
  'a an the and or of to in for with on by from at as is are be been that this it its into via per who we our your you i my me not no than then each every only when which while without within over under across both all any can will would also but so one two three us use used using based like need needs want looking hiring hire role roles someone engineer engineers developer'.split(' '),
);

export function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/next\.js/g, 'nextjs')
    .replace(/node\.js/g, 'nodejs')
    .replace(/react\.js/g, 'react')
    .replace(/socket\.io/g, 'socketio')
    .replace(/c\+\+/g, 'cpp')
    .replace(/real[\s-]?time/g, 'realtime')
    .replace(/full[\s-]?stack/g, 'fullstack')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const SYN: Record<string, string> = {
  postgre: 'postgresql',
  postgres: 'postgresql',
  pg: 'postgresql',
  node: 'nodejs',
  next: 'nextjs',
  mongo: 'mongodb',
  llms: 'llm',
  agentic: 'agent',
};

// Tech names that end in "s" but are not plurals.
const NOSTEM = new Set(['redis', 'nextjs', 'nodejs', 'socketio', 'jwks', 'cors', 'aws', 'ios', 'kubernetes', 'pandas', 'bus', 'gpus']);

function stem(t: string): string {
  if (SYN[t]) return SYN[t];
  if (NOSTEM.has(t)) return t;
  if (t.length > 4 && t.endsWith('ies')) return t.slice(0, -3) + 'y';
  if (t.length > 4 && t.endsWith('ing')) return t.slice(0, -3);
  if (t.length > 3 && t.endsWith('s') && !t.endsWith('ss')) return t.slice(0, -1);
  return t;
}

export function tokenize(s: string): string[] {
  return norm(s)
    .split(' ')
    .filter((t) => t && !STOP.has(t))
    .map(stem);
}

// Role words a recruiter types, expanded into the stack words my case studies
// actually use. Expanded tokens count at half weight.
const EXPAND: [RegExp, string][] = [
  [/\bai\b|\bml\b|\bllm|genai|machine learning|artificial/, 'rag llm gemini embedding agent langchain retrieval semantic'],
  [/back ?end/, 'fastapi api postgresql redis docker nodejs latency'],
  [/front ?end|\bui\b|\bux\b/, 'react nextjs pwa'],
  [/fullstack/, 'nextjs react fastapi nodejs mern postgresql'],
  [/\bsde\b|\bswe\b|software/, 'fastapi nodejs react nextjs redis docker postgresql api'],
  [/\bdata\b|\betl\b|warehouse|analytics/, 'airflow etl pipeline postgresql partitioning ingestion'],
  [/research|\brl\b|reinforcement/, 'reinforcement agent dec pomdp dpo rag'],
  [/devops|infra|cloud|deploy|platform/, 'docker cloudflare tunnel vercel deploy'],
  [/realtime|latency|websocket/, 'webrtc socketio redis latency'],
  [/vector|semantic|\bsearch\b|retrieval|embedding/, 'pgvector embedding pinecone semantic cosine retrieval'],
  [/\bsql\b|database|\bdb\b/, 'postgresql supabase mongodb'],
  [/\bmern\b/, 'mongodb react nodejs'],
  [/\breact\b|\bnode\b|nodejs|express|mongo/, 'mern nextjs'],
  [/chat ?bot|\bbot\b|messaging/, 'whatsapp'],
  [/python/, 'python fastapi pytorch'],
  [/javascript|typescript|\bjs\b|\bts\b/, 'nextjs react nodejs'],
  [/startup|founding|product/, 'live deploy production'],
];

type Doc = { project: Project; tf: Map<string, number>; len: number };

const FIELDS = (p: Project) => [
  { text: p.title, w: 3 },
  { text: p.tags.join(' '), w: 3 },
  { text: p.description, w: 2 },
  { text: [p.problem, p.approach, p.outcome, ...(p.highlights ?? [])].join(' '), w: 1 },
];

const DOCS: Doc[] = projects.map((project) => {
  const tf = new Map<string, number>();
  let len = 0;
  for (const f of FIELDS(project)) {
    for (const t of tokenize(f.text)) {
      tf.set(t, (tf.get(t) ?? 0) + f.w);
      len += f.w;
    }
  }
  return { project, tf, len };
});
const AVGDL = DOCS.reduce((s, d) => s + d.len, 0) / DOCS.length;
const DF = new Map<string, number>();
for (const d of DOCS) for (const t of d.tf.keys()) DF.set(t, (DF.get(t) ?? 0) + 1);

const K1 = 1.2;
const B = 0.4; // long case studies should not be punished for detail
function idf(t: string) {
  const df = DF.get(t) ?? 0;
  return Math.log(1 + (DOCS.length - df + 0.5) / (df + 0.5));
}

// Display names for tokens shown as "why it matched".
const LABEL: Record<string, string> = {
  rag: 'RAG', llm: 'LLM', gemini: 'Gemini', embedding: 'embeddings', agent: 'agents', langchain: 'LangChain',
  retrieval: 'retrieval', fastapi: 'FastAPI', api: 'API', postgresql: 'PostgreSQL', redis: 'Redis', docker: 'Docker',
  nodejs: 'Node.js', nextjs: 'Next.js', react: 'React', pwa: 'PWA', mern: 'MERN', airflow: 'Airflow', etl: 'ETL',
  pipeline: 'pipelines', partitioning: 'partitioning', ingestion: 'ingestion', reinforcement: 'reinforcement learning',
  dec: 'Dec-POMDP', pomdp: 'Dec-POMDP', dpo: 'DPO', cloudflare: 'Cloudflare', tunnel: 'tunnel', vercel: 'Vercel',
  webrtc: 'WebRTC', socketio: 'Socket.io', latency: 'latency', pgvector: 'pgvector', pinecone: 'Pinecone',
  semantic: 'semantic', cosine: 'cosine', supabase: 'Supabase', mongodb: 'MongoDB', whatsapp: 'WhatsApp',
  python: 'Python', pytorch: 'PyTorch', live: 'live', production: 'production', deploy: 'deploy',
  bullmq: 'BullMQ', multi: 'multi', tenant: 'tenancy', groq: 'Groq', n8n: 'n8n', lora: 'LoRA',
  ai: 'AI', embedd: 'embeddings', fullstack: 'full-stack', realtime: 'real-time',
  backend: 'backend', data: 'data', vector: 'vectors', search: 'search', ingest: 'ingestion', express: 'Express',
};
export const labelFor = (t: string) => LABEL[t] ?? t;

export type Parsed = { raw: string; normed: string; direct: string[]; expanded: string[] };

export function parseQuery(q: string): Parsed {
  const normed = norm(q);
  const direct = Array.from(new Set(tokenize(q)));
  const exp = new Set<string>();
  for (const [re, words] of EXPAND) if (re.test(normed)) for (const w of tokenize(words)) exp.add(w);
  for (const t of direct) exp.delete(t);
  return { raw: q, normed, direct, expanded: Array.from(exp) };
}

export type Ranked = {
  project: Project;
  score: number;
  rel: number; // relative to the top result, 0..1
  matched: string[]; // display labels, direct hits first
};

export function rank(q: string): { parsed: Parsed; results: Ranked[]; hasQuery: boolean } {
  const parsed = parseQuery(q);
  const hasQuery = parsed.direct.length + parsed.expanded.length > 0;
  if (!hasQuery) {
    return {
      parsed,
      hasQuery,
      results: DOCS.map((d) => ({ project: d.project, score: 0, rel: 0, matched: [] })),
    };
  }
  const weighted: [string, number][] = [
    ...parsed.direct.map((t) => [t, 1] as [string, number]),
    ...parsed.expanded.map((t) => [t, 0.5] as [string, number]),
  ];
  const scored = DOCS.map((d, i) => {
    let s = 0;
    const hits: string[] = [];
    for (const [t, w] of weighted) {
      const f = d.tf.get(t);
      if (!f) continue;
      s += w * idf(t) * ((f * (K1 + 1)) / (f + K1 * (1 - B + (B * d.len) / AVGDL)));
      const lab = labelFor(t);
      if (!hits.includes(lab)) hits.push(lab);
    }
    return { project: d.project, score: s, matched: hits.slice(0, 4), i };
  });
  // Stable: ties keep the curated order.
  scored.sort((a, b) => b.score - a.score || a.i - b.i);
  const top = scored[0]?.score || 1;
  return {
    parsed,
    hasQuery,
    results: scored.map(({ i: _i, ...r }) => ({ ...r, rel: top > 0 ? r.score / top : 0 })),
  };
}
