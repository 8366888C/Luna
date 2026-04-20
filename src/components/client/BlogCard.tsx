"use client";

import {
  RiArrowRightUpLine,
  RiCalendar2Line,
} from "@remixicon/react";
import { format, parse } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: string;
  data: {
    title: string;
    date: string;
    category: "engineering" | "workflow" | "strategy" | "devlog";
    tags: string[];
    description: string;
  };
}

export function BlogCard({ post }: { post: BlogPost }) {
  const parsedDate = parse(post.data.date, "dd-MM-yyyy", new Date());
  const formattedDate = format(parsedDate, "MMM dd, yyyy");

  return (
    <a
      href={`/blog/${post.id}`}
      className="px-4 py-2 border border-border rounded-sm hover:border-accent-foreground scale-100 active:scale-100 hover:scale-102 animation group block"
    >
      <div className="flex items-center justify-between">
        <p className="text-xl leading-relaxed font-light pb-1 group-hover:font-normal animation">
          {post.data.title}
        </p>
        <RiArrowRightUpLine className="animation size-5 opacity-0 translate-x-3 -translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
      </div>
      <div className="flex gap-6 items-center">
        <div className="flex gap-3 items-center">
          <RiCalendar2Line className="size-4 fill-muted-foreground scale-0 group-hover:scale-100 animation" />
          <p className="animation text-sm text-muted-foreground group-hover:translate-x-0 -translate-x-6.5">
            {formattedDate}
          </p>
        </div>
        {post.data.tags && post.data.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {post.data.tags.map((tag: string) => (
              <span
                key={tag}
                className="animation scale-0 group-hover:scale-100 text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <Badge variant="outline" className="-translate-x-58 opacity-100 group-hover:opacity-0 group-hover:-translate-x-51">
          <span className="opacity-63">{post.data.category}</span>
        </Badge>
      </div>

      <p className="text-base text-muted-foreground mt-3 mb-1">
        {post.data.description}
      </p>
    </a>
  );
}