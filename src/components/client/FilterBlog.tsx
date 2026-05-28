"use client";

import { BlogCard } from "@/components/client/BlogCard";
import type { blogConfig } from "@/lib/types";
import { FilterControls, useFilter } from "@/hooks/useFilter";

export default function FilterBlog({ items }: { items: blogConfig[] }) {
  const filter = useFilter(items, "blog");
  const { filteredAndSortedItems } = filter;

  return (
    <div className="flex flex-col gap-3 animation">
      <FilterControls filter={filter} />

      {filteredAndSortedItems.length === 0 ? (
        <div className="flex items-center justify-center border border-border p-6">
          <p className="paragraph">No blogs found.</p>
        </div>
      ) : (
        <div className="space-y-0 border border-border p-6">
          {filteredAndSortedItems.map((item) => (
            <BlogCard key={item.id} item={item as blogConfig} />
          ))}
        </div>
      )}
    </div>
  );
}
