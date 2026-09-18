import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Clock, Calendar, Loader2, User } from 'lucide-react';
import { BlogPost } from '@/types';
import { loadBlogPostBySlug } from '@/utils/blogLoader';

export const BlogPostView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (slug) {
      loadBlogPostBySlug(slug)
        .then((loaded) => {
          if (isMounted) { setPost(loaded); setLoading(false); }
        })
        .catch(() => {
          if (isMounted) setLoading(false);
        });
    }
    return () => { isMounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-400">
        <Loader2 className="h-6 w-6 animate-spin mr-2 text-sky-400" />
        <span className="font-mono text-xs">Loading article content...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-28 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
        <p className="text-slate-400 mb-8 text-sm">
          The requested article does not exist or has been relocated.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-sky-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Blog Index</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Navigation back link */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12 pb-8 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-500" />
              <span>{post.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              <span>{post.readTime} min read</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <User className="h-3.5 w-3.5 text-sky-400" />
              <span>Crescenzo Esposito</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Body */}
        <article className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:text-white prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-5 prose-a:text-sky-400 prose-a:underline hover:prose-a:text-sky-300 prose-code:text-sky-300 prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-xs prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800 prose-pre:p-4 prose-pre:rounded-xl prose-ul:list-disc prose-ul:pl-6 prose-ul:text-slate-300 prose-li:mb-2 prose-blockquote:border-l-2 prose-blockquote:border-sky-500/50 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-400">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default BlogPostView;
