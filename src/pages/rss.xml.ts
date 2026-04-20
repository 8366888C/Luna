import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { parse } from "date-fns";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context: { site: any }) {
  const posts = (await getCollection("blog"))
    .filter((post) => !post.data.draft)
    .sort((a, b) => {
      const aDate = parse(a.data.date, "dd-MM-yyyy", new Date());
      const bDate = parse(b.data.date, "dd-MM-yyyy", new Date());
      return bDate.getTime() - aDate.getTime();
    });

  return rss({
    trailingSlash: false,
    title: "Ryze Blog",
    description:
      "A reader-friendly blog with accessibility, SEO and responsiveness out of the box",
    site: context.site,
    items: posts.map((post) => ({
      link: `/blog/${post.id}`,
      pubDate: parse(post.data.date, "dd-MM-yyyy", new Date()),
      title: post.data.title,
      description: post.data.description,
      categories: [post.data.category, ...(post.data.tags || [])].filter(
        Boolean,
      ),
      tag: post.data.tags,
      author: post.data.author,
      content: sanitizeHtml(parser.render(post.body ?? ""), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
    customData: `<language>en-us</language>`,
  });
}
