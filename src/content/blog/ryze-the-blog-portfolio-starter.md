---
draft: false
date: "24-05-2026"
title: "Ryze - A Blog & Portfolio Starter Built with Astro 6"
description: "Everything Ryze ships with out of the box, how to customize it, and how the SEO and OG image system works"
category: "devlog"
tags: ["ryze", "starter", "astro", "template", "tailwind", "shadcn", "portfolio", "blog"]
author: "Subhashis Hansda"
---

This post talks about everything **Ryze** ships out of the box, how to customize it and my thoughts on using Astro for something like this.

## Get Started

Ryze is a **modern blog + portfolio starter** built on [**Astro 6**](https://astro.build), **React 19**, **Tailwind CSS 4**, and **shadcn/ui**. It is the foundation this very site runs on - what you are reading right now was authored in Markdown and rendered by Ryze.

Ryze is open source under the GPL-3.0 license. You can find the repository, read the full documentation, and submit issues or feature requests on [**GitHub**](https://github.com/a58361/ryze).

## Why Astro?

Ryze is built on Astro because Astro is uniquely suited for content-driven sites. Every page is **static by default** - zero JavaScript until an interactive island needs it. View transitions between pages are built-in. Content collections provide type-safe frontmatter validation. The build output is pure HTML and CSS with minimal JS.

For a blog and portfolio, this means:
- **Fast load times** - most pages have zero JS
- **Great SEO** - everything is server-rendered HTML
- **Low hosting cost** - static files can be served from any CDN
- **Future-proof** - your content is markdown, not locked in a CMS

## What Ryze Ships With

### Content & Pages Out of the Box

Ryze comes with five page types pre-built:

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Configurable hero introduction, featured blog posts, featured portfolio projects (order configurable) |
| Blog | `/blog` | Filterable listing of all posts |
| Blog Post | `/blog/:id` | Full markdown-rendered article with KaTeX math, Shiki code highlighting, auto-generated figure captions, and Mermaid diagrams |
| Portfolio | `/portfolio` | Filterable project gallery |
| Portfolio Project | `/portfolio/:id` | Full project detail with image carousel, links, and tabbed sections |
| Resume | `/resume` | Full resume page driven by JSON config |

There is also a **custom 404 page**, a **dynamic robots.txt**, and an **RSS feed** at `/rss.xml`.

### Markdown Features

Every blog post gets these features for free:

- **Syntax highlighting** via [Shiki](https://shiki.style) with `github-light` / `github-dark` themes - just write fenced code blocks
- **LaTeX math** via [KaTeX](https://katex.org) - inline with `$...$`, display with `$$...$$`
- **Auto-wrapped `<figure>` elements** for images - the `alt` text becomes the `<figcaption>`
- **External links** open in a new tab with `rel="nofollow noopener noreferrer"` automatically
- **GFM** support - tables, task lists, strikethrough, autolinks
- **Heading anchor links** - hover any heading to get a permalink
- **Mermaid diagrams** - write ` ```mermaid ` fenced code blocks and they render as flowcharts, sequence diagrams, and more, with automatic light/dark theme switching

All of this is configured declaratively in `astro.config.mjs` via remark and rehype plugins. No per-post configuration needed.

### Interactive Components

Ryze ships a set of React island components:

- Theme toggle with localStorage persistence and system preference detection
- 3D perspective tilt on hover
- Image gallery carousel with keyboard and mouse wheel navigation
- Category/tag filtering with sort controls for both blog and portfolio

All of these are built as **Astro islands** (client-side React components), so they only load JavaScript when they become interactive - the rest of the page is pure static HTML.

### UI Component Library

Ryze includes curated [shadcn/ui](https://ui.shadcn.com) components in the `base-vega` style - buttons, breadcrumbs, checkboxes, popovers, and more. All are tree-shakeable TypeScript components with Tailwind-based theming.

### Styling

The design system is built entirely with **Tailwind CSS 4**:

- A **zinc-based neutral palette** that works in both light and dark mode
- **Motion reduction** support via `prefers-reduced-motion`

Typography for blog content is separately styled in `typography.css` - headings, blockquotes, code blocks, tables, details/summary, and task lists all get intentional styling.

### Search

Full-text search is powered by [Pagefind](https://pagefind.app), indexed at build time. Press `mod+k` or click the search button to search all blog posts. The search UI is styled to match the rest of the design.

### SEO & Open Graph

Ryze handles search engine optimization across every page:

- **Open Graph tags** - locale, title, description, URL, type, site name, and image for rich social previews
- **Twitter Cards** - `summary_large_image` card for Twitter/X embeds
- **Canonical URLs** - prevents duplicate content issues by pointing search engines to the authoritative URL
- **Article metadata** - `article:published_time` and `article:tag` for each tag on blog posts
- **Sitemap** - auto-generated by `@astrojs/sitemap` at `/sitemap-index.xml`
- **Dynamic robots.txt** - allows all crawlers and references the sitemap
- **RSS feed** - full-content feed at `/rss.xml` with all non-draft posts
- **Google site verification** - via `PUBLIC_GOOGLE_SITE_VERIFICATION` environment variable

#### Dynamic OG Images

Every page gets a unique Open Graph image generated at build time using [Satori](https://github.com/vercel/satori) (JSX → SVG) and [Sharp](https://sharp.pixelplumbing.com) (SVG → PNG):

- **`/og/default.png`** - site-wide fallback OG image
- **`/og/blog/[id].png`** - per-post OG image showing title, description, category badge, and formatted date
- **`/og/portfolio/[id].png`** - per-project OG image with the same design

All OG images use Geist fonts loaded from local assets, a dark background (`#18181b`), and an orange accent dot. The shared generation logic lives in `src/lib/og.ts`.

### Site Configuration

Everything is driven by config files - no editing of components needed:

**`src/site-config.json`** - site-wide settings: domain, navigation, feature toggles, hero introduction, social links, CTA buttons, and featured section ordering.

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

**`src/portfolio-config.json`** - array of project objects with id, date, category, title, description, tags, introduction, links, video URL, and architecture brief.

**`src/resume-config.json`** - complete resume data: personal info, social links, work experience, education, skills, projects, certifications, courses, languages, volunteering, publications.

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

Posts are automatically picked up by Astro's content collections - no registration needed.

### 3. Portfolio Projects

Edit `src/portfolio-config.json`. Each project needs an `id`, title, description, category, links, and optional image paths. Add project images to `src/assets/portfolio/<id>/`.

### 4. Resume

Edit `src/resume-config.json` - work experience, education, skills, certifications, projects, publications, everything is there as mock data you can replace.

### 5. Theme Colors

The color palette is defined as CSS custom properties in `src/styles/global.css`. Change the values in `:root` (light) and `.dark` (dark) to rebrand the entire site. All shadcn components respect these variables.

### 6. Remove Features

Don't need a portfolio? Set `"visible": false` in site-config and remove the navigation item. Don't want search? Set `"bPageFind": false`. Each feature is independently removable.

## How I Built This Site with Ryze

This very site - the one you are reading this post on - was built using Ryze as the starter.

Here is exactly what I did:

1. **Forked the repository** and ran `pnpm install`
2. **Updated `site-config.json`** with my name, bio, social links, and contact info
3. **Wrote blog posts** as `.md` files in `src/content/blog/`
4. **Replaced portfolio images** in `src/assets/portfolio/` with actual project screenshots
5. **Customized the resume** by editing `resume-config.json`
6. **Changed the domain** in `astro.config.mjs` and `site-config.json`
7. **Ran `pnpm build`** and deployed to Cloudflare Pages

That is it. No boilerplate to write, no components to wire up, no CSS to start from scratch. The entire site - homepage hero, filterable blog, portfolio gallery, resume, RSS feed, search, dark mode - was functional after just editing JSON and writing markdown.

### What I Changed Beyond the Config

I did end up tweaking a few things to make the site feel like my own:

- Changed the `favicon.svg` in `public/`
- Updated the `background.svg` used in the tilt card
- Removed portfolio projects I did not need and replaced the mock data with real ones
- Wrote custom copy for the introduction, CTA sections, and about content

Not a single component needed modification. That is the point of Ryze - it handles the entire UI layer so you can focus on content.

## Closing Thoughts
[Ryze](https://astro.build/themes/details/ryze/) is my take on what a modern personal site starter should be - fast by default, extensible by design, and focused entirely on your content. Star it on [Github](https://github.com/a58361/ryze) if you find it useful. Contributions and issues are always welcome.
