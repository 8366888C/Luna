"use client";

import { RiArrowRightUpLine, RiTimeLine } from "@remixicon/react";
import { format, parse } from "date-fns";
import type { BlogPost } from "@/lib/types";

interface FeaturedBlogProps {
	posts: BlogPost[];
}

export function FeaturedBlogCard({ posts }: FeaturedBlogProps) {
	const recentPosts = posts.slice(0, 3);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			{recentPosts.map((post, index) => {
				const parsedDate = parse(post.data.date, "dd-MM-yyyy", new Date());
				const formattedDate = format(parsedDate, "MMM d, yyyy");

				return (
					<a
						key={post.id}
						href={`/blog/${post.id}`}
						className="group block bg-muted border border-border/50 hover:border-foreground/20 hover:bg-card active:scale-100 hover:scale-102 animation"
					>
						<div className="p-4">
							<div className="flex items-center gap-2 mb-2">
								<span className="text-xs uppercase tracking-wider text-muted-foreground">{post.data.category}</span>
								{index === 0 && <span className="text-xs uppercase tracking-wider text-muted-foreground/60">Featured</span>}
							</div>
							<h3 className="text-xl font-medium leading-snug text-foreground/80 group-hover:text-foreground animation line-clamp-2">
								{post.data.title}
							</h3>
							<p className="mt-1 text-sm text-muted-foreground line-clamp-2">{post.data.description}</p>
						</div>
						<div className="flex items-center justify-between px-4 py-3 border-t border-border/50">
							<span className="text-xs text-muted-foreground/80 flex items-center gap-1">
								<RiTimeLine className="size-3" />
								{formattedDate}
							</span>
							<RiArrowRightUpLine className="size-4 text-muted-foreground/50 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 animation" />
						</div>
					</a>
				);
			})}
		</div>
	);
}
