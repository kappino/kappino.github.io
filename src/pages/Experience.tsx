import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { experiences } from '@/data/experience';
import { education, certifications, awards } from '@/data/education';

export const Experience = () => {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-sky-400 font-semibold mb-2 block">
            Career &amp; Qualifications
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Experience &amp; Education
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Professional research appointments, industrial engineering campuses, and academic trajectory in Cybersecurity and Computer Science.
          </p>
        </div>

        {/* Section 1: Professional & Research Experience */}
        <section className="mb-20">
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2.5">
            <Briefcase className="h-5 w-5 text-sky-400" />
            <span>Research &amp; Engineering Experience</span>
          </h2>

          <div className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Timeline Node Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full bg-slate-950 border-2 border-sky-400 group-hover:scale-125 transition-transform" />

                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 sm:p-7 backdrop-blur-sm transition-colors hover:border-slate-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      {exp.badge && (
                        <span className="inline-block mb-1.5 font-mono text-[11px] text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded border border-sky-500/20">
                          {exp.badge}
                        </span>
                      )}
                      <h3 className="text-lg font-bold text-white">
                        {exp.role}
                      </h3>
                      <div className="text-xs sm:text-sm text-slate-300 font-medium">
                        {exp.organization} · <span className="text-slate-400">{exp.location}</span>
                      </div>
                    </div>

                    <div className="font-mono text-xs text-slate-400 self-start sm:self-auto bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                      {exp.period}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="space-y-1.5 mb-4 text-xs text-slate-400">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-sky-400 font-bold">▹</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-slate-950 font-mono text-[11px] text-slate-400 border border-slate-800/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Academic Degrees */}
        <section className="mb-20">
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2.5">
            <GraduationCap className="h-5 w-5 text-emerald-400" />
            <span>Academic Background</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-emerald-400">{edu.period}</span>
                    <span className="text-xs text-slate-500 font-mono">{edu.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {edu.degree}
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium mb-4">
                    {edu.institution}
                  </div>

                  {edu.thesis && (
                    <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 mb-4 text-xs">
                      <div className="font-mono text-[10px] text-slate-500 uppercase">B.Sc. Thesis</div>
                      <div className="font-medium text-slate-200 mt-0.5">{edu.thesis.title}</div>
                    </div>
                  )}

                  {edu.highlights && (
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">▹</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Honors & Awards */}
        {awards.length > 0 && (
          <section className="mb-14">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-400" />
              <span>Honors &amp; Awards</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {awards.map((award) => (
                <div
                  key={award.id}
                  className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs text-amber-400">{award.date}</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px]">
                        Award
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{award.title}</h3>
                    <p className="text-xs text-slate-400 mb-2">{award.issuer}</p>
                    {award.description && (
                      <p className="text-xs text-slate-300 leading-relaxed">{award.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Award className="h-4 w-4 text-sky-400" />
              <span>Certifications</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-lg bg-slate-900/40 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">{cert.name}</h3>
                    <p className="text-xs text-slate-400">{cert.issuer}</p>
                  </div>
                  <span className="font-mono text-xs text-slate-500 mt-2">{cert.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Experience;
