"use client";

import { RiArrowRightUpLine, RiTimeLine } from "@remixicon/react";
import { format, parse } from "date-fns";
import type { BlogPost } from "@/lib/types";

export function BlogCard({ post }: { post: BlogPost }) {
	const parsedDate = parse(post.data.date, "dd-MM-yyyy", new Date());
	const formattedDate = format(parsedDate, "MMM d, yyyy");

	return (
		<a href={`/blog/${post.id}`} className="group flex items-start justify-between gap-4 p-3 border border-border/50 hover:border-border active:border-border hover:bg-muted animation hover:scale-102 active:scale-100">
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-1">
					<span className="text-xs text-muted-foreground group-hover:bg-background group-hover:px-2 animation ">{post.data.category}</span>
					{/* <span className="text-xs text-muted-foreground/50">·</span>
          <span className="text-xs text-muted-foreground/70 flex items-center gap-1">
            <RiTimeLine className="size-3" />4 min
          </span> */}
				</div>
				<h3 className="text-lg mt-3 font-medium leading-snug text-foreground/90 group-hover:text-foreground animation line-clamp-1">{post.data.title}</h3>
				<p className="mt-0.5 text-base text-muted-foreground line-clamp-1">{post.data.description}</p>
			</div>
			<div className="flex items-center gap-2 shrink-0 pt-1">
				<span className="text-sm text-muted-foreground/80 group-hover:translate-x-0 translate-x-5 animation">{formattedDate}</span>
				<RiArrowRightUpLine className="size-5 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:text-muted-foreground/80 group-active:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
			</div>
		</a>
	);
}
