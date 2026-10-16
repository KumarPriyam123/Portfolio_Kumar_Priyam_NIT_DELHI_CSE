import Hero from '@/components/home/Hero';
import HomeField from '@/components/home/HomeField';
import QueryAct from '@/components/home/QueryAct';
import ResearchAct from '@/components/home/ResearchAct';
import TimelineAct from '@/components/home/TimelineAct';
import WorkList from '@/components/WorkList';
import ContactPanel from '@/components/ContactPanel';
import { SITE } from '@/lib/site';

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  jobTitle: 'AI Engineer, Software Engineer',
  alumniOf: { '@type': 'CollegeOrUniversity', name: SITE.institutionLong },
  address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
  sameAs: [SITE.github, SITE.linkedin],
  knowsAbout: ['Retrieval-augmented generation', 'Multi-agent reinforcement learning', 'FastAPI', 'Next.js', 'PostgreSQL', 'Apache Airflow'],
};

// Score (see scrollcraft/builds/kpriyam/BRIEF.md):
// hero (load mask, field noise) → silence (field condenses) → query PEAK (pin)
// → work (flow) → research (pin + count) → timeline (pan) → close (flow).
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <HomeField />
      <Hero />
      <QueryAct />
      <section id="work" className="kp-sheet-section kp-work" data-sc-act="flow" data-sc-drift="#070a10" aria-labelledby="work-title">
        <div className="sc-wrap">
          <WorkList variant="home" headingId="work-title" />
        </div>
      </section>
      <ResearchAct />
      <TimelineAct />
      <section id="contact" className="kp-sheet-section kp-contact" aria-labelledby="contact-title">
        <div className="sc-wrap">
          <ContactPanel />
        </div>
      </section>
    </>
  );
}
