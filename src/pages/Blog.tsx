import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Loader2, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/types';
import { loadAllBlogPosts } from '@/utils/blogLoader';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    loadAllBlogPosts()
      .then((loaded) => {
        if (isMounted) { setPosts(loaded); setLoading(false); }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter((p) => p.tags.includes(selectedTag));
  }, [posts, selectedTag]);

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-sky-400 font-semibold mb-2 block">
            Technical Writing &amp; Architecture Notes
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Blog &amp; Field Notes
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Deep-dives, postmortems, and design reflections on ROS2 modularity, memory layout, AI orchestration, and system development.
          </p>
        </div>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-800">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                selectedTag === null
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Topics ({posts.length})
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  selectedTag === tag
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-500">
            <Loader2 className="h-6 w-6 animate-spin mr-2 text-sky-400" />
            <span className="font-mono text-xs">Loading articles index...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center rounded-xl border border-zinc-800 bg-zinc-900/30 p-8">
            <span className="font-mono text-sky-400 text-xs uppercase tracking-wider block mb-2">[0 ARTICLES]</span>
            <h3 className="text-base font-semibold text-white mb-2">No technical articles published yet</h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Future writeups on zero-trust IoT telemetry, ROS2 priority resolvers, and embedded systems will appear here.
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm font-mono">
            No articles match the selected tag.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-6 hover:border-slate-700 hover:bg-slate-900/70 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3">
                    <span>{post.date}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-snug mb-3">
                    <Link to={`/blog/${post.slug}`} className="focus:outline-none focus:underline">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-slate-950 font-mono text-[11px] text-slate-400 border border-slate-800/80"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    <span>Read article</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
