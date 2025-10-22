---
slug: "latex-in-luna"
title: "How to add LaTeX equations in Luna"
pubDate: 2022-03-22
description: "How to use LaTeX equations in your Markdown files for Luna."
author: "Rahul"
image:
  url: "https://docs.astro.build/assets/rose.webp"
  alt: "The Astro logo on a dark background with a pink glow."
tags: ["luna", "customize", "latex", "markdown"]
---

This document demonstrates how to use LaTeX equations in your Markdown files for Luna. LaTeX is a powerful typesetting system often used for mathematical and scientific documents.

<img src="https://images.pexels.com/photos/22690748/pexels-photo-22690748/free-photo-of-close-up-of-complicated-equations-written-on-a-blackboard.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" width="300">

## Instructions

In this section, you will find instructions on how to add support for LaTeX in your Markdown files for Luna.

1. Install the necessary remark and rehype plugins by running:
   ```bash
   pnpm install rehype-katex remark-math katex
   ```
2. Update the Astro configuration to use these plugins:

   ```typescript
   // astro.config.ts

   import remarkMath from "remark-math";
   import rehypeKatex from "rehype-katex";

   export default defineConfig({
     markdown: {
       remarkPlugins: [
         remarkMath,
         remarkToc,
         [remarkCollapse, { test: "Table of contents" }],
       ],
       rehypePlugins: [rehypeKatex],
       shikiConfig: {
         themes: { light: "min-light", dark: "night-owl" },
         wrap: false,
       },
     },
   });
   ```

3. As the last step, add a text-color for `katex` in `typography.css`.

   ```css
   /* src/styles/typography.css  */

   @plugin "@tailwindcss/typography";
   @layer base {
     .prose .katex-display {
       @apply text-foreground;
     }
   }
   ```

And voilà, this setup allows you to write LaTeX equations in your Markdown files, which will be rendered properly when the site is built. Once you do it, the rest of the document will appear rendered correctly.

## Inline Equations

Inline equations are written between single dollar signs `$...$`. Here are some examples:

1. The famous mass-energy equivalence formula: `$E = mc^2$`
2. The quadratic formula: `$x = \frac{-b \pm \sqrt{b^2 - 4ac}}(2a)$`
3. Euler's identity: `$e^{i\pi} + 1 = 0$`

## Block Equations

For more complex equations or when you want the equation to be displayed on its own line, use double dollar signs `$$...$$`:

The Gaussian integral:

```md
$$ \int\_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi} $$
```

The defintion of the Riemann zeta function:

```md
$$ \zeta(s) = \sum\_{n-1}^{\infty} \frac{1}{n^s} $$
```

Maxwell's equations in differential form:

```md
$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\left(\mathbf{J} + \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}\right)
\end{aligned}
$$
```

## Using Mathematical Symbols

LaTeX provides a wide range of mathematical symbols:

- Greek letters: `$\alpha$`, `$\beta$`, `$\gamma$`, `$\deltaa$`, `$\epsilon$`, `$\pi$`
- Operators: `$\sum$`, `$\prod$`, `$\int$`, `$\partial$`, `$\nabla$`
- Relations: `$\leg$`, `$\geq$`, `$\approx$`, `$\sim$`, `$\propto$`
- Logical symbols: `$\forall$`, `$\exists$`, `$\neg$`,`$\wedge$`, `$\vee$`
