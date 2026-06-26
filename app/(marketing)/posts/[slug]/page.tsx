import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostBody } from "@/components/PostBody";
import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });
  if (!post) return { title: "Post not found" };
  return {
    title: post.title ?? "Post",
    description: post.title ?? undefined,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) notFound();

  return (
    <article className="mx-auto min-h-full max-w-3xl bg-white px-6 py-16 text-slate-900">
      <Link
        href="/posts"
        className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← All posts
      </Link>

      <header className="mt-8">
        <time
          dateTime={post.publishedAt ?? undefined}
          className="text-sm text-zinc-500 dark:text-zinc-400"
        >
          {formatDate(post.publishedAt)}
        </time>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {post.title ?? "Untitled"}
        </h1>
        {post.author?.name ? (
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            By {post.author.name}
          </p>
        ) : null}
      </header>

      {post.mainImage ? (
        <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={urlFor(post.mainImage).width(1200).height(675).url()}
            alt={(post.mainImage as { alt?: string }).alt ?? ""}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      ) : null}

      {post.body ? (
        <div className="mt-12">
          <PostBody value={post.body} />
        </div>
      ) : null}
    </article>
  );
}
