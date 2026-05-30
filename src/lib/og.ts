import satori from "satori";
import sharp from "sharp";
import fs from "node:fs";

const regularFont = fs.readFileSync("src/assets/fonts/Geist-Regular.ttf");
const boldFont = fs.readFileSync("src/assets/fonts/Geist-Bold.ttf");

export interface OGOptions {
  title: string;
  description: string;
  category?: string;
  date?: string;
}

export async function generateOGImage({
  title,
  description,
  category,
  date,
}: OGOptions) {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: 1200,
          height: 630,
          background: "#18181b",
          display: "flex",
          flexDirection: "column",
          padding: "60px 80px",
          fontFamily: "Geist",
        },
        children: [
          {
            type: "div",
            props: {
              style: { display: "flex", alignItems: "center", gap: 12 },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#f97316",
                    },
                  },
                },
                {
                  type: "span",
                  props: {
                    style: { fontSize: 20, color: "#a1a1aa", fontWeight: 400 },
                    children: "Ryze",
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: { style: { flex: 1 } },
          },
          {
            type: "h1",
            props: {
              style: {
                fontSize: title.length > 40 ? 40 : 56,
                fontWeight: 700,
                color: "#fafafa",
                lineHeight: 1.15,
                margin: 0,
              },
              children: title,
            },
          },
          {
            type: "p",
            props: {
              style: {
                fontSize: 28,
                color: "#a1a1aa",
                marginTop: 16,
                lineHeight: 1.4,
              },
              children: description,
            },
          },
          (category || date)
            ? {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginTop: 32,
                  },
                  children: [
                    ...(category
                      ? [
                          {
                            type: "span",
                            props: {
                              style: {
                                fontSize: 14,
                                fontWeight: 500,
                                color: "#f97316",
                                border: "1px solid #f97316",
                                borderRadius: 4,
                                padding: "4px 12px",
                              },
                              children: category,
                            },
                          },
                        ]
                      : []),
                    ...(date
                      ? [
                          {
                            type: "span",
                            props: {
                              style: { fontSize: 14, color: "#71717a" },
                              children: date,
                            },
                          },
                        ]
                      : []),
                  ],
                },
              }
            : null,
        ].filter(Boolean),
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist",
          data: regularFont,
          weight: 400,
          style: "normal",
        },
        {
          name: "Geist",
          data: boldFont,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return png;
}
