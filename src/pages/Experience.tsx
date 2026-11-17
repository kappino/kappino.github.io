import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { experiences } from '@/data/experience';
import { education, certifications, awards } from '@/data/education';

export default function Experience() {
  return (
    <div className="site-shell editorial-page">
      <header className="editorial-heading">
        <h1 className="editorial-title">Experience &amp; Education</h1>
      </header>

      <section aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="editorial-section-title mb-4">Experience</h2>
        <div className="divide-y divide-zinc-800 rounded-2xl border border-zinc-800 bg-zinc-900/70">
          {experiences.map((entry) => (
            <article key={entry.id} className="grid gap-3 p-4 sm:gap-5 sm:p-6 md:grid-cols-[1fr_1.25fr]">
              <div>
                {entry.badge && <p className="editorial-label mb-1">{entry.badge}</p>}
                <h3 className="text-lg font-semibold text-white">{entry.role}</h3>
                <p className="mt-1 text-sm text-zinc-300">{entry.organization}</p>
                <p className="mt-1 text-sm text-zinc-400">{entry.period}</p>
              </div>
              <div className="space-y-2 text-sm leading-relaxed text-zinc-300">
                <p>{entry.description}</p>
                {entry.highlights.map((highlight) => <p key={highlight}>{highlight}</p>)}
                {entry.relatedLink && <Link to={entry.relatedLink.href} className="editorial-link">{entry.relatedLink.label} <ArrowRight size={15} aria-hidden="true" /></Link>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="education-heading">
        <h2 id="education-heading" className="editorial-section-title mb-4">Education</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {education.map((item) => (
            <article key={item.id} className="editorial-card p-4 sm:p-5">
              <p className="editorial-label mb-2">{item.period}</p>
              <h3 className="text-lg font-semibold text-white">{item.degree}</h3>
              <p className="mt-1 text-sm text-zinc-300">{item.institution}</p>
              {item.thesis && <p className="mt-3 text-sm leading-relaxed text-zinc-300"><strong>B.Sc. thesis</strong> · {item.thesis.title}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="awards-heading">
        <h2 id="awards-heading" className="editorial-section-title mb-4">Honors &amp; Awards</h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {awards.map((award) => (
            <li key={award.id} className="editorial-card p-4 sm:p-5">
              <p className="editorial-label mb-2">{award.date}</p>
              <h3 className="font-semibold text-white">{award.title}</h3>
              <p className="mt-1 text-sm text-zinc-300">{award.issuer}</p>
              {award.description && <p className="mt-2 text-sm leading-relaxed text-zinc-400">{award.description}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="certifications-heading">
        <h2 id="certifications-heading" className="editorial-section-title mb-4">Certifications</h2>
        <ul className="divide-y divide-zinc-800 border-y border-zinc-800">
          {certifications.map((certification) => (
            <li key={certification.id} className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 py-3 text-sm">
              <div>
                <p className="font-semibold text-zinc-100">{certification.name}</p>
                <p className="text-zinc-400">{certification.issuer}</p>
              </div>
              <p className="text-zinc-400">{certification.date}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
