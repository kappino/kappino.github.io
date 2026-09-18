import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Terminal, BookOpen, Briefcase, Mail } from 'lucide-react';
import { personalInfo } from '@/data/personal';

const NAV_ITEMS = [
  { path: '/projects', label: 'Projects', icon: Terminal },
  { path: '/research', label: 'Research', icon: Shield },
  { path: '/experience', label: 'Experience', icon: Briefcase },
  { path: '/blog', label: 'Blog', icon: BookOpen },
  { path: '/contact', label: 'Contact', icon: Mail },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Minimal Brand Identifier */}
        <Link
          to="/"
          className="group flex items-center gap-2 font-mono text-xs transition-colors focus:outline-none"
        >
          <span className="font-bold text-white group-hover:text-sky-400 transition-colors">
            {personalInfo.handle}
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400 font-normal hidden sm:inline">
            cybersecurity &amp; systems
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
          {NAV_ITEMS.map(({ path, label }) => {
            const active = isActive(path);
            return (
              <Link
                key={path}
                to={path}
                className={`px-3 py-1.5 rounded transition-colors ${
                  active
                    ? 'text-sky-400 bg-sky-500/10 font-medium'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Direct Email / Action */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>get in touch</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav aria-label="Mobile Navigation" className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 py-3 space-y-1 font-mono text-xs">
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
            const active = isActive(path);
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded transition-colors ${
                  active
                    ? 'text-sky-400 bg-sky-500/10 font-medium'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
};

export default Header;
