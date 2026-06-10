import Link from "next/link";

import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = {
  offsetForFixedHeader?: boolean;
  /** When true, hero is transparent — full-page gradient shows through. */
  fullPageGradient?: boolean;
};

/**
 * Minimal test hero — animated gradient + staggered fade-in (CSS only, no client JS).
 */
export function MinimalTestHero({
  offsetForFixedHeader = true,
  fullPageGradient = false,
}: Props) {
  return (
    <section
      className={`relative flex min-h-[min(100vh,720px)] items-center overflow-hidden ${
        fullPageGradient ? "pb-20 sm:pb-28" : ""
      } ${
        fullPageGradient ? "bg-transparent" : "hero-test-gradient"
      } ${offsetForFixedHeader ? "pt-[4.25rem]" : ""}`}
      aria-labelledby="hero-test-heading"
    >
      {!fullPageGradient ? (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-8%,rgba(255,255,255,0.06),transparent_52%)]"
          aria-hidden
        />
      ) : null}

      <div className="relative mx-auto w-full max-w-3xl px-6 py-16 text-center sm:px-8 sm:py-20">
        <p className="hero-test-fade-in text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300/90">
          Test preview
        </p>

        <h1
          id="hero-test-heading"
          className="hero-test-fade-in hero-test-fade-in-delay-1 mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl sm:leading-[1.12] lg:text-5xl"
        >
          Minimal hero with motion
        </h1>

        <p className="hero-test-fade-in hero-test-fade-in-delay-2 mx-auto mt-5 max-w-lg text-base leading-relaxed text-orange-50/75 sm:text-lg">
          Black and warm orange canvas — minimal motion across the full design-test page.
        </p>

        <div className="hero-test-fade-in hero-test-fade-in-delay-3 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/contact" variant="ctaWhite">
            Get started
          </ButtonLink>
          <ButtonLink href="/" variant="outlineOnNavy">
            Back to home
          </ButtonLink>
        </div>

        <p className="hero-test-fade-in hero-test-fade-in-delay-3 mt-12 text-xs text-white/50">
          Route:{" "}
          <Link href="/design-test" className="font-mono text-orange-200/90 hover:text-white">
            /design-test
          </Link>
        </p>
      </div>
    </section>
  );
}
