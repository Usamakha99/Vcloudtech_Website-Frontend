import Image from "next/image";
import { dt } from "@/components/marketing/design-test-theme";

import { GlassCard } from "@/components/home/shared/GlassCard";

const clientLogos = [
  { name: "Microsoft", src: "/partners/microsoft.png" },
  { name: "AWS", src: "/partners/aws.png" },
  { name: "Cisco", src: "/partners/cisco.png" },
  { name: "Dell", src: "/partners/dell.png" },
  { name: "HPE", src: "/partners/hpe.png" },
  { name: "Acronis", src: "/partners/acronis.png" },
  { name: "Adobe", src: "/partners/adobe.png" },
  { name: "Fortinet", src: "/partners/fortinet.png" },
] as const;

const testimonials = [
  {
    rating: 4,
    quote:
      "After working with two previous IT providers who didn't understand government operations, vCloud Tech was different. They quickly aligned with our procurement and compliance processes. Within a year, we passed our CMMC audit with no findings, reduced IT costs by $140,000 annually, and experienced zero unplanned outages.",
    name: "Sarah K.",
    company: "Co-Founder SaaSFlow",
  },
  {
    rating: 4,
    quote:
      "When we discovered security gaps in our EMR environment, vCloud Tech stepped in with both clinical and technical expertise. They closed 28 critical vulnerabilities in the first week and helped us become HIPAA audit-ready within 60 days. Their team clearly understands the importance of uptime in healthcare.",
    name: "Dr. Thomas",
    company: "CEO  Dr Hospital",
  },
  {
    rating: 5,
    quote:
      "vCloud Tech helped us simplify a complex IT environment that involved multiple MSPs and vendors. Within 18 months, we moved to a single managed services structure, improved cloud visibility, and documented $1.6M in savings. AI-driven automation also reduced our help desk tickets by 58%.",
    name: "David R.",
    company: "Founder BrewCraft",
  },
] as const;

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden>
      <path
        fill="currentColor"
        d="M10 1.5l2.35 4.76 5.25.77-3.8 3.7.9 5.23L10 13.77l-4.7 2.47.9-5.23-3.8-3.7 5.25-.77L10 1.5z"
      />
    </svg>
  );
}

function TestimonialRating({ rating }: { rating: number }) {
  const label = Number.isInteger(rating) ? rating.toFixed(1) : rating.toString();

  return (
    <div className="flex items-center gap-2.5" aria-label={`Rated ${label} out of 5 stars`}>
      <div className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }, (_, index) => {
          const fill = Math.min(1, Math.max(0, rating - index));

          return (
            <span key={index} className="relative inline-flex h-4 w-4 text-white/20">
              <StarIcon />
              <span
                className="absolute inset-0 overflow-hidden text-[#E55614]"
                style={{ width: `${fill * 100}%` }}
              >
                <StarIcon />
              </span>
            </span>
          );
        })}
      </div>
      <span className="text-lg font-semibold tracking-tight text-[#b3b3b3]">{label}</span>
    </div>
  );
}

/** Clients & testimonials — logo grid + quote cards. */
export function HomeTestimonialsSection() {
  return (
    <section
      id="clients-testimonials"
      className={`scroll-mt-24 ${dt.section} ${dt.sectionBorder}`}
      aria-labelledby="clients-testimonials-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className={dt.badge}>Testimonials</p>
          <h2
            id="clients-testimonials-heading"
            className={`${dt.sectionHeadline} mt-5 text-white`}
          >
           What Our Clients Saying
          </h2>
         
        </header>

       

        <ul className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-3 lg:items-stretch lg:gap-5">
          {testimonials.map((item, index) => (
            <li key={item.name} className="h-full">
              <GlassCard delay={(index + 1) as 1 | 2 | 3} className="h-full">
                <blockquote className="flex h-full flex-col p-5 sm:p-6">
                  <TestimonialRating rating={item.rating} />
                  <p className={`mt-3 text-sm leading-relaxed ${dt.body}`}>&ldquo;{item.quote}&rdquo;</p>
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
      </div>
    </section>
  );
}
