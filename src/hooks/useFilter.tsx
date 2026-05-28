"use client";

import * as React from "react";
import { parse } from "date-fns";
import { RiArrowDownSLine, RiArrowUpSLine, RiFilterFill, RiFilterLine, RiLoopLeftLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { blogCategoryType, portfolioCategoryType } from "@/lib/types";

type FilterType = "blog" | "portfolio";

interface FilterItem<T extends FilterType> {
  id: string;
  data: {
    date: string;
    title: string;
    category: T extends "blog" ? blogCategoryType : portfolioCategoryType;
    description: string;
    tags: string[];
  };
}

type CategoryFilterType = blogCategoryType | portfolioCategoryType;

interface FilterResult<T extends FilterType> {
  items: FilterItem<T>[];
  filteredAndSortedItems: FilterItem<T>[];
  category: CategoryFilterType | null;
  selectedTags: string[];
  sortOrder: "asc" | "desc";
  setCategory: React.Dispatch<React.SetStateAction<CategoryFilterType | null>>;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  handleReset: () => void;
  isFilterActive: boolean;
  allCategories: CategoryFilterType[];
  allTags: string[];
  handleCategoryChange: (cat: blogCategoryType | portfolioCategoryType) => void;
  handleTagToggle: (tag: string) => void;
  handleToggleAllTags: (checked: boolean) => void;
  filterOpen: boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BLOG_CATEGORIES: blogCategoryType[] = ["engineering", "workflow", "strategy", "devlog"];
const PORTFOLIO_CATEGORIES: portfolioCategoryType[] = ["robotics", "analytics", "gameplay", "software", "ai"];

function getItemTags<T extends FilterType>(item: FilterItem<T>): string[] {
  return item.data.tags || [];
}

function getItemCategory<T extends FilterType>(item: FilterItem<T>): string {
  return item.data.category || "";
}

export function useFilter<T extends FilterType>(items: FilterItem<T>[], type: FilterType = "blog"): FilterResult<T> {
  const [category, setCategory] = React.useState<CategoryFilterType | null>(null);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");
  const [filterOpen, setFilterOpen] = React.useState(false);

  const allCategories = type === "blog" ? BLOG_CATEGORIES : PORTFOLIO_CATEGORIES;

  const allTags = React.useMemo(() => {
    const tagSet = new Set<string>();
    if (items && Array.isArray(items)) {
      items.forEach((item: FilterItem<T>) => {
        const tags = getItemTags(item);
        if (tags) {
          tags.forEach((tag) => tagSet.add(tag));
        }
      });
    }
    return Array.from(tagSet).sort();
  }, [items]);

  const isFilterActive = category !== null || selectedTags.length > 0;

  const filteredAndSortedItems = React.useMemo(() => {
    if (!items || !Array.isArray(items)) {
      return [];
    }
    let result = [...items];

    if (category !== null) {
      result = result.filter((item) => getItemCategory(item) === category);
    }

    if (selectedTags.length > 0) {
      result = result.filter((item) => {
        const itemTags = getItemTags(item);
        return selectedTags.some((tag) => itemTags.includes(tag));
      });
    }

    result.sort((a, b) => {
      const dateA = parse(a.data.date, "dd-MM-yyyy", new Date());
      const dateB = parse(b.data.date, "dd-MM-yyyy", new Date());
      return sortOrder === "desc" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

    return result;
  }, [items, category, selectedTags, sortOrder]);

  const handleReset = () => {
    setCategory(null);
    setSelectedTags([]);
    setSortOrder("desc");
  };

  const handleCategoryChange = (cat: CategoryFilterType) => {
    setCategory((prev) => (prev === cat ? null : cat));
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleToggleAllTags = (checked: boolean) => {
    setSelectedTags(checked ? [...allTags] : []);
  };

  return {
    items,
    filteredAndSortedItems,
    category,
    selectedTags,
    sortOrder,
    setCategory,
    setSelectedTags,
    setSortOrder,
    handleReset,
    isFilterActive,
    allCategories,
    allTags,
    handleCategoryChange,
    handleTagToggle,
    handleToggleAllTags,
    filterOpen,
    setFilterOpen,
  };
}

interface FilterControlsProps<T extends FilterType> {
  filter: FilterResult<T>;
}

export function FilterControls<T extends FilterType>({ filter }: FilterControlsProps<T>) {
  const { isFilterActive, sortOrder, handleReset, filterOpen, setFilterOpen, allCategories, allTags, selectedTags, handleCategoryChange, handleTagToggle, handleToggleAllTags, setSortOrder, category } = filter;

  const allTagsSelected = selectedTags.length === allTags.length && allTags.length > 0;
  const someTagsSelected = selectedTags.length > 0 && !allTagsSelected;

  return (
    <div className="flex items-center gap-2 justify-end px-3">
      <Popover open={filterOpen} onOpenChange={setFilterOpen}>
        <PopoverTrigger
          render={
            <Button variant={isFilterActive ? "secondary" : "outline"} size="icon-sm" className={cn("cursor-pointer", isFilterActive && "bg-muted")}>
              <span className="relative">
                {!isFilterActive && <RiFilterLine className="fill-muted-foreground" />}
                {isFilterActive && <RiFilterFill className="fill-muted-foreground" />}
              </span>
            </Button>
          }
        ></PopoverTrigger>
        <PopoverContent align="end" className="flex w-50 flex-col gap-3 p-3 -translate-y-9" sideOffset={4}>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">Category</p>
            <div className="flex flex-wrap gap-1.5">
              {allCategories.map((cat) => (
                <button key={cat} type="button" onClick={() => handleCategoryChange(cat as CategoryFilterType)} className={cn("cursor-pointer text-xs px-2 py-0.5 rounded border border-border", category === cat ? "bg-secondary-foreground text-secondary" : "bg-transparent text-muted-foreground hover:bg-muted")}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Tags</p>
              <Checkbox checked={allTagsSelected} indeterminate={someTagsSelected} onCheckedChange={(checked) => handleToggleAllTags(checked === true)} />
            </div>
            <div className="max-h-32 overflow-y-auto overflow-x-hidden no-scrollbar pr-1">
              {allTags.map((tag) => (
                <label key={tag} className="px-2 hover:bg-muted rounded-md flex cursor-pointer items-center justify-between gap-2 py-1">
                  <span className="text-sm text-muted-foreground">{tag}</span>
                  <Checkbox checked={selectedTags.includes(tag)} onCheckedChange={() => handleTagToggle(tag)} />
                </label>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex gap-1">
        <Button variant={sortOrder === "asc" ? "secondary" : "outline"} size="icon-sm" onClick={() => setSortOrder("asc")} className="cursor-pointer">
          <RiArrowUpSLine className="size-5 fill-muted-foreground" />
        </Button>
        <Button variant={sortOrder === "desc" ? "secondary" : "outline"} size="icon-sm" onClick={() => setSortOrder("desc")} className="cursor-pointer">
          <RiArrowDownSLine className="size-5 fill-muted-foreground" />
        </Button>
      </div>

      <Button variant={isFilterActive ? "outline" : "secondary"} size="icon-sm" onClick={handleReset} disabled={!isFilterActive} className={cn("cursor-pointer", !isFilterActive && "cursor-not-allowed")}>
        <RiLoopLeftLine className="size-4 fill-muted-foreground" />
      </Button>
    </div>
  );
}
