"use client";

import * as React from "react";
import { parse } from "date-fns";
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
import type { blogCategoryType, blogConfig } from "@/lib/types";

interface BlogFilterProps {
  posts: blogConfig[];
}

const CATEGORIES: blogCategoryType[] = [
  "engineering",
  "workflow",
  "strategy",
  "devlog",
];

export default function BlogFilter({ posts }: BlogFilterProps) {
  const [category, setCategory] = React.useState<blogCategoryType | null>(null);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");
  const [filterOpen, setFilterOpen] = React.useState(false);

  const allTags = React.useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      post.data.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  const isFilterActive = category !== null || selectedTags.length > 0;

  const filteredAndSortedPosts = React.useMemo(() => {
    let result = [...posts];

    if (category !== null) {
      result = result.filter((post) => post.data.category === category);
    }

    if (selectedTags.length > 0) {
      result = result.filter((post) =>
        selectedTags.some((tag) => post.data.tags.includes(tag)),
      );
    }

    result.sort((a, b) => {
      const dateA = parse(a.data.date, "dd-MM-yyyy", new Date());
      const dateB = parse(b.data.date, "dd-MM-yyyy", new Date());
      return sortOrder === "desc"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

    return result;
  }, [posts, category, selectedTags, sortOrder]);

  const handleReset = () => {
    setCategory(null);
    setSelectedTags([]);
    setSortOrder("desc");
  };

  const handleCategoryChange = (cat: blogCategoryType) => {
    setCategory((prev) => (prev === cat ? null : cat));
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleToggleAllTags = (checked: boolean) => {
    setSelectedTags(checked ? [...allTags] : []);
  };

  const allTagsSelected =
    selectedTags.length === allTags.length && allTags.length > 0;
  const someTagsSelected = selectedTags.length > 0 && !allTagsSelected;

  return (
    <div className="flex flex-col gap-3 animation">
      <div className="flex items-center gap-2 justify-end">
        {/* popover */}
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
                    // <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-muted-foreground" />
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
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
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

        {/* sort */}
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

        {/* refresh */}
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
      <div className="space-y-4">
        {filteredAndSortedPosts.length === 0 ? (
          <p className="paragraph text-center mt-12">No posts found.</p>
        ) : (
          filteredAndSortedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}
