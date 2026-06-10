import Link from "next/link";
import type { ReactNode } from "react";

import { dt } from "@/components/design-test/design-test-theme";

export type ServiceItem = {
  title: string;
  description: string;
  href: string;
  icon: () => ReactNode;
};

export const SERVICES_GRID_ITEMS: ServiceItem[] = [
  {
    title: "Cloud migration",
    description:
      "Assessment, landing zones, and workload moves with governance and rollback plans built in.",
    href: "/solutions/cloud-infrastructure",
    icon: CloudIcon,
  },
  {
    title: "Managed infrastructure",
    description:
      "Always-on monitoring, patching, and incident response for hybrid and multi-cloud estates.",
    href: "/services",
    icon: ServerIcon,
  },
  {
    title: "Cybersecurity operations",
    description:
      "Zero trust alignment, tooling integration, and continuous hardening for enterprise risk profiles.",
    href: "/solutions/cybersecurity",
    icon: ShieldIcon,
  },
  {
    title: "Solutions architecture",
    description:
      "Design reviews, reference architectures, and roadmap planning from senior practitioners.",
    href: "/contact",
    icon: CompassIcon,
  },
  {
    title: "Procurement & licensing",
    description:
      "Streamlined sourcing for hardware, software, and cloud with approvals and audit trails.",
    href: "/procurement",
    icon: CartIcon,
  },
  {
    title: "24/7 operations support",
    description:
      "Escalation paths, SLAs, and direct access to engineers when production systems need attention.",
    href: "/contact",
    icon: HeadsetIcon,
  },
];

type Props = {
  items?: ServiceItem[];
  heading?: string;
  subheading?: string;
  className?: string;
  surface?: "light" | "glass";
};

/** 3-column service cards with icon, copy, and hover lift. */
export function ServicesGrid({
  items = SERVICES_GRID_ITEMS,
  heading = "Professional services",
  subheading = "Advisory, implementation, and managed operations for enterprise IT teams.",
  className = "",
  surface = "light",
}: Props) {
  const glass = surface === "glass";

  return (
    <section
      className={`scroll-mt-24 py-14 sm:py-16 lg:py-20 ${glass ? `bg-transparent ${dt.sectionBorder}` : "bg-white"} ${className}`}
      aria-labelledby="services-grid-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="services-grid-heading"
            className={`text-2xl font-semibold tracking-tight sm:text-3xl ${
              glass ? "text-white" : "text-[#1B224B] dark:text-white"
            }`}
          >
            {heading}
          </h2>
          {subheading ? (
            <p
              className={`mt-3 text-sm leading-relaxed sm:text-base ${
                glass ? dt.glassSubtext : "text-slate-600 dark:text-slate-400"
              }`}
            >
              {subheading}
            </p>
          ) : null}
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {items.map((item, index) => (
            <li key={item.title} className="flex min-w-0">
              <div className="service-card-edges group/card w-full rounded-2xl">
                <ServiceCardSnakeBorder id={`svc-snake-${index}`} />
                <Link
                  href={item.href}
                  className={`relative flex w-full flex-col rounded-2xl border p-6 transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out group-hover/card:-translate-y-1.5 group-focus-within/card:-translate-y-1.5 motion-reduce:transition-none motion-reduce:group-hover/card:translate-y-0 sm:p-7 ${
                    glass
                      ? `border ${dt.glassCard}`
                      : "border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.03] group-hover/card:border-slate-200/60 group-hover/card:shadow-[0_14px_28px_-10px_rgba(56,189,248,0.18)] dark:border-slate-700 dark:bg-slate-900 dark:ring-slate-800"
                  }`}
                >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl [&_svg]:h-6 [&_svg]:w-6 ${
                    glass
                      ? `${dt.iconBoxSm} [&_svg]:h-6 [&_svg]:w-6`
                      : "bg-gradient-to-br from-sky-50 to-sky-100/80 text-sky-700 ring-1 ring-sky-200/60"
                  }`}
                >
                  <item.icon />
                </div>
                <h3
                  className={`mt-5 text-lg font-semibold tracking-tight ${
                    glass ? `text-white ${dt.glassLink}` : "text-[#1B224B] group-hover/card:text-sky-300 group-focus-within/card:text-sky-300 dark:text-white"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-2 flex-1 text-sm leading-relaxed ${
                    glass ? dt.glassSubtext : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {item.description}
                </p>
                <span
                  className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold ${
                    glass ? dt.glassLink : "text-sky-700"
                  }`}
                >
                  Learn more
                  <span aria-hidden className="transition-transform group-hover/card:translate-x-0.5 group-focus-within/card:translate-x-0.5">
                    →
                  </span>
                </span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Slow glowing segment that crawls around the card border on hover. */
function ServiceCardSnakeBorder({ id }: { id: string }) {
  return (
    <svg
      className="service-snake-border pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible rounded-2xl"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-stroke`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.35" />
          <stop offset="35%" stopColor="#f97316" />
          <stop offset="70%" stopColor="#fdba74" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect
        className="service-snake-track"
        x="1.4"
        y="1.4"
        width="97.2"
        height="97.2"
        rx="9"
        ry="9"
        pathLength="100"
      />
      <rect
        className="service-snake-path"
        x="1.4"
        y="1.4"
        width="97.2"
        height="97.2"
        rx="9"
        ry="9"
        pathLength="100"
        stroke={`url(#${id}-stroke)`}
        filter={`url(#${id}-glow)`}
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M12 3l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" strokeLinejoin="round" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M7 18a4 4 0 01-1-7.87 5 5 0 019.9-1A3.5 3.5 0 0117 18H7z" strokeLinejoin="round" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="4" y="4" width="16" height="6" rx="1.5" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" />
      <circle cx="8" cy="7" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="8" cy="17" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9.5L10 14l-2.5-2.5L12 10l2.5-0.5z" strokeLinejoin="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M6 6h15l-2 9H8L6 6zm0 0L5 3H3M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" strokeLinejoin="round" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M4 14v-2a8 8 0 0116 0v2" strokeLinecap="round" />
      <path d="M4 14a2 2 0 002 2h1v-3H4zm16 0a2 2 0 01-2 2h-1v-3h3z" strokeLinejoin="round" />
      <path d="M10 19h4" strokeLinecap="round" />
    </svg>
  );
}
