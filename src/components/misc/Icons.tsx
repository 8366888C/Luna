import {
  IconSearch,
  IconBrandGithub,
  IconQuote,
  IconMoon,
  IconSunHigh,
  IconBrandYoutube,
  IconBrandLinkedin,
  IconRss,
  IconBrandDiscord,
  IconChevronRight,
  IconArrowRight,
  IconTagFilled,
  IconBookFilled,
  IconCalendar,
  IconSortAscending2,
  IconSortDescending2,
} from "@tabler/icons-react";

interface IconProps {
  className?: string;
}

export function SearchIcon({ className }: IconProps) {
  return <IconSearch className={className} />;
}

export function QuoteIcon({ className }: IconProps) {
  return <IconQuote className={className} />;
}

export function MoonIcon({ className }: IconProps) {
  return <IconMoon className={className} />;
}

export function SunIcon({ className }: IconProps) {
  return <IconSunHigh className={className} />;
}

export function GithubIcon({ className }: IconProps) {
  return <IconBrandGithub className={className} />;
}

export function YoutubeIcon({ className }: IconProps) {
  return <IconBrandYoutube className={className} />;
}

export function LinkedinIcon({ className }: IconProps) {
  return <IconBrandLinkedin className={className} />;
}

export function DiscordIcon({ className }: IconProps) {
  return <IconBrandDiscord className={className} />;
}

export function RssIcon({ className }: IconProps) {
  return <IconRss className={className} />;
}

export function RightIcon({ className }: IconProps) {
  return <IconChevronRight className={className} />;
}

export function RightArrowIcon({ className }: IconProps) {
  return <IconArrowRight className={className} />;
}

export function TagIcon({ className }: IconProps) {
  return <IconTagFilled className={className} />;
}

export function BookIcon({ className }: IconProps) {
  return <IconBookFilled className={className} />;
}

export function CalendarIcon({ className }: IconProps) {
  return <IconCalendar className={className} />;
}

export function AscendingIcon({ className }: IconProps) {
  return <IconSortAscending2 className={className} />;
}

export function DescendingIcon({ className }: IconProps) {
  return <IconSortDescending2 className={className} />;
}
