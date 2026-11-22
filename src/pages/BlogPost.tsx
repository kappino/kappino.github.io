import { isValidElement, lazy, Suspense, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, Link2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { BlogLanguageSwitcher } from '@/components/common/BlogLanguageSwitcher';
import { CodeBlockWithCopy } from '@/components/common/CodeBlockWithCopy';
import { CareDecisionFigure, FlowFigure, GatewayChecksFigure, HomelabGpuOpsFigure, HomelabTopologyFigure, SpectraCleaningFigure, SpectraCohortFigure, SpectraResultsFigure, TranscriptComparisonFigure } from '@/components/common/EvidenceFigure';
import { ReadingProgressBar } from '@/components/common/ReadingProgressBar';
import { personalInfo } from '@/data/personal';
import { projects } from '@/data/projects';
import { articleFlows } from '@/data/projectFigures';
import { ias19Publication } from '@/data/publications';
import type { BlogPost } from '@/types';
import { loadAllBlogPosts, loadBlogPostBySlug, type BlogLanguage } from '@/utils/blogLoader';
import { useBlogLanguage } from '@/utils/useBlogLanguage';

const MermaidDiagram = lazy(() => import('@/components/common/MermaidDiagram').then((module) => ({ default: module.MermaidDiagram })));

function headingId(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
}

function plainText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(plainText).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return plainText(node.props.children);
  return '';
}

