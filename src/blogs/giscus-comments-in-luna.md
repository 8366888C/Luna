---
slug: "giscus-comments-in-luna"
title: "How to integrate Giscus comments into Luna"
pubDate: 2022-03-20
description: "Comment function on a static blog hosted on Github Pages with Giscus"
author: "Rahul"
image:
  url: "https://docs.astro.build/assets/rose.webp"
  alt: "The Astro logo on a dark background with a pink glow."
tags: ["luna", "customize", "comments", "giscus"]
---

Hosting a thin static blog on a platform like [Github Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) has numerous advantages, but also takes away some interactivity. Fortunately, [Giscus](https://giscus.app/) exists and offers a way to embed user comments on static sites.

## How Giscus works

[Giscus uses the Github API](https://github.com/giscus/giscus?tab=readme-ov-file#how-it-works) to read and store comments made by Github users in the Discussions associated with a repository.

Embed the Giscus client-side script bundle on your site, configure it with the correct repository URL, and users can view and write comments (when logged into Github).

The approach is serverless, as the comments are stored on Github and dynamically loaded from there on client side, hence perfect for a static blog, like Luna.

## Setting up Giscus

Giscus can be set up easily on [giscus.app](https://giscus.app/), but I will outline the process shortly still.

### Prerequisites

Prerequisites to get Giscus working are

- the repository is [public](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility#making-a-repository-public)
- the [Giscus app](https://github.com/apps/giscus)
- the [Discussions](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository) feature is turned on for your repository

### Configuring Giscus

Next, configuring Giscus is necessary. In most cases, the preselected defaults are suitable, and you should only modify them if you have a specific reason and know what you are doing. Don't worry too much about making the wrong choices; you can always adjust the configuration later on.

However you need to

- select the right language for the UI
- specify the Github repository you want to connect, typically the repository containing your statically hosted Luna blog on Github Pages
- create and set an `Announcement` type discussion on Github if you want to ensure nobody can create random comments directly on Github
- define the color scheme

After configuring the settings, Giscus provides you with a generated `<script>` tag, which you will need in the next steps.

## Simple script tag

You should now have a script tag that looks like this:

```javascript
<script
  src="https://giscus.app/client.js"
  data-repo="[ENTER REPO HERE]"
  data-repo-id="[ENTER REPO ID HERE]"
  data-category="[ENTER CATEGORY NAME HERE]"
  data-category-id="[ENTER CATEGORY ID HERE]"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="preferred_color_scheme"
  data-lang="en"
  crossorigin="anonymous"
  async
></script>
```

Simply add that to the source code of the site. Most likely, if you're using Luna and want to enable comments on posts, navigate to `PostDetails.astro` and paste it into the desired location where you want the comments to appear, perhaps underneath the `Share this post on:` buttons.

```astro
<!-- src/layouts/PostDetails.astro -->
<Layout {...layoutProps}>
  <main>
    <ShareLinks />

    <script
      src="https://giscus.app/client.js"
      data-repo="[ENTER REPO HERE]"
      data-repo-id="[ENTER REPO ID HERE]"
      data-category="[ENTER CATEGORY NAME HERE]"
      data-category-id="[ENTER CATEGORY ID HERE]"></script>
  </main>
  <Footer />
</Layout>
```

And it's done! You have successfully integrated comments in Luna!
