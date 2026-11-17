import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from '../common/ScrollToTop';
import { BackToTop } from '../common/BackToTop';
import { CyberGridBackground } from '../common/CyberGridBackground';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-sky-500/20 selection:text-sky-300 relative">
      {/* Accessible skip link for keyboard & assistive tech navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-sky-500 focus:text-zinc-950 focus:font-bold focus:rounded-lg focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white text-xs font-mono"
      >
        Skip to main content
      </a>

      <CyberGridBackground />
      <ScrollToTop />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 w-full relative z-10 focus:outline-none">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
