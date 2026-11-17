import { personalInfo } from '@/data/personal';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="site-shell flex flex-wrap items-center justify-between gap-4 py-7 text-sm">
        <p>© {new Date().getFullYear()} {personalInfo.name}</p>
        <div className="flex flex-wrap gap-5">
          <a href={personalInfo.socials.github} className="hover:text-sky-200">GitHub</a>
          <a href={personalInfo.socials.linkedin} className="hover:text-sky-200">LinkedIn</a>
          <a href={'mailto:' + personalInfo.email} className="hover:text-sky-200">Email</a>
        </div>
      </div>
    </footer>
  );
}
