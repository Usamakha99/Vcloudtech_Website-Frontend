import Image from "next/image";
import Link from "next/link";

import type { BlogArticle } from "@/lib/blog/types";

type Props = {
  article: BlogArticle;
  variant?: "default" | "landing";
};

function formatCardDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ArticleCard({ article, variant = "default" }: Props) {
  if (variant === "landing") {
    return (
      <article className="blog-article-card blog-article-card--landing">
        <Link href={`/blog/${article.slug}`} className="blog-article-card__visual blog-article-card__visual--landing">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            className="blog-article-card__image"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        <div className="blog-article-card__body blog-article-card__body--landing">
          <div className="blog-article-card__meta-row">
            <span className="blog-article-card__tag">Blog</span>
            <time dateTime={article.publishedAt} className="blog-article-card__date">
              {formatCardDate(article.publishedAt)}
            </time>
          </div>

          <h3 className="blog-article-card__title blog-article-card__title--landing">
            <Link href={`/blog/${article.slug}`}>{article.title}</Link>
          </h3>
        </div>
      </article>
    );
  }

  const author = article.author;

  return (
    <article className="blog-article-card">
      <Link href={`/blog/${article.slug}`} className="blog-article-card__visual">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className="blog-article-card__image"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="blog-article-card__body">
        <div className="blog-meta">
          <span className="blog-badge">{article.category}</span>
          <span className="blog-meta__sep" aria-hidden>
            ·
          </span>
          <time dateTime={article.publishedAt}>{formatCardDate(article.publishedAt)}</time>
        </div>

        <h3 className="blog-article-card__title">
          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
        </h3>

        <p className="blog-article-card__excerpt">{article.excerpt}</p>

        {author ? <p className="blog-article-card__author">{author.name}</p> : null}

        <Link href={`/blog/${article.slug}`} className="blog-read-link">
          Read article <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
