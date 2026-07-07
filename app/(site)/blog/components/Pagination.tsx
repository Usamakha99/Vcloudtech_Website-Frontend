import Link from "next/link";

import type { BlogArticle } from "@/lib/blog/types";

type Props = {
  previous?: BlogArticle;
  next?: BlogArticle;
};

export function Pagination({ previous, next }: Props) {
  if (!previous && !next) return null;

  return (
    <nav className="blog-pagination" aria-label="Article navigation">
      {previous ? (
        <Link href={`/blog/${previous.slug}`} className="blog-pagination__card blog-pagination__card--prev">
          <span className="blog-pagination__label">Previous article</span>
          <span className="blog-pagination__title">{previous.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link href={`/blog/${next.slug}`} className="blog-pagination__card blog-pagination__card--next">
          <span className="blog-pagination__label">Next article</span>
          <span className="blog-pagination__title">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
