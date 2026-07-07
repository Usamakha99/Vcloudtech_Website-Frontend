"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { DtScrollReveal } from "@/components/home/shared/DtScrollReveal";
import type { BlogArticle, BlogCategory } from "@/lib/blog/types";
import { filterArticles } from "@/lib/blog/utils";
import { ArticleCard } from "./components/ArticleCard";
import { CategoryFilters } from "./components/CategoryFilters";
import { EmptyState } from "./components/EmptyState";
import { Hero } from "./components/Hero";

type Props = {
  articles: BlogArticle[];
  categories: BlogCategory[];
};

export function BlogLandingPage({ articles, categories }: Props) {
  const searchParams = useSearchParams();
  const [categorySlug, setCategorySlug] = useState("");

  useEffect(() => {
    setCategorySlug(searchParams.get("category") ?? "");
  }, [searchParams]);

  const filtered = useMemo(
    () => filterArticles(articles, { categorySlug, sort: "newest" }),
    [articles, categorySlug],
  );

  return (
    <main className="blog-page blog-page--landing" data-nav-surface="dark">
      <Hero />

      <CategoryFilters
        categories={categories}
        activeSlug={categorySlug}
        onChange={setCategorySlug}
      />

      <section id="latest-articles" className="blog-latest blog-latest--landing" aria-label="All blog articles">
        <div className="blog-container">
          {filtered.length ? (
            <div className="blog-latest__grid blog-latest__grid--landing">
              {filtered.map((article, index) => (
                <DtScrollReveal key={article.slug} delay={index * 0.04}>
                  <ArticleCard article={article} variant="landing" />
                </DtScrollReveal>
              ))}
            </div>
          ) : (
            <EmptyState
              title={articles.length ? "No articles in this category" : "No blog articles yet"}
              description={
                articles.length
                  ? "Try another category or view all articles."
                  : "Create your first article in Sanity Studio under Blog → Articles."
              }
            />
          )}
        </div>
      </section>
    </main>
  );
}
