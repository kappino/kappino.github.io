import { publications } from '@/data/publications';
import { PublicationCard } from '@/components/cards/PublicationCard';
import { Database, Award, BookMarked } from 'lucide-react';

export const Research: React.FC = () => {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-sky-400 font-semibold mb-2 block">
            Academic Scholarship &amp; R&amp;D
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Research &amp; Publications
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Peer-reviewed scholarship at the intersection of clinical biomedical signal processing, machine learning for precision medicine, and intelligent autonomous robotics.
          </p>
        </div>

        {/* Highlighted Research Initiatives Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="h-9 w-9 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-3">
              <Database className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              PNRR Age-IT (Spoke 3) — Assistive Robotics
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3">
              Graduate research appointment (concluded) at the University of Naples Parthenope developing the decision-making engine for the Probot CARE robot. Focusing on explainable rule runtimes (GoRules JDM) and ROS2 integration for aged-care environments.
            </p>
            <span className="inline-flex items-center text-[11px] font-mono text-sky-400">
              Deliverable D3.3 Contributor
            </span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
              <Award className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              IAS-19 Best Student Paper Award Finalist
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3">
              First author research paper selected among the top finalists at the 19th International Conference on Intelligent Autonomous Systems. In publication within Springer Nature LNNS series.
            </p>
            <span className="inline-flex items-center text-[11px] font-mono text-amber-400">
              Springer Nature LNNS · Oct 2026
            </span>
          </div>
        </div>

        {/* Publications List */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BookMarked className="h-5 w-5 text-sky-400" />
            <span>Peer-Reviewed Papers</span>
          </h2>

          <div className="space-y-8">
            {publications.map((pub) => (
              <PublicationCard key={pub.id} publication={pub} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
