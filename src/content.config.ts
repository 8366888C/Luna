import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blogs = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/data" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()),
    featured: z.boolean(),
  }),
});

export const collections = { blogs };
