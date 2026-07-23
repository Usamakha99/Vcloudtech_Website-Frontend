"use client";

import type { TocItem } from "@/lib/blog/types";

type Props = {
  items: TocItem[];
  readingTimeMinutes: number;
};

/** Strip leading list numbers from TOC labels (e.g. "1. Title" → "Title"). */
function tocLabel(title: string) {
  return title.replace(/^\d+[.)]?\s+/, "").trim() || title;
}

export function TableOfContents({ items, readingTimeMinutes }: Props) {
  return (
    <nav className="blog-toc" aria-label="Table of contents">
      <p className="blog-toc__label">In this article</p>
      <ul className="blog-toc__list">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? "blog-toc__item blog-toc__item--nested" : "blog-toc__item"}
          >
            <a href={`#${item.id}`} className="blog-toc__link">
              {tocLabel(item.title)}
            </a>
          </li>
        ))}
      </ul>
      <p className="blog-toc__time">{readingTimeMinutes} min read</p>
    </nav>
  );
}
