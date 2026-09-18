import React, { useState, useEffect } from 'react';
import { Terminal, Layers, Shield, BookOpen, Server } from 'lucide-react';

interface NavSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SECTIONS: NavSection[] = [
  { id: 'hero', label: 'Overview', icon: Terminal },
  { id: 'architecture', label: 'Architecture', icon: Layers },
  { id: 'specializations', label: 'Specializations', icon: Shield },
  { id: 'research', label: 'Research', icon: BookOpen },
  { id: 'homelab', label: 'Homelab', icon: Server },
];

export const SidebarNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="hidden md:flex fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center"
      aria-label="Quick section navigation"
    >
      <div className="flex flex-col gap-2.5 bg-zinc-950/80 backdrop-blur-md p-1.5 rounded-full border border-zinc-800/80 shadow-2xl">
        {SECTIONS.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={`Jump to ${label}`}
              className="group relative flex items-center justify-center focus:outline-none"
            >
              {/* Tooltip on hover */}
              <div className="absolute right-full mr-3.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-50">
                <span>{label}</span>
              </div>

              {/* Icon / Dot Button */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border ${
                  isActive
                    ? 'bg-sky-500 text-zinc-950 border-sky-400 font-bold scale-110 shadow-lg shadow-sky-500/25'
                    : 'bg-zinc-900/70 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700 hover:scale-105'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SidebarNav;
