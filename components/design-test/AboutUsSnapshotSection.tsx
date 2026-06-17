import Image from "next/image";
import Link from "next/link";
import { dt } from "@/components/design-test/design-test-theme";
import type { ReactNode } from "react";

import { OrgMetricsRail } from "@/components/design-test/OrgMetricsRail";
import { DesignTestCredentialsStrip } from "@/components/design-test/DesignTestCredentialsStrip";
import {
  EducationIcon,
  GovernmentIcon,
  HealthcareIcon,
  PublicSectorIcon,
  ServerIcon,
  type SectionIcon,
} from "@/components/icons/section-icons";

import "./about-us-section.css";

const sectors: {
  name: string;
  detail: string;
  icon: SectionIcon;
}[] = [
  {
    name: "Government",
    detail: "Federal, state, and local agencies with compliant procurement and secure deployment.",
    icon: GovernmentIcon,
  },
  {
    name: "Education",
    detail: "K-12 districts and higher education with budget-smart licensing and campus rollouts.",
    icon: EducationIcon,
  },
  {
    name: "Healthcare",
    detail: "Hospital systems and care networks with HIPAA-aware sourcing and clinical uptime.",
    icon: HealthcareIcon,
  },
  {
    name: "Enterprise",
    detail: "Mid-market to global organizations with consolidated spend and managed operations.",
    icon: ServerIcon,
  },
  {
    name: "Public sector",
    detail: "Municipal and civic institutions with accountable IT outcomes stakeholders can trust.",
    icon: PublicSectorIcon,
  },
];

const industriesWeServeImageBase = "/Industries We Serve Final";

const industryImageSectors = [
  {
    name: "Government",
    headline: "Mission-Critical Infrastructure for Mission-Critical Work",
    detail:
      "Federal agencies and defense contractors operate with zero margin for error. Backed by an ISO 9001:2015–certified delivery process and active federal contract vehicles, we provide CMMC, FedRAMP, and NIST 800-53 aligned infrastructure, procurement, and modernization support — with the responsiveness of a partner who treats your agency as a priority, not an account number.",
    image: `${industriesWeServeImageBase}/Government Sector.png`,
    href: "/services",
  },
  {
    name: "Education",
    headline: "Infrastructure Built for the Pace of Modern Learning",
    detail:
      "Modern learning demands infrastructure that never falls behind. From the superintendent's office to the student's device, education IT is a full-spectrum challenge. We help districts and universities deploy scalable, FERPA-compliant, AI-ready environments that grow with enrollment and stretch tight budgets further than you thought possible.",
    image: `${industriesWeServeImageBase}/Education Sector.png`,
    href: "/services",
  },
  {
    name: "Healthcare",
    headline: "HIPAA Is the Floor. Patient Safety Is the Ceiling.",
    detail:
      "In healthcare, a security incident doesn't just create cost — it delays care. We secure clinical environments with HIPAA-compliant infrastructure, AI-driven anomaly detection, and EMR systems engineered to stay available when clinicians need them most, with a dedicated team that understands clinical workflows, not just IT tickets.",
    image: `${industriesWeServeImageBase}/Health Care.png`,
    href: "/services",
  },
  {
    name: "Public Sector",
    headline: "Infrastructure That Earns and Protects Public Trust",
    detail:
      "From county courthouses to municipal utility departments, public sector IT operates under constrained budgets, sustained scrutiny, and no tolerance for downtime. We bring the same contract-vehicle access and compliance rigor as the major national integrators — with the direct, responsive relationship that's harder to get once an account gets large enough to be \"just a number.\"",
    image: `${industriesWeServeImageBase}/Public Sector.png`,
    href: "/services",
  },
  {
    name: "Commercial Enterprises",
    headline: "Enterprise-Grade Infrastructure for Enterprise-Level Ambition",
    detail:
      "Growing organizations need IT that scales as quickly as the business does. We deliver managed cloud infrastructure, cybersecurity, and AI-driven automation backed by an extensive technology partner ecosystem, turning your tech stack into a competitive advantage without the overhead of an in-house enterprise IT function, or the impersonal scale of a billion-dollar reseller.",
    image: `${industriesWeServeImageBase}/Commercial Enterprise Sector.png`,
    href: "/services",
  },
  {
    name: "Financial Services",
    headline: "A Four-Hour Outage Can Cost More Than an Annual IT Contract",
    detail:
      "In financial services, downtime isn't an inconvenience — it's a regulatory event. We build and manage high-availability infrastructure for trading platforms, banking systems, and back-office operations, with AI-assisted fraud detection and insider threat monitoring layered in from day one.",
    image: `${industriesWeServeImageBase}/Financial Sector.png`,
    href: "/services",
  },
] as const;

