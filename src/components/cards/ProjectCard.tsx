import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Shield, Bot, Microscope, Terminal, BookOpen } from 'lucide-react';
import { GithubIcon } from '@/components/common/Icons';
import { Project } from '@/types';
import { SpotlightCard } from '@/components/common/SpotlightCard';

const PROJECT_ARTICLE_MAP: Record<string, { slug: string; title: string }> = {
  'proj-spectra-eeg': {
    slug: 'eeg-emotion-recognition-schizophrenia-ias19',
    title: 'IAS-19 Paper Breakdown',
  },
  'proj-care-decision-planner': {
    slug: 'deterministic-life-safety-arbitration-ros2-gorules',
    title: 'PNRR Age-IT ROS2 Breakdown',
  },
  'proj-mtls-iot-gateway': {
    slug: 'zero-trust-mtls-constrained-iot-esp32',
    title: 'mTLS v1.3 Cryptography Note',
  },
};

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
  const relatedArticle = PROJECT_ARTICLE_MAP[project.id];
  const primaryMetric = project.metrics?.[0];

  return (
    <SpotlightCard className="p-6 sm:p-7 flex flex-col justify-between group hover:border-zinc-700 transition-all">
      <div>
        {/* Clean Meta: Category & Date */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-3">
          <span className="flex items-center gap-1.5 text-sky-400 font-medium">
            <CategoryIcon className="h-3.5 w-3.5" />
            <span>{meta.label}</span>
          </span>
          <span>{project.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-snug mb-3">
          <Link to={`/projects/${project.id}`} className="focus:outline-none focus:underline">
            {project.title}
          </Link>
        </h3>

        {/* Clean, Non-Truncated Description / Hook */}
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5 font-normal">
          {project.tagline || project.shortDescription || project.description}
        </p>

        {/* Standout Engineering Metric */}
        {primaryMetric && (
          <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800/80 text-xs font-mono">
            <span className="text-zinc-500 uppercase text-[10px] tracking-wider">{primaryMetric.label}:</span>
            <span className="font-bold text-emerald-400">{primaryMetric.value}</span>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-zinc-800/80 space-y-4">
        {/* Core Tech Stack (Top 3) */}
        <div className="flex flex-wrap items-center gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-zinc-400"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[10px] font-mono text-zinc-600 px-1">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between text-xs font-mono pt-1">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 font-medium text-sky-400 group-hover:text-sky-300 transition-colors"
          >
            <span>Explore Architecture</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="flex items-center gap-2.5">
            {relatedArticle && (
              <Link
                to={`/blog/${relatedArticle.slug}`}
                className="text-zinc-400 hover:text-emerald-400 transition-colors text-[11px] flex items-center gap-1"
                title="Read Research Breakdown"
              >
                <BookOpen className="h-3 w-3" />
                <span>Paper →</span>
              </Link>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-zinc-400 hover:text-white transition-colors"
                title="View on GitHub"
              >
                <GithubIcon className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};
