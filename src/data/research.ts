export interface ResearchPaper {
  slug: string;
  title: string;
  authors: string[];
  institution: string;
  date: string;
  abstract: string;
  tags: string[];
  basePaper: {
    title: string;
    authors: string;
    venue: string;
    year: string;
    link: string;
  };
  documentLinks: {
    report: string;
    presentation: string;
    basePaper: string;
  };
  methodology: {
    title: string;
    description: string;
  }[];
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
}

export const researchPapers: ResearchPaper[] = [
  {
    slug: 'marl-maps',
    title:
      'MARL-MAPS: Dynamic Multi-Agent Reinforcement Learning for Optimized RAG',
    authors: ['Kumar Priyam'],
    institution: 'National Institute of Technology Delhi',
    date: '2025',
    abstract:
      'Traditional Retrieval-Augmented Generation (RAG) pipelines suffer from a "Context Tax" — bloating LLM inputs with noisy, irrelevant documents that spike latency and increase hallucination risks. Sequential one-way pipelines prevent adaptive backtracking when early retrieval steps fail. This work formalizes the RAG process as a Decentralized Partially Observable Markov Decision Process (Dec-POMDP) driven by a learnable Orchestrator policy. We implement a Shared Global Working Memory (SGWM) to prevent context drift and establish a "Confidence as Currency" bi-directional negotiation protocol. Our approach slashes the over-search rate by 91%, eliminates unnecessary retrieval rounds, and achieves 42% faster average inference time while significantly improving exact match and F1 scores.',
    tags: [
      'Multi-Agent RL',
      'RAG Optimization',
      'Dec-POMDP',
      'LLM Systems',
      'Information Retrieval',
    ],
    basePaper: {
      title:
        'MAPS: Multi-Agent Reinforcement Learning-based Portfolio Management System',
      authors: 'Jinho Lee, Raehyun Kim, Seok-Won Yi, Jaewoo Kang',
      venue: 'IJCAI 2020',
      year: '2020',
      link: 'https://arxiv.org/abs/2007.05402',
    },
    documentLinks: {
      report:
        'https://docs.google.com/document/d/1lBxDXpLdLnxv1qAvn6v9ADMTiIK9cBdT/edit?usp=drive_link&ouid=102063442685601956208&rtpof=true&sd=true',
      presentation:
        'https://docs.google.com/presentation/d/1tpmpfCy6ndjzlTXMBzZYZZE1Nftv9jg7sPbDU2qpdz4/edit?usp=sharing',
      basePaper:
        'https://drive.google.com/file/d/1gdzojq3mB6qvVvVIpGoijVc4QyAFPLfl/view?usp=sharing',
    },
    methodology: [
      {
        title: 'Dec-POMDP Formulation',
        description:
          'Formalized the entire RAG process as a Decentralized Partially Observable Markov Decision Process where each RAG module (query rewriter, retriever, selector, generator) operates as an autonomous agent under partial observability, enabling decentralized decision-making with local observations.',
      },
      {
        title: 'Learnable Orchestrator Policy',
        description:
          'Implemented a trained RL policy that makes high-level coordination decisions — when to spawn sub-agents, which tools to delegate to, and how to aggregate outputs from multiple retrieval agents for optimal context assembly.',
      },
      {
        title: 'Shared Global Working Memory (SGWM)',
        description:
          'Centralized state representation allowing all agents to access a common pool of information, preventing redundant information gathering, eliminating context drift, and facilitating real-time coordination across the pipeline.',
      },
      {
        title: '"Confidence as Currency" Protocol',
        description:
          'Bi-directional negotiation mechanism where agents trade and spend confidence scores — weighting contributions based on certainty about retrieved information. This enables adaptive backtracking when confidence drops below threshold, preventing hallucination propagation.',
      },
      {
        title: 'RAG-DDR Integration',
        description:
          'Differentiable Data Rewards optimize the RAG pipeline end-to-end using rollout-based reward collection and Direct Preference Optimization (DPO), allowing the system to learn from outcome quality rather than intermediate metrics.',
      },
    ],
    results: [
      {
        metric: 'Over-Search Reduction',
        value: '91%',
        description:
          'Over-search rate dropped from 27% to 2.3%, eliminating unnecessary retrieval rounds',
      },
      {
        metric: 'Inference Speedup',
        value: '42%',
        description:
          'Faster average inference time through intelligent context pruning and confidence-based early stopping',
      },
      {
        metric: 'Exact Match',
        value: 'Significant ↑',
        description:
          'Marked improvement in exact match scores on benchmark datasets',
      },
      {
        metric: 'F1 Score',
        value: 'Significant ↑',
        description:
          'Substantial improvement in F1 scores demonstrating better precision-recall balance',
      },
    ],
  },
];

export function getResearchBySlug(slug: string): ResearchPaper | undefined {
  return researchPapers.find((paper) => paper.slug === slug);
}
