---
slug: "customizing-luna"
title: "Customizing Luna color schemes"
pubDate: 2022-07-01
description: "How you can enable/disable light & dark mode; and customize color schemes of Luna."
author: "Rahul"
image:
  url: "https://docs.astro.build/assets/rose.webp"
  alt: "The Astro logo on a dark background with a pink glow."
tags: ["luna", "customize", "color-scheme"]
---

This post will explain how you can enable/disable light and dark mode for the website. Moreover, you'll learn how you can customize color schemes of the entire website.
[Choose primary color scheme](#choose-primary-color-scheme) section will explain how you can choose either light or dark mode as the primary color scheme instead of system's prefers-color-scheme.

## Enable/disable light & dark mode

Luna theme will include light and dark mode by default. In other words, there will be two color schemes, one for light and another for dark mode. This default behavior can be disabled in `SITE` configuration object.

---

- [ ] Enable light & dark mode
- [ ] Choose primary color scheme
- [x] Customize color schemes

```typescript
// src/config.ts

export const SITE = {
  website: "https://astro-paper.pages.dev/",
  author: "Sat Naing",
  profile: "https://satnaing.dev/",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "AstroPaper",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000,
  showArchives: true,
  showBackButton: true,
  editPost: {
    enabled: true,
    text: "Suggest Changes",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: true,
  lang: "en",
  timezone: "Asia/Bangkok",
} as const;
```

To disable `light & dark mode` set `SITE.lightAndDarkMode` to `false`.

## Choose primary color scheme

By default, if we disable `SITE:lightAndDarkMode`, we will only get system's prefers-color-scheme.

Thus, to choose primary color scheme instead of prefers-color-scheme, we have to set color scheme in the `primaryColorScheme` variable inside `toggle-theme.js`.

```typescript
// public/toggle-theme.js

const primaryColorScheme = "";

const currentTheme = localStorage.getItem("theme");

// ...
```

The **primaryColorScheme** variable can hold two values, `"light"`, `"dark"`. You can leave the empty string (default) if you don't want to specify the primary color scheme.

- `""` - system's prefers-color-scheme. (default)
- `"light"` - use light mode as primary color scheme.
- `"dark"` - use dark mode as primary color scheme.

> To avoid color flickering on page reload, we have to place the toggle-switch Javascript codes as early as possible when the page loads. It solves the problem of flickering, but as a trade-off, we cannot use ESM imports anymore.

## Customize color schemes

Both light & dark color schemes of Luna theme can be customized in the `global.css` file.

```css
/* src/styles/global.css */

@import "tailwindcss";
@import "./typography.css";

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

:root,
html[data-theme="light"] {
  --background: #fdfdfd;
  --foreground: #282728;
  --accent: #006cac;
  --muted: #e6e6e6;
  --border: #ece9e9;
}

html[data-theme="dark"] {
  --background: #212737;
  --foreground: #eaedf3;
  --accent: #ff6b01;
  --muted: #343f60bf;
  --border: #ab4b08;
}
/* ... */
```

In the Luna theme, the `:root` and `html[data-theme="light"]` selectors define the light color scheme, while `html[data-theme="dark"]` defines the dark color scheme.

To customize your own color scheme, specify your light colors inside `:root, html[data-theme="light"]`, and your dark colors inside `html[data-theme="dark"]`.

Here is the detail explanation of color properties.

<table>
<thead>
  <tr>
    <th>Color Property</th>
    <th>Definition & Usage</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--background</td>
    <td>Primary color of the website. Usually the main background.</td>
  </tr>
  <tr>
    <td>--foreground</td>
    <td>Secondary color of the website. Usually the text color.</td>
  </tr>
  <tr>
    <td>--accent</td>
    <td>Accent color of the website. Link color, hover color, etc.</td>
  </tr>
  <tr>
    <td>--muted</td>
    <td>Card and scrollbar background color for hover state etc.</td>
  </tr>
  <tr>
    <td>--border</td>
    <td>Border color. Especially used in horizontal row (hr)</td>
  </tr>
</tbody>
</table>

Here is an example of changing the light color scheme.

```css
/* src/styles/global.css */
:root,
html[data-theme="light"] {
  --background: #f6eee1;
  --foreground: #012c56;
  --accent: #e14a39;
  --muted: #efd8b0;
  --border: #dc9891;
}
/* ... */
```
