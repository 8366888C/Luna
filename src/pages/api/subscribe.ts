import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");

  if (!email || typeof email !== "string") {
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  }

  const res = await fetch(
    "https://8366888.substack.com/api/v1/free?no_json=1",
    {
      method: "POST",
      body: new URLSearchParams({ email }),
    },
  );

  return new Response(JSON.stringify({ ok: true }));
};
