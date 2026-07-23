"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import type { BlogArticle } from "@/lib/blog/types";
import { BlogImage } from "./BlogImage";
import { ReadingProgress } from "./ReadingProgress";
import { TableOfContents } from "./TableOfContents";

type Props = {
  article: BlogArticle;
  children: ReactNode;
};

function formatDetailDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogDetailHero({ article }: { article: BlogArticle }) {
  return (
    <header className="blog-detail__hero">
      <Link
        href={`/blog?category=${article.categorySlug}`}
        className="blog-detail__back"
      >
        <svg className="blog-detail__back-icon" viewBox="0 0 20 20" aria-hidden>
          <path
            d="M12.5 15 7.5 10l5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to {article.category}
      </Link>

      <div className="blog-detail__meta-row">
        <span className="blog-detail__blog-tag">Blog</span>
        <span className="blog-detail__category">{article.category}</span>
        <time className="blog-detail__date" dateTime={article.publishedAt}>
          {formatDetailDate(article.publishedAt)}
        </time>
      </div>

      <h1 className="blog-detail__title">{article.title}</h1>

      <div className="blog-detail__hero-image">
        <BlogImage
          src={article.image}
          alt={article.imageAlt}
          fill
          priority
          className="blog-detail__hero-img"
          sizes="(max-width: 1023px) 100vw, 44rem"
        />
      </div>
    </header>
  );
}

export function BlogDetailShell({ article, children }: Props) {
  const hasToc = article.tableOfContents.length > 0;

  return (
    <>
      <ReadingProgress />
      <article className="blog-detail">
        <div className="blog-container blog-detail__container">
          <div
            className={`blog-detail__layout${hasToc ? " blog-detail__layout--with-toc" : ""}`}
          >
            <div className="blog-detail__main">
              <BlogDetailHero article={article} />
              {children}
            </div>

            {hasToc ? (
              <aside className="blog-detail__aside">
                <TableOfContents
                  items={article.tableOfContents}
                  readingTimeMinutes={article.readingTimeMinutes}
                />
              </aside>
            ) : null}
          </div>
        </div>
      </article>
    </>
  );
}
