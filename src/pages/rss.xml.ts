import rss from '@astrojs/rss';
import { getPublishedPosts } from '@/lib/posts';

export async function GET(context) {
  const blog = await getPublishedPosts();
  const sortedPosts = blog.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Vashon Software Blog',
    description: 'Articles, tutorials, and updates from the Vashon Software project',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      author: post.data.author,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
