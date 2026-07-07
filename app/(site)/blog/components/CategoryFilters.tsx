"use client";

import type { BlogCategory } from "@/lib/blog/types";
import { CategoryDropdown } from "./CategoryDropdown";
import { CategoryPills } from "./CategoryPills";

type Props = {
  categories: BlogCategory[];
  activeSlug: string;
  onChange: (slug: string) => void;
};

export function CategoryFilters({ categories, activeSlug, onChange }: Props) {
  return (
    <section className="blog-filters" aria-label="Blog filters">
      <CategoryPills categories={categories} activeSlug={activeSlug} onChange={onChange} />
      <div className="blog-container blog-filters__dropdown-row">
        <CategoryDropdown categories={categories} activeSlug={activeSlug} onChange={onChange} />
      </div>
    </section>
  );
}
