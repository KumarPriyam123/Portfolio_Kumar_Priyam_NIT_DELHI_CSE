// The vocabulary of the latent field: real terms from Kumar's stack.
// `re` runs against normalised text (see norm() in search.ts), so it is used
// both to find which projects use a term and whether a query hits it.

export type Domain = 'ai' | 'sw' | 'data';

export type Term = { id: string; label: string; domain: Domain; re: RegExp };

export const DOMAIN_LABEL: Record<Domain, string> = {
  ai: 'AI & research',
  sw: 'Software',
  data: 'Data',
};

export const TERMS: Term[] = [
  // AI & research
  { id: 'rag', label: 'RAG', domain: 'ai', re: /\brag\b|retrieval augmented/ },
  { id: 'langchain', label: 'LangChain', domain: 'ai', re: /langchain/ },
  { id: 'gemini', label: 'Gemini', domain: 'ai', re: /gemini/ },
  { id: 'embeddings', label: 'embeddings', domain: 'ai', re: /embedding|semantic|cosine/ },
  { id: 'marl', label: 'multi-agent RL', domain: 'ai', re: /multi agent rl|multi agent reinforcement|reinforcement learning|\bmarl\b/ },
  { id: 'decpomdp', label: 'Dec-POMDP', domain: 'ai', re: /dec pomdp|markov decision/ },
  { id: 'dpo', label: 'DPO', domain: 'ai', re: /\bdpo\b|preference optimization/ },
  { id: 'lora', label: 'LoRA', domain: 'ai', re: /\blora\b|fine tun/ },
  { id: 'pytorch', label: 'PyTorch', domain: 'ai', re: /pytorch/ },
  { id: 'llm', label: 'LLM APIs', domain: 'ai', re: /\bllm|claude|haiku|groq|openai|mockllm/ },
  // Software
  { id: 'nextjs', label: 'Next.js', domain: 'sw', re: /nextjs/ },
  { id: 'react', label: 'React', domain: 'sw', re: /\breact\b|\bmern\b/ },
  { id: 'fastapi', label: 'FastAPI', domain: 'sw', re: /fastapi/ },
  { id: 'node', label: 'Node.js', domain: 'sw', re: /nodejs|express|\bmern\b/ },
  { id: 'typescript', label: 'TypeScript', domain: 'sw', re: /typescript/ },
  { id: 'webrtc', label: 'WebRTC', domain: 'sw', re: /webrtc/ },
  { id: 'socketio', label: 'Socket.io', domain: 'sw', re: /socketio/ },
  { id: 'redis', label: 'Redis', domain: 'sw', re: /redis/ },
  { id: 'bullmq', label: 'BullMQ', domain: 'sw', re: /bullmq|job queue/ },
  { id: 'whatsapp', label: 'WhatsApp API', domain: 'sw', re: /whatsapp/ },
  { id: 'mongodb', label: 'MongoDB', domain: 'sw', re: /mongo|\bmern\b/ },
  { id: 'docker', label: 'Docker', domain: 'sw', re: /docker/ },
  // Data
  { id: 'airflow', label: 'Airflow', domain: 'data', re: /airflow/ },
  { id: 'postgres', label: 'PostgreSQL', domain: 'data', re: /postgres/ },
  { id: 'pgvector', label: 'pgvector', domain: 'data', re: /pgvector/ },
  { id: 'supabase', label: 'Supabase', domain: 'data', re: /supabase/ },
  { id: 'etl', label: 'ETL', domain: 'data', re: /\betl\b|\belt\b|ingestion|pipeline/ },
  { id: 'n8n', label: 'n8n', domain: 'data', re: /\bn8n\b/ },
  { id: 'pinecone', label: 'Pinecone', domain: 'data', re: /pinecone/ },
  { id: 'cloudflare', label: 'Cloudflare Tunnel', domain: 'data', re: /cloudflare/ },
  { id: 'rls', label: 'row-level security', domain: 'data', re: /row level security|\brls\b/ },
];

// The shader reads hit strengths from a fixed-size uniform array. Index
// TERMS.length is a sentinel that always stays 0.
export const HIT_SLOTS = 32;
if (TERMS.length >= HIT_SLOTS) throw new Error('Too many field terms for the shader');
