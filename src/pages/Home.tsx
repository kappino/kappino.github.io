import { useState } from 'react';
import { ArrowDownToLine, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TerminalWidget } from '@/components/interactive/TerminalWidget';
import { terminalIsLive } from '@/utils/consoleEndpoint';
import { personalInfo } from '@/data/personal';

export default function Home() {
  const [consoleOpen, setConsoleOpen] = useState(false);
  return (
    <div className="site-shell xl:max-w-[88rem]">
      <section className="grid min-h-[calc(100svh-4rem)] content-center items-center gap-7 py-8 sm:gap-10 sm:py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:gap-8 xl:gap-12">
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
            <Link to="/projects" className="editorial-button editorial-button-primary">
              Explore projects <ArrowRight size={16} aria-hidden="true" />
            </Link>
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
    </div>
  );
}
