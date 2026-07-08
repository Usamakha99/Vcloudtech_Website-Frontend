"use client";

import { useMemo } from "react";

import type { BlogCategory } from "@/lib/blog/types";
import { CategoryDropdown } from "./CategoryDropdown";
import { CategoryPills } from "./CategoryPills";

/** Visible pill tabs — remaining categories live in the dropdown only. */
const MAX_PILL_CATEGORIES = 8;

type Props = {
  categories: BlogCategory[];
  activeSlug: string;
  query: string;
  onChange: (slug: string) => void;
  onQueryChange: (value: string) => void;
};

export function CategoryFilters({
  categories,
  activeSlug,
  query,
  onChange,
  onQueryChange,
}: Props) {
  const pillCategories = useMemo(() => {
    const base = categories.slice(0, MAX_PILL_CATEGORIES);
    if (!activeSlug) return base;

    if (base.some((category) => category.slug === activeSlug)) return base;

    const active = categories.find((category) => category.slug === activeSlug);
    if (!active) return base;

    return [active, ...base].slice(0, MAX_PILL_CATEGORIES);
  }, [categories, activeSlug]);

  return (
    <section className="blog-filters" aria-label="Blog filters">
      <CategoryPills categories={pillCategories} activeSlug={activeSlug} onChange={onChange} />
      <div className="blog-container blog-filters__toolbar">
        <label className="blog-filters__search">
          <span className="sr-only">Search articles</span>
          <svg className="blog-filters__search-icon" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm5.25-1.28 4.47 4.47-1.06 1.06-4.47-4.47"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search articles, topics, or categories…"
            className="blog-filters__search-input"
          />
        </label>
        <CategoryDropdown
          categories={categories}
          activeSlug={activeSlug}
          onChange={onChange}
          inline
        />
      </div>
    </section>
  );
}
