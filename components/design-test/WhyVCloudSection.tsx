import Link from "next/link";
import type { ReactNode } from "react";

import { dt } from "@/components/design-test/design-test-theme";

type Strength = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon: () => ReactNode;
};

const stackZ = ["z-10", "z-20", "z-30", "z-40"] as const;

const strengths: Strength[] = [
  {
    title: "Solutions & Services",
    description:
      "A world-class portfolio of IT products, services, and cloud solutions tailored to your business challenges.",
    href: "/solutions",
    linkLabel: "Learn More About Solutions",
    icon: SolutionsIcon,
  },
  {
    title: "Licensing & Contract",
    description:
      "Licensing experts available to help you avoid compliance issues, right-size software spending with the right licensing programs, and contracts.",
    href: "/procurement",
    linkLabel: "Read Our Contracts",
    icon: ContractIcon,
  },
  {
    title: "Simplify IT Buying",
    description:
      "Our global procurement best practices help our customers simplify IT procurement, consolidate, and lower cost.",
    href: "/contact",
    linkLabel: "Meet Customer Support",
    icon: ProcurementIcon,
  },
  {
    title: "Winning Team",
    description:
      "Highly motivated and empowered people are the foundation of our winning culture.",
    href: "/about",
    linkLabel: "Why vCloud Tech?",
    icon: TeamIcon,
  },
];

/** Why vCloud Tech — 4 overlapping cards on the ingredient gradient, pulled up over the hero. */
export function WhyVCloudSection({
  reducedHeroOverlap = false,
}: {
  /** Use when a strip (e.g. social proof) sits between hero and this section. */
  reducedHeroOverlap?: boolean;
}) {
  const overlapClass = reducedHeroOverlap
    ? "mt-6 sm:mt-8 lg:mt-10"
    : "-mt-28 sm:-mt-36 lg:-mt-44";

  return (
    <section
      id="why"
      className={`relative z-20 scroll-mt-14 pb-16 pt-4 sm:pb-20 ${overlapClass}`}
      aria-labelledby="why-vcloud-heading"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className={dt.badge}>Why vCloud Tech?</p>
          <h2
            id="why-vcloud-heading"
            className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl lg:text-[2rem] lg:leading-tight"
          >
            Our success starts with a combination of our strengths and culture
          </h2>
          <p className={`mx-auto mt-3 max-w-xl text-sm leading-relaxed ${dt.headingSub}`}>
            Four pillars that define how we deliver for enterprise teams.
          </p>
        </header>

        <div className="mt-10 sm:mt-12">
          {/* Desktop: overlapping card fan */}
          <ul className="hidden justify-center overflow-visible lg:flex">
            {strengths.map((item, index) => (
              <li
                key={item.title}
                className={`group relative shrink-0 transition-transform duration-200 hover:z-50 focus-within:z-50 ${stackZ[index] ?? stackZ[0]} ${index === 0 ? "ml-0" : "-ml-14 xl:-ml-16"}`}
              >
                <StrengthCard item={item} index={index} />
              </li>
            ))}
          </ul>

          {/* Mobile / tablet: horizontal scroll with overlap */}
          <ul className="flex gap-0 overflow-x-auto overflow-y-visible pb-4 pl-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
            {strengths.map((item, index) => (
              <li
                key={item.title}
                className={`group relative w-[min(82vw,280px)] shrink-0 transition-transform duration-200 hover:z-50 focus-within:z-50 sm:w-[300px] ${stackZ[index] ?? stackZ[0]} ${index === 0 ? "ml-0" : "-ml-8"}`}
              >
                <StrengthCard item={item} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function StrengthCard({ item, index }: { item: Strength; index: number }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`group/card relative flex h-full min-h-[300px] w-full flex-col overflow-hidden px-5 py-6 group-hover:-translate-y-2 sm:min-h-[320px] sm:px-6 sm:py-7 lg:w-[250px] xl:w-[270px] ${dt.card} ${dt.cardHover}`}
    >
      <span className={dt.cardTopLine} aria-hidden />

      <div className="relative flex items-start justify-between gap-3">
        <div className={`${dt.iconBox} [&_svg]:h-5 [&_svg]:w-5`}>
          <item.icon />
        </div>
        <span className={dt.number}>{number}</span>
      </div>

      <div className="relative mt-5 flex flex-1 flex-col">
        <span className={dt.accentDash} aria-hidden />
        <h3 className="mt-3 text-[15px] font-semibold leading-snug tracking-tight text-white">{item.title}</h3>
        <p className={`mt-2.5 flex-1 text-[13px] leading-relaxed sm:text-sm ${dt.body}`}>{item.description}</p>
      </div>

      <Link
        href={item.href}
        className={`relative mt-5 inline-flex items-center gap-1.5 ${dt.linkSm}`}
      >
        {item.linkLabel}
        <ArrowIcon />
      </Link>
    </article>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 transition-transform group-hover/card:translate-x-0.5" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SolutionsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="4" y="6" width="14" height="10" rx="1.5" />
      <path d="M8 16h6M11 16v2" strokeLinecap="round" />
      <path d="M7 10h8M7 13h5" strokeLinecap="round" />
    </svg>
  );
}

function ContractIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M7 4h8l4 4v12H7V4z" strokeLinejoin="round" />
      <path d="M15 4v4h4" strokeLinejoin="round" />
      <circle cx="12" cy="14" r="3" />
      <path d="M10.5 14l1 1 2-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProcurementIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="9" cy="10" r="2.5" />
      <circle cx="15" cy="10" r="2.5" />
      <circle cx="12" cy="7" r="2.5" />
      <path d="M4 17c3-1.5 5.5-1.5 8 0s5 1.5 8 0" strokeLinecap="round" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="8" r="3" />
      <path d="M6 18c0-3 2.5-5 6-5s6 2 6 5" strokeLinecap="round" />
      <path d="M12 5l1 2 2 .5-1.5 1.5.5 2L12 10l-2 1 .5-2L9 7.5 11 7z" strokeLinejoin="round" />
    </svg>
  );
}
