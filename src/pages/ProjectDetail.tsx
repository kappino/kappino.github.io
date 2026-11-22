import { Fragment, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, ChevronDown } from 'lucide-react';
import {
  CareDecisionFigure,
  FlowFigure,
  GatewayChecksFigure,
  HomelabGpuOpsFigure,
  HomelabTopologyFigure,
  SortEdgeArchitectureFigure,
  SourceFigure,
  SpectraCleaningFigure,
  SpectraCohortFigure,
  SpectraResultsFigure,
  TnesArchitectureFigure,
  UniReviewsIndexFigure,
} from '@/components/common/EvidenceFigure';
import { GithubIcon } from '@/components/common/Icons';
import { MisuseCaseDiagram } from '@/components/interactive/MisuseCaseDiagram';
import { VerificationTerminal } from '@/components/interactive/VerificationTerminal';
import { orderedProjects as projects, PROJECT_CATEGORIES } from '@/data/projects';
import { projectFlows } from '@/data/projectFigures';

function ProjectDisclosure({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="editorial-disclosure">
      <summary>{title} <ChevronDown size={17} aria-hidden="true" /></summary>
      <div className="editorial-disclosure-body">{children}</div>
    </details>
  );
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const index = projects.findIndex((project) => project.id === id);
  const project = projects[index];

  if (!project) {
    return (
      <div className="site-shell editorial-page">
        <h1 className="editorial-title">Project not found</h1>
        <Link to="/projects" className="editorial-link mt-6"><ArrowLeft size={16} aria-hidden="true" /> All projects</Link>
      </div>
    );
  }

  const articleSlug = project.articleSlug;
  const previous = projects[index - 1];
  const next = projects[index + 1];
  const flow = projectFlows[project.id];

  return (
    <article className="site-shell editorial-page" key={project.id}>
      <Link to="/projects" className="editorial-link mb-6"><ArrowLeft size={16} aria-hidden="true" /> All projects</Link>
      <header className="editorial-heading">
        <p className="editorial-label mb-3">
          {PROJECT_CATEGORIES[project.category]} · <time dateTime={project.date}>{project.date}</time>
        </p>
        <h1 className="editorial-title max-w-[24ch]">{project.displayTitle ?? project.title}</h1>
        {project.recognition && <p className="mt-4 font-semibold text-sky-300">{project.recognition}</p>}
        <p className="editorial-intro">{project.contribution ?? project.description}</p>
        {(articleSlug || project.githubUrl || project.clientUrl || project.demoUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {articleSlug && (
              <Link to={'/blog/' + articleSlug} className="editorial-button editorial-button-primary">
                <BookOpen size={16} aria-hidden="true" /> Technical article
              </Link>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} className="editorial-button" target="_blank" rel="noreferrer">
                <GithubIcon className="h-4 w-4" /> {project.githubLabel ?? 'Source code'}
              </a>
            )}
            {project.clientUrl && (
              <a href={project.clientUrl} className="editorial-button" target="_blank" rel="noreferrer">
                Unreal client <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} className="editorial-button" target="_blank" rel="noreferrer">
                {project.id === 'proj-tnes' ? 'Watch demo' : 'Demo'} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </header>

      {project.metrics && (
        <dl className="mb-8 grid gap-3 sm:grid-cols-3">
          {project.metrics.map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
              <dt className="text-xs text-zinc-400">{label}</dt>
              <dd className="mt-1 text-base font-semibold text-zinc-100">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="min-w-0 space-y-7">
          <section aria-labelledby="problem-heading">
            <h2 id="problem-heading" className="text-2xl font-semibold tracking-tight text-white">The problem</h2>
            <p className="mt-3 max-w-[68ch] text-base leading-relaxed text-zinc-300">{project.problemStatement}</p>
          </section>
          {project.threatModelOrChallenge && (
            <section aria-labelledby="decision-heading">
              <h2 id="decision-heading" className="text-2xl font-semibold tracking-tight text-white">Design decision &amp; trade-offs</h2>
              <p className="mt-3 max-w-[68ch] text-base leading-relaxed text-zinc-300">{project.threatModelOrChallenge}</p>
            </section>
          )}
        </div>
        <section aria-labelledby="results-heading" className="rounded-2xl border border-sky-300/20 bg-sky-300/[0.045] p-5 sm:p-6">
          <h2 id="results-heading" className="text-2xl font-semibold tracking-tight text-white">Results</h2>
          {project.id === 'proj-spectra-eeg' && <SpectraResultsFigure />}
          {project.id === 'proj-unireviews' && <UniReviewsIndexFigure />}
          <ul className="mt-3 divide-y divide-sky-300/15">
            {project.keyResults.map((result) => (
              <li key={typeof result === 'string' ? result : result.text} className="py-3 text-sm leading-relaxed text-zinc-200">
                {typeof result === 'string' ? result : (
                  <>
                    <p>{result.text}</p>
                    <a className="editorial-link mt-2" href={result.evidence.href}>{result.evidence.label} <ArrowUpRight size={14} aria-hidden="true" /></a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {project.id === 'proj-spectra-eeg' && <SpectraCohortFigure />}

      <section className="mt-12 min-w-0 border-t border-zinc-800 pt-8" aria-labelledby="architecture-heading">
        <h2 id="architecture-heading" className="editorial-section-title">Architecture</h2>
        {flow && <FlowFigure flow={flow} />}
        {project.id === 'proj-proxmox-homelab' && (
          <>
            <HomelabTopologyFigure />
            <HomelabGpuOpsFigure />
          </>
        )}
        {project.id === 'proj-care-decision-planner' && <CareDecisionFigure />}
        {project.id === 'proj-mtls-iot-gateway' && <GatewayChecksFigure />}
        {project.id === 'proj-munnisc-cestinno' && <SortEdgeArchitectureFigure />}
        {project.id === 'proj-tnes' && <TnesArchitectureFigure />}
        {project.id === 'proj-spectra-eeg' && <SpectraCleaningFigure />}
        {project.id === 'proj-care-decision-planner' && (
          <SourceFigure file="care-planner-design.png" alt="CARE design diagram showing inputs, the decision core and robot outputs" caption="CARE design diagram. The decision core connects the proposed inputs to robot actions, alerts, and monitoring interfaces." />
        )}
        {project.id === 'proj-mtls-iot-gateway' && (
          <SourceFigure file="gateway-proposed-architecture.png" alt="Gateway design showing the sensor, ESP32, backend and audit layers" caption="Proposed gateway architecture from the design materials. The drawing includes a programmable sensor and separates edge checks, transport, and audit." />
        )}
        <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {project.architectureSpecs.map((spec) => <li key={spec} className="border-t border-zinc-800 pt-3 text-sm leading-relaxed text-zinc-300">{spec}</li>)}
        </ul>
        <p className="mt-7 font-mono text-xs leading-loose text-zinc-400">{project.technologies.join(' · ')}</p>

        <div className="mt-7 space-y-3">
          {project.securityStandards && project.securityStandards.length > 0 && (
            <ProjectDisclosure title="Standards and design references">
              <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-300">
                {project.securityStandards.map((standard) => <li key={standard}>{standard}</li>)}
              </ul>
            </ProjectDisclosure>
          )}
          {project.misuseCases && project.misuseCases.length > 0 && (
            <ProjectDisclosure title="Threat model and countermeasures">
              <MisuseCaseDiagram cases={project.misuseCases} />
            </ProjectDisclosure>
          )}
          {project.verificationTerminal && (
            <ProjectDisclosure title="Test output and logs">
              <p className="mb-4 text-sm text-zinc-400">Static output from the project walkthrough.</p>
              <VerificationTerminal terminal={project.verificationTerminal} />
            </ProjectDisclosure>
          )}
        </div>
      </section>

      {project.walkthrough && (
        <section className="mt-10 border-t border-zinc-800 pt-6" aria-labelledby="project-walkthrough">
          <h2 id="project-walkthrough" className="editorial-section-title">{project.walkthrough.title}</h2>
          <ol className="mt-5 list-decimal space-y-4 pl-5 marker:font-semibold marker:text-sky-300">
            {project.walkthrough.steps.map(({ title, detail }) => (
              <li key={title} className="pl-2">
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-1 max-w-[72ch] text-sm leading-relaxed text-zinc-300">{detail}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {project.referenceLinks && (
        <section className="mt-8 border-t border-zinc-800 pt-5" aria-labelledby="project-references">
          <h2 id="project-references" className="mb-3 text-lg font-semibold text-white">Sources &amp; evidence</h2>
          <ul className="space-y-2">
            {project.referenceLinks.map(({ label, href }) => <li key={href}><a className="editorial-link" href={href} target="_blank" rel="noreferrer">{label} <ArrowUpRight size={15} aria-hidden="true" /></a></li>)}
          </ul>
        </section>
      )}

      <nav aria-label="More projects" className="mt-10 grid gap-3 border-t border-zinc-800 pt-5 sm:grid-cols-2">
        {[previous, next].map((item, position) => (
          <Fragment key={item?.id ?? position}>
            {item && (
              <Link to={'/projects/' + item.id} className={'editorial-row ' + (position === 1 ? 'sm:col-start-2' : '')}>
                {position === 0 && <ArrowLeft size={18} className="shrink-0 text-sky-300" aria-hidden="true" />}
                <span className="min-w-0 grow text-sm font-medium text-zinc-200">{item.displayTitle ?? item.title}</span>
                {position === 1 && <ArrowRight size={18} className="shrink-0 text-sky-300" aria-hidden="true" />}
              </Link>
            )}
          </Fragment>
        ))}
      </nav>
    </article>
  );
}
