import { HeroCarousel } from "@/components/hero-test/HeroCarousel";
import { ButtonLink } from "@/components/ui/ButtonLink";

import "./white-minimal-hero.css";

type Props = {
  offsetForFixedHeader?: boolean;
  showCarousel?: boolean;
};

/** Premium light hero — carousel with navy typography and orange accents. */
export function WhiteMinimalHero({ offsetForFixedHeader = true, showCarousel = true }: Props) {
  if (!showCarousel) return null;

  return (
    <section
      className="white-hero-section--carousel bg-transparent"
      aria-labelledby="white-hero-heading"
    >
      <div className="white-hero-media">
        <HeroCarousel />
      </div>

      <div className="white-hero-scrim" aria-hidden />

      <div className="white-hero-overlay">
        <div className="white-hero-copy">
          <p className="white-hero-fade-in text-[11px] font-semibold uppercase tracking-[0.2em] text-[#111A45/62]">
            Enterprise IT solutions
          </p>

          <h1
            id="white-hero-heading"
            className="white-hero-fade-in white-hero-fade-in-delay-1 mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-[#111A45] sm:text-4xl lg:text-5xl lg:leading-[1.08]"
          >
            Infrastructure you can{" "}
            <span className="relative inline-block">
              see working
              <span
                className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#E55614]"
                aria-hidden
              />
            </span>
          </h1>

          <p className="white-hero-fade-in white-hero-fade-in-delay-2 mx-auto mt-5 max-w-lg text-sm leading-relaxed text-[#111A45/62] sm:text-base">
            Procurement, cloud, security, and hardware — delivered with real warehouse scale,
            accountable teams, and the speed enterprise IT demands.
          </p>

          <div className="white-hero-fade-in white-hero-fade-in-delay-3 mt-8 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row">
            <ButtonLink
              href="/contact"
              variant="primaryNavy"
              className="min-w-[9.5rem] !bg-[#E55614] !text-white hover:!bg-[#d14d12]"
            >
              Get a quote
            </ButtonLink>
            <ButtonLink
              href="/services"
              variant="outlineDark"
              className="min-w-[9.5rem] !border-[#111A45]/20 !text-[#111A45] hover:!border-[#111A45]/35 hover:!bg-[#111A45]/5"
            >
              Explore services
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
