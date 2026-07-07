"use client";

type Props = {
  url: string;
  title: string;
};

export function ShareButtons({ url, title }: Props) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Copy link",
      href: "#",
      onClick: async () => {
        await navigator.clipboard.writeText(url);
      },
    },
  ];

  return (
    <div className="blog-share" aria-label="Share article">
      <p className="blog-share__label">Share</p>
      <div className="blog-share__actions">
        {links.map((link) =>
          link.onClick ? (
            <button
              key={link.label}
              type="button"
              className="blog-share__btn"
              onClick={link.onClick}
            >
              {link.label}
            </button>
          ) : (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-share__btn"
            >
              {link.label}
            </a>
          ),
        )}
      </div>
    </div>
  );
}
