"use client";

import Image from "next/image";
import { dt } from "@/components/design-test/design-test-theme";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";


import "./resource-hub.css";

type Article = {
  category: string;
  title: string;
  date: string;
  dateTime: string;
  readTime: string;
  href: string;
  image: string;
};

const blogImagesBase = "/Blog Images";

const articles: Article[] = [
  {
    category: "Cloud",
    title: "AWS hybrid infrastructure without downtime risk",
    date: "Mar 12, 2026",
    dateTime: "2026-03-12",
    readTime: "8 min read",
    href: "/posts",
    image: `${blogImagesBase}/Amazon web services.png`,
  },
  {
    category: "AI Strategy",
    title: "Artificial intelligence strategy for enterprise IT leaders",
    date: "Feb 28, 2026",
    dateTime: "2026-02-28",
    readTime: "6 min read",
    href: "/posts",
    image: `${blogImagesBase}/Artificial Intelligence Strategy.png`,
  },
  {
    category: "Automation",
    title: "AI automation tools that streamline procurement workflows",
    date: "Feb 14, 2026",
    dateTime: "2026-02-14",
    readTime: "5 min read",
    href: "/posts",
    image: `${blogImagesBase}/AI automation tools.png`,
  },
];

function ArticleMeta({
  category,
  date,
  dateTime,
  readTime,
}: Pick<Article, "category" | "date" | "dateTime" | "readTime">) {
  return (
    <div className="rh__meta">
      <span className="rh__meta-category">
        <span className="rh__meta-dot" aria-hidden />
        {category}
      </span>
      <span className="rh__meta-sep" aria-hidden>
        ·
      </span>
      <time dateTime={dateTime}>{date}</time>
      <span className="rh__meta-sep" aria-hidden>
        ·
      </span>
      <span>{readTime}</span>
    </div>
  );
}

function BlogCard({
  article,
  visible,
  delayMs,
}: {
  article: Article;
  visible: boolean;
  delayMs: number;
}) {
  return (
    <li
      className={`rh__card ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : undefined }}
    >
      <Link href={article.href} className="rh__card-link group">
        <div className="rh__card-visual">
          <div className="rh__card-img-wrap">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="rh__card-img"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </div>
        </div>
        <div className="rh__card-body">
          <ArticleMeta
            category={article.category}
            date={article.date}
            dateTime={article.dateTime}
            readTime={article.readTime}
          />
          <h3 className="rh__card-title">{article.title}</h3>
          <span className="rh__read">
            Read article
            <span className="rh__read-arrow" aria-hidden>
              →
            </span>
          </span>
        </div>
      </Link>
    </li>
  );
}

/** Blog & content — three featured articles for the homepage. */
export function ResourceHubSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const [mounted, setMounted] = useState(false);

  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  const headerVisible = mounted && sectionInView;
  const cardsVisible = mounted && gridInView;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog-content"
      className={`rh relative scroll-mt-24 py-16 sm:py-20 lg:py-24 ${dt.sectionBorder}`}
      aria-labelledby="blog-content-heading"
    >
      <div className="rh__glow rh__glow--tl" aria-hidden />
      <div className="rh__glow rh__glow--br" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className={`rh__header ${dt.sectionHeader} ${headerVisible ? "is-visible" : ""}`}>
          <p className={dt.badge}>Blog &amp; content</p>
          <h2 id="blog-content-heading" className={dt.sectionHeadlineTp}>
            Latest{" "}
            <span className="bg-gradient-to-r from-[#E55614] to-[#f06520] bg-clip-text text-transparent">
              insights
            </span>
          </h2>
          <p className={`${dt.sectionDesc} ${dt.headingSub}`}>
            Practical perspectives on procurement, cloud, security, and enterprise IT operations.
          </p>
        </header>

        <ul ref={gridRef} className="rh__grid" aria-label="Latest blog articles">
          {articles.map((article, index) => (
            <BlogCard
              key={article.title}
              article={article}
              visible={cardsVisible}
              delayMs={index * 100 + 80}
            />
          ))}
        </ul>

        <div className={`rh__cta-wrap ${cardsVisible ? "is-visible" : ""}`}>
          <Link href="/posts" className="rh__cta">
            View all articles
            <span className="rh__cta-arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
