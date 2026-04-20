import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    draft: z.boolean(),
    featured: z.boolean(),
    date: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.enum(["engineering", "workflow", "strategy", "devlog"]), // engineering="Engineering", workflow: "Workflow", strategy= "Strategy", devlog= "Devlog"
    tags: z.array(z.string()).optional().default([]),
    author: z.string().optional().default("Subhashis Hansda"),
    heroImage: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
};
