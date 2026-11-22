import { ArrowDownToLine, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TerminalWidget } from '@/components/interactive/TerminalWidget';
import { terminalIsLive } from '@/utils/consoleEndpoint';
import { personalInfo } from '@/data/personal';

const spotlightCards = [
  {
    label: 'IoT Security',
    title: 'ESP32 Secure Gateway',
    summary: 'BLE spoofing PoC, C++/mbedTLS HMAC-SHA256 verification, Mosquitto mTLS (TLS 1.3), and Solidity digest audit.',
    to: '/projects/proj-mtls-iot-gateway',
  },
  {
    label: '1st Place · Hackathon',
    title: 'TNES · Hack the Route',
    summary: 'FastAPI gateway bridging a 3D Unreal Engine 5 cybersecurity simulator to live Cisco Modeling Labs topologies.',
    to: '/projects/proj-tnes',
  },
  {
    label: 'Robotics · PNRR Age-IT',
    title: 'CARE Decision Planner',
    summary: 'ROS 2 care_planner built from scratch (durable_rules → GoRules JDM) with priority arbitration and escalation.',
    to: '/projects/proj-care-decision-planner',
  },
  {
    label: 'Springer LNNS · First Author',
    title: 'SPECTRA Wearable EEG',
    summary: '14-ch clinical EEG artifact rejection (MATLAB PICARD-ICA) and scikit-learn classification — IAS-19 Finalist.',
    to: '/projects/proj-spectra-eeg',
  },
];

export default function Home() {
  return (
    <div className="site-shell xl:max-w-[88rem]">
      <section className="grid min-h-[calc(100svh-5rem)] content-center items-center gap-7 py-8 sm:gap-10 sm:py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:gap-8 xl:gap-12">
        <div className="min-w-0">
          <p className="editorial-label mb-5">Embedded · IoT Security · Robotics</p>
          <h1 className="max-w-[12ch] text-[clamp(2.5rem,6vw,5.75rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-white">
            {personalInfo.name}
          </h1>
          <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-zinc-300 sm:mt-6 sm:text-lg">
            I engineer software close to the hardware — from STM32/ESP32 firmware and authenticated IoT pipelines to ROS 2 decision engines. M.Sc. Cybersecurity student at the University of Salerno.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-8">
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
          <TerminalWidget />
        </div>
      </section>

      <section aria-labelledby="selected-highlights-title" className="border-t border-zinc-800/90 pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="editorial-label mb-2">Selected work</p>
            <h2 id="selected-highlights-title" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Four systems worth inspecting first
            </h2>
          </div>
          <Link to="/blog" className="editorial-link min-h-10">
            Read technical articles <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {spotlightCards.map(({ label, title, summary, to }) => (
            <article key={to} className="editorial-card group relative flex flex-col gap-3 p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="editorial-label">{label}</p>
                <ArrowUpRight size={16} className="shrink-0 text-sky-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold leading-snug tracking-tight text-white">
                <Link to={to} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
                  {title}
                </Link>
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">{summary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
