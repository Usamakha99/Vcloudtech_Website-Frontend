import Link from "next/link";
import { dt } from "@/components/design-test/design-test-theme";
import type { ReactNode } from "react";

import {
  CartIcon,
  ContractIcon,
  SolutionsIcon,
  TeamIcon,
  type SectionIcon,
} from "@/components/icons/section-icons";

import "./why-vcloud-cards.css";

type Strength = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon: SectionIcon;
};

const stackZ = ["z-10", "z-20", "z-30", "z-40"] as const;

const strengths: Strength[] = [
  {
    title: "Solutions & Services",
    description:
      "IT products, services, and cloud solutions tailored to your business challenges.",
    href: "/solutions",
    linkLabel: "Explore solutions",
    icon: SolutionsIcon,
  },
  {
    title: "Licensing & Contract",
    description:
      "Right-size software spending with expert licensing programs and vendor contracts.",
    href: "/procurement",
    linkLabel: "View contracts",
    icon: ContractIcon,
  },
  {
    title: "Simplify IT Buying",
    description:
      "Procurement best practices that simplify buying, consolidate spend, and lower cost.",
    href: "/contact",
    linkLabel: "Talk to support",
    icon: CartIcon,
  },
  {
    title: "Winning Team",
    description:
      "Motivated, empowered people — the foundation of our winning culture.",
    href: "/about",
    linkLabel: "Meet the team",
    icon: TeamIcon,
  },
];

/** Why vCloud Tech — overlapping transparent cards with soft animated gradient. */
export function WhyVCloudSection({
  reducedHeroOverlap = false,
}: {
  reducedHeroOverlap?: boolean;
}) {
  const overlapClass = reducedHeroOverlap
    ? "mt-4 sm:mt-6"
    : "-mt-28 sm:-mt-36 lg:-mt-44";

  return (
    <section
      id="why"
      className={`relative z-20 bg-transparent scroll-mt-14 pb-8 pt-4 sm:pb-10 ${overlapClass}`}
      aria-labelledby="why-vcloud-heading"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className={dt.badge}>Why vCloud Tech?</p>
          <h2 id="why-vcloud-heading" className={dt.headingLg}>
            Our success starts with a combination of our strengths and culture
          </h2>
          <p className={`mx-auto mt-3 max-w-xl text-sm leading-relaxed ${dt.headingSub}`}>
            Four pillars that define how we deliver for enterprise teams.
          </p>
        </header>

        <div className="mt-12 sm:mt-14">
          <ul className="hidden justify-center overflow-visible lg:flex">
            {strengths.map((item, index) => (
              <li
                key={item.title}
                className={`group relative shrink-0 transition-transform duration-300 hover:z-50 focus-within:z-50 ${stackZ[index] ?? stackZ[0]} ${index === 0 ? "ml-0" : "-ml-16 xl:-ml-[4.5rem]"}`}
              >
                <StrengthCard item={item} index={index} />
              </li>
            ))}
          </ul>

          <ul className="flex snap-x snap-mandatory gap-0 overflow-x-auto overflow-y-visible pb-6 pl-4 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:pl-6 sm:pr-6 lg:hidden [&::-webkit-scrollbar]:hidden">
            {strengths.map((item, index) => (
              <li
                key={item.title}
                className={`group relative w-[min(85vw,320px)] shrink-0 snap-center transition-transform duration-300 hover:z-50 focus-within:z-50 sm:w-[340px] ${stackZ[index] ?? stackZ[0]} ${index === 0 ? "ml-0" : "-ml-8 sm:-ml-10"}`}
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
  const titleWords = item.title.split(" ");

  return (
    <article
      className={`group/card relative flex h-full min-h-[22rem] w-full flex-col sm:min-h-[23rem] lg:w-[17.5rem] xl:w-[19.5rem] ${dt.whyCard} ${dt.whyCardHover}`}
    >
      <span className="why-card-gradient" aria-hidden />

      <div className="why-card-inner flex flex-col px-7 py-8 sm:px-8 sm:py-9">
        <div className="relative flex items-start justify-between gap-4">
          <div className={dt.iconBoxCard}>
            <item.icon />
          </div>
          <span className={dt.number}>{number}</span>
        </div>

        <div className="relative mt-8 flex flex-1 flex-col">
          <h3 className="flex flex-wrap gap-x-[0.3em] text-lg font-semibold leading-[1.35] tracking-tight sm:text-xl">
            {titleWords.map((word, wordIndex) => (
              <RollingText
                key={`${word}-${wordIndex}`}
                slotHeight="1.35em"
                staggerMs={wordIndex * 28}
                top={<span className={dt.heading}>{word}</span>}
                bottom={<span className={dt.headingSub}>{word}</span>}
              />
            ))}
          </h3>

          <p className={`mt-4 flex-1 text-sm leading-[1.7] sm:text-[15px] ${dt.body}`}>
            {item.description}
          </p>
        </div>

        <Link
          href={item.href}
          className={`relative mt-8 inline-flex items-center gap-2 text-[13px] font-medium ${dt.link}`}
        >
          {item.linkLabel}
          <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}

type RollingTextProps = {
  top: ReactNode;
  bottom: ReactNode;
  slotHeight: string;
  className?: string;
  staggerMs?: number;
};

/** Vertical text roll — top line slides up to reveal bottom line on card hover. */
function RollingText({ top, bottom, slotHeight, className = "", staggerMs = 0 }: RollingTextProps) {
  return (
    <span className={`inline-block overflow-hidden align-top ${className}`} style={{ height: slotHeight }}>
      <span
        className="block transition-transform duration-[0.32s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/card:-translate-y-1/2 group-focus-within/card:-translate-y-1/2 motion-reduce:transform-none"
        style={{ transitionDelay: `${staggerMs}ms` }}
      >
        <span className="block" style={{ minHeight: slotHeight }}>
          {top}
        </span>
        <span className="block" style={{ minHeight: slotHeight }}>
          {bottom}
        </span>
      </span>
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="h-3.5 w-3.5 transition-transform duration-300 group-hover/card:translate-x-1"
      aria-hidden
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
