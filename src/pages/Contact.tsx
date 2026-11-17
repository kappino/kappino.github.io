import { useState } from 'react';
import { ArrowUpRight, Copy, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/common/Icons';
import { personalInfo } from '@/data/personal';

export default function Contact() {
  const [copyStatus, setCopyStatus] = useState('');

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopyStatus('Email address copied.');
    } catch {
      setCopyStatus('Copy the address directly from the link.');
    }
  }

  const profiles = [
    { label: 'LinkedIn', href: personalInfo.socials.linkedin, Icon: LinkedinIcon },
    { label: 'GitHub', href: personalInfo.socials.github, Icon: GithubIcon },
  ];

  return (
    <div className="site-shell editorial-page">
      <div className="max-w-2xl">
        <header className="mb-8 sm:mb-10">
          <h1 className="editorial-title">Contact</h1>
          <p className="editorial-intro">{personalInfo.location}</p>
        </header>

        <div className="rounded-2xl border border-sky-300/20 bg-zinc-900/80 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="editorial-label mb-2">Email</p>
              <a href={'mailto:' + personalInfo.email} className="inline-flex items-center gap-2 break-all text-sm font-semibold text-white hover:text-sky-300 sm:text-lg">
                <Mail size={18} className="shrink-0 text-sky-300" aria-hidden="true" />
                <span>{personalInfo.email}</span>
              </a>
            </div>
            <button type="button" className="editorial-button" onClick={copyAddress}>
              <Copy size={16} aria-hidden="true" /> Copy email
            </button>
          </div>
          <p role="status" className={copyStatus ? 'mt-3 text-sm text-zinc-300' : 'sr-only'}>{copyStatus}</p>
        </div>

        <ul className="mt-3 grid gap-3 sm:grid-cols-2" aria-label="Professional profiles">
          {profiles.map(({ label, href, Icon }) => (
            <li key={label}>
              <a href={href} className="editorial-card flex min-h-14 items-center gap-3 px-4 text-sm font-medium text-white">
                <Icon className="h-4 w-4 text-sky-300" />
                {label}
                <ArrowUpRight size={17} className="ml-auto text-sky-300" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
