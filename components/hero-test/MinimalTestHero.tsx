import Link from "next/link";

import { HeroCarousel } from "@/components/hero-test/HeroCarousel";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = {
  offsetForFixedHeader?: boolean;
  fullPageGradient?: boolean;
  showCarousel?: boolean;
};

export function MinimalTestHero({
  offsetForFixedHeader = true,
  fullPageGradient = false,
  showCarousel = false,
}: Props) {
  if (showCarousel) {
    return (
      <section
        className={`hero-test-hero-section--carousel ${
          fullPageGradient ? "bg-transparent" : "hero-test-gradient"
        }`}
        aria-labelledby="hero-test-heading"
      >
        <div className="hero-test-hero-media">
          <HeroCarousel />
        </div>

        <div className="hero-test-hero-scrim" aria-hidden />

        <div className="hero-test-hero-overlay">
          <div className="hero-test-hero-copy">
            <p className="hero-test-fade-in text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
              Enterprise IT solutions
            </p>

            <h1
              id="hero-test-heading"
              className="hero-test-fade-in hero-test-fade-in-delay-1 mx-auto mt-3 max-w-2xl text-2xl font-bold tracking-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl"
            >
              Infrastructure you can see working
            </h1>

            <p className="hero-test-fade-in hero-test-fade-in-delay-2 mx-auto mt-4 max-w-lg text-sm font-medium leading-relaxed text-white/75 sm:text-base">
              Procurement, cloud, security, and hardware — delivered with real warehouse scale,
              accountable teams, and the speed enterprise IT demands.
            </p>

            <div className="hero-test-fade-in hero-test-fade-in-delay-3 mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row">
              <ButtonLink href="/contact" variant="ctaWhite" className="min-w-[9.5rem]">
                Get a quote
              </ButtonLink>
              <ButtonLink href="/services" variant="outlineOnNavy" className="min-w-[9.5rem]">
                Explore services
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative flex min-h-[min(100svh,640px)] items-center overflow-hidden sm:min-h-[min(100vh,720px)] lg:min-h-svh ${
        fullPageGradient ? "bg-transparent" : "hero-test-gradient"
      } ${offsetForFixedHeader ? "pt-[4.25rem]" : ""}`}
      aria-labelledby="hero-test-heading"
    >
      <div className="relative mx-auto w-full max-w-3xl px-4 py-12 text-center sm:px-8 sm:py-20">
        <p className="hero-test-fade-in text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A1A1AA]">
          Test preview
        </p>
        <h1
          id="hero-test-heading"
          className="hero-test-fade-in hero-test-fade-in-delay-1 mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Minimal hero with motion
        </h1>
        <p className="hero-test-fade-in hero-test-fade-in-delay-2 mx-auto mt-5 max-w-lg text-base font-medium text-[#A1A1AA] sm:text-lg">
          Dark canvas with #b3b3b3 accents.
        </p>
        <div className="hero-test-fade-in hero-test-fade-in-delay-3 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/contact" variant="ctaWhite">
            Get started
          </ButtonLink>
          <ButtonLink href="/" variant="outlineOnNavy">
            Back to home
          </ButtonLink>
        </div>
        <p className="hero-test-fade-in hero-test-fade-in-delay-3 mt-12 text-xs text-[#A1A1AA]/70">
          Route:{" "}
          <Link href="/design-test" className="font-mono hover:text-white">
            /design-test
          </Link>
        </p>
      </div>
    </section>
  );
}
