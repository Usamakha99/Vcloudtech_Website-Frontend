"use client";

import { useEffect, useId, useRef, useState } from "react";

import type { BlogCategory } from "@/lib/blog/types";

type Props = {
  categories: BlogCategory[];
  activeSlug: string;
  onChange: (slug: string) => void;
  /** Toolbar row — no label, fixed width beside search */
  inline?: boolean;
};

export function CategoryDropdown({ categories, activeSlug, onChange, inline = false }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const activeLabel =
    categories.find((category) => category.slug === activeSlug)?.name ?? "All categories";

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  function selectCategory(slug: string) {
    onChange(slug);
    setOpen(false);
  }

  return (
    <div
      className={`blog-filter__dropdown-wrap${inline ? " blog-filter__dropdown-wrap--inline" : ""}`}
      ref={rootRef}
    >
      {!inline ? (
        <label className="blog-filter__label" id={`${listboxId}-label`}>
          More categories
        </label>
      ) : null}

      <div className="blog-dropdown">
        <button
          type="button"
          className={`blog-dropdown__trigger${open ? " is-open" : ""}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={inline ? "Filter by category" : undefined}
          aria-labelledby={inline ? undefined : `${listboxId}-label`}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="blog-dropdown__value">{activeLabel}</span>
          <svg className="blog-dropdown__chevron" viewBox="0 0 20 20" aria-hidden>
            <path
              d="M5.5 7.5 10 12l4.5-4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {open ? (
          <ul
            className="blog-dropdown__menu"
            role="listbox"
            aria-label={inline ? "Category filter" : undefined}
            aria-labelledby={inline ? undefined : `${listboxId}-label`}
          >
            <li role="option" aria-selected={activeSlug === ""}>
              <button
                type="button"
                className={`blog-dropdown__option${activeSlug === "" ? " is-active" : ""}`}
                onClick={() => selectCategory("")}
              >
                All categories
              </button>
            </li>
            {categories.map((category) => (
              <li key={category.slug} role="option" aria-selected={activeSlug === category.slug}>
                <button
                  type="button"
                  className={`blog-dropdown__option${activeSlug === category.slug ? " is-active" : ""}`}
                  onClick={() => selectCategory(category.slug)}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
