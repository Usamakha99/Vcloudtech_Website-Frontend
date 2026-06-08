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
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(255,255,255,0.18),transparent_55%)]"
            aria-hidden
          />
          <div
            className="hero-test-orb pointer-events-none absolute -left-[10%] top-[15%] h-[min(55vw,22rem)] w-[min(55vw,22rem)] rounded-full bg-violet-500/35 blur-[80px]"
            aria-hidden
          />
          <div
            className="hero-test-orb hero-test-orb-delay pointer-events-none absolute -right-[5%] top-[25%] h-[min(50vw,20rem)] w-[min(50vw,20rem)] rounded-full bg-cyan-400/30 blur-[72px]"
            aria-hidden
          />
          <div
            className="hero-test-orb pointer-events-none absolute bottom-[10%] left-[20%] h-48 w-48 rounded-full bg-fuchsia-500/25 blur-[64px]"
            aria-hidden
          />
          <div
            className="hero-test-orb hero-test-orb-delay pointer-events-none absolute bottom-[5%] right-[15%] h-56 w-56 rounded-full bg-amber-400/20 blur-[70px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,rgba(15,10,46,0.45))]"
            aria-hidden
          />
        </>
      ) : null}

      <div className="relative mx-auto w-full max-w-3xl px-6 py-16 text-center sm:px-8 sm:py-20">
        <p className="hero-test-fade-in text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-200/95">
          Test preview
        </p>

        <h1
          id="hero-test-heading"
          className="hero-test-fade-in hero-test-fade-in-delay-1 mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl sm:leading-[1.12] lg:text-5xl"
        >
          Minimal hero with motion
        </h1>

        <p className="hero-test-fade-in hero-test-fade-in-delay-2 mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
          Rich ingredient gradient across the full page — hero, services, features,
          and CTA on one canvas.
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
          <Link href="/design-test" className="font-mono text-sky-200/90 hover:text-white">
            /design-test
          </Link>
        </p>
      </div>
    </section>
  );
}
