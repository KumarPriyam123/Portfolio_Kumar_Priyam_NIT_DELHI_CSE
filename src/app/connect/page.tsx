import type { Metadata } from 'next';
import ContactPanel from '@/components/ContactPanel';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Kumar Priyam about Software Engineer, AI Engineer and Data Engineer roles.',
  alternates: { canonical: '/connect' },
};

export default function ConnectPage() {
  return (
    <div className="kp-page pb-[var(--sc-section)]">
      <div className="sc-wrap">
        <ContactPanel headingLevel="h1" />
      </div>
    </div>
  );
}
