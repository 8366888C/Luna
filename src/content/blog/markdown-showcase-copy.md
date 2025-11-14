---
slug: "markdown-showcase-copy"
title: "Luna Markdown Showcase: A Complete Guide"
description: "A comprehensive showcase of all Markdown features and typography styles available in Luna blog posts."
date: 2025-11-09
author: "Rahul"
image:
  url: "https://cdn.pixabay.com/photo/2024/01/18/10/07/sunset-8516639_1280.jpg"
  alt: "Still waters reflecting clouds and distant mountains during sunset"
  caption: "photo by xyz : pixabay"
tags: ["luna", "markdown", "guide", "showcase", "typography"]

featured: false
---

<figure>
  <img
    src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    alt="Person writing in a notebook"
    width="800"
  />
  <figcaption>The art of writing beautiful content</figcaption>
</figure>

## Basic Text Formatting

Here's a showcase of basic text formatting:

- **Bold text** using double asterisks
- _Italic text_ using underscores
- ~~Strikethrough~~ using double tildes
- **_Bold and italic_** combined
- `Inline code` using backticks

## Advanced Typography

### Keyboard Shortcuts

Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy
Press <kbd>Ctrl</kbd> + <kbd>V</kbd> to paste

### Line Breaks and Spacing

This is a paragraph with a regular line break.

<br />

This paragraph comes after two line breaks.

### Links and References

Visit [Luna's GitHub repository](https://github.com/yourusername/luna) for more information.

## Code Blocks

Here are examples of code blocks in different languages:

```typescript
// TypeScript example
interface BlogPost {
  title: string;
  date: Date;
  tags: string[];
  featured: boolean;
}

const post: BlogPost = {
  title: "Hello Luna",
  date: new Date(),
  tags: ["blog", "typescript"],
  featured: true,
};
```

```css
/* CSS with custom variables */
:root {
  --background: #fdfdfd;
  --foreground: #282728;
  --accent: #006cac;
}

.blog-post {
  color: var(--foreground);
  background: var(--background);
}
```

## Mathematics & Equations

Luna supports LaTeX equations both inline and as blocks:

Inline equation example: The Pythagorean theorem states that $a^2 + b^2 = c^2$

Block equation example:

```math
$$
\begin{aligned}
E &= mc^2 \\
F &= ma \\
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0}
\end{aligned}
$$
```

## Lists & Tables

### Unordered Lists

- First level item
  - Second level item
    - Third level item
  - Another second level
- Back to first level

### Ordered Lists

1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

### Tables

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Description</th>
      <th>Usage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Markdown</td>
      <td>Lightweight markup</td>
      <td>Content writing</td>
    </tr>
    <tr>
      <td>LaTeX</td>
      <td>Math typesetting</td>
      <td>Equations</td>
    </tr>
    <tr>
      <td>MDX</td>
      <td>Extended Markdown</td>
      <td>Components</td>
    </tr>
  </tbody>
</table>

## Quotes & Callouts

> This is a regular blockquote. It's perfect for highlighting important information or displaying quotes from other sources.

---

> **Pro Tip:** You can use blockquotes with other Markdown elements
>
> - Like lists
> - And _formatted_ **text**

---

### Special Formatting

Here's a showcase of special inline formatting:

Text with `inline code` and <span class="text-accent">accent color</span>.

## Final Notes

This post demonstrated all the Markdown features available in Luna blog posts. Remember that:

1. Consistency is key
2. Use formatting purposefully
3. Keep your content readable

> Thanks for reading this comprehensive guide to Luna's Markdown features!
