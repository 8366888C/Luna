"use client";

import type { portfolioConfig } from "@/lib/types";

export function FeaturedPortfolioCard({ items }: { items: (portfolioConfig & { heroImage?: string })[] }) {
  const recentProjects = items.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 select-none">
      {recentProjects.map((item) => {
        const firstImage = item.heroImage || null;

        return (
          <a key={item.id} href={`/portfolio/${item.id}`} className="group block bg-muted border border-border overflow-hidden hover:border-secondary-foreground/30 relative hover:bg-background active:scale-100 hover:scale-102 animation">
            {firstImage && (
              <div className="aspect-4/3 overflow-hidden">
                <img loading="lazy" width={1200} src={firstImage} alt={item.data.title} className="w-full h-full object-cover grayscale-100 group-hover:grayscale-0 animation" />
              </div>
            )}

            <div className="p-4 bg-muted group-hover:bg-card animation z-10">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{item.data.category}</span>

              <span className="mt-2 text-xl font-medium leading-snug text-foreground/90 group-hover:text-foreground/90 animation line-clamp-1">{item.data.title}</span>

              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.data.description}</p>

              {item.data.tags && item.data.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.data.tags.slice(0, 3).map((keyword) => (
                    <span key={keyword} className="text-xs px-2 py-0.5 bg-background group-hover:bg-muted text-muted-foreground/80 rounded-sm border border-border animation">
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </a>
        );
      })}
    </div>
  );
}
