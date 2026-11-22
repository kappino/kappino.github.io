import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { BlogLanguageSwitcher } from '@/components/common/BlogLanguageSwitcher';
import type { BlogPost } from '@/types';
import { loadAllBlogPosts, type BlogLanguage } from '@/utils/blogLoader';
import { useBlogLanguage } from '@/utils/useBlogLanguage';

const topics = [
  { id: 'all', en: 'All', it: 'Tutti' },
  { id: 'Infrastructure', en: 'Homelab & Infra', it: 'Homelab & Infra' },
  { id: 'Security', en: 'Security', it: 'Sicurezza' },
  { id: 'Robotics', en: 'Robotics', it: 'Robotica' },
  { id: 'Biomedical', en: 'Biomedical ML', it: 'ML biomedico' },
  { id: 'Systems', en: 'Systems', it: 'Sistemi' },
];

const leadSlug = 'proxmox-homelab-architecture';
const recommendedSlugs = [
  'zero-trust-mtls-constrained-iot-esp32',
  'deterministic-life-safety-arbitration-ros2-gorules',
  'eeg-emotion-recognition-schizophrenia-ias19',
  'ansi-scraping-vs-structured-jsonl',
];

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const [language, setLanguage] = useBlogLanguage();
  const [collection, setCollection] = useState<{ language: BlogLanguage; posts: BlogPost[] } | null>(null);
  const [search, setSearch] = useState('');
  const italian = language === 'it';
  const activeTopic = params.get('category') || 'all';
  const activeTag = params.get('tag');
  const query = search.trim().toLowerCase();
  const posts = collection?.language === language ? collection.posts : null;
  const lead = posts?.find((post) => post.slug === leadSlug);
  const recommended = recommendedSlugs
    .map((slug) => posts?.find((post) => post.slug === slug))
    .filter((post): post is BlogPost => post !== undefined);
  const postPath = (slug: string) => '/blog/' + slug + '?lang=' + language;
  const matches = posts?.filter((post) => {
    const topic = activeTopic.toLowerCase();
    const inTopic = activeTopic === 'all' || (post.topic
      ? post.topic.toLowerCase() === topic
      : post.category.toLowerCase().includes(topic));
    const hasTag = !activeTag || post.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase());
    return inTopic && hasTag && [post.title, post.excerpt, post.content, ...post.tags]
      .some((field) => field.toLowerCase().includes(query));
  });

  useEffect(() => {
    let active = true;
    void loadAllBlogPosts(language).then((loaded) => {
      if (active) setCollection({ language, posts: loaded });
    });
    return () => { active = false; };
  }, [language]);

  function selectTopic(topic: string) {
    setParams((current) => {
      const next = new URLSearchParams(current);
      next.delete('tag');
      if (topic === 'all') next.delete('category');
      else next.set('category', topic);
      return next;
    });
  }

  return (
    <div className="site-shell editorial-page" lang={language}>
      <header className="mb-6 flex flex-wrap items-start justify-between gap-5 sm:mb-8">
        <div>
          <h1 className="editorial-title">Blog</h1>
          <p className="editorial-intro">
            {italian
              ? 'Appunti di ingegneria su infrastrutture self-hosted, sicurezza IoT, robotica ROS 2 e sistemi reali.'
              : 'Engineering deep dives on self-hosted infrastructure, IoT security, ROS 2 robotics, and systems trade-offs.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {lead && (
            <a href="#article-index" className="editorial-link min-h-10">
              {italian ? 'Tutti gli articoli' : 'Browse all posts'} <ArrowDown size={16} aria-hidden="true" />
            </a>
          )}
          <BlogLanguageSwitcher language={language} onChange={setLanguage} />
        </div>
      </header>

      {lead && (
        <section aria-label={italian ? 'Letture in evidenza' : 'Featured reading'} className="mb-10 space-y-4 sm:mb-14">
          <article className="grid items-center gap-6 rounded-2xl border border-sky-300/25 bg-zinc-950/95 p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div className="min-w-0">
              <p className="editorial-label mb-3">
                {italian ? 'Case Study · Homelab Proxmox VE 9.1' : 'Deep Dive · Proxmox VE 9.1 Homelab'}
              </p>
              <h2 className="max-w-[23ch] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">{lead.title}</h2>
              <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-zinc-300 sm:text-base">{lead.excerpt}</p>
              <Link to={postPath(lead.slug)} className="editorial-button editorial-button-primary mt-6">
                {italian ? 'Esplora architettura e diagrammi' : 'Read the architecture & diagrams'} <ArrowRight size={16} className="shrink-0" aria-hidden="true" />
              </Link>
            </div>
            <div className="min-w-0 rounded-xl border border-sky-300/15 bg-sky-950/25 p-4 sm:p-5">
              <p className="editorial-label mb-3">{italian ? 'Dentro i 16 GB di RAM' : 'Inside the 16 GB RAM budget'}</p>
              <ol className="divide-y divide-sky-300/15 font-mono text-sm text-sky-100">
                {(italian
                  ? [
                      'vmbr0 / vmbr1 · Tailscale + Cloudflare Tunnels',
                      'Splunk SIEM · Uptime Kuma · Backup zstd alle 03:00',
                      'GTX 1070 condivisa · Immich CUDA, Ollama & Whisper',
                      'Aegis Core & Agentic SRE con snapshot preventivi',
                    ]
                  : [
                      'vmbr0 / vmbr1 · Tailscale + Cloudflare Tunnels',
                      'Splunk SIEM · Uptime Kuma · Daily 03:00 zstd backups',
                      'Shared GTX 1070 · Immich CUDA, Ollama & Whisper',
                      'Aegis Core & Agentic SRE with preventive snapshots',
                    ]
                ).map((step) => <li key={step} className="py-2.5 first:pt-0 last:pb-0">{step}</li>)}
              </ol>
              <p className="mt-4 text-xs text-zinc-400">
                {italian ? '12 LXC + 2 VM KVM su laptop ASUS riciclato con batteria usata come UPS.' : '12 LXC + 2 KVM VMs on a recycled ASUS laptop with battery-as-UPS limiting.'}
              </p>
            </div>
          </article>
          {recommended.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {recommended.map((post) => (
                <article key={post.slug} className="editorial-card flex flex-col gap-3 p-5 sm:p-6">
                  <p className="editorial-label">{post.category}</p>
                  <h2 className="text-xl font-semibold leading-tight tracking-tight text-white">{post.title}</h2>
                  <p className="text-sm leading-relaxed text-zinc-400">{post.excerpt}</p>
                  <Link to={postPath(post.slug)} className="editorial-link mt-auto min-h-10 self-start">
                    {italian ? 'Leggi l’approfondimento' : 'Read the technical note'} <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      <section id="article-index" className="scroll-mt-24" aria-labelledby="article-index-title">
        <h2 id="article-index-title" className="editorial-section-title mb-5">{italian ? 'Tutti gli articoli' : 'All posts'}</h2>
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div role="group" aria-label={italian ? 'Filtra per argomento' : 'Filter by topic'} className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button key={topic.id} type="button" aria-pressed={topic.id === activeTopic && !activeTag} onClick={() => selectTopic(topic.id)} className="editorial-filter">
                {topic[language]}
              </button>
            ))}
          </div>
          <label className="relative block min-w-0 w-full sm:w-64">
            <span className="sr-only">{italian ? 'Cerca articoli' : 'Search articles'}</span>
            <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={italian ? 'Cerca articoli' : 'Search articles'} className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2 pl-10 pr-3 text-sm text-zinc-100 placeholder:text-zinc-400" />
          </label>
        </div>

        {activeTag && (
          <button type="button" onClick={() => selectTopic('all')} className="editorial-filter mb-4" aria-pressed="true">
            {activeTag} <span aria-hidden="true">×</span><span className="sr-only">{italian ? ' (rimuovi)' : ' (remove)'}</span>
          </button>
        )}
        {matches === undefined ? (
          <p role="status" className="py-8 text-zinc-400">{italian ? 'Caricamento…' : 'Loading…'}</p>
        ) : matches.length ? (
          <div className="divide-y divide-zinc-800 border-y border-zinc-800">
            {matches.map((post) => (
              <article key={post.slug} className="editorial-row relative items-start gap-6 py-6 focus-within:bg-zinc-900/70 sm:py-7">
                <div className="min-w-0">
                  <p className="editorial-label mb-2">{post.category}</p>
                  <h3 className="text-xl font-semibold leading-tight tracking-tight text-zinc-100 sm:text-2xl">
                    <Link to={postPath(post.slug)} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-sky-300">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-zinc-400">{post.excerpt}</p>
                  <p className="mt-3 font-mono text-xs text-zinc-400">
                    <time dateTime={post.date}>{post.date}</time> · {post.readTime} {italian ? 'min di lettura' : 'min read'}
                  </p>
                </div>
                <ArrowUpRight size={19} className="mt-1 shrink-0 text-sky-300" aria-hidden="true" />
              </article>
            ))}
          </div>
        ) : (
          <div className="border-y border-zinc-800 py-8">
            <p role="status" className="text-zinc-300">{italian ? 'Nessun articolo trovato.' : 'No articles found.'}</p>
            <button type="button" onClick={() => { setSearch(''); selectTopic('all'); }} className="editorial-link mt-3">
              {italian ? 'Azzera filtri' : 'Reset filters'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
