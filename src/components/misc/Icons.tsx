import {
  IconSearch,
  IconBrandGithub,
  IconQuote,
  IconMoon,
  IconSunHigh,
  IconBrandYoutube,
  IconBrandLinkedin,
  IconMail,
  IconRss,
  IconBrandBluesky,
  IconBrandTwitter,
  IconBrandDiscord,
} from "@tabler/icons-react";

interface IconProps {
  className?: string;
}

export function Search({ className }: IconProps) {
  return <IconSearch className={className} />;
}

export function Quote({ className }: IconProps) {
  return <IconQuote className={className} />;
}

export function Moon({ className }: IconProps) {
  return <IconMoon className={className} />;
}

export function Sun({ className }: IconProps) {
  return <IconSunHigh className={className} />;
}

export function Github({ className }: IconProps) {
  return <IconBrandGithub className={className} />;
}

export function Youtube({ className }: IconProps) {
  return <IconBrandYoutube className={className} />;
}

export function Linkedin({ className }: IconProps) {
  return <IconBrandLinkedin className={className} />;
}

export function Twitter({ className }: IconProps) {
  return <IconBrandTwitter className={className} />;
}

export function Bluesky({ className }: IconProps) {
  return <IconBrandBluesky className={className} />;
}

export function Discord({ className }: IconProps) {
  return <IconBrandDiscord className={className} />;
}

export function Mail({ className }: IconProps) {
  return <IconMail className={className} />;
}

export function Rss({ className }: IconProps) {
  return <IconRss className={className} />;
}
