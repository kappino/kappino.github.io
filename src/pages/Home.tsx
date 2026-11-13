import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Shield, Bot, Cpu, Server, Mail, FileDown, Activity } from 'lucide-react';
import { personalInfo } from '@/data/personal';
import { publications } from '@/data/publications';
import { projects } from '@/data/projects';
import { GithubIcon, LinkedinIcon } from '@/components/common/Icons';
import { TerminalWidget } from '@/components/interactive/TerminalWidget';
import { ArchitectureFlow } from '@/components/interactive/ArchitectureFlow';
import { SidebarNav } from '@/components/interactive/SidebarNav';
import { SpotlightCard } from '@/components/common/SpotlightCard';

export const Home: React.FC = () => {
  const featuredPublication = publications[0];
  const featuredProjects = [
    projects.find((p) => p.id === 'proj-agy-telegram'),
    projects.find((p) => p.id === 'proj-mtls-iot-gateway'),
    projects.find((p) => p.id === 'proj-care-decision-planner'),
  ].filter(Boolean) as typeof projects;

  useEffect(() => {
    document.documentElement.classList.add('snap-active');

    return () => {
      document.documentElement.classList.remove('snap-active');
    };
  }, []);

  return (
    <div className="w-full relative">
      {/* Floating Section Quick Navigation Sidebar */}
      <SidebarNav />

      {/* 1. Hero Section: Balanced Two-Column Cockpit (Left: Bio & CTAs, Right: Console Shell) */}
      <section id="hero" className="snap-page-section min-h-[calc(100vh-3.5rem)] flex flex-col justify-center border-b border-zinc-800/80 py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Identity, Profile, Credentials & Actions (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-center">
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
                Systems &amp; Security Engineer · MSc @ UNISA
              </div>

              {/* Authentic Summary */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                MSc student in Cybersecurity at the University of Salerno. Former Graduate Researcher at UniParthenope (PNRR Age-IT project) focused on rule-based decision engines and ROS2 for assistive healthcare robotics.
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

                  <a
                    href="/crescenzo_esposito_cv.pdf"
                    download="Crescenzo_Esposito_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 text-xs font-mono font-semibold transition-all shadow-sm"
                    title="Download Curriculum Vitae (PDF)"
                    aria-label="Download Curriculum Vitae"
                  >
                    <FileDown className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Download CV</span>
                  </a>

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

            {/* Right Column: Live Interactive Shell (6 cols) */}
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between mb-2 text-xs font-mono text-zinc-500">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  <span className="text-zinc-400 font-semibold uppercase tracking-wider text-[11px]">Interactive Shell</span>
                </span>
                <span className="text-[11px]">click commands or type below</span>
              </div>
              <TerminalWidget />
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

      {/* 2.5 Featured Engineering Projects */}
      <section id="projects" className="snap-page-section content-visibility-auto min-h-[calc(100vh-3.5rem)] flex flex-col justify-center border-b border-zinc-800/80 py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-6 sm:mb-8 pb-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-sky-400 font-semibold mb-1 block">
                Flagship Systems &amp; Hardware
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Featured Engineering Implementations
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors group"
            >
              <span>Explore All {projects.length} Projects &amp; Architectures</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((project) => (
              <SpotlightCard
                key={project.id}
                className="p-5 flex flex-col justify-between"
                spotlightColor="rgba(56, 189, 248, 0.12)"
                borderColor="rgba(56, 189, 248, 0.35)"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 uppercase tracking-wide">
                      {project.category}
                    </span>
                    <span className="font-mono text-zinc-500 text-[11px]">{project.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-sky-300 transition-colors">
                    <Link to={`/projects/${project.id}`}>{project.title}</Link>
                  </h3>

                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3 mb-4">
                    {project.tagline || project.description}
                  </p>

                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="flex flex-col">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">{m.label}</span>
                          <span className="text-xs font-mono font-bold text-emerald-400 truncate">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-zinc-800/80">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-zinc-950 font-mono text-[10px] text-zinc-300 border border-zinc-800"
                      >
                        {t}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded bg-zinc-950 font-mono text-[10px] text-zinc-500 border border-zinc-800">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1.5 text-sky-400 group-hover:text-sky-300 font-medium transition-colors"
                    >
                      <span>System Specs</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Engineering Pillars & Core Competencies */}
      <section id="specializations" className="snap-page-section content-visibility-auto min-h-[calc(100vh-3.5rem)] flex flex-col justify-center border-b border-zinc-800/80 py-12 lg:py-16">
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
            <SpotlightCard
              className="p-5"
              spotlightColor="rgba(56, 189, 248, 0.15)"
              borderColor="rgba(56, 189, 248, 0.45)"
            >
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
            </SpotlightCard>

            {/* Domain 2: Autonomous Robotics & ROS2 */}
            <SpotlightCard
              className="p-5"
              spotlightColor="rgba(16, 185, 129, 0.15)"
              borderColor="rgba(16, 185, 129, 0.45)"
            >
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
            </SpotlightCard>

            {/* Domain 3: Embedded Firmware & Real-Time Kernels */}
            <SpotlightCard
              className="p-5"
              spotlightColor="rgba(245, 158, 11, 0.15)"
              borderColor="rgba(245, 158, 11, 0.45)"
            >
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
            </SpotlightCard>

            {/* Domain 4: Biomedical Signal ML & Systems */}
            <SpotlightCard
              className="p-5"
              spotlightColor="rgba(168, 85, 247, 0.15)"
              borderColor="rgba(168, 85, 247, 0.45)"
            >
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
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* 4. Scientific Publication Spotlight */}
      <section id="research" className="snap-page-section content-visibility-auto min-h-[calc(100vh-3.5rem)] flex flex-col justify-center border-b border-zinc-800/80 py-12 lg:py-16">
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
              <div className="flex items-center gap-3">
                <Link
                  to="/blog/eeg-emotion-recognition-schizophrenia-ias19"
                  className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-semibold"
                >
                  <span>Read Paper Breakdown</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
                <span className="text-zinc-700">|</span>
                <Link
                  to="/research"
                  className="inline-flex items-center gap-1 text-zinc-400 hover:text-white"
                >
                  <span>BibTeX Citation</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Research & Field Notes Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/blog/deterministic-life-safety-arbitration-ros2-gorules"
              className="group p-5 rounded-xl border border-zinc-800 bg-zinc-950/70 hover:bg-zinc-900/60 hover:border-sky-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span className="text-emerald-400 font-semibold">PNRR Age-IT (Spoke 3)</span>
                  <span>Robotics &amp; Real-Time</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors mb-2">
                  Deterministic Life-Safety Arbitration in ROS2 via GoRules JDM
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-2 mb-3">
                  Microsecond decision tables (&lt; 12 µs), priority inheritance, and zero-allocation safety supervisory runtimes for the Probot CARE eldercare robot.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-mono text-sky-400 group-hover:text-sky-300">
                <span>Read Robotics Research Note</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              to="/blog/zero-trust-mtls-constrained-iot-esp32"
              className="group p-5 rounded-xl border border-zinc-800 bg-zinc-950/70 hover:bg-zinc-900/60 hover:border-sky-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span className="text-sky-400 font-semibold">Edge Cryptography</span>
                  <span>Zero-Trust Architecture</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors mb-2">
                  Hardening Constrained Telemetry: Zero-Trust mTLS v1.3 on ESP32
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-2 mb-3">
                  Surviving TLS 1.3 memory exhaustion on 320 KB SRAM, FreeRTOS mbedTLS hardware crypto, and 42 ms session ticket resumption.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-mono text-sky-400 group-hover:text-sky-300">
                <span>Read Cryptographic Architecture</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Real Hardware Homelab Environment */}
      <section id="homelab" className="snap-page-section content-visibility-auto min-h-[calc(100vh-3.5rem)] flex flex-col justify-center py-12 lg:py-16 bg-zinc-900/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-8 pb-4 border-b border-zinc-800">
            <span className="font-mono text-xs uppercase tracking-wider text-sky-400 font-semibold mb-1 block">
              Hardware &amp; Systems Testbed
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Server className="h-5 w-5 text-sky-400" />
              <span>Hardware &amp; Protocol Validation Testbed</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Isolated local environment for firmware flashing, VLAN segregation, protocol validation, and daemon prototyping.
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
