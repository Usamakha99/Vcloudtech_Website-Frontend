import { ButtonLink } from "@/components/ui/ButtonLink";

export function HomeCtaBand() {
  return (
    <section className="border-t border-slate-800/20 bg-[#1B224B] py-12 sm:py-14" aria-labelledby="cta-band-heading">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center sm:flex-row sm:text-left lg:px-8">
        <h2 id="cta-band-heading" className="max-w-xl text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Ready to transform your technology roadmap?
        </h2>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/contact" variant="ctaWhite">
            Request pricing
          </ButtonLink>
          <ButtonLink href="/#contact" variant="outlineOnNavy">
            Schedule a consultation
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
