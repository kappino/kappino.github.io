import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Cpu, Shield, Bot, Microscope, Terminal } from 'lucide-react';
import { GithubIcon } from '@/components/common/Icons';
import { Project } from '@/types';
import { Badge } from '@/components/common/Badge';

interface ProjectCardProps {
  project: Project;
}

const CATEGORY_CONFIG: Record<
  Project['category'],
  { label: string; icon: React.ComponentType<{ className?: string }>; variant: 'accent' | 'default' | 'success' | 'warning' }
> = {
  security: { label: 'Cybersecurity & PKI', icon: Shield, variant: 'accent' },
  robotics: { label: 'Robotics & ROS2', icon: Bot, variant: 'default' },
  research: { label: 'Biomedical ML', icon: Microscope, variant: 'warning' },
  embedded: { label: 'Embedded Systems', icon: Cpu, variant: 'success' },
  systems: { label: 'Systems & Networking', icon: Terminal, variant: 'default' },
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const meta = CATEGORY_CONFIG[project.category] || CATEGORY_CONFIG.security;
  const CategoryIcon = meta.icon;

  return (
    <article className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-6 transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/70 shadow-sm hover:shadow-md">
      <div>
        {/* Card Header: Category & Date */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant={meta.variant} size="sm">
            <CategoryIcon className="h-3 w-3" />
            <span>{meta.label}</span>
          </Badge>
          <span className="font-mono text-xs text-slate-500">{project.date}</span>
        </div>

        {/* Project Title (Link to Detail) */}
        <h3 className="text-base font-semibold text-white group-hover:text-sky-300 transition-colors leading-snug mb-2">
          <Link to={`/projects/${project.id}`} className="focus:outline-none focus:underline">
            {project.title}
          </Link>
        </h3>

        {/* Short Summary / Tagline */}
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
          {project.tagline || project.shortDescription || project.description}
        </p>

        {/* Key Metrics / Highlights if present */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
            {project.metrics.slice(0, 2).map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] font-mono text-slate-500 uppercase">{m.label}</span>
                <span className="text-xs font-mono font-medium text-slate-200 truncate">{m.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        {/* Technologies Badges */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 font-mono text-[11px] text-slate-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-1.5 py-0.5 rounded bg-slate-950/80 border border-slate-800 font-mono text-[11px] text-slate-500">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Footer Actions: Clean, Valid Non-Nested HTML Links */}
        <div className="flex items-center justify-between text-xs pt-1">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 font-medium text-sky-400 hover:text-sky-300 transition-colors"
          >
            <span>Architecture & Details</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="View on GitHub"
              >
                <GithubIcon className="h-3.5 w-3.5" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Live Demonstration"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
