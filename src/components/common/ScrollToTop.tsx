import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Disable browser automatic scroll restoration to avoid inheriting previous scroll offset
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  const resetScroll = () => {
    // Temporarily bypass smooth scrolling to instantly pin viewport at top
    const originalBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = originalBehavior;
    });
  };

  useLayoutEffect(() => {
    resetScroll();
  }, [pathname]);

  useEffect(() => {
    // Secondary micro-check after lazy components mount to prevent landing at the bottom
    const timer = setTimeout(() => {
      resetScroll();
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
