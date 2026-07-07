"use client";

import type { BlogCategory } from "@/lib/blog/types";

type Props = {
  categories: BlogCategory[];
  activeSlug: string;
  onChange: (slug: string) => void;
};

export function CategoryPills({ categories, activeSlug, onChange }: Props) {
  return (
    <nav className="blog-pills" aria-label="Filter by category">
      <div className="blog-container">
        <ul className="blog-pills__list" role="list">
          <li>
            <button
              type="button"
              className={`blog-pills__btn${activeSlug === "" ? " is-active" : ""}`}
              aria-pressed={activeSlug === ""}
              onClick={() => onChange("")}
            >
              All
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.slug}>
              <button
                type="button"
                className={`blog-pills__btn${activeSlug === category.slug ? " is-active" : ""}`}
                aria-pressed={activeSlug === category.slug}
                onClick={() => onChange(category.slug)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
