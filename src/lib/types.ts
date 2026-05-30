export interface siteConfig {
  github: { owner: string; repo: string };
  domain: string;
  bNavigation: boolean;
  homeLabel: string;
  navigationItems: navigationType[];
  bPageFind: boolean;
  bThemeToggle: boolean;
  bRssFeed: boolean;
  introduction: {
    badges: string[];
    heading: string;
    subHeadingItems: {
      type: subHeadingIconType;
      label: string;
      url: string;
    }[];
    socialItems: { type: socialIconType; url: string }[];
    description: string;
    ctaItems: { label: string; url: string; variant: variantType }[];
    support?: { label: string; url: string; variant: variantType };
  };
  featured: {
    portfolio: { visible: boolean };
    blog: { visible: boolean };
    important: "portfolio" | "blog";
  };
}

export interface portfolioConfig {
  id: string;
  data: {
    date: string;
    category: portfolioCategoryType;
    title: string;
    description: string;
    tags: string[];
  };
  introduction: string;
  links: { label: string; url: string }[];
  video: string | null;
  brief: { capabilities: string[]; architecture: string[] };
}

export interface blogConfig {
  id: string;
  data: {
    date: string;
    category: blogCategoryType;
    title: string;
    description: string;
    tags: string[];
    draft?: boolean;
    author?: string;
  };
}

export type navigationType = "portfolio" | "blog";

export type subHeadingIconType = "mail" | "address" | "phone" | "web";
export type socialIconType = "linkedin" | "instagram" | "youtube" | "facebook" | "bluesky" | "reddit" | "threads" | "mastodon" | "tumblr" | "twitter" | "x" | "discord" | "steam" | "twitch" | "medium" | "github" | "gitlab";

type variantType = "default" | "secondary" | "outline" | "ghost" | "destructive" | "link" | null | undefined;

export type portfolioCategoryType = "robotics" | "analytics" | "gameplay" | "software" | "ai" | "hardware";
export type blogCategoryType = "engineering" | "workflow" | "strategy" | "devlog";
