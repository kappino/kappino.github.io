import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Clock,
  Loader2,
  ArrowRight,
  Search,
  X,
} from 'lucide-react';
import { BlogPost } from '@/types';
import { loadAllBlogPosts } from '@/utils/blogLoader';
import { SpotlightCard } from '@/components/common/SpotlightCard';

const DOMAIN_FILTERS = [
  { id: 'all', label: 'All Dispatches' },
  { id: 'Robotics', label: 'Robotics & Real-Time' },
  { id: 'Security', label: 'Security & PKI' },
  { id: 'Biomedical', label: 'Biomedical ML' },
  { id: 'Systems', label: 'Systems & Agents' },
];

export const Blog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const activeCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    let isMounted = true;
    loadAllBlogPosts()
      .then((loaded) => {
        if (isMounted) {
          setPosts(loaded);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectCategory = (catId: string) => {
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (activeCategory !== 'all') {
      result = result.filter(
        (p) =>
          p.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(activeCategory.toLowerCase()))
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [posts, activeCategory, searchQuery]);

  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Masthead */}
        <div className="mb-10 pb-8 border-b border-zinc-800/80">
          <span className="font-mono text-xs uppercase tracking-widest text-sky-400 font-semibold mb-2 block">
            Technical Dispatches &amp; Research Notes
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3 font-sans">
            Engineering Notes &amp; Research
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed font-normal">
            In-depth blueprints, mathematical formulations, and system postmortems across robotics, edge cryptography, and clinical signal processing.
          </p>
        </div>

        {/* Search & Domain Filter Bar */}
        <div className="space-y-4 mb-10">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dispatches by title, concept, or protocol..."
              className="w-full pl-10 pr-9 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/40 transition-all font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                title="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Clean Domain Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {DOMAIN_FILTERS.map(({ id, label }) => {
              const isActive = activeCategory === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSelectCategory(id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-sky-500 text-zinc-950 font-bold shadow-sm'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400 gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-sky-400" />
            <span className="font-mono text-xs">Loading articles...</span>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-16 text-center rounded-xl border border-zinc-800 bg-zinc-900/30 p-8">
            <h3 className="text-sm font-semibold text-white mb-2">No dispatches match your query</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4">
              Try adjusting your search terms or resetting filters to browse all engineering articles.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                handleSelectCategory('all');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-800 text-xs font-mono text-sky-400 hover:text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <SpotlightCard
                key={post.slug}
                className="p-6 sm:p-7 group hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Meta: Category, Date, Read Time */}
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2.5">
                    <span className="text-sky-400 font-medium">{post.category}</span>
                    <div className="flex items-center gap-2">
                      <span>{post.date}</span>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors leading-snug mb-3">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Complete, Non-Truncated Excerpt */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal mb-5">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 font-medium text-sky-400 group-hover:text-sky-300 transition-colors"
                  >
                    <span>Read full dispatch</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <span className="text-zinc-600 text-[11px]">
                    {post.tags.slice(0, 2).map((t) => `#${t}`).join(' ')}
                  </span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
