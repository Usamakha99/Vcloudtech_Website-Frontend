import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";

import { urlFor } from "@/sanity/lib/image";

type BlockProps = {
  value?: {
    asset?: {_ref?: string};
    alt?: string;
  };
};

const components: PortableTextComponents = {
  types: {
    image: ({value}: BlockProps) => {
      if (!value?.asset?._ref) return null;
      const url = urlFor(value).width(1200).url();
      return (
        <figure className="my-6">
          {/* Dimensions unknown from Portable Text — use native img for embedded assets */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={value.alt ?? ""}
            className="h-auto w-full rounded-lg"
            loading="lazy"
          />
        </figure>
      );
    },
  },
  marks: {
    link: ({children, value}) => {
      const href = value?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    normal: ({children}) => (
      <p className="my-4 leading-relaxed first:mt-0">{children}</p>
    ),
    h1: ({children}) => (
      <h1 className="mt-10 text-4xl font-semibold tracking-tight">{children}</h1>
    ),
    h2: ({children}) => (
      <h2 className="mt-8 text-3xl font-semibold tracking-tight">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="mt-6 text-2xl font-semibold tracking-tight">{children}</h3>
    ),
    h4: ({children}) => (
      <h4 className="mt-6 text-xl font-semibold">{children}</h4>
    ),
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-zinc-300 pl-4 text-zinc-700 italic dark:border-zinc-600 dark:text-zinc-300">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="my-4 list-disc space-y-2 pl-6">{children}</ul>
    ),
  },
};

export function PostBody({value}: {value: NonNullable<unknown>}) {
  return (
    <div className="max-w-none space-y-4 text-base leading-relaxed text-zinc-800 dark:text-zinc-200 [&_p]:my-4 [&_p:first-child]:mt-0">
      <PortableText value={value as never} components={components} />
    </div>
  );
}