const industryStackZ = ["z-10", "z-20", "z-30", "z-40", "z-50"] as const;

/** The organization — minimal full-width editorial layout. */
export function AboutUsSnapshotSection() {
  return (
    <section
      id="about"
      className={`about-minimal relative z-20 scroll-mt-24 py-14 sm:py-16 lg:py-20 ${dt.sectionBorder}`}
      aria-labelledby="about-snapshot-heading"
    >
      <div className="about-minimal__inner">
        <header className="about-minimal__header about-minimal__header--center">
          <p className={dt.badge}>The organization</p>
          <h2 id="about-snapshot-heading" className="about-minimal__headline">
            Powering the Organizations That{" "}
            <span className="bg-gradient-to-r from-[#E55614] to-[#f06520] bg-clip-text text-transparent">
              Power the World
            </span>
          </h2>
        </header>

        <div className="about-minimal__metrics">
          <OrgMetricsRail />
        </div>

        <div className="about-minimal__body">
          <div className="about-minimal__copy">
            <div className="about-minimal__intro">
              <p className="about-minimal__eyebrow">Organizational identity</p>
              <h3 className="about-minimal__intro-head">
                What Makes a Reliable IT Partner. And Why It Matters
              </h3>
              <p className="about-minimal__intro-text">
                Reliability in IT is not about up time percentages printed on a brochure. It is
                about what happens when your compliance audit is in two weeks, and what happens
                when your organization&apos;s needs change faster than your infrastructure can keep
                up. These are the moments that define an IT partnership.
              </p>
            </div>

            {/* <div className="about-minimal__mission">
              <p className="about-minimal__eyebrow">Mission</p>
              <p className="about-minimal__mission-text">
                Simplify complex IT buying and deliver trusted solutions that help teams move faster
                with confidence.
              </p>
            </div> */}
          </div>

          <figure className="about-minimal__intro-visual">
            <Image
              src="/images/about us.jpg"
              alt="Hands holding a digital display that reads Reliable IT Partner with a security shield icon"
              width={960}
              height={600}
              className="about-minimal__intro-image"
              sizes="(max-width: 1023px) 100vw, 42vw"
            />
          </figure>
        </div>

        {/* <SectorsRowSection /> */}

        <IndustriesImageGridSection />

        <div className="about-minimal__cta-wrap">
          <Link href="/about" className="about-minimal__cta">
            Learn more about our organization
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectorsRowSection() {
  return (
    <div className="about-enterprise__sectors-row about-enterprise__reveal about-enterprise__reveal--5 mt-10 sm:mt-12">
      <header className="about-enterprise__sectors-header">
        <div>
          <p className={dt.badge}>Sectors</p>
          <h2 className="about-enterprise__sectors-headline">
            Industries We{" "}
            <span className="bg-gradient-to-r from-[#E55614] to-[#f06520] bg-clip-text text-transparent">
              Serve
            </span>
          </h2>
        </div>
        <span className="about-enterprise__sectors-count" aria-hidden>
          {String(sectors.length).padStart(2, "0")}
        </span>
      </header>

      <div className="mt-8 sm:mt-10">
        <ul className="hidden justify-center overflow-visible lg:flex">
          {sectors.map((sector, index) => (
            <li
              key={sector.name}
              className={`group relative shrink-0 transition-transform duration-300 hover:z-50 focus-within:z-50 ${industryStackZ[index] ?? industryStackZ[0]} ${index === 0 ? "ml-0" : "-ml-10 xl:-ml-12"}`}
            >
              <IndustryStrengthCard sector={sector} index={index} />
            </li>
          ))}
        </ul>

        <ul className="flex snap-x snap-mandatory gap-0 overflow-x-auto overflow-y-visible pb-4 pl-1 pr-4 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
          {sectors.map((sector, index) => (
            <li
              key={sector.name}
              className={`group relative w-[min(85vw,300px)] shrink-0 snap-center transition-transform duration-300 hover:z-50 focus-within:z-50 sm:w-[320px] ${industryStackZ[index] ?? industryStackZ[0]} ${index === 0 ? "ml-0" : "-ml-7 sm:-ml-8"}`}
            >
              <IndustryStrengthCard sector={sector} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function IndustriesImageGridSection() {
  return (
    <div className="about-enterprise__industry-image-grid about-enterprise__reveal about-enterprise__reveal--6 mt-14 sm:mt-16 lg:mt-20">
      <DesignTestCredentialsStrip embedded />

      <header className="about-enterprise__sectors-header about-enterprise__sectors-header--center">
        <div>
          <p className={dt.badge}>Sectors</p>
          <h2
            id="industries-we-serve-heading"
            className="about-enterprise__sectors-headline"
          >
            Industries We{" "}
            <span className="bg-gradient-to-r from-[#E55614] to-[#f06520] bg-clip-text text-transparent">
              Serve
            </span>
          </h2>
        </div>
        <span className="about-enterprise__sectors-count" aria-hidden>
          {String(industryImageSectors.length).padStart(2, "0")}
        </span>
      </header>

      <ul
        className="about-enterprise__industry-image-grid-list"
        aria-labelledby="industries-we-serve-heading"
      >
        {industryImageSectors.map((sector, index) => (
          <li key={sector.name} className="about-enterprise__industry-image-grid-item">
            <IndustryImageCard sector={sector} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function IndustryImageCard({
  sector,
  index,
}: {
  sector: (typeof industryImageSectors)[number];
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="about-enterprise__industry-image-card about-enterprise__industry-image-card--cover group/image-card">
      <div className="about-enterprise__industry-image-visual">
        <span className="about-enterprise__industry-image-index" aria-hidden>
          {number}
        </span>
        <Image
          src={sector.image}
          alt={sector.name}
          fill
          className="about-enterprise__industry-image-asset"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="about-enterprise__industry-image-body">
        <h3 className={`about-enterprise__industry-image-title ${dt.heading}`}>{sector.name}</h3>
        <p className="about-enterprise__industry-image-headline">{sector.headline}</p>
        <p className={`about-enterprise__industry-image-detail ${dt.body}`}>{sector.detail}</p>
        <Link href={sector.href} className="about-enterprise__industry-image-link mt-auto pt-3">
          Learn More
          <IndustryImageArrowIcon />
        </Link>
      </div>
    </article>
  );
}

function IndustryImageArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="h-3.5 w-3.5 text-[#E55614] transition-transform duration-300 group-hover/image-card:translate-x-1"
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

function IndustryStrengthCard({
  sector,
  index,
}: {
  sector: (typeof sectors)[number];
  index: number;
}) {
  const Icon = sector.icon;
  const number = String(index + 1).padStart(2, "0");
  const titleWords = sector.name.split(" ");

  return (
    <article className="about-enterprise__industry-card group/card">
      <span className="about-enterprise__industry-card-glow" aria-hidden />
      <span className="about-enterprise__industry-card-accent" aria-hidden />

      <div className="about-enterprise__industry-card-body flex flex-col px-6 py-7 sm:px-7 sm:py-8">
        <div className="relative flex items-start justify-between gap-4">
          <div className={dt.iconBoxCard}>
            <Icon />
          </div>
          <span className={dt.number}>{number}</span>
        </div>

        <div className="relative mt-7 flex flex-1 flex-col">
          <h3 className="flex flex-wrap gap-x-[0.3em] text-base font-semibold leading-[1.35] tracking-tight sm:text-lg">
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

          <p className={`mt-3.5 flex-1 text-sm leading-[1.7] sm:text-[15px] ${dt.body}`}>
            {sector.detail}
          </p>
        </div>

        <Link
          href="/services"
          className={`relative mt-7 inline-flex items-center gap-2 text-[13px] font-medium ${dt.link}`}
        >
          Explore solutions
          <IndustryArrowIcon />
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

function IndustryArrowIcon() {
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
