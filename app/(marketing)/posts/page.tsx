import Image from "next/image";
import Link from "next/link";

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
    <div className="mx-auto flex min-h-full max-w-3xl flex-col bg-white px-6 py-16 text-slate-900">
      <header className="mb-12">
        <Link
          href="/"
          className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← Home
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Blog
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Editorial content from Sanity CMS. For automated vendor RSS headlines, see{" "}
          <Link href="/vendor-updates" className="font-medium text-sky-700 underline hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300">
            News
          </Link>
          .
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">
          No posts yet. Publish a post in{" "}
          <Link href="/studio" className="font-medium underline">
            Sanity Studio
          </Link>
          .
        </p>
      ) : (
        <ul className="flex flex-col gap-10">
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
                        className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-zinc-100 sm:aspect-square sm:w-48 dark:bg-zinc-800"
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
                        className="text-sm text-zinc-500 dark:text-zinc-400"
                      >
                        {formatDate(post.publishedAt)}
                      </time>
                      <h2 className="mt-1 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                        <Link
                          href={`/posts/${post.slug}`}
                          className="hover:underline"
                        >
                          {post.title ?? "Untitled"}
                        </Link>
                      </h2>
                      {post.authorName ? (
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                          {post.authorName}
                        </p>
                      ) : null}
                    </div>
                  </article>
                </li>
              ) : null,
          )}
        </ul>
      )}
    </div>
  );
}
