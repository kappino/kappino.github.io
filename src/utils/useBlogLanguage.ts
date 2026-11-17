import { useSearchParams } from 'react-router-dom';
import type { BlogLanguage } from './blogLoader';

const preferenceKey = 'kappino_blog_lang';

export function useBlogLanguage() {
  const [params, setParams] = useSearchParams();
  const requestedLanguage = params.get('lang');
  let savedLanguage: string | null = null;
  try {
    savedLanguage = localStorage.getItem(preferenceKey);
  } catch {
    // The explicit URL still works when storage is unavailable.
  }
  const language: BlogLanguage = requestedLanguage === 'en' || requestedLanguage === 'it'
    ? requestedLanguage
    : savedLanguage === 'en' ? 'en' : 'it';

  function setLanguage(nextLanguage: BlogLanguage) {
    if (nextLanguage === language) return;
    try {
      localStorage.setItem(preferenceKey, nextLanguage);
    } catch {
      // The URL holds the selection for this view.
    }
    setParams((current) => {
      const next = new URLSearchParams(current);
      next.set('lang', nextLanguage);
      return next;
    }, { replace: true });
  }

  return [language, setLanguage] as const;
}
