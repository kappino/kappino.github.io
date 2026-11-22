import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { publications } from '@/data/publications';
import { PublicationCard } from '@/components/cards/PublicationCard';

export default function Research() {
  return (
    <div className="site-shell editorial-page">
      <header className="editorial-heading">
        <h1 className="editorial-title">Research</h1>
        <p className="editorial-intro">Peer-reviewed work in wearable EEG signal processing and applied assistive robotics under PNRR Age-IT.</p>
      </header>

      <section className="space-y-4" aria-labelledby="publications-title">
        <h2 id="publications-title" className="editorial-section-title mb-5">Publications</h2>
        {publications.map((publication) => <PublicationCard key={publication.id} publication={publication} />)}
      </section>

      <section className="mt-12 border-t border-zinc-800 pt-7" aria-labelledby="age-it-title">
        <p className="editorial-label mb-2">Applied Research Fellowship · Mar 2025 – Oct 2025</p>
        <h2 id="age-it-title" className="text-2xl font-semibold tracking-tight text-white">PNRR Age-IT · Project CARE (with Protom Robotics)</h2>
        <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-zinc-300 sm:text-base">
          At the University of Naples Parthenope, I selected wearable devices and biomedical sensors, authored technical documentation, tested the home-assistance demonstrator, and designed and built the Python ROS 2 <code className="font-mono text-sky-200">care_planner</code> node from scratch — migrating rule evaluation from <code className="font-mono text-sky-200">durable_rules</code> to visual GoRules (JDM) tables for clinical review. In parallel lab work, I modernized the Pepper PC client to Python 3.12 and ROS 2 over Wi-Fi/NAOqi.
        </p>
        <div className="mt-5 flex flex-wrap gap-4">
          <Link className="editorial-link" to="/projects/proj-care-decision-planner">
            CARE case study <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link className="editorial-link" to="/blog/deterministic-life-safety-arbitration-ros2-gorules">
            Decision arbitration article <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
