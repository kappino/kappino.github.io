import fm from 'front-matter';
import { BlogPost } from '../types';

export type BlogLanguage = 'it' | 'en';

interface BlogPostFrontmatter {
  title: string;
  date: string;
  category?: string;
  topic?: string;
  tags?: string[];
  excerpt?: string;
  author?: string;
}

export async function fetchBlogIndex(): Promise<string[]> {
  const res = await fetch('/blog/index.json');
  if (!res.ok) {
    throw new Error(`Failed to load blog index (${res.status})`);
  }
  return res.json();
}

export async function loadBlogPost(filename: string, customSlug?: string): Promise<BlogPost> {
  const url = `/blog/${filename}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load article ${filename}`);
  }
  const markdown = await res.text();
  const { attributes: data, body: content } = fm<BlogPostFrontmatter>(markdown);

  const slug = customSlug || filename.replace(/\.it\.md$|\.md$/, '');
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return {
    slug,
    title: data.title || slug.replace(/-/g, ' '),
    date: data.date || new Date().toISOString().split('T')[0],
    category: data.category || 'Engineering',
    topic: data.topic,
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: data.excerpt || content.slice(0, 160) + '...',
    readTime: Math.max(1, readTime),
    content,
  };
}

export async function loadAllBlogPosts(lang: BlogLanguage = 'en'): Promise<BlogPost[]> {
  try {
    const filenames = await fetchBlogIndex();
    const results = await Promise.allSettled(
      filenames.map(async (f) => {
        const slug = f.replace(/\.it\.md$|\.md$/, '');
        if (lang === 'it') {
          const itFilename = `${slug}.it.md`;
          try {
            return await loadBlogPost(itFilename, slug);
          } catch {
            return await loadBlogPost(f, slug);
          }
        }
        return await loadBlogPost(f, slug);
      })
    );

    const posts = results
      .filter((r): r is PromiseFulfilledResult<BlogPost> => r.status === 'fulfilled')
      .map((r) => r.value);

    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return posts;
  } catch {
    return [];
  }
}

export async function loadBlogPostBySlug(slug: string, lang: BlogLanguage = 'en'): Promise<BlogPost | null> {
  try {
    const filenames = await fetchBlogIndex();
    const baseFilename = `${slug}.md`;
    if (!filenames.includes(baseFilename)) {
      return null;
    }

    if (lang === 'it') {
      const itFilename = `${slug}.it.md`;
      try {
        return await loadBlogPost(itFilename, slug);
      } catch {
        // Fallback to English
        return await loadBlogPost(baseFilename, slug);
      }
    }

    return await loadBlogPost(baseFilename, slug);
  } catch {
    return null;
  }
}
