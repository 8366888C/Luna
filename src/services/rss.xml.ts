import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { BlogType } from "../content/content.config";

interface RSSType {
  site: URL;
  items: {
    title: string;
    description: string;
    date: Date;
    url: URL;
  };
}

export async function GET(context: RSSType) {
  const blogs: BlogType[] = await getCollection("blog");
  return rss({
    title: "Luna",
    description: "Static minimal astro blog starter",
    site: context.site,
    items: blogs.map((blog: BlogType) => ({
      title: blog.data.title,
      description: blog.data.description,
      date: blog.data.date,
      url: `/${blog.data.slug}`,
    })),
  });
}
