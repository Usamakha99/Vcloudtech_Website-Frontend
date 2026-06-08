import Link from "next/link";
import type { ReactNode } from "react";

type Strength = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon: () => ReactNode;
};

const cardThemes = [
  {
    shell:
      "border-sky-400/35 bg-gradient-to-br from-[#1B224B]/95 via-[#1B224B]/90 to-sky-800/75",
    bar: "bg-sky-400",
    link: "text-sky-200 hover:text-white",
  },
  {
    shell:
      "border-violet-400/30 bg-gradient-to-br from-[#312e81]/90 via-[#1B224B]/88 to-cyan-700/70",
    bar: "bg-violet-400",
    link: "text-violet-200 hover:text-white",
  },
  {
    shell:
      "border-cyan-400/30 bg-gradient-to-br from-[#0c4a6e]/92 via-[#1B224B]/88 to-[#7c3aed]/55",
    bar: "bg-cyan-400",
    link: "text-cyan-200 hover:text-white",
  },
  {
    shell:
      "border-amber-400/25 bg-gradient-to-br from-[#141a38]/95 via-[#1B224B]/90 to-[#ea580c]/45",
    bar: "bg-amber-400",
    link: "text-amber-100 hover:text-white",
  },
] as const;

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
export function WhyVCloudSection() {
  return (
    <section
      id="why"
      className="relative z-20 scroll-mt-14 -mt-28 pb-16 pt-4 sm:-mt-36 sm:pb-20 lg:-mt-44"
      aria-labelledby="why-vcloud-heading"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="inline-block bg-[#e31837] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white sm:text-[11px]">
            Why vCloud Tech?
          </p>
          <h2
            id="why-vcloud-heading"
            className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl lg:text-[2rem] lg:leading-tight"
          >
            Our success starts with a combination of our strengths and culture
          </h2>
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
  const theme = cardThemes[index] ?? cardThemes[0];

  return (
    <article
      className={`relative flex h-full min-h-[340px] w-full flex-col overflow-hidden rounded-2xl border px-6 py-7 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-200 group-hover:-translate-y-2 group-hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.55)] sm:min-h-[360px] sm:px-7 sm:py-8 lg:w-[250px] xl:w-[270px] ${theme.shell}`}
    >
      <span className={`absolute inset-x-0 top-0 h-1 ${theme.bar}`} aria-hidden />
      <h3 className="text-base font-semibold text-white">{item.title}</h3>
      <p className="mt-3 flex-1 text-[13px] leading-relaxed text-sky-100/80 sm:text-sm">
        {item.description}
      </p>
      <div className="my-5 flex justify-center text-[#ff4d6d] [&_svg]:h-14 [&_svg]:w-14 sm:[&_svg]:h-16 sm:[&_svg]:w-16">
        <item.icon />
      </div>
      <Link
        href={item.href}
        className={`text-[13px] font-semibold underline-offset-4 transition hover:underline ${theme.link}`}
      >
        {item.linkLabel}
      </Link>
    </article>
  );
}

function SolutionsIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="14" y="18" width="36" height="26" rx="2" />
      <path d="M22 44h20M32 44v6" strokeLinecap="round" />
      <path d="M24 26h16M24 32h10" strokeLinecap="round" />
      <circle cx="48" cy="14" r="6" />
      <path d="M46 14h4M48 12v4" strokeLinecap="round" />
    </svg>
  );
}

function ContractIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M18 12h28l8 8v32H18V12z" strokeLinejoin="round" />
      <path d="M46 12v8h8" strokeLinejoin="round" />
      <circle cx="32" cy="36" r="8" />
      <path d="M29 36l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProcurementIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 42c8-4 14-4 20 0s14 4 20 0" strokeLinecap="round" />
      <circle cx="26" cy="28" r="6" />
      <circle cx="38" cy="28" r="6" />
      <circle cx="32" cy="22" r="6" />
      <path d="M29 28h6M32 25v6" strokeLinecap="round" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M20 38c0-6 4-10 12-10s12 4 12 10" strokeLinecap="round" />
      <circle cx="32" cy="22" r="6" />
      <path d="M14 38h36" strokeLinecap="round" />
      <path d="M32 14l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 1 4-2z" strokeLinejoin="round" />
    </svg>
  );
}
