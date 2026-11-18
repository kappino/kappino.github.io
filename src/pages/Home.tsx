import { useState } from 'react';
import { ArrowDownToLine, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TerminalWidget } from '@/components/interactive/TerminalWidget';
import { terminalIsLive } from '@/utils/consoleEndpoint';
import { personalInfo } from '@/data/personal';

const caseStudies = [
  { id: 'proj-mtls-iot-gateway', title: 'Secure IoT Gateway', role: 'ESP32 firmware and certificate-based MQTT access.', evidence: 'See where the gateway checks readings and rejects invalid payloads.' },
  { id: 'proj-tnes', title: 'TNES · Hack the Route', role: 'Co-developed the FastAPI gateway integration with Cisco Modeling Labs.', evidence: 'See how the lab test checks loss and recovery of connectivity.' },
];

export default function Home() {
  const [consoleOpen, setConsoleOpen] = useState(false);
  return (
    <div className="site-shell xl:max-w-[88rem]">
      <section className="grid items-center gap-8 py-10 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="min-w-0">
          <p className="editorial-label mb-5">Engineering &amp; research</p>
          <h1 className="max-w-[12ch] text-[clamp(2.5rem,6vw,5.75rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-white">
            {personalInfo.name}
          </h1>
          <p className="mt-4 sm:mt-6 max-w-[45ch] text-base leading-relaxed text-zinc-300 sm:text-lg">
            I build and test secure embedded and robotic systems, from device identity to decision logic.
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

        <div className="grid min-w-0 gap-3" aria-label="Selected case studies">
          {caseStudies.map(({ id, title, role, evidence }) => (
            <Link key={id} to={'/projects/' + id} className="block rounded-2xl border border-zinc-700 bg-zinc-900/80 p-4 transition-colors hover:border-sky-300/60 focus-visible:outline focus-visible:outline-sky-300 sm:p-6">
              <h2 className="flex items-center justify-between gap-2 text-lg font-semibold text-white">{title}<ArrowRight size={18} className="shrink-0 text-sky-300" aria-hidden="true" /></h2>
              <p className="mt-2 text-sm text-zinc-200">{role}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">{evidence}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-4xl pb-12 pt-2" aria-label="Portfolio console">
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
