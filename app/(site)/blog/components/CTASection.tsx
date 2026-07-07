import Link from "next/link";

type Props = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: Props) {
  return (
    <section className="blog-cta" aria-labelledby="blog-cta-heading">
      <div className="blog-container">
        <div className="blog-cta__panel">
          <h2 id="blog-cta-heading" className="blog-cta__title">
            {title}
          </h2>
          <p className="blog-cta__desc">{description}</p>
          <div className="blog-cta__actions">
            <Link href={primaryHref} className="blog-btn blog-btn--primary">
              {primaryLabel}
            </Link>
            {secondaryLabel && secondaryHref ? (
              <Link href={secondaryHref} className="blog-btn blog-btn--secondary">
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
