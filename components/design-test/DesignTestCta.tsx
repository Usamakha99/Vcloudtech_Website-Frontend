import { ButtonLink } from "@/components/ui/ButtonLink";

import { dt } from "@/components/design-test/design-test-theme";

type Props = {
  surface?: "gradient" | "glass";
};

/** CTA band — orange gradient or glass panel on design-test background. */
export function DesignTestCta({ surface = "gradient" }: Props) {
  const glass = surface === "glass";

  return (
    <section
      id="cta"
      className={`scroll-mt-24 ${dt.section} ${
        glass ? "bg-transparent" : "bg-[#041329]"
      }`}
      aria-labelledby="design-test-cta-heading"
    >
      <div className={`mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8 ${glass ? dt.ctaPanel : ""}`}>
        <h2
          id="design-test-cta-heading"
          className="text-balance text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-3xl"
        >
          Ready to start your next project?
        </h2>
        <p className={`mx-auto mt-3 max-w-lg text-sm leading-relaxed sm:text-base ${dt.body}`}>
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
