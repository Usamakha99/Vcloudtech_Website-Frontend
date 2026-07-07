import Link from "next/link";

import {
  CartIcon,
  CloudIcon,
  CompassIcon,
  RocketIcon,
  ServerIcon,
  ShieldIcon,
  SolutionsIcon,
  TeamIcon,
} from "@/components/icons/section-icons";
import type { BlogCategory } from "@/lib/blog/types";

const iconMap = {
  server: ServerIcon,
  shield: ShieldIcon,
  cloud: CloudIcon,
  network: CompassIcon,
  datacenter: ServerIcon,
  enterprise: TeamIcon,
  cart: CartIcon,
  rocket: RocketIcon,
  solutions: SolutionsIcon,
} as const;

type Props = {
  categories: BlogCategory[];
};

export function CategoryGrid({ categories }: Props) {
  return (
    <section id="categories" className="blog-categories" aria-labelledby="blog-categories-heading">
      <div className="blog-container">
        <div className="blog-section-head">
          <p className="blog-eyebrow">Topics</p>
          <h2 id="blog-categories-heading" className="blog-section-title">
            Browse by category
          </h2>
        </div>

        <div className="blog-categories__grid">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] ?? SolutionsIcon;
            return (
              <Link
                key={category.slug}
                href={`/blog?category=${category.slug}#latest-articles`}
                className="blog-category-card"
              >
                <span className="blog-category-card__icon" aria-hidden>
                  <Icon />
                </span>
                <h3 className="blog-category-card__title">{category.name}</h3>
                <p className="blog-category-card__desc">{category.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
