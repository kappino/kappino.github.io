import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from '../common/ScrollToTop';
import { BackToTop } from '../common/BackToTop';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-sky-500/20 selection:text-sky-300 relative">
      {/* Ambient subtle cyber glow & grid background */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_900px_at_50%_-150px,rgba(56,189,248,0.06),transparent_70%)] z-0" />
      <div className="fixed inset-0 pointer-events-none bg-grid-cyber opacity-60 z-0" />

      <ScrollToTop />
      <Header />
      <main className="flex-1 w-full relative z-10">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
