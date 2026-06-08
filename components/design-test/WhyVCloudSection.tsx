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
    shell: "border-white/15 bg-[#1B224B]/72 ring-white/10",
    glow: "bg-sky-400/20",
    icon: "bg-sky-400/10 text-sky-300 ring-sky-400/25",
    link: "text-sky-300 group-hover:text-sky-200",
    dot: "bg-sky-400",
  },
  {
    shell: "border-white/15 bg-[#1B224B]/72 ring-violet-400/15",
    glow: "bg-violet-400/20",
    icon: "bg-violet-400/10 text-violet-300 ring-violet-400/25",
    link: "text-violet-300 group-hover:text-violet-200",
    dot: "bg-violet-400",
  },
  {
    shell: "border-white/15 bg-[#1B224B]/72 ring-cyan-400/15",
    glow: "bg-cyan-400/20",
    icon: "bg-cyan-400/10 text-cyan-300 ring-cyan-400/25",
    link: "text-cyan-300 group-hover:text-cyan-200",
    dot: "bg-cyan-400",
  },
  {
    shell: "border-white/15 bg-[#1B224B]/72 ring-amber-400/15",
    glow: "bg-amber-400/15",
    icon: "bg-amber-400/10 text-amber-200 ring-amber-400/20",
    link: "text-amber-200 group-hover:text-amber-100",
    dot: "bg-amber-400",
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
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`group/card relative flex h-full min-h-[320px] w-full flex-col overflow-hidden rounded-2xl border px-5 py-6 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.5)] ring-1 backdrop-blur-xl transition duration-300 group-hover:-translate-y-2 group-hover:border-white/25 group-hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.55)] sm:min-h-[340px] sm:px-6 sm:py-7 lg:w-[250px] xl:w-[270px] ${theme.shell}`}
    >
      {/* Soft accent glow */}
      <span
        className={`pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl transition-opacity duration-300 group-hover/card:opacity-100 ${theme.glow} opacity-60`}
        aria-hidden
      />

      {/* Card header row */}
      <div className="relative flex items-start justify-between gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 [&_svg]:h-5 [&_svg]:w-5 ${theme.icon}`}
        >
          <item.icon />
        </div>
        <span className="font-mono text-[11px] tabular-nums tracking-wider text-white/30">{number}</span>
      </div>

      <div className="relative mt-5 flex flex-1 flex-col">
        <span className={`inline-block h-px w-8 ${theme.dot} opacity-80`} aria-hidden />
        <h3 className="mt-3 text-[15px] font-semibold leading-snug tracking-tight text-white">{item.title}</h3>
        <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-white/60 sm:text-sm">{item.description}</p>
      </div>

      <Link
        href={item.href}
        className={`relative mt-5 inline-flex items-center gap-1.5 text-[12px] font-medium tracking-wide transition ${theme.link}`}
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
