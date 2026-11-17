import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { personalInfo } from '@/data/personal';
import { CommandPalette } from '@/components/interactive/CommandPalette';

const navigation = [
  { path: '/projects', label: 'Projects' },
  { path: '/blog', label: 'Articles' },
  { path: '/research', label: 'Research' },
  { path: '/experience', label: 'Experience' },
  { path: '/contact', label: 'Contact' },
];

const navLinkClass = 'rounded-md px-2.5 py-2 text-sm text-zinc-300 transition-colors hover:text-white aria-[current=page]:font-semibold aria-[current=page]:text-sky-300';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/90 bg-zinc-950/95 backdrop-blur-md">
      <div className="site-shell flex h-16 items-center justify-between gap-5">
        <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 rounded text-sm font-semibold text-white hover:text-sky-200" aria-label={personalInfo.handle + ' home'}>
          <span aria-hidden="true" className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-sky-300" />
          {personalInfo.handle}
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-2 md:flex">
          {navigation.map(({ path, label }) => (
            <NavLink key={path} to={path} className={navLinkClass}>{label}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => { setMenuOpen(false); setPaletteOpen(true); }} aria-label="Search site" title="Search site (Ctrl+K)" className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-300 hover:bg-zinc-900 hover:text-white">
            <Search size={19} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'} className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-300 hover:bg-zinc-900 hover:text-white md:hidden">
            {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!menuOpen} className="site-shell pb-3 md:hidden">
        {navigation.map(({ path, label }) => (
          <NavLink key={path} to={path} onClick={() => setMenuOpen(false)} className={'block ' + navLinkClass}>{label}</NavLink>
        ))}
      </nav>
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </header>
  );
}
