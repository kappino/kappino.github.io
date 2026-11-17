import type { BlogLanguage } from '@/utils/blogLoader';

export function BlogLanguageSwitcher({ language, onChange }: {
  language: BlogLanguage;
  onChange: (language: BlogLanguage) => void;
}) {
  return (
    <div role="group" aria-label={language === 'it' ? 'Lingua' : 'Language'} className="inline-flex shrink-0 items-center rounded-lg border border-zinc-800 bg-zinc-900 p-1">
      <button type="button" lang="it" aria-label="Italiano" aria-pressed={language === 'it'} onClick={() => onChange('it')} className="rounded-md px-3 py-2 text-xs font-semibold text-zinc-400 hover:text-white aria-pressed:bg-sky-300 aria-pressed:text-zinc-950">IT</button>
      <button type="button" lang="en" aria-label="English" aria-pressed={language === 'en'} onClick={() => onChange('en')} className="rounded-md px-3 py-2 text-xs font-semibold text-zinc-400 hover:text-white aria-pressed:bg-sky-300 aria-pressed:text-zinc-950">EN</button>
    </div>
  );
}
