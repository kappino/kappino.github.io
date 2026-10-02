import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Shield, Bot, Cpu, Server, Mail, FileDown, Activity } from 'lucide-react';
import { personalInfo } from '@/data/personal';
import { publications } from '@/data/publications';
import { GithubIcon, LinkedinIcon } from '@/components/common/Icons';
import { TerminalWidget } from '@/components/interactive/TerminalWidget';
import { ArchitectureFlow } from '@/components/interactive/ArchitectureFlow';
import { SidebarNav } from '@/components/interactive/SidebarNav';

const SECTION_IDS = ['hero', 'architecture', 'specializations', 'research', 'homelab'];

export const Home: React.FC = () => {
  const featuredPublication = publications[0];
  const [terminalTrigger, setTerminalTrigger] = useState<string | null>(null);

  const handleDownloadCV = () => {
    // Trigger curl simulation in the terminal widget
    setTerminalTrigger(`cv?t=${Date.now()}`);
  };

  useEffect(() => {
    document.documentElement.classList.add('snap-active');

    let isLocked = false;
    let lockTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return;
      if (Math.abs(e.deltaY) < 30) return;

      const target = e.target as HTMLElement | null;
      if (target && target.closest('.overflow-y-auto')) {
        return;
      }

      if (isLocked) {
        e.preventDefault();
        return;
      }

      const scrollPos = window.scrollY + 100;
      const offsets = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        return el ? el.offsetTop - 56 : 0;
      });

      let currentIdx = 0;
      for (let i = 0; i < offsets.length; i++) {
        if (scrollPos >= offsets[i] - 60) {
          currentIdx = i;
        }
      }

      if (e.deltaY > 0 && currentIdx < SECTION_IDS.length - 1) {
        e.preventDefault();
        isLocked = true;
        const nextId = SECTION_IDS[currentIdx + 1];
        const nextEl = document.getElementById(nextId);
        if (nextEl) {
          nextEl.scrollIntoView({ behavior: 'smooth' });
        }
        lockTimeout = setTimeout(() => {
          isLocked = false;
        }, 650);
      } else if (e.deltaY < 0 && currentIdx > 0) {
        e.preventDefault();
        isLocked = true;
        const prevId = SECTION_IDS[currentIdx - 1];
        const prevEl = document.getElementById(prevId);
        if (prevEl) {
          prevEl.scrollIntoView({ behavior: 'smooth' });
        }
        lockTimeout = setTimeout(() => {
          isLocked = false;
        }, 650);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.documentElement.classList.remove('snap-active');
      window.removeEventListener('wheel', handleWheel);
      if (lockTimeout) clearTimeout(lockTimeout);
    };
  }, []);

  return (
    <div className="w-full relative">
      {/* Floating Section Quick Navigation Sidebar */}
      <SidebarNav />

      {/* 1. Hero Section: Two-Column Cockpit (Left: Direct Bio & Actions, Right: Interactive Live Shell) */}
      <section id="hero" className="snap-page-section min-h-[calc(100vh-3.5rem)] flex flex-col justify-center border-b border-zinc-800/80 py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Identity, Concise Profile, Structured Credentials & Buttons */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              {/* Status Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for R&amp;D · Systems &amp; Security</span>
                </span>
              </div>

              {/* Identity */}
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                Crescenzo Esposito
              </h1>
              <div className="text-xs sm:text-sm font-mono text-sky-400 mb-4">
                MSc in Computer Science | Cybersecurity @ UNISA
              </div>

              {/* Authentic Summary */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                MSc student in Cybersecurity at the University of Salerno. Former Graduate Researcher at UniParthenope (Age-IT project) focused on rule-based decision engines and ROS2 for assistive healthcare robotics.
              </p>

              {/* Key Credentials & Awards */}
              <div className="space-y-1.5 mb-6 text-xs text-zinc-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-sky-400 font-mono">::</span>
                  <span>M.Sc. in Cybersecurity @ <strong className="text-zinc-200 font-sans">UniSalerno</strong> (2025–2027)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sky-400 font-mono">::</span>
                  <span>1st Author &amp; Best Student Paper Finalist @ <strong className="text-zinc-200 font-sans">IAS-19</strong> (Springer)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-mono">::</span>
                  <span>Best App Award <strong className="text-zinc-200 font-sans">"Alfredo Petrosino"</strong></span>
                </div>
              </div>

              {/* Symmetrical, Non-Wrapping Action Buttons */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">

                  <Link
                    to="/research"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
                  >
                    <BookOpen className="h-3 w-3 text-sky-400" />
                    <span>IAS-19 Paper</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleDownloadCV}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 text-xs font-mono font-semibold transition-all shadow-sm"
                    title="Download Curriculum Vitae via curl simulation"
                    aria-label="Download Curriculum Vitae"
                  >
                    <FileDown className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Download CV</span>
                  </button>

                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-zinc-950 font-semibold text-xs transition-colors shadow-sm"
                  >
                    <span>Projects</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="flex items-center gap-2 pt-1 font-mono text-xs">
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors text-[11px]"
                  >
                    <GithubIcon className="h-3 w-3" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-sky-400 transition-colors text-[11px]"
                  >
                    <LinkedinIcon className="h-3 w-3 text-sky-400" />
                    <span>LinkedIn</span>
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-sky-400 transition-colors text-[11px]"
                  >
                    <Mail className="h-3 w-3" />
                    <span>Contact</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Shell */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-2 text-xs font-mono text-zinc-500">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  <span className="text-zinc-400 font-semibold uppercase tracking-wider text-[11px]">Interactive Shell</span>
                </span>
                <span className="text-[11px]">click commands or type below</span>
              </div>
              <TerminalWidget externalTriggerCommand={terminalTrigger} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visual Architecture Pipeline Explorer */}
      <section id="architecture" className="snap-page-section min-h-[calc(100vh-3.5rem)] flex flex-col justify-center border-b border-zinc-800/80 py-6 sm:py-8 lg:py-10 bg-zinc-900/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-4 sm:mb-5">
            <span className="font-mono text-xs uppercase tracking-wider text-sky-400 font-semibold mb-1 block">
              Interactive System Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Linear Flow &amp; Defensive Pipeline
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Select a system to trace data in 4 linear steps: from perception to cryptographic barriers and autonomous execution.
            </p>
          </div>

          <ArchitectureFlow />
        </div>
      </section>

      {/* 3. Three Plain-English Specializations */}
      {/* 3. Engineering Pillars & Core Competencies */}
      <section id="specializations" className="snap-page-section min-h-[calc(100vh-3.5rem)] flex flex-col justify-center border-b border-zinc-800/80 py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-8 pb-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-sky-400 font-semibold mb-1 block">
                Engineering Domains &amp; Competencies
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                What I Build &amp; Research
              </h2>
            </div>
            <p className="text-xs text-zinc-400 max-w-md">
              Bridging bare-metal execution, cryptographic edge defense, autonomous robotics, and clinical signal analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Domain 1: Zero-Trust & Network Hardening */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 flex flex-col justify-between hover:border-sky-500/40 hover:bg-zinc-900/70 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="h-9 w-9 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                    <Shield className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                    Security
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2">
                  Zero-Trust PKI &amp; IoT Hardening
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  Mutual TLS 1.3 handshake verification, isolated X.509 clientAuth architectures, and tamper-evident packet dropping on resource-constrained embedded nodes.
                </p>
              </div>
              <div className="space-y-2 pt-3 border-t border-zinc-800/80">
                <div className="text-[10px] font-mono text-sky-400 truncate">
                  mTLS v1.3 · X.509 · HMAC · OpenSSL
                </div>
                <Link
                  to="/projects/proj-mtls-iot-gateway"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 group-hover:text-sky-300 transition-colors"
                >
                  <span>Inspect Gateway</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Domain 2: Autonomous Robotics & ROS2 */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 flex flex-col justify-between hover:border-emerald-500/40 hover:bg-zinc-900/70 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <Bot className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    Robotics
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2">
                  Robotics &amp; Deterministic Runtimes
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  ROS2 package engineering, asynchronous life-safety arbitration, and microsecond rule inference (GoRules JDM) for autonomous assistive healthcare robots.
                </p>
              </div>
              <div className="space-y-2 pt-3 border-t border-zinc-800/80">
                <div className="text-[10px] font-mono text-emerald-400 truncate">
                  ROS2 Humble · JDM Tables · FSM · Python
                </div>
                <Link
                  to="/projects/proj-care-decision-planner"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 group-hover:text-emerald-300 transition-colors"
                >
                  <span>Inspect CARE Planner</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Domain 3: Embedded Firmware & Real-Time Kernels */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 flex flex-col justify-between hover:border-amber-500/40 hover:bg-zinc-900/70 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    Embedded
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2">
                  Embedded Systems &amp; RTOS
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  Bare-metal C/C++ firmware on 32-bit ARM Cortex-M (STM32) and ESP32, hardware sensor bus interfacing (I2C/SPI/PWM), and real-time scheduling on FreeRTOS &amp; ChibiOS.
                </p>
              </div>
              <div className="space-y-2 pt-3 border-t border-zinc-800/80">
                <div className="text-[10px] font-mono text-amber-400 truncate">
                  STM32 · ARM Cortex-M · ChibiOS · FreeRTOS
                </div>
                <Link
                  to="/projects/proj-munnisc-cestinno"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 group-hover:text-amber-300 transition-colors"
                >
                  <span>Inspect Hardware Prototype</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Domain 4: Biomedical Signal ML & Systems */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 flex flex-col justify-between hover:border-purple-500/40 hover:bg-zinc-900/70 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="h-9 w-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                    <Activity className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    Biomedical ML
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2">
                  Biomedical ML &amp; Signal Processing
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  Multi-channel wireless EEG artifact decontamination (PICARD-ICA), spectral PSD band separation, and supervised psychiatric classification (97.2% test accuracy).
                </p>
              </div>
              <div className="space-y-2 pt-3 border-t border-zinc-800/80">
                <div className="text-[10px] font-mono text-purple-400 truncate">
                  PICARD ICA · MLP · Scikit-learn · 14-Ch EEG
                </div>
                <Link
                  to="/projects/proj-spectra-eeg"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 group-hover:text-purple-300 transition-colors"
                >
                  <span>Inspect SPECTRA Pipeline</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Scientific Publication Spotlight */}
      <section id="research" className="snap-page-section min-h-[calc(100vh-3.5rem)] flex flex-col justify-center border-b border-zinc-800/80 py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-sky-400 font-semibold mb-1 block">
              Academic Research
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Peer-Reviewed Paper (IAS-19)
            </h2>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold">
                Best Student Paper Finalist
              </span>
              <span className="px-2.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono text-xs">
                Springer LNNS Series
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
              {featuredPublication.title}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
              {featuredPublication.abstract}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800 text-xs font-mono">
              <div className="text-zinc-400">
                Classification Accuracy: <strong className="text-emerald-400">97.2% (MLP)</strong> on 21 human subjects
              </div>
              <Link
                to="/research"
                className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300"
              >
                <span>Full Paper &amp; BibTeX</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Real Hardware Homelab Environment */}
      <section id="homelab" className="snap-page-section min-h-[calc(100vh-3.5rem)] flex flex-col justify-center py-12 lg:py-16 bg-zinc-900/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-8 pb-4 border-b border-zinc-800">
            <span className="font-mono text-xs uppercase tracking-wider text-sky-400 font-semibold mb-1 block">
              Hardware &amp; Systems Testbed
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Server className="h-5 w-5 text-sky-400" />
              <span>Homelab &amp; Physical Bench</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              My active local environment for firmware flashing, isolated VLAN testing, and protocol verification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {personalInfo.homelab.map((node) => (
              <div
                key={node.name}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
                    <span className="text-zinc-200 font-bold">{node.name}</span>
                    <span className="text-emerald-400 text-[11px]">ACTIVE</span>
                  </div>
                  <div className="text-xs font-semibold text-white mb-1">{node.role}</div>
                  <div className="text-xs text-zinc-400 mb-4">{node.specs}</div>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1">
                  {node.software.map((s) => (
                    <span key={s} className="px-1.5 py-0.5 rounded bg-zinc-950 font-mono text-[10px] text-zinc-400 border border-zinc-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
