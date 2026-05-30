---
draft: false
date: "24-05-2026"
title: "Ryze - A Blog & Portfolio Starter Built with Astro 6"
description: "Everything Ryze ships with out of the box, how to customize it, and how I built this very site with it"
category: "devlog"
tags: ["ryze", "starter", "astro", "template", "tailwind", "shadcn", "portfolio", "blog"]
author: "Subhashis Hansda"
---

Ryze is a **modern blog + portfolio starter** built on [**Astro 6**](https://astro.build), **React 19**, **Tailwind CSS 4**, and **shadcn/ui**. It is the foundation this very site runs on — what you are reading right now was authored in Markdown and rendered by Ryze.

This post walks through everything Ryze ships with, how you can make it your own, and how I used it to build [ryze.pages.dev](https://ryze.pages.dev).

## What Ryze Ships With

### Content & Pages Out of the Box

Ryze comes with five page types pre-built:

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero intro, featured blog posts, featured portfolio projects |
| Blog | `/blog` | Filterable listing of all posts |
| Blog Post | `/blog/:id` | Full markdown-rendered article with KaTeX math, Shiki code highlighting, auto-generated figure captions, and Mermaid diagrams |
| Portfolio | `/portfolio` | Filterable project gallery |
| Portfolio Project | `/portfolio/:id` | Full project detail with image carousel, links, and collapsible sections |
| Resume | `/resume` | Full resume page driven by JSON config |

There is also a **custom 404 page**, a **dynamic robots.txt**, and an **RSS feed** at `/rss.xml`.

### Markdown Features

Every blog post gets these features for free:

- **Syntax highlighting** via [Shiki](https://shiki.style) with `github-light` / `github-dark` themes — just write fenced code blocks
- **LaTeX math** via [KaTeX](https://katex.org) — inline with `$...$`, display with `$$...$$`
- **Auto-wrapped `<figure>` elements** for images — the `alt` text becomes the `<figcaption>`
- **External links** open in a new tab with `rel="nofollow noopener noreferrer"` automatically
- **GFM** support — tables, task lists, strikethrough, autolinks
- **Heading anchor links** — hover any heading to get a permalink
- **Mermaid diagrams** — write ` ```mermaid ` fenced code blocks and they render as flowcharts, sequence diagrams, and more, with automatic light/dark theme switching

All of this is configured declaratively in `astro.config.mjs` via remark and rehype plugins. No per-post configuration needed.

### Interactive Components

Ryze ships over a dozen React island components:

- **ScrambledText** — GSAP-powered text scramble effect on the hero
- **Tilt card** — 3D perspective tilt on hover
- **ThemeToggle** — light/dark mode
- **FilterBlog & FilterPortfolio** — category/tag filtering with sort controls
- **Snake** — a full Snake game in the footer (yes, really)
- **PortfolioGallery** — image carousel with thumbnails

All of these are built as **Astro islands** (client-side React components), so they only load JavaScript when they become interactive — the rest of the page is pure static HTML.

### UI Component Library

Ryze includes curated [shadcn/ui](https://ui.shadcn.com) components in the `base-vega` style — buttons, breadcrumbs, checkboxes, popovers, and more. All are tree-shakeable TypeScript components with Tailwind-based theming.

### Styling

The design system is built entirely with **Tailwind CSS 4** using CSS-first configuration (no `tailwind.config.js`). All theme tokens live in `src/styles/global.css` as `oklch` color variables:

- A **zinc-based neutral palette** that works in both light and dark mode
- **Custom easing curves**: `--ease-out`, `--ease-in-out`, `--ease-drawer`
- **Motion reduction** support via `prefers-reduced-motion`
- **Geist Variable** font for headings and body text
- **Geist Mono Variable** for code

Typography for blog content is separately styled in `typography.css` — headings, blockquotes, code blocks, tables, details/summary, and task lists all get intentional styling.

### Search

Full-text search is powered by [Pagefind](https://pagefind.app), indexed at build time. Press `mod+k` or click the search button to search all blog posts. The search UI is styled to match the rest of the design.

### Site Configuration

Everything is driven by a single `src/site-config.json` file:

```json
{
  "domain": "https://your-site.com",
  "navigationItems": ["portfolio", "blog"],
  "bPageFind": true,
  "bThemeToggle": true,
  "bRssFeed": true,
  "introduction": {
    "badges": ["Your Title"],
    "heading": "Your Name",
    "description": "Your bio..."
  },
  "featured": {
    "portfolio": { "visible": true },
    "blog": { "visible": true }
  }
}
```

Change the navigation, toggle features on and off, update social links, control what appears on the homepage — all from this one file.


## How to Customize Ryze

Ryze is designed to be forked and made your own with minimal friction.

### 1. Site Identity

Edit `src/site-config.json` to set your name, bio, social links, navigation, and featured sections. The homepage hero, header navigation, and footer all pull from this file.

### 2. Blog Posts

Add `.md` or `.mdx` files to `src/content/blog/`. Each post needs frontmatter following this schema:

```yaml
---
draft: false
date: "24-05-2026"
title: "Your Post Title"
description: "A short summary"
category: "engineering" # "engineering" | "workflow" | "strategy" | "devlog"
tags: ["tag1", "tag2"]
author: "Your Name"
---
```

Posts are automatically picked up by Astro's content collections — no registration needed.

### 3. Portfolio Projects

Edit `src/portfolio-config.json`. Each project needs an `id`, title, description, category, links, and optional image paths. Add project images to `src/assets/portfolio/<id>/`.

### 4. Resume

Edit `src/resume-config.json` — work experience, education, skills, certifications, projects, publications, everything is there as mock data you can replace.

### 5. Theme Colors

The color palette is defined as CSS custom properties in `src/styles/global.css`. Change the `oklch` values in `:root` (light) and `.dark` (dark) to rebrand the entire site. All shadcn components respect these variables.

### 6. Remove Features

Don't want the Snake game? Remove `FooterSnake.astro` from the layout. Don't need a portfolio? Set `"visible": false` in site-config and remove the navigation item. Each feature is independently removable.

## How I Built This Site with Ryze

This very site — the one you are reading this post on — was built using Ryze as the starter.

Here is exactly what I did:

1. **Forked the repository** and ran `pnpm install`
2. **Updated `site-config.json`** with my name, bio, social links, and contact info
3. **Wrote two blog posts** (this one and the markdown showcase) as `.md` files in `src/content/blog/`
4. **Replaced portfolio images** in `src/assets/portfolio/` with actual project screenshots
5. **Customized the resume** by editing `resume-config.json`
6. **Changed the domain** in `astro.config.mjs` and `site-config.json`
7. **Ran `pnpm build`** and deployed to Cloudflare Pages

That is it. No boilerplate to write, no components to wire up, no CSS to start from scratch. The entire site — homepage hero, filterable blog, portfolio gallery, resume, RSS feed, search, dark mode — was functional after just editing JSON and writing markdown.

### What I Changed Beyond the Config

I did end up tweaking a few things to make the site feel like my own:

- Changed the `favicon.svg` in `public/`
- Updated the `background.svg` used in the tilt card
- Removed portfolio projects I did not need and replaced the mock data with real ones
- Wrote custom copy for the introduction, CTA sections, and about content

Not a single component needed modification. That is the point of Ryze — it handles the entire UI layer so you can focus on content.

## Why Astro?

Ryze is built on Astro because Astro is uniquely suited for content-driven sites. Every page is **static by default** — zero JavaScript until an interactive island needs it. View transitions between pages are built-in. Content collections provide type-safe frontmatter validation. The build output is pure HTML and CSS with minimal JS.

For a blog and portfolio, this means:
- **Fast load times** — most pages have zero JS
- **Great SEO** — everything is server-rendered HTML
- **Low hosting cost** — static files can be served from any CDN
- **Future-proof** — your content is markdown, not locked in a CMS

## Get Started

Ryze is open source under the GPL-3.0 license. You can find the repository, read the full documentation, and submit issues or feature requests on GitHub.

If you build something with Ryze, I would love to see it. The entire point of releasing a starter like this is to see what other people create with it — sites that are faster to build because the foundation was already laid.
