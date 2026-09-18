import { useState, useMemo } from 'react';
import { Shield, Bot, Cpu, Microscope, Terminal, Layers } from 'lucide-react';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Project } from '@/types';

type CategoryFilter = 'all' | Project['category'];

const CATEGORY_TABS: { id: CategoryFilter; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'all', label: 'All Domains', icon: Layers },
  { id: 'security', label: 'Security & PKI', icon: Shield },
  { id: 'robotics', label: 'Robotics & ROS2', icon: Bot },
  { id: 'embedded', label: 'Embedded & Edge AI', icon: Cpu },
  { id: 'research', label: 'Biomedical ML', icon: Microscope },
  { id: 'systems', label: 'Systems & Networking', icon: Terminal },
];

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-sky-400 font-semibold mb-2 block">
            Engineering Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Projects &amp; Architectures
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            A curated index of hardware-software systems, cryptographic hardening implementations, robotic middlewares, and machine learning pipelines developed for research and practical applications.
          </p>
        </div>

        {/* Filter Tabs Bar */}
        <div role="tablist" className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-800">
          {CATEGORY_TABS.map(({ id, label, icon: Icon }) => {
            const isActive = activeCategory === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(id)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
                <span
                  className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {id === 'all'
                    ? projects.length
                    : projects.filter((p) => p.category === id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
