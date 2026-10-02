import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Layers,
  Shield,
  Copy,
  Check,
  BookOpen,
} from 'lucide-react';
import { projects } from '@/data/projects';
import { GithubIcon } from '@/components/common/Icons';
import { VerificationTerminal } from '@/components/interactive/VerificationTerminal';
import { MisuseCaseDiagram } from '@/components/interactive/MisuseCaseDiagram';

const PROJECT_ARTICLE_MAP: Record<string, { title: string; url: string }> = {
  'proj-agy-telegram': {
    title: 'Mobile Cockpit & Gateway for Google Antigravity',
    url: '/blog/agy-telegram-mobile-cockpit',
  },
  'proj-mtls-iot-gateway': {
    title: 'Zero-Trust mTLS v1.3 with Hardware Crypto on ESP32',
    url: '/blog/zero-trust-mtls-constrained-iot-esp32',
  },
  'proj-care-decision-planner': {
    title: 'Deterministic Life-Safety Arbitration in ROS2 via GoRules JDM',
    url: '/blog/deterministic-life-safety-arbitration-ros2-gorules',
  },
  'proj-spectra-eeg': {
    title: 'Schizophrenia Emotion Recognition via 14-Channel EEG (IAS-19)',
    url: '/blog/eeg-emotion-recognition-schizophrenia-ias19',
  },
};

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [diagramCopied, setDiagramCopied] = useState(false);
  const project = projects.find((p) => p.id === id);

  const { prevProject, nextProject } = useMemo(() => {
    const currentIndex = projects.findIndex((p) => p.id === id);
    if (currentIndex === -1) return { prevProject: null, nextProject: null };
    const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
    return { prevProject: prev, nextProject: next };
  }, [id]);

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-28 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
        <p className="text-zinc-400 mb-8 text-sm">
          The requested technical specification does not exist or has been relocated.
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

  const relatedArticle = project ? PROJECT_ARTICLE_MAP[project.id] : null;

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

          {/* External Code & Deep-Dive Action Bar */}
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

            {relatedArticle && (
              <Link
                to={relatedArticle.url}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/40 text-xs font-mono text-sky-300 hover:text-white transition-colors"
              >
                <BookOpen className="h-4 w-4 text-sky-400" />
                <span>Read Technical Article</span>
              </Link>
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

        {/* Architecture Diagram (ASCII Specification) */}
        {project.architectureDiagram && (
          <section className="mb-12">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/90 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2 text-sky-400">
                  <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                  <span>architecture_diagram.txt</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!project.architectureDiagram) return;
                    navigator.clipboard.writeText(project.architectureDiagram).then(() => {
                      setDiagramCopied(true);
                      setTimeout(() => setDiagramCopied(false), 2000);
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
                  title="Copy architecture diagram"
                >
                  {diagramCopied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 text-zinc-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
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
              <h3 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-2">
                Threat Model &amp; Technical Challenge
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
        <section className="border-t border-zinc-800 pt-8 pb-12">
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

        {/* Next / Previous Project Navigation Cards */}
        <section className="border-t border-zinc-800 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.id}`}
                className="group p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/70 hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 mb-2">
                  <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                  <span>Previous System Spec</span>
                </div>
                <div className="text-xs font-mono text-sky-400 uppercase tracking-wider mb-1">
                  {prevProject.category}
                </div>
                <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors line-clamp-1">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                to={`/projects/${nextProject.id}`}
                className="group p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/70 hover:border-zinc-700 transition-all flex flex-col justify-between text-right"
              >
                <div className="flex items-center justify-end gap-1.5 text-xs font-mono text-zinc-500 mb-2">
                  <span>Next System Spec</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="text-xs font-mono text-sky-400 uppercase tracking-wider mb-1">
                  {nextProject.category}
                </div>
                <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors line-clamp-1">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectDetail;
