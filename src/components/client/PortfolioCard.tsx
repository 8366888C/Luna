"use client";

import { RiArrowRightUpLine, RiCalendar2Line } from "@remixicon/react";
import { format, parse } from "date-fns";

interface PortfolioCardProps {
  project: {
    id: string;
    date: string;
    category: "robotics" | "analytics" | "gameplay" | "software" | "ai";
    title: string;
    tagline: string;
    description: string;
    keywords: string[];
  };
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  const parsedDate = parse(project.date, "dd-MM-yyyy", new Date());
  const formattedDate = format(parsedDate, "MMM dd, yyyy");

  return (
    <a
      href={`/portfolio/${project.id}`}
      className="px-4 py-2 border border-border rounded-sm hover:border-accent-foreground scale-100 active:scale-100 hover:scale-102 animation group block"
    >
      <div className="flex items-center justify-between">
        <p className="text-xl leading-relaxed font-light pb-1 group-hover:font-normal animation">
          {project.title}
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
        {project.keywords && project.keywords.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {project.keywords.slice(0, 3).map((keyword: string) => (
              <span
                key={keyword}
                className="animation scale-0 group-hover:scale-100 text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
        <span className="text-xs px-2 py-0.5 border border-border text-muted-foreground rounded">
          {project.category}
        </span>
      </div>

      <p className="text-base text-muted-foreground mt-3 mb-1">
        {project.description}
      </p>
    </a>
  );
}