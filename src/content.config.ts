import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('John Cornelison'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    series: z.object({ name: z.string(), part: z.number().int().positive() }).optional(),
    // Full URL of the original when this post is a copy (blog-cohosting.md section 3)
    canonical: z.string().url().optional(),
  }),
});

export const collections = { blog };
