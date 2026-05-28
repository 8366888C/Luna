"use client";

import { PortfolioCard } from "@/components/client/PortfolioCard";
import type { portfolioConfig } from "@/lib/types";
import { FilterControls, useFilter } from "@/hooks/useFilter";

export default function FilterPortfolio({ items }: { items: portfolioConfig[] }) {
  const filter = useFilter(items, "portfolio");
  const { filteredAndSortedItems } = filter;

  return (
    <div className="flex flex-col gap-3 animation">
      <FilterControls filter={filter} />

      {filteredAndSortedItems.length === 0 ? (
        <div className="flex items-center justify-center border border-border p-6">
          <p className="paragraph">No projects found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border border-border p-6">
          {filteredAndSortedItems.map((item) => (
            <PortfolioCard key={item.id} item={item as portfolioConfig} />
          ))}
        </div>
      )}
    </div>
  );
}
