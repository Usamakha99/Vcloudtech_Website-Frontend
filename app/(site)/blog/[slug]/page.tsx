import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostBody } from "@/components/posts/BlogPostBody";
import { fetchBlogPostBySlug, fetchBlogPosts, fetchBlogSlugs } from "@/lib/blog/fetch";
import { buildArticleJsonLd } from "@/lib/blog/seo";
import { blogLanding } from "@/lib/blog/types";
import { getAdjacentArticles, SITE_URL } from "@/lib/blog/utils";
import { BlogDetailShell } from "../components/BlogDetailShell";
import { CTASection } from "../components/CTASection";
import { Pagination } from "../components/Pagination";
import { RelatedArticles } from "../components/RelatedArticles";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await fetchBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await fetchBlogPostBySlug(slug);
  if (!result) return { title: "Article not found" };

  const { article } = result;
  const url = `${SITE_URL}/blog/${slug}`;

  return {
    title: article.title,
    description: article.metaDescription,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: "article",
      url,
      publishedTime: article.publishedAt,
      authors: [article.author?.name ?? "vCloudTech"],
      images: [{ url: article.image, alt: article.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
      images: [article.image],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const result = await fetchBlogPostBySlug(slug);

  if (!result?.article.body) notFound();

  const { article, related } = result;
  const allPosts = await fetchBlogPosts();
  const { previous, next } = getAdjacentArticles(allPosts, slug);
  const jsonLd = buildArticleJsonLd(article);

  return (
    <main className="blog-page blog-page--detail" data-nav-surface="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogDetailShell article={article}>
        <BlogPostBody value={article.body!} />

        {article.faq?.length ? (
          <section className="blog-faq" aria-labelledby="blog-faq-heading">
            <h2 id="blog-faq-heading" className="blog-section-title">
              Frequently asked questions
            </h2>
            <div className="blog-faq__list">
              {article.faq.map((item) => (
                <details key={item.question} className="blog-faq__item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}
      </BlogDetailShell>

      <div className="blog-container">
        <Pagination previous={previous} next={next} />
      </div>

      <RelatedArticles articles={related} />

      <CTASection
        title={blogLanding.detailCta.title}
        description={blogLanding.detailCta.description}
        primaryLabel={blogLanding.detailCta.primaryLabel}
        primaryHref={blogLanding.detailCta.primaryHref}
        secondaryLabel={blogLanding.detailCta.secondaryLabel}
        secondaryHref={blogLanding.detailCta.secondaryHref}
      />
    </main>
  );
}
