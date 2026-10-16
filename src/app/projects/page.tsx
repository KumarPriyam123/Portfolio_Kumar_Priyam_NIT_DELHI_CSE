import type { Metadata } from 'next';
import WorkList from '@/components/WorkList';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Six systems by Kumar Priyam: semantic job matching, a WhatsApp clinic queue, multi-agent RL for RAG, a real-time interview platform and data pipelines. Rank them by role or stack.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <div className="kp-page pb-[var(--sc-section)]">
      <div className="sc-wrap">
        <WorkList variant="index" headingId="projects-title" />
      </div>
    </div>
  );
}
