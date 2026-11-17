import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { personalInfo } from '@/data/personal';
import type { Publication } from '@/types';

export function PublicationCard({ publication }: { publication: Publication }) {
  const [copyStatus, setCopyStatus] = useState('');
  const publicationDate = publication.publishedOn && new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(publication.publishedOn));

  async function copyCitation() {
    try {
      await navigator.clipboard.writeText(publication.bibtex);
      setCopyStatus('Citation copied');
    } catch {
      setCopyStatus('Select and copy the citation below');
    }
  }

  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-8">
      <p className="editorial-label mb-3">
        {publication.status} · {publicationDate ? <time dateTime={publication.publishedOn}>{publicationDate}</time> : publication.year}
      </p>
      <h3 className="max-w-[42ch] text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">{publication.title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-zinc-300">{publication.authors.map((author, index) => <span key={author}>{index > 0 && ', '}{author === personalInfo.name ? <strong className="text-white">{author}</strong> : author}</span>)}</p>
      <p className="mt-1 text-sm text-zinc-400">{publication.conference}{publication.conferenceLocationAndYear && ' · ' + publication.conferenceLocationAndYear}</p>

      <p className="mt-2 text-sm text-zinc-400">{publication.series}</p>
      <p className="mt-4 text-sm font-semibold text-sky-300">{publication.statusNote}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {publication.doiUrl && (
          <a href={publication.doiUrl} className="editorial-button editorial-button-primary" target="_blank" rel="noreferrer">
            Read on Springer <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
        <Link to="/blog/eeg-emotion-recognition-schizophrenia-ias19" className="editorial-button">Technical article</Link>
      </div>

      <div className="mt-7 space-y-3">
        <details className="editorial-disclosure">
          <summary>Abstract summary <ChevronDown size={17} aria-hidden="true" /></summary>
          <div className="editorial-disclosure-body space-y-3 text-sm leading-relaxed text-zinc-300">
            <p>{publication.abstract}</p>
            {publication.doiUrl && <a className="editorial-link" href={publication.doiUrl + '#Abs1'}>Read the original abstract <ArrowUpRight size={16} aria-hidden="true" /></a>}
          </div>
        </details>
        <details className="editorial-disclosure">
          <summary>BibTeX citation <ChevronDown size={17} aria-hidden="true" /></summary>
          <div className="editorial-disclosure-body">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <button type="button" onClick={copyCitation} className="editorial-button"><Copy size={16} aria-hidden="true" /> Copy BibTeX</button>
              <span role="status" className="text-sm text-zinc-400">{copyStatus}</span>
            </div>
            <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs leading-relaxed text-zinc-300">{publication.bibtex}</pre>
          </div>
        </details>
      </div>
    </article>
  );
}
