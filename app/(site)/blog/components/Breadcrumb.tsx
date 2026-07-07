import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  items: Crumb[];
};

export function Breadcrumb({ items }: Props) {
  return (
    <nav className="blog-breadcrumb" aria-label="Breadcrumb">
      <ol className="blog-breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="blog-breadcrumb__item">
              {item.href && !isLast ? (
                <Link href={item.href} className="blog-breadcrumb__link">
                  {item.label}
                </Link>
              ) : (
                <span className="blog-breadcrumb__current" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <span className="blog-breadcrumb__sep" aria-hidden>
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
