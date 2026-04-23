"use client";

import type { portfolioConfig } from "@/lib/types";

interface PortfolioCardProps {
  item: portfolioConfig;
}

export function PortfolioCard({ item }: PortfolioCardProps) {
  const firstImage =
    item.images && item.images.length > 0 ? item.images[0] : null;

  return (
    <a
      href={`/portfolio/${item.id}`}
      className="group block bg-muted border border-border overflow-hidden hover:border-foreground/30 relative hover:bg-card active:scale-98 hover:scale-102 animation"
    >
      {firstImage && (
        <div className="aspect-4/3 overflow-hidden">
          <img
            src={firstImage}
            alt={item.title}
            className="w-full h-full object-cover grayscale-100 group-hover:grayscale-0 animation"
          />
        </div>
      )}

      <div className="p-3 bg-muted group-hover:bg-card animation z-10 group-hover:-translate-y-14 h-20 translate-y-0">
        <span className="text-xs uppercase tracking-widest text-muted-foreground opacity-100 group-hover:opacity-0 animation">
          {item.category}
        </span>

        <h3 className="mt-2 text-xl group-hover:font-medium leading-snug text-foreground/80 group-hover:text-foreground animation mb-0.5 line-clamp-1 -translate-y-1 group-hover:-translate-y-8.5">
          {item.title}
        </h3>

        {item.keywords && item.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {item.keywords.slice(0, 3).map((keyword) => (
              <span
                key={keyword}
                className="text-xs px-2 py-0.5 bg-muted/60 text-muted-foreground/80 rounded-sm border border-border scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 animation translate-y-5.5"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}

        <p className="text-base text-muted-foreground line-clamp-2 opacity-0 group-hover:opacity-100 animation -translate-y-7 group-hover:-translate-y-15">
          {item.tagline || item.description}
        </p>
      </div>
    </a>
  );
}
