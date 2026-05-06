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
	};
	featured: {
		portfolio: { visible: boolean };
		blog: { visible: boolean };
		important: "portfolio" | "blog";
	};
}

export interface portfolioConfig {
	featured: boolean;
	id: string;
	date: string;
	category: string; // robotics="Robotics & Mechanical Systems", software= "Software Tools & Web", gameplay= "Gameplay Engineering", analytics= "Business Intelligence & Analytics", ai= "Artificial Intelligence"
	title: string;
	tagline: string;
	description: string;
	keywords: string[];
	links: { label: string; url: string }[];
	video: string[];
	images: string[];
	brief: { motivation: string[]; capabilities: string[] };
}

export interface blogConfig {
	id: string;
	data: {
		title: string;
		date: string;
		category: blogCategoryType;
		tags: string[];
		description: string;
		draft: boolean;
		featured: boolean;
		author?: string;
		heroImage?: string;
	};
}

type navigationType = "portfolio" | "blog";

export type subHeadingIconType = "mail" | "address" | "phone" | "web";

export type socialIconType = "linkedin" | "instagram" | "youtube" | "facebook" | "bluesky" | "reddit" | "threads" | "mastodon" | "tumblr" | "twitter" | "x" | "discord" | "steam" | "twitch" | "medium" | "github" | "gitlab";

type variantType = "default" | "secondary" | "outline" | "ghost" | "destructive" | "link" | null | undefined;

export type portfolioCategoryType = "robotics" | "analytics" | "gameplay" | "software" | "ai";

export type blogCategoryType = "engineering" | "workflow" | "strategy" | "devlog";

export interface BlogPost {
	id: string;
	data: {
		title: string;
		date: string;
		category: blogCategoryType;
		tags: string[];
		description: string;
	};
}
