import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from '../common/ScrollToTop';
import { BackToTop } from '../common/BackToTop';
import { CyberGridBackground } from '../common/CyberGridBackground';
import { ReadingProgressBar } from '../common/ReadingProgressBar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-sky-500/20 selection:text-sky-300 relative">
      <ReadingProgressBar />
      {/* Animated dynamic cyber grid & harmonic telemetry waves */}
      <CyberGridBackground />

      <ScrollToTop />
      <Header />
      <main className="flex-1 w-full relative z-10">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
