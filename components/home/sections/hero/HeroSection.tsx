import { CarouselHeroSection } from "@/components/home/sections/hero/CarouselHeroSection";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = {
  offsetForFixedHeader?: boolean;
  fullPageGradient?: boolean;
  showCarousel?: boolean;
};

/** Homepage hero — carousel or static fallback. */
export function HomeHeroSection({
  offsetForFixedHeader = true,
  fullPageGradient = false,
  showCarousel = false,
}: Props) {
  if (showCarousel) {
    return (
      <CarouselHeroSection offsetForFixedHeader={offsetForFixedHeader} fullPageGradient={fullPageGradient} />
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
          Trusted enterprise technology partner
        </p>
        <h1
          id="hero-test-heading"
          className="hero-test-fade-in hero-test-fade-in-delay-1 mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Infrastructure built for what&apos;s next
        </h1>
        <p className="hero-test-fade-in hero-test-fade-in-delay-2 mx-auto mt-5 max-w-lg text-base font-medium text-[#A1A1AA] sm:text-lg">
          Secure, scalable technology foundations for modern organizations.
        </p>
        <div className="hero-test-fade-in hero-test-fade-in-delay-3 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/contact" variant="ctaWhite">
            Get started
          </ButtonLink>
          <ButtonLink href="/services" variant="outlineOnNavy">
            Explore services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
