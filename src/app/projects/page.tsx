import type { Metadata } from 'next';
import WorkGrid from '@/components/WorkGrid';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Six systems by Kumar Priyam across software, AI and data: semantic job matching, a WhatsApp clinic queue, a real-time interview platform, multi-agent RL for RAG and data pipelines.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <div className="kp-page pb-[var(--sc-section)]">
      <div className="sc-wrap">
        <WorkGrid variant="index" headingId="projects-title" />
      </div>
    </div>
  );
}
