import type { blogConfig } from "@/lib/types";

import { RiArrowRightUpLine } from "@remixicon/react";
import { format, parse } from "date-fns";

export function BlogCard({ item }: { item: blogConfig }) {
  const parsedDate = parse(item.data.date, "dd-MM-yyyy", new Date());
  const formattedDate = format(parsedDate, "MMM d, yyyy");

  return (
    <a href={`/blog/${item.id}`} className="group flex flex-col gap-2 p-3 border border-border/50 hover:border-border active:border-border hover:bg-muted animation hover:scale-102 active:scale-100 select-none">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground group-hover:bg-background group-hover:px-2 animation px-1">{item.data.category}</span>
        <div className="flex items-center gap-2 shrink-0 pt-1">
          <span className="text-sm text-muted-foreground/80 group-hover:translate-x-0 translate-x-6 animation">{formattedDate}</span>
          <RiArrowRightUpLine className="size-5 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:text-muted-foreground/80 group-active:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start px-1">
        <h3 className="text-lg font-medium leading-snug text-foreground/90 group-hover:text-foreground/90 animation line-clamp-1">{item.data.title}</h3>
        <p className="mt-0.5 text-base text-muted-foreground line-clamp-1">{item.data.description}</p>
      </div>
    </a>
  );
}
