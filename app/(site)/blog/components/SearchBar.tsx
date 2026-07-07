"use client";

import type { SortOption } from "@/lib/blog/utils";
import type { BlogCategory } from "@/lib/blog/types";

type Props = {
  query: string;
  categorySlug: string;
  sort: SortOption;
  categories: BlogCategory[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
};

export function SearchBar({
  query,
  categorySlug,
  sort,
  categories,
  onQueryChange,
  onCategoryChange,
  onSortChange,
}: Props) {
  return (
    <section className="blog-search" aria-label="Search and filter articles">
      <div className="blog-container">
        <div className="blog-search__panel">
          <label className="blog-search__field blog-search__field--grow">
            <span className="sr-only">Search articles</span>
            <svg className="blog-search__icon" viewBox="0 0 24 24" aria-hidden>
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
              className="blog-search__input"
            />
          </label>

          <label className="blog-search__field">
            <span className="sr-only">Filter by category</span>
            <select
              value={categorySlug}
              onChange={(event) => onCategoryChange(event.target.value)}
              className="blog-search__select"
              aria-label="Category filter"
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="blog-search__field">
            <span className="sr-only">Sort articles</span>
            <select
              value={sort}
              onChange={(event) => onSortChange(event.target.value as SortOption)}
              className="blog-search__select"
              aria-label="Sort articles"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="reading-time">Reading time</option>
            </select>
          </label>
        </div>
      </div>
    </section>
  );
}

export function FilterBar(props: Props) {
  return <SearchBar {...props} />;
}
