import { useState, useRef, useEffect } from 'react';
import { Award, Clock, Copy, Check, BookOpen } from 'lucide-react';
import { Publication } from '@/types';
import { Badge } from '@/components/common/Badge';

interface PublicationCardProps {
  publication: Publication;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => { if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current); }, []);

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(publication.bibtex).then(() => {
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2500);
    }).catch(() => { /* clipboard access denied */ });
  };

  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-sm transition-all hover:border-slate-700/80 shadow-md">
      {/* Badges Bar */}
      <div className="flex flex-wrap items-center gap-2.5 mb-4">
        <Badge variant="warning" size="md">
          <Award className="h-3.5 w-3.5" />
          <span>Best Student Paper Finalist</span>
        </Badge>
        <Badge variant="accent" size="md">
          <Clock className="h-3.5 w-3.5" />
          <span>{publication.status}</span>
        </Badge>
        <span className="font-mono text-xs text-slate-400">
          {publication.series} · {publication.year}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
        {publication.title}
      </h3>

      {/* Authors list */}
      <div className="text-xs sm:text-sm text-slate-300 mb-4">
        <span className="text-slate-500 font-mono">Authors: </span>
        {publication.authors.map((author, index) => (
          <span key={author}>
            <strong className={author.includes('Esposito') ? 'text-sky-300 font-semibold underline decoration-sky-500/50' : 'text-slate-300 font-normal'}>
              {author}
            </strong>
            {index < publication.authors.length - 1 && ', '}
          </span>
        ))}
      </div>

      {/* Venue & Editorial Notice */}
      <div className="mb-6 rounded-lg bg-slate-950/80 border border-slate-800/80 p-4 text-xs text-slate-300">
        <div className="font-medium text-white flex items-center gap-2 mb-1">
          <BookOpen className="h-3.5 w-3.5 text-sky-400" />
          <span>{publication.conference}</span>
        </div>
        <p className="text-slate-400">
          {publication.statusNote}
          {publication.isbn && <span className="block font-mono mt-0.5 text-slate-500">ISBN: {publication.isbn}</span>}
        </p>
      </div>

      {/* Clinical / Performance Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {publication.metrics.map((m, idx) => (
          <div key={idx} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/70">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
              {m.label}
            </div>
            <div className="text-sm font-mono font-bold text-slate-100 mb-0.5">
              {m.value}
            </div>
            {m.detail && (
              <div className="text-[11px] text-slate-400 leading-tight">
                {m.detail}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Abstract */}
      <div className="border-t border-slate-800/80 pt-4 mb-6">
        <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold mb-2">
          Abstract
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {publication.abstract}
        </p>
      </div>

      {/* BibTeX Citation Accordion / Box */}
      <div className="rounded-lg bg-slate-950/90 border border-slate-800/80 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-slate-400">BibTeX Citation</span>
          <button
            onClick={handleCopyBibtex}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy Citation</span>
              </>
            )}
          </button>
        </div>
        <pre className="overflow-x-auto text-[11px] font-mono text-slate-400 p-2 bg-slate-950 rounded border border-slate-900 leading-relaxed">
          {publication.bibtex}
        </pre>
      </div>
    </article>
  );
};
