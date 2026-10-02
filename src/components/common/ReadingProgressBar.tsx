import React, { useEffect, useRef } from 'react';

/**
 * ReadingProgressBar
 * Slim 2px neon telemetry bar at the very top of the viewport
 * driven by GPU transform: scaleX via requestAnimationFrame (0 React re-renders).
 */
export const ReadingProgressBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (barRef.current) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            const ratio = totalHeight > 0 ? Math.min(Math.max(currentScroll / totalHeight, 0), 1) : 0;
            barRef.current.style.transform = `scaleX(${ratio})`;
            barRef.current.style.opacity = ratio > 0.01 ? '1' : '0';
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 shadow-[0_0_8px_rgba(56,189,248,0.7)] origin-left will-change-transform opacity-0 transition-opacity duration-150"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};

export default ReadingProgressBar;
