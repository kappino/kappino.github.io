import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Terminal, ShieldAlert, CheckCircle2, Layers, Shield } from 'lucide-react';
import { projects } from '@/data/projects';
import { GithubIcon } from '@/components/common/Icons';
import { VerificationTerminal } from '@/components/interactive/VerificationTerminal';
import { MisuseCaseDiagram } from '@/components/interactive/MisuseCaseDiagram';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-28 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
        <p className="text-zinc-400 mb-8 text-sm">
          The requested technical specification does not exist or has been archived.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-sky-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Projects Index</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-sky-400 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Index / Projects / {project.id}</span>
          </Link>
        </div>

        {/* Technical Header */}
        <header className="mb-10 pb-8 border-b border-zinc-800">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-4 text-zinc-400">
            <span className="px-2.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400 uppercase font-semibold">
              {project.category}
            </span>
            <span>·</span>
            <span>Release Date: {project.date}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-6 font-normal">
            {project.description}
          </p>

          {/* External Code & Demo Links */}
          <div className="flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-white transition-colors"
              >
                <GithubIcon className="h-4 w-4" />
                <span>View Source Repository</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-xs font-mono text-zinc-950 font-bold transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live Interactive Demo</span>
              </a>
            )}
          </div>
        </header>

        {/* Security Standards & Compliance Bar */}
        {project.securityStandards && project.securityStandards.length > 0 && (
          <div className="mb-10 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 font-semibold mr-2">
              <Shield className="h-3.5 w-3.5 text-sky-400" />
              <span>Standards &amp; Frameworks:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.securityStandards.map((std) => (
                <span
                  key={std}
                  className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 font-mono text-xs text-sky-300 shadow-sm"
                >
                  {std}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Real Metrics Banner */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12">
            {project.metrics.map((m) => (
              <div key={m.label} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">{m.label}</div>
                <div className="text-sm sm:text-base font-mono font-bold text-sky-400">{m.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* ASCII Architecture Diagram if Available */}
        {project.architectureDiagram && (
          <section className="mb-12">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-md">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/70 font-mono text-xs text-zinc-400">
                <Terminal className="h-3.5 w-3.5 text-sky-400" />
                <span>architecture_diagram.txt</span>
              </div>
              <div className="p-4 sm:p-6 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-[13px] text-sky-300/90 leading-relaxed">
                  {project.architectureDiagram}
                </pre>
              </div>
            </div>
          </section>
        )}

        {/* Interactive Verification Terminal (Real Attack & Defense Logs) */}
        {project.verificationTerminal && (
          <VerificationTerminal terminal={project.verificationTerminal} />
        )}

        {/* Problem Statement & Threat Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {project.problemStatement && (
            <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-2">
                Problem Statement
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {project.problemStatement}
              </p>
            </div>
          )}

          {project.threatModelOrChallenge && (
            <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Threat Model &amp; Technical Solution</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {project.threatModelOrChallenge}
              </p>
            </div>
          )}
        </div>

        {/* Misuse Case Model & Architectural Countermeasures */}
        {project.misuseCases && project.misuseCases.length > 0 && (
          <MisuseCaseDiagram cases={project.misuseCases} />
        )}

        {/* Architectural Specifications */}
        {project.architectureSpecs && project.architectureSpecs.length > 0 && (
          <section className="mb-12 rounded-xl bg-zinc-900/40 border border-zinc-800 p-6 sm:p-8">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold mb-4 flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span>Architectural Implementation Specs</span>
            </h2>
            <ul className="space-y-3">
              {project.architectureSpecs.map((spec) => (
                <li key={spec} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <span className="text-sky-400 font-bold mt-0.5">▹</span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Key Verified Results */}
        {project.keyResults && project.keyResults.length > 0 && (
          <section className="mb-12">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Verified Results &amp; Benchmarks</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyResults.map((res) => (
                <div key={res} className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800 text-xs sm:text-sm text-zinc-300">
                  {res}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technology Stack & Toolchain */}
        <section className="border-t border-zinc-800 pt-8">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3">
            Toolchain, Languages &amp; Standards
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectDetail;
