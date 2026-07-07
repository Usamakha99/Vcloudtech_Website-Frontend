import type { BlogArticle } from "./types";
import { SITE_URL } from "./utils";

export function buildArticleJsonLd(article: BlogArticle) {
  const url = `${SITE_URL}/blog/${article.slug}`;
  const authorName = article.author?.name ?? "vCloudTech";

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "vCloudTech",
      url: SITE_URL,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "vCloudTech",
      publisher: {"@id": `${SITE_URL}/#organization`},
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {"@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog`},
        {"@type": "ListItem", position: 2, name: article.title, item: url},
      ],
    },
    {
      "@type": "Article",
      headline: article.title,
      description: article.metaDescription,
      image: article.image.startsWith("http") ? article.image : `${SITE_URL}${article.image}`,
      datePublished: article.publishedAt,
      author: {"@type": "Person", name: authorName},
      publisher: {"@id": `${SITE_URL}/#organization`},
      mainEntityOfPage: url,
      articleSection: article.category,
      keywords: article.tags.join(", "),
    },
    {"@type": "Person", name: authorName},
  ];

  if (article.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: article.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {"@type": "Answer", text: item.answer},
      })),
    });
  }

  return {"@context": "https://schema.org", "@graph": graph};
}