function articleHeadings(content: string) {
  const headings = [];
  let fence: string | undefined;
  for (const line of content.split('\n')) {
    const marker = line.match(/^ {0,3}([`~])\1{2,}/)?.[1];
    if (marker && !fence) {
      fence = marker;
      continue;
    }
    if (marker && marker === fence) {
      fence = undefined;
      continue;
    }
    if (fence) continue;
    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;
    const title = match[2].trim().replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '');
    headings.push({ id: headingId(title), title, level: match[1].length });
  }
  return headings;
}

function Heading({ level, children, italian }: { level: 2 | 3; children: ReactNode; italian: boolean }) {
  const Tag = level === 2 ? 'h2' : 'h3';
  const text = plainText(children);
  const id = headingId(text);
  return (
    <Tag id={id} className="group scroll-mt-24">
      {children}
      <a href={'#' + id} aria-label={(italian ? 'Link alla sezione ' : 'Link to section ') + text} className="ml-2 text-base opacity-0 focus-visible:opacity-100 group-hover:opacity-100">#</a>
    </Tag>
  );
}

function Contents({ entries, activeId, label, onJump }: {
  entries: ReturnType<typeof articleHeadings>;
  activeId: string;
  label: string;
  onJump?: () => void;
}) {
  return (
    <nav aria-label={label} className="max-h-[65vh] space-y-1 overflow-y-auto pr-2 text-sm leading-snug">
      {entries.map(({ id, title, level }) => (
        <a key={id} href={'#' + id} onClick={onJump} aria-current={activeId === id ? 'location' : undefined} className={'block rounded border-l border-transparent py-1.5 text-zinc-400 hover:text-white aria-[current=location]:border-sky-300 aria-[current=location]:text-sky-300 ' + (level === 3 ? 'pl-5' : 'pl-3')}>
          {title}
        </a>
      ))}
    </nav>
  );
}

export default function BlogPostView() {
  const { slug } = useParams();
  const { hash } = useLocation();
  const [language, setLanguage] = useBlogLanguage();
  const italian = language === 'it';
  const [current, setCurrent] = useState<{ slug: string; language: BlogLanguage; article: BlogPost | null } | null>(null);
  const [collection, setCollection] = useState<{ language: BlogLanguage; articles: BlogPost[] } | null>(null);
  const [activeId, setActiveId] = useState('');
  const [shareStatus, setShareStatus] = useState('');
  const [contentsOpen, setContentsOpen] = useState(false);
  const loading = current?.slug !== slug || current?.language !== language;
  const post = loading ? null : current.article;
  const content = post?.content ?? '';
  const entries = useMemo(() => articleHeadings(content), [content]);
  const relatedProject = projects.find((project) => project.articleSlug === slug);
  const flow = slug ? articleFlows[slug]?.[language] : undefined;
  const isPublicationArticle = relatedProject?.id === 'proj-spectra-eeg';
  const articles = collection?.language === language ? collection.articles : [];
  const articleIndex = articles.findIndex((article) => article.slug === slug);
  const adjacentArticles = articleIndex < 0 ? [] : [articles[articleIndex - 1], articles[articleIndex + 1]].filter(Boolean);
  const contentsLabel = italian ? 'In questo articolo' : 'On this page';

  useEffect(() => {
    if (!slug) return;
    let active = true;
    void loadBlogPostBySlug(slug, language).then((article) => {
      if (active) setCurrent({ slug, language, article });
    });
    return () => { active = false; };
  }, [slug, language]);

  useEffect(() => {
    let active = true;
    void loadAllBlogPosts(language).then((articles) => {
      if (active) setCollection({ language, articles });
    });
    return () => { active = false; };
  }, [language]);

  useEffect(() => {
    if (post && hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [post, hash]);

  useEffect(() => {
    if (entries.length === 0) return;
    let frame = 0;
    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const current = entries.findLast(({ id }) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 112);
        setActiveId(current?.id ?? '');
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [entries]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus(italian ? 'Link copiato' : 'Link copied');
    } catch {
      setShareStatus(italian ? 'Copia il link dalla barra degli indirizzi' : 'Copy the link from the address bar');
    }
  }

  if (loading || !post) {
    return (
      <div className="site-shell editorial-page" lang={language}>
        {loading ? <p role="status">{italian ? 'Caricamento…' : 'Loading…'}</p> : (
          <>
            <h1 className="editorial-title">{italian ? 'Articolo non trovato' : 'Article not found'}</h1>
            <Link className="editorial-link mt-5" to={'/blog?lang=' + language}>{italian ? 'Tutti gli articoli' : 'All articles'}</Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="site-shell editorial-page" lang={language}>
      <ReadingProgressBar />
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <Link className="editorial-link" to={'/blog?lang=' + language}><ArrowLeft size={16} aria-hidden="true" /> {italian ? 'Tutti gli articoli' : 'All articles'}</Link>
        <BlogLanguageSwitcher language={language} onChange={(next) => {
          setShareStatus('');
          setContentsOpen(false);
          setLanguage(next);
        }} />
      </div>

      <header className="editorial-heading">
        <p className="editorial-label mb-3">{post.category}</p>
        <h1 className="editorial-title max-w-[23ch]">{post.title}</h1>
        <p className="editorial-intro">{post.excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-400">
          <span>{personalInfo.name}</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <time dateTime={post.date}>{post.date}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readTime} {italian ? 'min di lettura' : 'min read'}</span>
          <button type="button" onClick={copyLink} className="editorial-link"><Link2 size={16} aria-hidden="true" /> {italian ? 'Copia link' : 'Copy link'}</button>
          <span role="status">{shareStatus}</span>
        </div>
      </header>

      {entries.length > 0 && (
        <details className="editorial-disclosure mb-7 lg:hidden" open={contentsOpen} onToggle={(event) => setContentsOpen(event.currentTarget.open)}>
          <summary>{contentsLabel} <ChevronDown size={17} aria-hidden="true" /></summary>
          <div className="editorial-disclosure-body"><Contents entries={entries} activeId={activeId} label={contentsLabel} onJump={() => setContentsOpen(false)} /></div>
        </details>
      )}

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] xl:gap-16">
        <div className="min-w-0">
          <div className="max-w-[72ch]">
            {flow && <FlowFigure flow={flow} />}
            {slug === 'proxmox-homelab-architecture' && (
              <>
                <HomelabTopologyFigure italian={italian} />
                <HomelabGpuOpsFigure italian={italian} />
              </>
            )}
            {slug === 'deterministic-life-safety-arbitration-ros2-gorules' && <CareDecisionFigure italian={italian} />}
            {slug === 'zero-trust-mtls-constrained-iot-esp32' && <GatewayChecksFigure italian={italian} />}
            {slug === 'ansi-scraping-vs-structured-jsonl' && <TranscriptComparisonFigure italian={italian} />}
            {slug === 'eeg-emotion-recognition-schizophrenia-ias19' && (
              <>
                <SpectraCohortFigure italian={italian} />
                <SpectraCleaningFigure italian={italian} />
                <SpectraResultsFigure italian={italian} />
              </>
            )}
          </div>
          <article className="prose prose-invert max-w-[72ch] prose-headings:tracking-tight prose-p:leading-[1.8] prose-a:text-sky-300 prose-code:break-words prose-code:font-mono prose-code:text-sky-200 sm:prose-lg">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                h2: ({ children }) => <Heading level={2} italian={italian}>{children}</Heading>,
                h3: ({ children }) => <Heading level={3} italian={italian}>{children}</Heading>,
                table: ({ children }) => (
                  <div className="my-7 overflow-x-auto rounded-xl border border-zinc-800" tabIndex={0} role="region" aria-label={italian ? 'Tabella scorrevole' : 'Scrollable table'}>
                    <table className="!my-0 min-w-[30rem] [&_td]:px-3 [&_th]:px-3">{children}</table>
                  </div>
                ),
                pre: ({ children }) => {
                  const code = isValidElement<{ className?: string; children?: ReactNode }>(children) ? children.props : null;
                  if (code?.className?.includes('language-mermaid')) {
                    return (
                      <Suspense fallback={<p role="status">{italian ? 'Caricamento del diagramma…' : 'Loading diagram…'}</p>}>
                        <MermaidDiagram chart={plainText(code.children)} />
                      </Suspense>
                    );
                  }
                  return <CodeBlockWithCopy>{children}</CodeBlockWithCopy>;
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>

          {(relatedProject || isPublicationArticle) && (
            <aside aria-label={italian ? 'Approfondimenti' : 'Related work'} className="mt-9 flex flex-wrap gap-3 border-y border-zinc-800 py-5">
              {relatedProject && (
                <Link className="editorial-button" to={'/projects/' + relatedProject.id}>
                  {italian ? 'Scheda progetto' : 'Project case study'} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              )}
              {isPublicationArticle && ias19Publication.doiUrl && (
                <a className="editorial-button editorial-button-primary" href={ias19Publication.doiUrl} target="_blank" rel="noreferrer">
                  {italian ? 'Leggi su Springer' : 'Read on Springer'} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </aside>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => <Link key={tag} to={'/blog?lang=' + language + '&tag=' + encodeURIComponent(tag)} className="editorial-filter">#{tag}</Link>)}
          </div>
          {adjacentArticles.length > 0 && (
            <nav aria-label={italian ? 'Altri articoli' : 'More articles'} className="mt-8 divide-y divide-zinc-800 border-y border-zinc-800">
              {adjacentArticles.map((article) => (
                <Link key={article.slug} to={'/blog/' + article.slug + '?lang=' + language} className="editorial-row text-sm text-zinc-200">
                  {article.title} <ArrowRight size={18} className="shrink-0 text-sky-300" aria-hidden="true" />
                </Link>
              ))}
            </nav>
          )}
        </div>
        {entries.length > 0 && (
          <aside className="sticky top-24 hidden border-l border-zinc-800 pl-4 lg:block">
            <p className="mb-3 text-sm font-semibold text-white">{contentsLabel}</p>
            <Contents entries={entries} activeId={activeId} label={contentsLabel} />
          </aside>
        )}
      </div>
    </div>
  );
}
