import type { blogConfig } from "@/lib/types";
import { RiArrowRightUpLine } from "@remixicon/react";
import { format, parse } from "date-fns";

export function FeaturedBlogCard({ item }: { item: blogConfig }) {
  const parsedDate = parse(item.data.date, "dd-MM-yyyy", new Date());
  const formattedDate = format(parsedDate, "MMM d, yyyy");

  return (
    <a href={`/blog/${item.id}`} className="group flex items-start gap-3 p-3 px-5 border-l-3 border-l-foreground/10 hover:border-l-secondary-foreground/60 border border-border/50 hover:border-border bg-background hover:bg-muted/80 animation hover:scale-102 active:scale-100 select-none">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-xs uppercase tracking-wider text-muted-foreground/80 font-medium">{item.data.category}</span>
        </div>

        <span className="mt-2 text-lg font-medium text-foreground/90 group-hover:text-foreground/90 animation leading-snug line-clamp-1">{item.data.title}</span>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1">{item.data.description}</p>
      </div>

      <RiArrowRightUpLine className="mt-1 size-3.5 shrink-0 text-muted-foreground/60 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 animation" />
    </a>
  );
}
