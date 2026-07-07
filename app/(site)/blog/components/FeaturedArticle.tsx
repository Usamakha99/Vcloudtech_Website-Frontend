import Image from "next/image";
import Link from "next/link";

import type { BlogArticle } from "@/lib/blog/types";
import { formatBlogDate, readingTimeLabel } from "@/lib/blog/utils";

type Props = {
  article: BlogArticle;
};

export function FeaturedArticle({ article }: Props) {
  const author = article.author;

  return (
    <section className="blog-featured" aria-labelledby="blog-featured-heading">
      <div className="blog-container">
        <div className="blog-section-head">
          <p className="blog-eyebrow">Featured insight</p>
          <h2 id="blog-featured-heading" className="blog-section-title">
            Editor&apos;s pick
          </h2>
        </div>

        <article className="blog-featured__card">
          <Link href={`/blog/${article.slug}`} className="blog-featured__visual">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              className="blog-featured__image"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </Link>

          <div className="blog-featured__body">
            <div className="blog-meta">
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

            <h3 className="blog-featured__title">
              <Link href={`/blog/${article.slug}`}>{article.title}</Link>
            </h3>

            <p className="blog-featured__excerpt">{article.excerpt}</p>

            {author ? (
              <p className="blog-featured__author">
                By <span>{author.name}</span> · {author.role}
              </p>
            ) : null}

            <Link href={`/blog/${article.slug}`} className="blog-btn blog-btn--primary">
              Read article
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
