import Link from "next/link";

import { dt } from "@/components/design-test/design-test-theme";
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

        <div
          className={`hero-test-hero-overlay mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${
            offsetForFixedHeader ? "max-sm:pt-[4.25rem]" : ""
          }`}
        >
          <div className="hero-test-hero-copy max-w-xl text-start">
            <p className={`hero-test-fade-in ${dt.badge}`}>Enterprise IT solutions</p>

            <h1
              id="hero-test-heading"
              className="hero-test-fade-in hero-test-fade-in-delay-1 mt-4 text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-white sm:mt-5 sm:text-3xl lg:text-[2.5rem] xl:text-[2.75rem] 2xl:text-5xl text-balance"
            >
              Infrastructure you can{" "}
              <span className="hero-gradient-text">see working</span>
            </h1>

            <p className="hero-test-fade-in hero-test-fade-in-delay-2 mt-4 max-w-lg text-pretty text-sm leading-relaxed text-[#A1A1AA] sm:text-base lg:text-lg">
              Procurement, cloud, security, and hardware — delivered with real warehouse scale,
              accountable teams, and the speed enterprise IT demands.
            </p>

            <div className="hero-test-fade-in hero-test-fade-in-delay-3 mt-8 flex flex-col items-start gap-3 sm:mt-10 sm:flex-row">
              <ButtonLink href="/contact" variant="ctaWhite" className="w-full sm:w-auto">
                Get a quote
              </ButtonLink>
              <ButtonLink href="/services" variant="outlineOnNavy" className="w-full sm:w-auto">
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
          className="hero-test-fade-in hero-test-fade-in-delay-1 mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Minimal hero with motion
        </h1>
        <p className="hero-test-fade-in hero-test-fade-in-delay-2 mx-auto mt-5 max-w-lg text-base text-[#A1A1AA] sm:text-lg">
          Dark canvas with #E55614 accents.
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
