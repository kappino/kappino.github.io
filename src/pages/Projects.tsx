import { useState } from 'react';
import { orderedProjects, PROJECT_CATEGORIES } from '@/data/projects';
import { ProjectCard } from '@/components/cards/ProjectCard';
import type { Project } from '@/types';

type CategoryFilter = 'all' | Project['category'];
const categories = Object.entries(PROJECT_CATEGORIES) as [Project['category'], string][];
const filters: [CategoryFilter, string][] = [['all', 'All'], ...categories];

export default function Projects() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const matches = category === 'all' ? orderedProjects : orderedProjects.filter((project) => project.category === category);

  return (
    <div className="site-shell editorial-page">
      <header className="editorial-heading">
        <h1 className="editorial-title">Projects</h1>
        <p className="editorial-intro">Case studies on embedded security, robotics and systems software.</p>
      </header>
      <div aria-label="Filter projects by category" role="group" className="editorial-filters">
        {filters.map(([id, label]) => (
          <button key={id} type="button" aria-pressed={id === category} onClick={() => setCategory(id)} className="editorial-filter">
            {label}
          </button>
        ))}
      </div>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-labelledby="project-results">
        <h2 id="project-results" className="sr-only" aria-live="polite">{matches.length} projects</h2>
        {matches.map((project) => <ProjectCard key={project.id} project={project} />)}
      </section>    </div>
  );
}
