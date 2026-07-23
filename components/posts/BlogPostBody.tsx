import type { ReactNode } from "react";
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

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function headingId(children: ReactNode) {
  if (typeof children === "string") return slugify(children);
  if (Array.isArray(children)) {
    return slugify(children.map((child) => (typeof child === "string" ? child : "")).join(""));
  }
  return "";
}

const components: PortableTextComponents = {
  types: {
    image: ({value}: BlockProps) => {
      if (!value?.asset?._ref) return null;
      const url = urlFor(value).width(1200).url();
      return (
        <figure className="blog-article-content__figure">
          <div className="blog-article-content__figure-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={value.alt ?? ""} className="blog-article-content__figure-img-native" />
          </div>
          {value.alt ? (
            <figcaption className="blog-article-content__caption">{value.alt}</figcaption>
          ) : null}
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
          className="font-medium text-white underline underline-offset-4 transition hover:text-[#b3b3b3]"
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    normal: ({children}) => <p className="blog-article-content__p">{children}</p>,
    h2: ({children}) => (
      <h2 id={headingId(children)} className="blog-article-content__heading">
        {children}
      </h2>
    ),
    h3: ({children}) => (
      <h3 id={headingId(children)} className="blog-article-content__heading">
        {children}
      </h3>
    ),
    h4: ({children}) => (
      <h4 className="blog-article-content__heading blog-article-content__heading--h4">{children}</h4>
    ),
    blockquote: ({children}) => (
      <blockquote className="blog-article-content__quote">
        <p>{children}</p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="blog-article-content__list">{children}</ul>,
    number: ({children}) => <ol className="blog-article-content__list blog-article-content__list--ordered">{children}</ol>,
  },
};

export function BlogPostBody({value}: {value: NonNullable<unknown>}) {
  return (
    <div id="blog-article-content" className="blog-article-content">
      <PortableText value={value as never} components={components} />
    </div>
  );
}
