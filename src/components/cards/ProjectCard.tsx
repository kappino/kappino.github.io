import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECT_CATEGORIES } from '@/data/projects';
import type { Project } from '@/types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="editorial-card group relative flex h-full flex-col gap-4 p-5 sm:p-6 focus-within:border-sky-300/60">
      <div className="flex items-center justify-between gap-4">
        <p className="editorial-label">{PROJECT_CATEGORIES[project.category]}</p>
        <ArrowUpRight size={18} className="shrink-0 text-sky-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-xl font-semibold leading-tight tracking-tight text-white">
          <Link to={'/projects/' + project.id} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
            {project.displayTitle ?? project.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.contribution ?? project.tagline}</p>
        {project.recognition && <p className="mt-3 text-sm font-medium text-sky-300">{project.recognition}</p>}
      </div>
      <p className="mt-auto pt-1 font-mono text-xs leading-relaxed text-zinc-300">
        {project.technologies.slice(0, 3).join(' · ')}
      </p>
    </article>
  );
}
