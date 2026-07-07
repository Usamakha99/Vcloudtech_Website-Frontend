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
  onChange: (slug: string) => void;
};

export function CategoryFilters({ categories, activeSlug, onChange }: Props) {
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
      {categories.length > MAX_PILL_CATEGORIES ? (
        <div className="blog-container blog-filters__dropdown-row">
          <CategoryDropdown categories={categories} activeSlug={activeSlug} onChange={onChange} />
        </div>
      ) : null}
    </section>
  );
}
