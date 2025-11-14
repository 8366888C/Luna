import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { BlogType } from "../content/content.config";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  if (!context.site) {
    return new Response("Site is not defined on the request context", {
      status: 500,
    });
  }

  const blogs: BlogType[] = await getCollection("blog");
  return rss({
    title: "Luna",
    description: "Static minimal astro blog starter",
    site: context.site,
    items: blogs.map((blog: BlogType) => ({
      title: blog.data.title,
      description: blog.data.description,
      pubDate: blog.data.date,
      link: `/${blog.data.slug}`,
    })),
  });
}
