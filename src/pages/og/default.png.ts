import { generateOGImage } from "@/lib/og";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const png = await generateOGImage({
    title: "Ryze",
    description:
      "A minimalist Astro starter for personal portfolio and blogs.",
  });
  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
