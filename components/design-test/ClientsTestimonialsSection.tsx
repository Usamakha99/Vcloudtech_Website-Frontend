import Image from "next/image";
import { dt } from "@/components/design-test/design-test-theme";
import Link from "next/link";

import { GlassCard } from "@/components/design-test/GlassCard";

const clientLogos = [
  { name: "Microsoft", src: "/partners/microsoft.png" },
  { name: "AWS", src: "/partners/aws.png" },
  { name: "Cisco", src: "/partners/cisco.png" },
  { name: "Dell", src: "/partners/dell.png" },
  { name: "HPE", src: "/partners/hpe.png" },
  { name: "VMware", src: "/partners/vmware.png" },
  { name: "Adobe", src: "/partners/adobe.png" },
  { name: "Fortinet", src: "/partners/fortinet.png" },
] as const;

const testimonials = [
  {
    quote:
      "vCloud Tech consolidated our hardware and licensing workflows — we cut quote turnaround by more than half.",
    name: "Director of IT Operations",
    company: "Regional healthcare network",
  },
  {
    quote:
      "Their warehouse-backed fulfillment gave us confidence on large rollouts. Real inventory, real accountability.",
    name: "VP, Infrastructure",
    company: "Multi-state logistics firm",
  },
  {
    quote:
      "From procurement to deployment support, the team behaves like an extension of our internal IT org.",
    name: "CIO",
    company: "Public-sector agency",
  },
] as const;

/** Clients & testimonials — logo grid + quote cards. */
export function ClientsTestimonialsSection() {
  return (
    <section
      id="clients-testimonials"
      className={`scroll-mt-24 ${dt.section} ${dt.sectionBorder}`}
      aria-labelledby="clients-testimonials-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className={dt.badge}>Social proof</p>
          <h2
            id="clients-testimonials-heading"
            className={`${dt.sectionHeadline} mt-5 text-white`}
          >
            Clients &amp; testimonials
          </h2>
         
        </header>

       

        <ul className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-3 lg:items-stretch lg:gap-5">
          {testimonials.map((item, index) => (
            <li key={item.company} className="h-full">
              <GlassCard delay={(index + 1) as 1 | 2 | 3} className="h-full">
                <blockquote className="flex h-full flex-col p-5 sm:p-6">
                  <p className={`text-sm leading-relaxed ${dt.body}`}>&ldquo;{item.quote}&rdquo;</p>
                  <footer className="mt-auto border-t border-white/10 pt-4">
                    <cite className="not-italic">
                      <span className="block text-sm font-semibold text-white">{item.name}</span>
                      <span className={`mt-0.5 block text-xs ${dt.statLabel}`}>{item.company}</span>
                    </cite>
                  </footer>
                </blockquote>
              </GlassCard>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Link href="/contact" className={`text-sm font-semibold ${dt.link}`}>
            Case study CTA →
          </Link>
        </div>
      </div>
    </section>
  );
}
