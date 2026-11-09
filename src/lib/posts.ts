import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'blog'>;

// Posts that are live: not a draft and not future-dated.
// Drafts show in `npm run dev` so they can be reviewed, but never in a build.
export async function getPublishedPosts() {
  const now = new Date();
  return getCollection(
    'blog',
    (post) => (import.meta.env.DEV || !post.data.draft) && post.data.pubDate <= now,
  );
}

export function sortNewestFirst(posts: Post[]) {
  return [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// List thumbnail: the frontmatter `thumb`, else the one scripts/make-thumbs.mjs made from `image`.
export function thumbFor(post: Post): string | undefined {
  if (post.data.thumb) return post.data.thumb;
  const image = post.data.image;
  if (!image) return undefined;
  const slash = image.lastIndexOf('/');
  return `${image.slice(0, slash)}/thumbs/${image.slice(slash + 1).replace(/\.[^.]+$/, '.webp')}`;
}

// Minutes to read at about 230 words a minute.
export function readingMinutes(post: Post): number {
  const words = (post.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

export function formatDate(date: Date, month: 'short' | 'long' = 'short') {
  return date.toLocaleDateString('en-US', { year: 'numeric', month, day: 'numeric', timeZone: 'UTC' });
}
