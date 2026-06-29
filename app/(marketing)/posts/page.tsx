import Image from "next/image";
import Link from "next/link";

import { MarketingDocPage } from "@/components/layout/MarketingDocPage";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostsPage() {
  const posts = await client.fetch(POSTS_QUERY);

  return (
    <>
      <MarketingDocPage
        theme="dark"
        title="Resources"
        lede="Editorial insights on procurement, cloud, security, and enterprise IT. For automated vendor headlines, see News."
      />

      <div className="mx-auto max-w-3xl px-6 pb-20 lg:px-8" data-nav-surface="dark">
        {posts.length === 0 ? (
          <p className="text-[#A1A1AA]">
            No posts yet. Publish a post in{" "}
            <Link href="/studio" className="font-medium text-white transition hover:text-[#b3b3b3]">
              Sanity Studio
            </Link>
            .
          </p>
        ) : (
          <ul className="flex flex-col gap-10 border-t border-white/10 pt-10">
            {posts.map(
              (post: {
                _id: string;
                title: string | null;
                slug: string | null;
                publishedAt: string | null;
                authorName: string | null;
                mainImage?: Parameters<typeof urlFor>[0];
              }) =>
                post.slug ? (
                  <li key={post._id}>
                    <article className="flex flex-col gap-4 sm:flex-row">
                      {post.mainImage ? (
                        <Link
                          href={`/posts/${post.slug}`}
                          className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#111F34] sm:aspect-square sm:w-48"
                        >
                          <Image
                            src={urlFor(post.mainImage).width(400).height(400).url()}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 192px"
                          />
                        </Link>
                      ) : null}
                      <div className="min-w-0 flex-1">
                        <time
                          dateTime={post.publishedAt ?? undefined}
                          className="text-sm text-[#A1A1AA]"
                        >
                          {formatDate(post.publishedAt)}
                        </time>
                        <h2 className="mt-1 text-xl font-semibold text-white">
                          <Link
                            href={`/posts/${post.slug}`}
                            className="transition hover:text-[#b3b3b3]"
                          >
                            {post.title ?? "Untitled"}
                          </Link>
                        </h2>
                        {post.authorName ? (
                          <p className="mt-1 text-sm text-[#A1A1AA]">{post.authorName}</p>
                        ) : null}
                      </div>
                    </article>
                  </li>
                ) : null,
            )}
          </ul>
        )}

        <p className="mt-12 text-sm text-[#A1A1AA]">
          Vendor RSS headlines:{" "}
          <Link href="/vendor-updates" className="font-medium text-white transition hover:text-[#b3b3b3]">
            News
          </Link>
        </p>
      </div>
    </>
  );
}
