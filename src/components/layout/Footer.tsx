import React from 'react';
import { Mail, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/common/Icons';
import { personalInfo } from '@/data/personal';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="snap-page-footer border-t border-slate-800/80 bg-slate-950/60 py-12 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <ShieldCheck className="h-4 w-4 text-sky-400" />
              <span>{personalInfo.name}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500 font-mono">
              Engineered with Vite, React & Tailwind · Hosted on GitHub Pages
            </p>
          </div>

          {/* Social and Contact Links */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-sky-400 hover:border-slate-700 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="Email Contact"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <div>© {currentYear} {personalInfo.name}. All rights reserved.</div>
          <div className="font-mono text-[11px] text-slate-500">
            Open-source architecture · Strict Zero-Trust standards
          </div>
        </div>
      </div>
    </footer>
  );
};
