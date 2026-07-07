import { blogLanding } from "@/lib/blog/types";

export function Hero() {
  const { hero } = blogLanding;

  return (
    <section className="blog-hero blog-hero--centered" aria-labelledby="blog-hero-heading">
      <div className="blog-container blog-hero__inner--centered">
        <p className="blog-hero__eyebrow">{hero.badge}</p>
        <h1 id="blog-hero-heading" className="blog-hero__title blog-hero__title--centered">
          {hero.title}
        </h1>
        <p className="blog-hero__lede blog-hero__lede--centered">{hero.description}</p>
      </div>
    </section>
  );
}
