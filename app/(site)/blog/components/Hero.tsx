import { MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { blogLanding } from "@/lib/blog/blog-landing";

import "@/components/marketing/marketing-page-hero.css";

/** Blog landing hero — same MarketingPageHero pattern as Services / Contracts. */
export function Hero() {
  const { hero } = blogLanding;

  return (
    <MarketingPageHero
      title={hero.title}
      lede={hero.description}
      image={hero.image}
      imageAlt={hero.imageAlt}
      headingId="blog-hero-heading"
    />
  );
}
