import RoleHero from '@/components/home/RoleHero';
import Crafts from '@/components/home/Crafts';
import ResearchAct from '@/components/home/ResearchAct';
import TimelineAct from '@/components/home/TimelineAct';
import About from '@/components/home/About';
import WorkGrid from '@/components/WorkGrid';
import ContactPanel from '@/components/ContactPanel';
import { SITE } from '@/lib/site';

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  image: `${SITE.url}/portrait/kumar-cutout.png`,
  jobTitle: 'Software Engineer, AI Engineer, Data Engineer',
  alumniOf: { '@type': 'CollegeOrUniversity', name: SITE.institutionLong },
  address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
  sameAs: [SITE.github, SITE.linkedin],
  knowsAbout: ['Next.js', 'FastAPI', 'PostgreSQL', 'WebRTC', 'Retrieval-augmented generation', 'Multi-agent reinforcement learning', 'Apache Airflow'],
};

// Score (see scrollcraft/builds/kpriyam/BRIEF.md):
// hero (portrait cycles Software → AI → Data) → crafts (equal pair + data band)
// → work (mixed grid) → research (pin + count) → timeline (pan) → about (photo) → close.
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <RoleHero />
      <Crafts />
      <section id="work" className="kp-sheet-section kp-work" data-sc-act="flow" aria-labelledby="work-title">
        <div className="sc-wrap">
          <WorkGrid variant="home" headingId="work-title" />
        </div>
      </section>
      <ResearchAct />
      <TimelineAct />
      <About />
      <section id="contact" className="kp-sheet-section kp-contact" aria-labelledby="contact-title">
        <div className="sc-wrap">
          <ContactPanel />
        </div>
      </section>
    </>
  );
}
