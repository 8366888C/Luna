import { generateOGImage } from "@/lib/og";
import portfolio_config from "@/portfolio-config.json";
import { parse, format } from "date-fns";
import type { APIRoute } from "astro";

export function getStaticPaths() {
  return portfolio_config.map((item) => ({
    params: { id: item.id },
    props: { item },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { item } = props as any;
  const { title, description, category, date } = item.data;
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
