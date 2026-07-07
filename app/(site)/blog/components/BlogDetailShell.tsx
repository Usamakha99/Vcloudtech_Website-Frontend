"use client";

import type { ReactNode } from "react";
import Image from "next/image";

import type { BlogArticle } from "@/lib/blog/types";
import { formatBlogDate, readingTimeLabel } from "@/lib/blog/utils";
import { AuthorCard } from "./AuthorCard";
import { Breadcrumb } from "./Breadcrumb";
import { ReadingProgress } from "./ReadingProgress";
import { ShareButtons } from "./ShareButtons";
import { TableOfContents } from "./TableOfContents";

type Props = {
  article: BlogArticle;
  shareUrl: string;
};

export function BlogDetailSidebar({ article, shareUrl }: Props) {
  const author = article.author;

  return (
    <aside className="blog-detail__sidebar" aria-label="Article sidebar">
      <div className="blog-detail__sidebar-sticky">
        <TableOfContents items={article.tableOfContents} readingTimeMinutes={article.readingTimeMinutes} />
        <ShareButtons url={shareUrl} title={article.title} />
        {author ? <AuthorCard author={author} /> : null}
      </div>
    </aside>
  );
}

export function BlogDetailHero({ article }: { article: BlogArticle }) {
  const author = article.author;

  return (
    <header className="blog-detail__hero">
      <Breadcrumb
        items={[
          { label: "Blog", href: "/blog" },
          { label: article.category, href: `/blog?category=${article.categorySlug}` },
          { label: article.title },
        ]}
      />

      <div className="blog-meta blog-detail__meta">
        <span className="blog-badge">{article.category}</span>
        <span className="blog-meta__sep" aria-hidden>
          ·
        </span>
        <time dateTime={article.publishedAt}>{formatBlogDate(article.publishedAt)}</time>
        <span className="blog-meta__sep" aria-hidden>
          ·
        </span>
        <span>{readingTimeLabel(article.readingTimeMinutes)}</span>
      </div>

      <h1 className="blog-detail__title">{article.title}</h1>

      {author ? (
        <p className="blog-detail__byline">
          By <span>{author.name}</span>
          {author.role ? <> · {author.role}</> : null}
        </p>
      ) : null}

      <div className="blog-detail__hero-image">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority
          className="blog-detail__hero-img"
          sizes="(max-width: 1024px) 100vw, 1200px"
        />
      </div>
    </header>
  );
}

export function BlogDetailShell({ article, shareUrl, children }: Props & { children: ReactNode }) {
  return (
    <>
      <ReadingProgress />
      <article className="blog-detail">
        <div className="blog-container blog-detail__layout">
          <div className="blog-detail__main">
            <BlogDetailHero article={article} />
            {children}
          </div>
          <BlogDetailSidebar article={article} shareUrl={shareUrl} />
        </div>
      </article>
    </>
  );
}
