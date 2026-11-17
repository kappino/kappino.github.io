import { useState } from 'react';
import { ArrowDown, ArrowDownToLine, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { TerminalWidget } from '@/components/interactive/TerminalWidget';
import { terminalIsLive } from '@/utils/consoleEndpoint';
import { personalInfo } from '@/data/personal';
import { orderedProjects } from '@/data/projects';
import { ias19Publication } from '@/data/publications';

const featuredProjects = orderedProjects.slice(0, 3);

export default function Home() {
  const [consoleOpen, setConsoleOpen] = useState(false);
  return (
    <div className="site-shell xl:max-w-[88rem]">
      <section className="grid items-center gap-6 pb-8 pt-7 sm:gap-10 sm:pb-14 sm:pt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:gap-8 xl:gap-12">
        <div className="min-w-0">
          <p className="editorial-label mb-5">Engineering &amp; research</p>
          <h1 className="max-w-[12ch] text-[clamp(2.5rem,6vw,5.75rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-white">
            {personalInfo.name}
          </h1>
          <p className="mt-4 sm:mt-6 max-w-[45ch] text-base leading-relaxed text-zinc-300 sm:text-lg">
            I build software and prototypes across cybersecurity, embedded systems and robotics.
            I’m pursuing an MSc in Cybersecurity at the University of Salerno.
          </p>
          <div className="mt-5 sm:mt-8 flex flex-wrap items-center gap-3">
            <a href="#selected-work" className="editorial-button editorial-button-primary">
              Selected work <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href={personalInfo.cvUrl} download className="editorial-button">
              <ArrowDownToLine size={16} aria-hidden="true" /> Download CV
            </a>
          </div>
        </div>

        <div className="min-w-0">
          <p className="editorial-label mb-3">{terminalIsLive ? 'Portfolio console' : 'Interactive console demo'}</p>
          <button type="button" className="editorial-button w-full flex-wrap justify-between gap-x-3 font-mono sm:hidden" aria-expanded={consoleOpen} aria-controls="home-console" onClick={() => setConsoleOpen(!consoleOpen)}>
            <span>kappino@portfolio:~$</span>
            <span>{consoleOpen ? 'Close terminal' : 'Open terminal'}</span>
          </button>
          <div id="home-console" className={consoleOpen ? 'mt-3 sm:mt-0' : 'hidden sm:block'}>
            <TerminalWidget />
          </div>
        </div>
      </section>

      <section id="selected-work" className="scroll-mt-24 border-t border-zinc-800 py-10 sm:py-12" aria-labelledby="selected-title">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <h2 id="selected-title" className="editorial-section-title">Selected work</h2>
          <Link to="/projects" className="editorial-link">All projects <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </section>

      <section className="grid gap-7 border-t border-zinc-800 py-12 sm:py-16 lg:grid-cols-[1fr_2fr]" aria-labelledby="writing-title">
        <h2 id="writing-title" className="editorial-section-title">Writing &amp; research</h2>
        <div className="divide-y divide-zinc-800 border-y border-zinc-800">
          <Link to="/research" className="editorial-row">
            <div>
              <p className="editorial-label mb-2">IAS-19 · Springer Nature</p>
              <p className="text-lg font-medium leading-snug text-white">{ias19Publication.title}</p>
            </div>
            <ArrowRight size={19} className="shrink-0 text-sky-300" aria-hidden="true" />
          </Link>
          <Link to="/blog" className="editorial-row">
            <div>
              <p className="text-lg font-medium text-white">Engineering notes</p>
              <p className="mt-1 text-sm text-zinc-400">Articles on embedded security, robotics and systems in English and Italian.</p>
            </div>
            <ArrowRight size={19} className="shrink-0 text-sky-300" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
