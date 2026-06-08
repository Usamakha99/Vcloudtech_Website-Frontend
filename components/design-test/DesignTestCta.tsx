import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = {
  surface?: "gradient" | "glass";
};

/** CTA band — solid gradient or glass panel on full-page ingredient background. */
export function DesignTestCta({ surface = "gradient" }: Props) {
  const glass = surface === "glass";

  return (
    <section
      id="cta"
      className={`scroll-mt-24 py-14 sm:py-16 ${glass ? "bg-transparent" : "bg-gradient-to-br from-[#1B224B] via-[#0c4a6e] to-sky-600"}`}
      aria-labelledby="design-test-cta-heading"
    >
      <div
        className={`mx-auto max-w-3xl px-6 text-center lg:px-8 ${
          glass
            ? "rounded-3xl border border-white/20 bg-white/10 px-8 py-12 shadow-xl shadow-black/15 backdrop-blur-md sm:py-14"
            : ""
        }`}
      >
        <h2
          id="design-test-cta-heading"
          className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        >
          Ready to start your next project?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
          Talk to our solutions team about cloud, security, and procurement for your
          organization.
        </p>
        <div className="mt-8">
          <ButtonLink href="/contact" variant="ctaWhite">
            Schedule a consultation
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
