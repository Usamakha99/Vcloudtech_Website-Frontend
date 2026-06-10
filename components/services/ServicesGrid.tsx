import Link from "next/link";

import { dt } from "@/components/design-test/design-test-theme";
import {
  CartIcon,
  CloudIcon,
  ContractIcon,
  HeadsetIcon,
  ServerIcon,
  ShieldIcon,
  type SectionIcon,
} from "@/components/icons/section-icons";

export type ServiceItem = {
  title: string;
  description: string;
  href: string;
  icon: SectionIcon;
};

/** Wireframe service grid — Procurement · Licensing · Cloud · Security · IT Support · Hardware */
export const SERVICES_GRID_ITEMS: ServiceItem[] = [
  {
    title: "Procurement",
    description:
      "Streamlined IT sourcing with approvals, audit trails, and accountable vendor management.",
    href: "/procurement",
    icon: CartIcon,
  },
  {
    title: "Licensing",
    description:
      "Right-size software spend with expert licensing programs and contract oversight.",
    href: "/procurement",
    icon: ContractIcon,
  },
  {
    title: "Cloud",
    description:
      "Migration, modernization, and hybrid cloud operations built for enterprise governance.",
    href: "/solutions/cloud-infrastructure",
    icon: CloudIcon,
  },
  {
    title: "Security",
    description:
      "Zero-trust alignment, tooling integration, and continuous hardening for risk profiles.",
    href: "/solutions/cybersecurity",
    icon: ShieldIcon,
  },
  {
    title: "IT Support",
    description:
      "24/7 operations, escalation paths, and direct engineer access when systems matter most.",
    href: "/contact",
    icon: HeadsetIcon,
  },
  {
    title: "Hardware",
    description:
      "Enterprise hardware sourcing, lifecycle management, and deployment coordination.",
    href: "/services",
    icon: ServerIcon,
  },
];

type Props = {
  items?: ServiceItem[];
  /** Round pill label — e.g. "Services" (design-test glass sections) */
  badge?: string;
  heading?: string;
  subheading?: string;
  className?: string;
  surface?: "light" | "glass";
};

/** 3-column service cards with icon, copy, and hover lift. */
export function ServicesGrid({
  items = SERVICES_GRID_ITEMS,
  badge,
  heading = "Professional services",
  subheading = "Advisory, implementation, and managed operations for enterprise IT teams.",
  className = "",
  surface = "light",
}: Props) {
  const glass = surface === "glass";
  const pillLabel = badge ?? (glass ? "Services" : undefined);

  return (
    <section
      className={`scroll-mt-24 py-14 sm:py-16 lg:py-20 ${glass ? `bg-transparent ${dt.sectionBorder}` : "bg-white"} ${className}`}
      aria-labelledby="services-grid-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          {pillLabel ? <p className={dt.badge}>{pillLabel}</p> : null}
          <h2
            id="services-grid-heading"
            className={`${pillLabel ? "mt-5" : ""} text-2xl font-semibold leading-snug tracking-tight sm:text-3xl ${
              glass ? "text-white" : "text-[#1B224B] dark:text-white"
            }`}
          >
            {heading}
          </h2>
          {subheading ? (
            <p
              className={`mx-auto mt-3 max-w-lg text-sm leading-relaxed ${
                glass ? dt.headingSub : "text-slate-600 sm:text-base dark:text-slate-400"
              }`}
            >
              {subheading}
            </p>
          ) : null}
        </header>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {items.map((item, index) => (
            <li key={item.title} className="flex min-w-0">
              <Link
                href={item.href}
                className="service-card-snake group/card block w-full overflow-visible rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-orange-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <div
                  className={`relative flex w-full flex-col rounded-2xl p-6 transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out group-hover/card:-translate-y-1.5 group-focus-within/card:-translate-y-1.5 motion-reduce:transition-none motion-reduce:group-hover/card:translate-y-0 sm:p-7 ${
                    glass
                      ? dt.glassCard
                      : "border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.03] hover:border-slate-200/60 hover:shadow-[0_14px_28px_-10px_rgba(56,189,248,0.18)] dark:border-slate-700 dark:bg-slate-900 dark:ring-slate-800"
                  }`}
                >
                {glass ? <ServiceCardSnakeBorder id={`svc-snake-${index}`} /> : null}
                <div className="relative z-10 flex flex-col">
                <div
                  className={
                    glass
                      ? dt.iconBoxCard
                      : "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-sky-100/80 text-sky-700 ring-1 ring-sky-200/60 [&_svg]:h-6 [&_svg]:w-6"
                  }
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
                </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Thin snake segment tracing the outer card edge on hover. */
function ServiceCardSnakeBorder({ id }: { id: string }) {
  return (
    <svg
      className="service-snake-border pointer-events-none absolute -inset-px z-20 h-[calc(100%+2px)] w-[calc(100%+2px)] overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-stroke`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fdba74" />
        </linearGradient>
      </defs>
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
      />
    </svg>
  );
}

