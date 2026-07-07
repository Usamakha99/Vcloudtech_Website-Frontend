import Image from "next/image";

import type { BlogAuthor } from "@/lib/blog/types";

type Props = {
  author: BlogAuthor;
};

export function AuthorCard({ author }: Props) {
  return (
    <aside className="blog-author-card" aria-label="About the author">
      {author.image ? (
        <div className="blog-author-card__avatar">
          <Image src={author.image} alt="" fill className="blog-author-card__image" sizes="80px" />
        </div>
      ) : null}
      <div className="blog-author-card__body">
        <p className="blog-eyebrow">Author</p>
        <h3 className="blog-author-card__name">{author.name}</h3>
        {author.role ? <p className="blog-author-card__role">{author.role}</p> : null}
        {author.bio ? <p className="blog-author-card__bio">{author.bio}</p> : null}
        {author.linkedIn ? (
          <a
            href={author.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-btn blog-btn--secondary blog-author-card__link"
          >
            LinkedIn
          </a>
        ) : null}
      </div>
    </aside>
  );
}
