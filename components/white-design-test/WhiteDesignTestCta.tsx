import { ButtonLink } from "@/components/ui/ButtonLink";

import { wdt } from "@/components/white-design-test/white-design-test-theme";

/** Premium light CTA band. */
export function WhiteDesignTestCta() {
  return (
    <section
      id="cta"
      className={`scroll-mt-24 ${wdt.section} wdt-section--gray`}
      aria-labelledby="white-design-test-cta-heading"
    >
      <div className={`mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8 ${wdt.ctaPanel}`}>
        <h2
          id="white-design-test-cta-heading"
          className="text-balance text-2xl font-semibold tracking-tight text-[#111A45] sm:text-3xl lg:text-4xl"
        >
          Ready to start your next project?
        </h2>
        <p className={`mx-auto mt-4 max-w-lg text-sm leading-relaxed sm:text-base ${wdt.body}`}>
          Talk to our solutions team about cloud, security, and procurement for your organization.
        </p>
        <div className="mt-8">
          <ButtonLink
            href="/contact"
            variant="primaryNavy"
            className="!bg-[#E55614] !text-white hover:!bg-[#d14d12]"
          >
            Schedule a consultation
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
