import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Loader2,
  User,
  Share2,
  Check,
  ExternalLink,
  ChevronRight,
  ListTree,
  Terminal,
  ShieldCheck,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/common/Icons';
import { personalInfo } from '@/data/personal';
import { BlogPost } from '@/types';
import { loadBlogPostBySlug, loadAllBlogPosts, BlogLanguage } from '@/utils/blogLoader';
import { CodeBlockWithCopy } from '@/components/common/CodeBlockWithCopy';
import { MermaidDiagram } from '@/components/common/MermaidDiagram';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node) && node.props && (node.props as { children?: React.ReactNode }).children) {
    return extractText((node.props as { children?: React.ReactNode }).children);
  }
  return '';
}

function extractTableOfContents(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const rawTitle = match[2].trim();
    const cleanTitle = rawTitle
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_`]/g, '');
    const id = slugify(cleanTitle);
    items.push({ id, title: cleanTitle, level });
  }

  return items;
}

export const BlogPostView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [lang, setLang] = useState<BlogLanguage>(() => {
    const urlLang = searchParams.get('lang');
    if (urlLang === 'it' || urlLang === 'en') return urlLang;
    const stored = localStorage.getItem('kappino_blog_lang') as BlogLanguage | null;
    return stored === 'en' ? 'en' : 'it';
  });

  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const activeHeadingRef = useRef<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (slug) {
      Promise.all([loadBlogPostBySlug(slug, lang), loadAllBlogPosts(lang)])
        .then(([loadedPost, posts]) => {
          if (isMounted) {
            setPost(loadedPost);
            setAllPosts(posts);
            setLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) setLoading(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [slug, lang]);

  const handleLanguageChange = (newLang: BlogLanguage) => {
    if (newLang === lang) return;
    setLoading(true);
    setLang(newLang);
    try {
      localStorage.setItem('kappino_blog_lang', newLang);
    } catch {}
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set('lang', newLang);
        return next;
      },
      { replace: true }
    );
  };

  // Extract Table of Contents
  const postContent = post?.content;
  const toc = useMemo(() => {
    if (!postContent) return [];
    return extractTableOfContents(postContent);
  }, [postContent]);

  // Next / Previous article calculation
  const { prevPost, nextPost } = useMemo(() => {
    if (!post || allPosts.length <= 1) return { prevPost: null, nextPost: null };
    const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
    if (currentIndex === -1) return { prevPost: null, nextPost: null };

    const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const prev = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    return { prevPost: prev, nextPost: next };
  }, [post, allPosts]);

  // Active heading tracking on scroll (rock-solid, 120 FPS, passive & debounced via RAF)
  useEffect(() => {
    if (toc.length === 0) return;

    // Set first heading as active initially if none active
    const firstId = toc[0].id;
    if (!activeHeadingRef.current || !toc.some((t) => t.id === activeHeadingRef.current)) {
      activeHeadingRef.current = firstId;
      setActiveHeading(firstId);
    }

    let rafId = 0;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = 0;

        // If user scrolled to the bottom of the page, activate the last heading
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
        if (scrollPosition >= pageHeight - 60) {
          const lastId = toc[toc.length - 1].id;
          if (lastId && lastId !== activeHeadingRef.current) {
            activeHeadingRef.current = lastId;
            setActiveHeading(lastId);
          }
          return;
        }

        // Active heading is the latest heading whose top offset is <= threshold (140px)
        const threshold = 140;
        let currentId = toc[0].id;

        for (let i = 0; i < toc.length; i++) {
          const el = document.getElementById(toc[i].id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= threshold) {
              currentId = toc[i].id;
            } else {
              break;
            }
          }
        }

        if (currentId && currentId !== activeHeadingRef.current) {
          activeHeadingRef.current = currentId;
          setActiveHeading(currentId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initial scroll check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [toc]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const handleShareTwitter = () => {
    if (!post) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${post.title} by @kappino`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-zinc-400 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-sky-400" />
        <span className="font-mono text-sm tracking-wide">Loading article dispatch...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-28 text-center">
        <div className="inline-flex p-3 rounded-full bg-rose-950/40 border border-rose-800 text-rose-400 mb-4">
          <Terminal className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">404: Article Not Found</h1>
        <p className="text-zinc-400 mb-8 text-sm max-w-md mx-auto">
          The requested dispatch does not exist or has been archived. Check the index for the latest field notes.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-mono text-sky-400 hover:text-white hover:border-zinc-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Field Notes</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation & Share Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs font-mono text-zinc-400 pb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-sky-400 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{lang === 'it' ? 'Articoli' : 'Dispatches'}</span>
            </Link>
            <ChevronRight className="h-3 w-3 text-zinc-600" />
            <span className="text-sky-400/90 font-medium">{post.category}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher (IT / EN) */}
            <div className="inline-flex items-center rounded-lg bg-zinc-900 border border-zinc-800 p-0.5 text-xs font-mono mr-1">
              <button
                type="button"
                onClick={() => handleLanguageChange('it')}
                className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                  lang === 'it'
                    ? 'bg-sky-500 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Versione Italiana"
                aria-label="Versione Italiana"
              >
                IT
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                  lang === 'en'
                    ? 'bg-sky-500 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="English Version"
                aria-label="English Version"
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors text-xs font-mono"
              title="Copy URL"
            >
              {copiedLink ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{lang === 'it' ? 'Copiato!' : 'Link Copied!'}</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{lang === 'it' ? 'Condividi' : 'Share'}</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleShareTwitter}
              className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-sky-400 transition-colors text-xs"
              title="Share on X"
              aria-label="Share on X"
            >
              X
            </button>
            <button
              type="button"
              onClick={handleShareLinkedIn}
              className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-sky-400 transition-colors text-xs"
              title="Share on LinkedIn"
              aria-label="Share on LinkedIn"
            >
              in
            </button>
          </div>
        </div>

        {/* Hero Article Header */}
        <header className="mb-14">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-medium tracking-wide">
              <ShieldCheck className="h-3.5 w-3.5" />
              {post.category}
            </span>
            <span className="text-zinc-600">•</span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <Calendar className="h-3.5 w-3.5 text-zinc-500" />
              <span>{post.date}</span>
            </div>
            <span className="text-zinc-600">•</span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <Clock className="h-3.5 w-3.5 text-zinc-500" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 font-sans">
            {post.title}
          </h1>

          {/* Elegant Lead Paragraph */}
          {post.excerpt && (
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal mb-8 pb-6 border-b border-zinc-800/80">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* 2-Column Grid: Content + Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">
          {/* Main Article Content */}
          <div className="w-full min-w-0">
            <article className="prose prose-invert max-w-none prose-p:text-zinc-200 prose-p:text-[17px] prose-p:leading-[1.85] prose-p:mb-6 prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight prose-a:text-sky-400 prose-a:underline hover:prose-a:text-sky-300 prose-strong:text-white prose-strong:font-semibold prose-code:font-mono prose-code:text-[13px] prose-code:text-sky-300 prose-code:bg-zinc-900 prose-code:border prose-code:border-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-ul:my-6 prose-ul:space-y-2 prose-ul:pl-6 prose-ol:my-6 prose-ol:space-y-2 prose-ol:pl-6 prose-li:text-zinc-200 prose-li:text-[16px] prose-li:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-sky-500 prose-blockquote:bg-sky-950/20 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:text-sky-200/90 prose-blockquote:italic prose-hr:border-0 prose-hr:h-px prose-hr:bg-zinc-800 prose-hr:my-10">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  h2: ({ children }) => {
                    const text = extractText(children);
                    const id = slugify(text);
                    return (
                      <h2
                        id={id}
                        className="text-2xl sm:text-3xl font-bold text-white mt-14 mb-5 pb-3 border-b border-zinc-800/80 flex items-center group scroll-mt-24"
                      >
                        <span>{children}</span>
                        <a
                          href={`#${id}`}
                          className="opacity-0 group-hover:opacity-100 ml-2.5 text-sky-400 hover:text-sky-300 transition-opacity font-mono text-lg"
                          aria-label={`Link to ${text}`}
                        >
                          #
                        </a>
                      </h2>
                    );
                  },
                  h3: ({ children }) => {
                    const text = extractText(children);
                    const id = slugify(text);
                    return (
                      <h3
                        id={id}
                        className="text-xl sm:text-2xl font-semibold text-zinc-100 mt-10 mb-4 flex items-center group scroll-mt-24"
                      >
                        <span>{children}</span>
                        <a
                          href={`#${id}`}
                          className="opacity-0 group-hover:opacity-100 ml-2 text-sky-400 hover:text-sky-300 transition-opacity font-mono text-base"
                          aria-label={`Link to ${text}`}
                        >
                          #
                        </a>
                      </h3>
                    );
                  },
                  p: ({ children }) => (
                    <p className="text-zinc-200 text-[16px] sm:text-[17px] leading-[1.85] mb-6 font-normal">
                      {children}
                    </p>
                  ),
                  table: ({ children }) => (
                    <div className="my-8 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/80 shadow-2xl">
                      <table className="w-full text-left text-sm text-zinc-300 border-collapse">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-zinc-900/90 border-b border-zinc-800">
                      {children}
                    </thead>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-3.5 text-xs font-mono font-semibold uppercase tracking-wider text-sky-400 text-left">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-3.5 border-b border-zinc-800/50 text-zinc-200 font-sans text-sm">
                      {children}
                    </td>
                  ),
                  tr: ({ children }) => (
                    <tr className="hover:bg-zinc-900/40 transition-colors">
                      {children}
                    </tr>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-outside pl-6 my-6 space-y-2.5 text-zinc-200 marker:text-sky-400">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-outside pl-6 my-6 space-y-2.5 text-zinc-200 marker:text-sky-400 marker:font-mono">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-[16px] leading-relaxed text-zinc-200">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-8 pl-5 pr-4 py-4 rounded-r-xl border-l-4 border-sky-500 bg-sky-950/20 text-sky-200/90 text-base italic leading-relaxed backdrop-blur-sm">
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => {
                    const isExternal = href?.startsWith('http');
                    return (
                      <a
                        href={href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="text-sky-400 hover:text-sky-300 underline underline-offset-4 decoration-sky-500/40 hover:decoration-sky-400 font-medium inline-flex items-center gap-0.5 transition-colors"
                      >
                        <span>{children}</span>
                        {isExternal && <ExternalLink className="h-3 w-3 ml-0.5 inline opacity-70" />}
                      </a>
                    );
                  },
                  pre: ({ children }) => {
                    // Check if children contain a code block with language-mermaid
                    if (React.isValidElement(children)) {
                      const childProps = children.props as { className?: string; children?: React.ReactNode };
                      const className = childProps?.className || '';
                      if (className.includes('language-mermaid')) {
                        const chartCode = String(childProps.children || '');
                        return <MermaidDiagram chart={chartCode} />;
                      }
                    }
                    return <CodeBlockWithCopy>{children}</CodeBlockWithCopy>;
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>

            {/* Article Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-6 mt-12 border-t border-zinc-800/80">
              <span className="text-xs font-mono text-zinc-500 mr-1">{lang === 'it' ? 'Argomenti:' : 'Topics:'}</span>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 font-mono text-xs text-zinc-400 hover:text-sky-300 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Bottom Section: Author Bio Box */}
            <div className="mt-10 pt-8 border-t border-zinc-800/80">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-400 p-0.5 flex-shrink-0 shadow-lg shadow-sky-500/20">
                  <div className="h-full w-full bg-zinc-950 rounded-[14px] flex items-center justify-center font-mono font-bold text-lg text-white">
                    CE
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">Crescenzo Esposito</h3>
                      <p className="text-xs font-mono text-sky-400">Systems &amp; Cybersecurity Engineer</p>
                    </div>

                    <div className="flex items-center justify-center sm:justify-end gap-3 text-zinc-400">
                      <a
                        href="https://github.com/kappino"
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 hover:text-white transition-colors"
                        title="GitHub @kappino"
                        aria-label="GitHub @kappino"
                      >
                        <GithubIcon className="h-4 w-4" />
                      </a>
                      <a
                        href={personalInfo.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 hover:text-white transition-colors"
                        title="LinkedIn"
                        aria-label="LinkedIn"
                      >
                        <LinkedinIcon className="h-4 w-4" />
                      </a>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 hover:text-white transition-colors"
                        title="Email"
                        aria-label="Email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {personalInfo.title} · {personalInfo.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Next / Previous Article Navigation */}
            {(prevPost || nextPost) && (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevPost ? (
                  <Link
                    to={`/blog/${prevPost.slug}?lang=${lang}`}
                    className="group p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 mb-2">
                      <ArrowLeft className="h-3 w-3" />
                      <span>{lang === 'it' ? 'Articolo Precedente' : 'Previous Dispatch'}</span>
                    </div>
                    <span className="text-sm font-semibold text-zinc-200 group-hover:text-sky-300 transition-colors line-clamp-2">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextPost ? (
                  <Link
                    to={`/blog/${nextPost.slug}?lang=${lang}`}
                    className="group p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all flex flex-col justify-between text-right sm:text-right"
                  >
                    <div className="flex items-center justify-end gap-1.5 text-xs font-mono text-zinc-500 mb-2">
                      <span>{lang === 'it' ? 'Articolo Successivo' : 'Next Dispatch'}</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                    <span className="text-sm font-semibold text-zinc-200 group-hover:text-sky-300 transition-colors line-clamp-2">
                      {nextPost.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            )}
          </div>

          {/* Sticky Right Sidebar (Desktop Table of Contents + Meta) */}
          <aside className="hidden lg:block sticky top-24 space-y-6 self-start">
            {/* Table of Contents Card */}
            {toc.length > 0 && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-sm shadow-xl">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                    <ListTree className="h-3.5 w-3.5 text-sky-400" />
                    <span>{lang === 'it' ? 'Indice' : 'On This Page'}</span>
                  </div>
                  <div className="inline-flex items-center rounded-lg bg-zinc-950 border border-zinc-800 p-0.5 text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => handleLanguageChange('it')}
                      className={`px-2 py-0.5 rounded font-semibold transition-all ${
                        lang === 'it'
                          ? 'bg-sky-500 text-zinc-950 shadow-sm'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                      title="Italiano"
                    >
                      IT
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLanguageChange('en')}
                      className={`px-2 py-0.5 rounded font-semibold transition-all ${
                        lang === 'en'
                          ? 'bg-sky-500 text-zinc-950 shadow-sm'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                      title="English"
                    >
                      EN
                    </button>
                  </div>
                </div>

                <nav className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
                  {toc.map((item) => {
                    const isActive = activeHeading === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(item.id);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                            setActiveHeading(item.id);
                          }
                        }}
                        className={`block text-xs leading-snug transition-all ${
                          item.level === 3 ? 'pl-4' : 'pl-2'
                        } py-1 rounded-md ${
                          isActive
                            ? 'text-sky-300 font-semibold bg-sky-500/10 border-l-2 border-sky-400'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                        }`}
                      >
                        {item.title}
                      </a>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* Author Quick Card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-sky-400">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-zinc-200 font-semibold">Crescenzo Esposito</div>
                  <div className="text-[11px] text-zinc-500">@kappino</div>
                </div>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-400 mb-3 font-sans">
                Research &amp; Engineering field notes on AI agents, robotics telemetry, and Linux systems.
              </p>
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                <span className="text-zinc-500">Reading time:</span>
                <span className="text-sky-400 font-bold">{post.readTime} min</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPostView;
