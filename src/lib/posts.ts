import { getCollection } from 'astro:content';

// Posts that are live: not a draft and not future-dated.
// Drafts show in `npm run dev` so they can be reviewed, but never in a build.
export async function getPublishedPosts() {
  const now = new Date();
  return getCollection(
    'blog',
    (post) => (import.meta.env.DEV || !post.data.draft) && post.data.pubDate <= now,
  );
}
