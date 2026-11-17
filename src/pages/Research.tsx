import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { publications } from '@/data/publications';
import { PublicationCard } from '@/components/cards/PublicationCard';

export default function Research() {
  return (
    <div className="site-shell editorial-page">
      <header className="editorial-heading">
        <h1 className="editorial-title">Research</h1>
        <p className="editorial-intro">Published work on wearable EEG and applied research in assistive robotics.</p>
      </header>

      <section className="space-y-4" aria-labelledby="publications-title">
        <h2 id="publications-title" className="editorial-section-title mb-5">Publications</h2>
        {publications.map((publication) => <PublicationCard key={publication.id} publication={publication} />)}
      </section>

      <section className="mt-12 border-t border-zinc-800 pt-7" aria-labelledby="age-it-title">
        <h2 id="age-it-title" className="text-2xl font-semibold tracking-tight text-white">PNRR Age-IT</h2>
        <p className="mt-2 max-w-[65ch] text-zinc-400">Research on decision software for the CARE assistive robot at the University of Naples Parthenope.</p>
        <Link className="editorial-link mt-4" to="/projects/proj-care-decision-planner">
          CARE case study <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
