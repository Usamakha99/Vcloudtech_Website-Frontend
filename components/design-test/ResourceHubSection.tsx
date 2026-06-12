import Link from "next/link";

import { dt } from "@/components/design-test/design-test-theme";
import { GlassCard } from "@/components/design-test/GlassCard";

const posts = [
  {
    category: "Cloud",
    title: "Modernizing hybrid infrastructure without downtime risk",
    date: "Mar 12, 2026",
    href: "/posts",
  },
  {
    category: "Security",
    title: "How procurement teams tighten vendor governance in 2026",
    date: "Feb 28, 2026",
    href: "/posts",
  },
  {
    category: "Operations",
    title: "Scaling warehouse-backed IT fulfillment for enterprise buyers",
    date: "Feb 14, 2026",
    href: "/posts",
  },
] as const;

/** Resource hub — latest articles with glass post cards. */
export function ResourceHubSection() {
  return (
    <section
      id="resource-hub"
      className={`scroll-mt-24 ${dt.section} ${dt.sectionBorder}`}
      aria-labelledby="resource-hub-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className={dt.badge}>Resource hub</p>
          <h2
            id="resource-hub-heading"
            className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl"
          >
            Blog &amp; content
          </h2>
          <p className={`mt-3 text-sm leading-relaxed sm:text-[15px] ${dt.headingSub}`}>
            Practical insights on procurement, cloud, security, and enterprise IT operations.
          </p>
        </header>

        <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
          {posts.map((post, index) => (
            <li key={post.title}>
              <GlassCard delay={(index + 1) as 1 | 2 | 3} className="h-full">
                <Link href={post.href} className="group flex h-full flex-col p-5 sm:p-6">
                  <div
                    className="mb-4 flex aspect-[16/10] items-center justify-center rounded-lg border border-white/10 bg-[#0F0F0F]/60"
                    aria-hidden
                  >
                    <span className={`${dt.metaLabel} text-[#E55614]/80`}>{post.category}</span>
                  </div>
                  <span className={dt.tag}>{post.category}</span>
                  <h3 className="mt-3 text-base font-semibold leading-snug text-white transition group-hover:text-[#E55614]">
                    {post.title}
                  </h3>
                  <p className={`mt-2 text-xs ${dt.statLabel}`}>{post.date}</p>
                  <span className={`mt-auto pt-4 text-sm font-medium ${dt.linkSm}`}>
                    Read more →
                  </span>
                </Link>
              </GlassCard>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            href="/posts"
            className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-[#E55614]/40 hover:bg-[#E55614]/10 hover:text-white`}
          >
            View all articles
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
