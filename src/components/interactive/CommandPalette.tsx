import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Terminal,
  FileText,
  ExternalLink,
  FileDown,
  Layers,
  ArrowRight,
  Shield,
  Bot,
  Cpu,
  Mail,
  Home,
  X,
} from 'lucide-react';
import { projects } from '@/data/projects';
import { personalInfo } from '@/data/personal';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PaletteItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Projects' | 'Blog' | 'Actions';
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  // Define searchable catalog
  const items: PaletteItem[] = useMemo(() => {
    const list: PaletteItem[] = [
      // Core Navigation
      {
        id: 'nav-home',
        title: 'Home — Overview & Interactive Cockpit',
        category: 'Navigation',
        icon: Home,
        action: () => { navigate('/'); onClose(); },
      },
      {
        id: 'nav-projects',
        title: 'Projects — Systems, Robotics & Security Architecture',
        category: 'Navigation',
        icon: Terminal,
        action: () => { navigate('/projects'); onClose(); },
      },
      {
        id: 'nav-research',
        title: 'Research — IAS-19 Peer-Reviewed Paper & BibTeX',
        category: 'Navigation',
        icon: Shield,
        badge: 'Springer LNNS',
        action: () => { navigate('/research'); onClose(); },
      },
      {
        id: 'nav-experience',
        title: 'Experience — PNRR Age-IT & University Roles',
        category: 'Navigation',
        icon: Layers,
        action: () => { navigate('/experience'); onClose(); },
      },
      {
        id: 'nav-blog',
        title: 'Blog — Technical Articles & Engineering Notes',
        category: 'Navigation',
        icon: FileText,
        action: () => { navigate('/blog'); onClose(); },
      },
      {
        id: 'nav-contact',
        title: 'Contact — Direct Communication & Security Inquiries',
        category: 'Navigation',
        icon: Mail,
        action: () => { navigate('/contact'); onClose(); },
      },

      // Blog Articles
      {
        id: 'blog-proxmox-homelab',
        title: 'Proxmox VE 9.1 Homelab: 14 Workloads, Splunk SIEM & Shared GTX 1070 in 16 GB RAM',
        category: 'Blog',
        icon: FileText,
        badge: 'Homelab',
        action: () => { navigate('/blog/proxmox-homelab-architecture'); onClose(); },
      },
      {
        id: 'blog-iot-gateway',
        title: 'Where Trust Starts in CARE’s IoT Gateway (HMAC, mTLS & Ganache Audit)',
        category: 'Blog',
        icon: FileText,
        badge: 'Security',
        action: () => { navigate('/blog/zero-trust-mtls-constrained-iot-esp32'); onClose(); },
      },
      {
        id: 'blog-care-ros2',
        title: 'How CARE Prioritizes Decisions in ROS 2 (durable_rules → GoRules JDM)',
        category: 'Blog',
        icon: FileText,
        badge: 'Robotics',
        action: () => { navigate('/blog/deterministic-life-safety-arbitration-ros2-gorules'); onClose(); },
      },
      {
        id: 'blog-spectra-eeg',
        title: 'What Wearable EEG Could Distinguish in SPECTRA (IAS-19 / Springer LNNS)',
        category: 'Blog',
        icon: FileText,
        badge: 'Research',
        action: () => { navigate('/blog/eeg-emotion-recognition-schizophrenia-ias19'); onClose(); },
      },
      {
        id: 'blog-unireviews',
        title: 'What Do University Surveys Miss? Why I Built UniReviews',
        category: 'Blog',
        icon: FileText,
        badge: 'Systems',
        action: () => { navigate('/blog/unireviews-beyond-course-surveys'); onClose(); },
      },
      {
        id: 'blog-agy-telegram',
        title: 'Operating a Local Coding Session from Telegram (Outbound HTTPS & tmux)',
        category: 'Blog',
        icon: FileText,
        badge: 'Systems',
        action: () => { navigate('/blog/agy-telegram-mobile-cockpit'); onClose(); },
      },
      {
        id: 'blog-ansi-scraping',
        title: 'Why I Switched from Terminal Snapshots to Structured JSONL Transcripts',
        category: 'Blog',
        icon: FileText,
        badge: 'Systems',
        action: () => { navigate('/blog/ansi-scraping-vs-structured-jsonl'); onClose(); },
      },

      // Engineering Projects
      ...projects.map((p) => ({
        id: `proj-${p.id}`,
        title: p.displayTitle ?? p.title,
        category: 'Projects' as const,
        icon: p.category === 'robotics' ? Bot : p.category === 'embedded' ? Cpu : p.category === 'infrastructure' ? Layers : Terminal,
        badge: p.category,
        action: () => { navigate(`/projects/${p.id}`); onClose(); },
      })),

      // Quick Actions
      {
        id: 'act-cv',
        title: 'Download Curriculum Vitae (PDF)',
        category: 'Actions',
        icon: FileDown,
        badge: 'PDF',
        action: () => {
          window.open(personalInfo.cvUrl, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
      {
        id: 'act-github',
        title: 'Visit GitHub Profile (@kappino)',
        category: 'Actions',
        icon: ExternalLink,
        badge: 'External',
        action: () => {
          window.open(personalInfo.socials.github, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
      {
        id: 'act-linkedin',
        title: 'Connect on LinkedIn',
        category: 'Actions',
        icon: ExternalLink,
        badge: 'External',
        action: () => {
          window.open(personalInfo.socials.linkedin, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
    ];

    return list;
  }, [navigate, onClose]);

  // Filter items based on user query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower) ||
        (item.badge && item.badge.toLowerCase().includes(lower))
    );
  }, [items, query]);

  const handleClose = useCallback(() => {
    setQuery('');
    setSelectedIndex(0);
    onClose();
  }, [onClose]);

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(filteredItems.length, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(filteredItems.length, 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900/95 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800">
          <Search className="h-4 w-4 text-sky-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search projects, research, articles, or jump to..."
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none font-sans"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
              }}
              className="p-1 rounded text-zinc-500 hover:text-zinc-300"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-zinc-800/40">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-zinc-500">
              No matching commands or projects found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-xs ${
                    isSelected
                      ? 'bg-sky-500/15 text-white border border-sky-500/30 font-medium'
                      : 'text-zinc-300 hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`h-7 w-7 rounded-md flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-sky-500/20 text-sky-300'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="truncate">
                      <div className="font-medium truncate">{item.title}</div>
                      <div className="text-[10px] font-mono text-zinc-500">{item.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                        {item.badge}
                      </span>
                    )}
                    {isSelected && <ArrowRight className="h-3.5 w-3.5 text-sky-400" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-800/80 bg-zinc-950/60 text-[10px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-400 mr-1">↑↓</kbd> navigate
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-400 mr-1">↵</kbd> select
            </span>
          </div>
          <span>kappino.me command plane</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
