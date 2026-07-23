"use client";

import { useEffect, useState } from "react";

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
  const [activeId, setActiveId] = useState("");

  /* Scroll-spy: underline the TOC link for the heading currently in view */
  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el != null);

    if (headings.length === 0) return;

    /* Prefer hash on load (e.g. shared deep link) */
    const hashId = window.location.hash.replace(/^#/, "");
    if (hashId && items.some((item) => item.id === hashId)) {
      setActiveId(hashId);
    } else {
      setActiveId(items[0].id);
    }

    const visible = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }

        /* Topmost heading still in the observation band wins */
        const next =
          items.find((item) => visible.get(item.id))?.id ??
          /* If none intersect (fast scroll past), keep last heading above the fold */
          (() => {
            let nearest: string | undefined;
            for (const item of items) {
              const el = document.getElementById(item.id);
              if (!el) continue;
              if (el.getBoundingClientRect().top <= 120) nearest = item.id;
            }
            return nearest;
          })();

        if (next) setActiveId(next);
      },
      {
        /* Band just below the fixed nav — matches heading scroll-margin */
        rootMargin: "-15% 0px -70% 0px",
        threshold: [0, 0.25, 1],
      },
    );

    for (const el of headings) observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="blog-toc" aria-label="Table of contents">
      <p className="blog-toc__label">In this article</p>
      <ul className="blog-toc__list">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li
              key={item.id}
              className={
                item.level === 3 ? "blog-toc__item blog-toc__item--nested" : "blog-toc__item"
              }
            >
              <a
                href={`#${item.id}`}
                className={`blog-toc__link${isActive ? " blog-toc__link--active" : ""}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActiveId(item.id)}
              >
                {tocLabel(item.title)}
              </a>
            </li>
          );
        })}
      </ul>
      <p className="blog-toc__time">{readingTimeMinutes} min read</p>
    </nav>
  );
}
