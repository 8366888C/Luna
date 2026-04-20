import type { ComponentType } from "react";
import {
  RiLinkedinBoxFill,
  RiInstagramFill,
  RiYoutubeFill,
  RiFacebookBoxFill,
  RiBlueskyFill,
  RiRedditFill,
  RiThreadsFill,
  RiMastodonFill,
  RiTumblrFill,
  RiTwitterFill,
  RiTwitterXFill,
  RiDiscordFill,
  RiSteamFill,
  RiTwitchFill,
  RiMediumFill,
  RiGithubFill,
  RiGitlabFill,
  RiBehanceFill,
  RiDribbbleFill,
  RiMapPinLine,
  RiMapPinFill,
  RiMailLine,
  RiMailFill,
  RiMapFill,
  RiPhoneFill,
  RiPhoneLine,
  RiGlobalLine,
  RiGlobalFill,
} from "@remixicon/react";
import type { socialIconType } from "@/lib/types";
import type { subHeadingIconType } from "@/lib/types";

type IconComponent = ComponentType<any>;

// ! Social Icons
const socialIconMap: Record<string, { component: IconComponent; css: string }> =
  {
    linkedin: {
      component: RiLinkedinBoxFill,
      css: "size-7 hover:fill-blue-500",
    },
    instagram: { component: RiInstagramFill, css: "size-7 hover:fill-red-400" },
    youtube: { component: RiYoutubeFill, css: "size-7 hover:fill-red-500" },
    facebook: {
      component: RiFacebookBoxFill,
      css: "size-7 hover:fill-blue-600",
    },
    bluesky: { component: RiBlueskyFill, css: "size-7 hover:fill-blue-500" },
    reddit: { component: RiRedditFill, css: "size-7 hover:fill-orange-600" },
    threads: { component: RiThreadsFill, css: "size-7" },
    mastodon: {
      component: RiMastodonFill,
      css: "size-7 hover:fill-indigo-700",
    },
    tumblr: { component: RiTumblrFill, css: "size-7" },
    twitter: { component: RiTwitterFill, css: "size-7 hover:fill-blue-500" },
    x: { component: RiTwitterXFill, css: "" },
    discord: { component: RiDiscordFill, css: "size-7 hover:fill-indigo-500" },
    steam: { component: RiSteamFill, css: "size-7 hover:fill-blue-800" },
    twitch: { component: RiTwitchFill, css: "size-7 hover:fill-purple-600" },
    medium: { component: RiMediumFill, css: "size-7" },
    github: { component: RiGithubFill, css: "size-7" },
    gitlab: { component: RiGitlabFill, css: "size-7 hover:fill-orange-500" },
    behance: { component: RiBehanceFill, css: "size-7 hover:fill-blue-700" },
    dribbble: { component: RiDribbbleFill, css: "size-7 hover:fill-pink-400" },
  };

export function SocialIcon({ type }: { type: socialIconType }) {
  const data = socialIconMap[type];
  if (!data) return null;
  const Icon = data.component;
  return <Icon className={data.css} />;
}

// ! Subheading Icons
const subHeadingIconMap: Record<
  string,
  { componentLine: IconComponent; componentFill: IconComponent }
> = {
  mail: {
    componentLine: RiMailLine,
    componentFill: RiMailFill,
  },
  address: { componentLine: RiMapPinLine, componentFill: RiMapPinFill },
  phone: { componentLine: RiPhoneLine, componentFill: RiPhoneFill },
  web: { componentLine: RiGlobalLine, componentFill: RiGlobalFill },
};

export function SubHeadingIcon({ type }: { type: subHeadingIconType }) {
  const data = subHeadingIconMap[type];
  if (!data) return null;
  const IconLine = data.componentLine;
  const IconFill = data.componentFill;
  return (
    <div>
      <IconLine className="size-4 group-hover:size-0" />
      <IconFill className="size-0 group-hover:size-4" />
    </div>
  );
}
