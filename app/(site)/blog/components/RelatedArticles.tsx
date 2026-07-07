import type { BlogArticle } from "@/lib/blog/types";
import { ArticleCard } from "./ArticleCard";

type Props = {
  articles: BlogArticle[];
  title?: string;
};

export function RelatedArticles({ articles, title = "Related articles" }: Props) {
  if (!articles.length) return null;

  return (
    <section className="blog-related" aria-labelledby="blog-related-heading">
      <div className="blog-container">
        <h2 id="blog-related-heading" className="blog-section-title">
          {title}
        </h2>
        <div className="blog-related__grid">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
