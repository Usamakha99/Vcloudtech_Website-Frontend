import Image from "next/image";
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

const servicesImagesBase = "/Services%20Images%20Resize";

function serviceImagePath(filename: string) {
  return `${servicesImagesBase}/${encodeURIComponent(filename)}`;
}

/** Resized service artwork — `public/Services Images Resize/` (1–6). */
const serviceImages = {
  procurement: serviceImagePath("4.png"),
  licensing: serviceImagePath("3.png"),
  cloud: serviceImagePath("2.png"),
  security: serviceImagePath("5.png"),
  itSupport: serviceImagePath("6.png"),
  hardware: serviceImagePath("1.png"),
} as const;

export type ServiceItem = {
  title: string;
  description: string;
  href: string;
  icon: SectionIcon;
  image?: string;
  bullets?: readonly string[];
};

/** Enterprise service cards — copy aligned with marketing layout. */
export const SERVICES_GRID_ITEMS: ServiceItem[] = [
  {
    title: "IT Hardware & Procurement",
    description:
      "As an authorized reseller for 200+ leading brands, we source and deploy hardware. Public sector buyers leverage our GSA Schedule, Sourcewell, and SEWP V contracts to reduce procurement timelines.",
    href: "/procurement",
    icon: CartIcon,
    image: serviceImages.procurement,
    bullets: [
      "Authorized reseller for 200+ leading brands",
      "GSA, Sourcewell, and SEWP V contracts",
      "Hardware staging, configuration, and lifecycle management",
    ],
  },
  {
    title: "IT Strategy & Virtual CIO",
    description:
      "Our Virtual CIO service provides senior-level IT leadership building a technology roadmap, optimizing IT spending, and aligning strategy with business goals.",
    href: "/procurement",
    icon: ContractIcon,
    image: serviceImages.licensing,
    bullets: [
      "Multi-year IT roadmap tied to strategic plan",
      "Budget planning and IT spend optimization",
      "Vendor selection and contract negotiation",
      "Executive-level technology advisory and AI adoption strategy",
    ],
  },
  {
    title: "Cloud Solutions",
    description:
      "We design the right cloud architecture with cost controls and compliance. From readiness assessment to migration and ongoing management, we ensure performance long after go-live.",
    href: "/solutions/cloud-infrastructure",
    icon: CloudIcon,
    image: serviceImages.cloud,
    bullets: [
      "Cloud readiness assessment and architecture design",
      "Migration to AWS, Azure, Google Cloud, or hybrid",
      "FedRAMP authorized deployments",
      "Cloud cost optimization and ongoing management",
    ],
  },
  {
    title: "Cyber Security & SOC",
    description:
      "Active, ongoing protection from our Security Operations Center. We combine AI-assisted threat detection with human analysts to contain threats before they cause damage.",
    href: "/solutions/cybersecurity",
    icon: ShieldIcon,
    image: serviceImages.security,
    bullets: [
      "AI-powered threat detection across all environments",
      "Zero-trust architecture design",
      "Compliance support for major frameworks",
    ],
  },
  {
    title: "Managed IT Services",
    description:
      "We take complete ownership of your IT environment monitoring, maintaining, patching, supporting, and optimizing every system around the clock.",
    href: "/contact",
    icon: HeadsetIcon,
    image: serviceImages.itSupport,
    bullets: [
      "24/7 monitoring and proactive maintenance",
      "Help desk support with defined SLAs",
      "Patch management and lifecycle oversight",
      "Vendor coordination and monthly performance reporting",
    ],
  },
  {
    title: "AI & Intelligent Automation",
    description:
      "We deploy AI across your IT operations to automate routine work, accelerate response times, and predict problems before they become incidents.",
    href: "/services",
    icon: ServerIcon,
    image: serviceImages.hardware,
    bullets: [
      "AI that makes your IT smarter and your team more productive",
      "Intelligent threat detection and compliance automation",
      "AI readiness assessment reveals ROI opportunities",
    ],
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

/** Service cards grid — glass surface uses flip cards (image front, text back); light uses classic layout. */
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

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {items.map((item, index) => (
            <li key={item.title} className="flex min-w-0">
              {glass ? (
                <Link
                  href={item.href}
                  className="service-flip-card service-flip-card--enhanced group/card w-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#b3b3b3]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#041329]"
                >
                  <div className="service-flip-inner">
                    <div
                      className="service-flip-face service-flip-front absolute inset-0 h-full w-full overflow-hidden rounded-2xl"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <ServiceCardFront item={item} />
                    </div>
                    <div className="service-flip-face service-flip-back">
                      <ServiceGlassCardBack item={item} />
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

        {glass ? (
          <div className="services-grid-footer">
            <Link href="/services" className="services-grid-cta">
              View More services
              <span className="services-grid-cta__arrow" aria-hidden>
                →
              </span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ServiceCardFront({ item }: { item: ServiceItem }) {
  if (!item.image) return null;

  return (
    <div className="absolute inset-0">
      <div className="relative h-full w-full">
        <div className="service-flip-front-image-wrap">
          <Image
            src={item.image}
            alt={`${item.title} service`}
            fill
            className="service-flip-front-image"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <h3 className="service-flip-front-title absolute bottom-3 left-3 z-10 text-base font-bold sm:bottom-4 sm:left-4 sm:text-lg">
          {item.title}
        </h3>
        <span
          className="absolute bottom-2 left-3 z-10 h-0.5 w-8 bg-[#b3b3b3] sm:bottom-3 sm:left-4 sm:w-10"
          aria-hidden
        />
      </div>
    </div>
  );
}

function ServiceGlassCardBack({ item }: { item: ServiceItem }) {
  return (
    <div className="service-flip-back-content service-flip-back-content--detail">
      <div className="service-flip-back-scroll">
        <h3 className="service-content-card__title">{item.title}</h3>
        <p className="service-content-card__desc">{item.description}</p>
        {item.bullets && item.bullets.length > 0 ? (
          <ul className="service-content-card__list">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="service-content-card__list-item">
                <CheckIcon />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="service-content-card__cta-wrap">
        <span className="service-content-card__cta">Learn More</span>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="service-content-card__check" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ServiceCardContent({
  item,
  surface,
}: {
  item: ServiceItem;
  surface: "light" | "glass";
}) {
  const glass = surface === "glass";

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
