import { Suspense } from "react";
import type { Metadata } from "next";

import { fetchBlogCategories, fetchBlogPosts } from "@/lib/blog/fetch";
import { blogLanding } from "@/lib/blog/blog-landing";
import { BlogLandingPage } from "./BlogLandingPage";
import { LoadingSkeleton } from "./components/LoadingSkeleton";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Enterprise Technology Insights | Blog",
  description: blogLanding.hero.description,
  openGraph: {
    title: "Enterprise Technology Insights | vCloudTech Blog",
    description: blogLanding.hero.description,
    type: "website",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Technology Insights | vCloudTech Blog",
    description: blogLanding.hero.description,
  },
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const [articles, categories] = await Promise.all([
    fetchBlogPosts(),
    fetchBlogCategories(),
  ]);

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <BlogLandingPage articles={articles} categories={categories} />
    </Suspense>
  );
}
