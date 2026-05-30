import { generateOGImage } from "@/lib/og";
import { getCollection } from "astro:content";
import { parse, format } from "date-fns";
import type { APIRoute } from "astro";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts
    .filter((p) => !p.data.draft)
    .map((post) => ({
      params: { id: post.id },
      props: { post },
    }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as any;
  const { title, description, category, date } = post.data;
  const formattedDate = format(
    parse(date, "dd-MM-yyyy", new Date()),
    "MMM dd, yyyy",
  );

  const png = await generateOGImage({
    title,
    description,
    category,
    date: formattedDate,
  });
  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
