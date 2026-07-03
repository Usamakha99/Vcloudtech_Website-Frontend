import Image from "next/image";
import Link from "next/link";

import { dt } from "@/components/marketing/design-test-theme";
import { publicAssets } from "@/lib/public-assets";
import "./services-grid-glass.css";
import {
  CartIcon,
  CloudIcon,
  ContractIcon,
  ServerIcon,
  ShieldIcon,
  type SectionIcon,
} from "@/components/icons/section-icons";

const serviceImages = {
  aiProcurement: publicAssets.services.aiProcurement,
  dataCenterHardware: publicAssets.services.dataCenterHardware,
  networking: publicAssets.services.networking,
  cybersecurity: publicAssets.services.cybersecurity,
  powerInfrastructure: publicAssets.services.powerInfrastructure,
  lifecycleManagement: publicAssets.services.lifecycleManagement,
} as const;

const DEFAULT_SERVICE_IMAGE_POSITION = "6% 18%";

export type ServiceItem = {
  title: string;
  description: string;
  href: string;
  icon: SectionIcon;
  image?: string;
  imagePosition?: string;
  bullets?: readonly string[];
};

/** Enterprise service cards — copy aligned with marketing layout. */
export const SERVICES_GRID_ITEMS: ServiceItem[] = [
  {
    title: "AI Infrastructure Procurement",
    description:
      "Source the compute power your AI workloads demand: GPUs, accelerators, and high-performance AI servers procured at scale.",
    href: "/solutions/ai-infrastructure-procurement",
    icon: ServerIcon,
    image: serviceImages.aiProcurement,
    imagePosition: "6% 16%",
    bullets: [
      "AI servers, GPUs and accelerator procurement",
      "Global sourcing from leading technology partners",
      "Cost-effective supply chain management",
      "Scalable AI infrastructure planning",
    ],
  },
  {
    title: "Data Center Hardware",
    description:
      "Enterprise-grade compute, storage, and rack infrastructure built for reliability and long-term scalability in mission-critical environments.",
    href: "/solutions/data-center-hardware",
    icon: ServerIcon,
    image: serviceImages.dataCenterHardware,
    imagePosition: "5% 18%",
    bullets: [
      "Enterprise servers and storage solutions",
      "High-performance computing infrastructure",
      "Rack, cabinet and hardware integration",
      "Installation, staging and deployment",
    ],
  },
  {
    title: "Networking",
    description:
      "Build a secure, high-throughput network that supports modern digital transformation — from the edge to the core.",
    href: "/solutions/data-center-networking",
    icon: CloudIcon,
    image: serviceImages.networking,
    imagePosition: "4% 12%",
    bullets: [
      "Enterprise switching, routing and wireless",
      "SD-WAN and next-generation architecture",
      "Network security and performance optimization",
      "Infrastructure monitoring and lifecycle support",
    ],
  },
  {
    title: "Cybersecurity",
    description:
      "Protect critical infrastructure and sensitive data with proactive security strategies that evolve with the threat landscape.",
    href: "/solutions/cybersecurity",
    icon: ShieldIcon,
    image: serviceImages.cybersecurity,
    imagePosition: "8% 14%",
    bullets: [
      "Advanced threat detection and response",
      "Endpoint, network and cloud security",
      "Identity and access management (IAM)",
      "Compliance, governance and risk management",
    ],
  },
  {
    title: "Power Infrastructure",
    description:
      "Resilient power and precision cooling systems that ensure maximum uptime in the most demanding data center environments.",
    href: "/solutions/power-infrastructure",
    icon: CartIcon,
    image: serviceImages.powerInfrastructure,
    imagePosition: "5% 14%",
    bullets: [
      "UPS, backup power and distribution systems",
      "Intelligent rack power management",
      "Precision cooling and environmental monitoring",
      "Resilient infrastructure for continuous availability",
    ],
  },
  {
    title: "Lifecycle Management",
    description:
      "Maximize ROI on your technology investments from initial procurement through secure decommissioning and asset disposal.",
    href: "/solutions/lifecycle-management",
    icon: ContractIcon,
    image: serviceImages.lifecycleManagement,
    imagePosition: "8% 18%",
    bullets: [
      "Asset procurement, deployment and tracking",
      "Proactive maintenance and technical support",
      "Technology refresh and upgrade planning",
      "Secure decommissioning and IT asset disposal",
    ],
  },
];

type Props = {
  items?: ServiceItem[];
  /** Round pill label — e.g. "Services" (design-test glass sections) */
  badge?: string;
  heading?: string;
  subheading?: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
  surface?: "light" | "glass";
};

/** Service cards grid — glass surface uses flip cards (image front, text back); light uses classic layout. */
export function ServicesGrid({
  items = SERVICES_GRID_ITEMS,
  badge,
  heading = "Professional Services",
  subheading = "Advisory, implementation, and managed operations for enterprise IT teams.",
  ctaHref = "/services",
  ctaLabel = "View More services",
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
              className={`mx-auto mt-3 max-w-3xl px-1 text-xs font-medium leading-relaxed sm:px-0 sm:text-sm ${
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
            <Link href={ctaHref} className="services-grid-cta">
              {ctaLabel}
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
            style={{
              objectPosition: item.imagePosition ?? DEFAULT_SERVICE_IMAGE_POSITION,
            }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="service-flip-front-copy">
          <h3 className="service-flip-front-title">{item.title}</h3>
          <span className="service-flip-front-accent" aria-hidden />
        </div>
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
