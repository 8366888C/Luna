"use client";

import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiFilterFill,
  RiFilterLine,
  RiLoopLeftLine,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BlogCard } from "@/components/client/BlogCard";
import { cn } from "@/lib/utils";
import type { blogCategoryType, blogConfig, BlogPost } from "@/lib/types";
import { useFilter } from "./Filter";

interface FilterBlogProps {
  items: blogConfig[];
}

export function FilterBlog({ items }: FilterBlogProps) {
  const filter = useFilter(items as blogConfig[], "blog");

  const {
    filteredAndSortedItems,
    category,
    selectedTags,
    sortOrder,
    handleReset,
    isFilterActive,
    allCategories,
    allTags,
    handleCategoryChange,
    handleTagToggle,
    handleToggleAllTags,
    filterOpen,
    setFilterOpen,
    setSortOrder,
    items: _items,
    filteredAndSortedItems: _filteredAndSortedItems,
    setCategory: _setCategory,
    setSelectedTags: _setSelectedTags,
    allTags: _allTags,
  } = filter;

  const allTagsSelected =
    selectedTags.length === allTags.length && allTags.length > 0;
  const someTagsSelected = selectedTags.length > 0 && !allTagsSelected;

  return (
    <div className="flex flex-col gap-3 animation">
      <div className="flex items-center gap-2 justify-end">
        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
          <PopoverTrigger
            render={
              <Button
                variant={isFilterActive ? "secondary" : "outline"}
                size="icon-sm"
                className={cn("cursor-pointer", isFilterActive && "bg-muted")}
              >
                <span className="relative">
                  {!isFilterActive && (
                    <RiFilterLine className="fill-muted-foreground" />
                  )}
                  {isFilterActive && (
                    <RiFilterFill className="fill-muted-foreground" />
                  )}
                </span>
              </Button>
            }
          ></PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex w-53 flex-col gap-3 p-3 -translate-x-11 -translate-y-9"
            sideOffset={4}
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground">
                Category
              </p>
              <div className="flex flex-wrap gap-1.5">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() =>
                      handleCategoryChange(cat as blogCategoryType)
                    }
                    className={cn(
                      "cursor-pointer text-xs px-2 py-0.5 rounded border",
                      category === cat
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent border-border text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">
                  Tags
                </p>
                <Checkbox
                  checked={allTagsSelected}
                  indeterminate={someTagsSelected}
                  onCheckedChange={(checked) =>
                    handleToggleAllTags(checked === true)
                  }
                />
              </div>
              <div className="max-h-32 overflow-y-auto pr-1">
                {allTags.map((tag) => (
                  <label
                    key={tag}
                    className="flex cursor-pointer items-center justify-between gap-2 py-1"
                  >
                    <span className="text-sm text-muted-foreground">{tag}</span>
                    <Checkbox
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => handleTagToggle(tag)}
                    />
                  </label>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex gap-1">
          <Button
            variant={sortOrder === "asc" ? "secondary" : "outline"}
            size="icon-sm"
            onClick={() => setSortOrder("asc")}
            className="cursor-pointer"
          >
            <RiArrowUpSLine className="size-5 fill-muted-foreground" />
          </Button>
          <Button
            variant={sortOrder === "desc" ? "secondary" : "outline"}
            size="icon-sm"
            onClick={() => setSortOrder("desc")}
            className="cursor-pointer"
          >
            <RiArrowDownSLine className="size-5 fill-muted-foreground" />
          </Button>
        </div>

        <Button
          variant={isFilterActive ? "outline" : "secondary"}
          size="icon-sm"
          onClick={handleReset}
          disabled={!isFilterActive}
          className={cn(
            "cursor-pointer",
            !isFilterActive && "cursor-not-allowed",
          )}
        >
          <RiLoopLeftLine className="size-4 fill-muted-foreground" />
        </Button>
      </div>
      {filteredAndSortedItems.length === 0 ? (
        <p className="paragraph text-center mt-12">No posts found.</p>
      ) : (
        <div className="space-y-0">
          {filteredAndSortedItems.map((item) => (
            <BlogCard key={item.id} post={item as BlogPost} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterBlog;
