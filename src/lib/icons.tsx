import type { ComponentType } from "react";
import { RiLinkedinBoxFill, RiInstagramFill, RiYoutubeFill, RiFacebookBoxFill, RiBlueskyFill, RiRedditFill, RiThreadsFill, RiMastodonFill, RiTumblrFill, RiTwitterFill, RiTwitterXFill, RiDiscordFill, RiSteamFill, RiTwitchFill, RiMediumFill, RiGithubFill, RiGitlabFill, RiBehanceFill, RiDribbbleFill, RiMapPinLine, RiMapPinFill, RiMailLine, RiMailFill, RiMapFill, RiPhoneFill, RiPhoneLine, RiGlobalLine, RiGlobalFill } from "@remixicon/react";
import type { socialIconType } from "@/lib/types";
import type { subHeadingIconType } from "@/lib/types";

type IconComponent = ComponentType<any>;

// ! Social Icons
const socialIconMap: Record<string, IconComponent> = {
  linkedin: RiLinkedinBoxFill,
  instagram: RiInstagramFill,
  youtube: RiYoutubeFill,
  facebook: RiFacebookBoxFill,
  bluesky: RiBlueskyFill,
  reddit: RiRedditFill,
  threads: RiThreadsFill,
  mastodon: RiMastodonFill,
  tumblr: RiTumblrFill,
  twitter: RiTwitterFill,
  x: RiTwitterXFill,
  discord: RiDiscordFill,
  steam: RiSteamFill,
  twitch: RiTwitchFill,
  medium: RiMediumFill,
  github: RiGithubFill,
  gitlab: RiGitlabFill,
  behance: RiBehanceFill,
  dribbble: RiDribbbleFill,
};

export function SocialIcon({ type, className = "" }: { type: socialIconType; className?: string }) {
  const Icon = socialIconMap[type];
  if (!Icon) return null;
  return <Icon className={className} />;
}

// ! Subheading Icons
const subHeadingIconMap: Record<string, { componentLine: IconComponent; componentFill: IconComponent }> = {
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
