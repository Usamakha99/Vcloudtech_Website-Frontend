import Link from "next/link";

import { dt } from "@/components/design-test/design-test-theme";
import "./services-grid-glass.css";
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
      className={`scroll-mt-24 ${
        glass ? dt.section : "py-14 sm:py-16 lg:py-20"
      } ${
        glass ? `bg-transparent ${dt.sectionBorder}` : "bg-white"
      } ${className}`}
      aria-labelledby="services-grid-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center lg:max-w-5xl">
          {pillLabel ? <p className={dt.badge}>{pillLabel}</p> : null}
          <h2
            id="services-grid-heading"
            className={`${pillLabel ? "mt-5" : ""} ${
              glass ? `${dt.sectionHeadline} text-white` : "text-2xl font-bold leading-snug tracking-tight text-[#1B224B] sm:text-3xl lg:text-4xl dark:text-white"
            }`}
          >
            {heading}
          </h2>
          {subheading ? (
            <p
              className={`mx-auto mt-3 px-1 text-xs font-medium leading-relaxed sm:px-0 sm:text-sm sm:whitespace-nowrap ${
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
              {glass ? (
                <Link
                  href={item.href}
                  className="service-flip-card service-flip-card--enhanced group/card w-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#b3b3b3]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#041329]"
                >
                  <div className="service-flip-inner">
                    <div className="service-flip-face service-flip-front">
                      <ServiceCardContent item={item} surface={surface} flipFront />
                    </div>
                    <div className="service-flip-face service-flip-back">
                      <div className="service-flip-back-content">
                        <div className="service-flip-back-icon service-flip-back-icon--enhanced">
                          <item.icon />
                        </div>
                        <h3 className={`text-lg font-semibold tracking-tight ${dt.heading}`}>
                          {item.title}
                        </h3>
                        <span className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${dt.link}`}>
                          Learn more
                          <span aria-hidden>→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className="service-card-snake group/card block w-full overflow-visible rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 focus-visible:ring-offset-2"
                >
                  <div className="relative flex w-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] transition-[transform,box-shadow,border-color] duration-200 ease-out group-hover/card:-translate-y-1.5 group-focus-within/card:-translate-y-1.5 hover:border-slate-200/60 hover:shadow-[0_14px_28px_-10px_rgba(56,189,248,0.18)] motion-reduce:transition-none motion-reduce:group-hover/card:translate-y-0 dark:border-slate-700 dark:bg-slate-900 dark:ring-slate-800 sm:p-7">
                    <ServiceCardSnakeBorder id={`svc-snake-${index}`} />
                    <div className="relative z-10">
                      <ServiceCardContent item={item} surface="light" />
                    </div>
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceCardContent({
  item,
  surface,
  flipFront = false,
}: {
  item: ServiceItem;
  surface: "light" | "glass";
  flipFront?: boolean;
}) {
  const glass = surface === "glass";

  if (flipFront && glass) {
    return (
      <div className="service-flip-front-content">
        <span className={`${dt.accentDash} service-flip-front-accent mx-auto`} aria-hidden />
        <h3 className={`mt-4 text-xl font-semibold leading-snug tracking-tight sm:text-2xl ${dt.heading}`}>
          {item.title}
        </h3>
        <p className={`service-flip-front-desc line-clamp-4 text-base leading-relaxed sm:text-[17px] ${dt.glassSubtext}`}>
          {item.description}
        </p>
      </div>
    );
  }

  return (
    <>
      {!glass ? (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-sky-100/80 text-sky-700 ring-1 ring-sky-200/60 [&_svg]:h-6 [&_svg]:w-6">
          <item.icon />
        </div>
      ) : null}
      <h3
        className={`${glass ? "" : "mt-5"} text-lg font-semibold tracking-tight ${
          glass
            ? dt.heading
            : "text-[#1B224B] group-hover/card:text-sky-300 group-focus-within/card:text-sky-300 dark:text-white"
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
      {surface === "light" ? (
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sky-700">
          Learn more
          <span aria-hidden className="transition-transform group-hover/card:translate-x-0.5 group-focus-within/card:translate-x-0.5">
            →
          </span>
        </span>
      ) : null}
    </>
  );
}

/** Thin snake segment tracing the outer card edge on hover (light surface only). */
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

