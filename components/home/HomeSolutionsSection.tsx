import Link from "next/link";

const solutions = [
  {
    title: "Cybersecurity",
    description:
      "Zero trust roadmaps, tooling selection, and continuous hardening aligned to your risk profile.",
    href: "/solutions/cybersecurity",
    icon: ShieldIcon,
  },
  {
    title: "Cloud & data center",
    description:
      "Migration, landing zones, and hybrid operations with governance built in from day one.",
    href: "/solutions/cloud-infrastructure",
    icon: CloudIcon,
  },
  {
    title: "Microsoft solutions",
    description:
      "Azure, Microsoft 365, and identity patterns for regulated and distributed enterprises.",
    href: "/solutions/microsoft",
    icon: WindowIcon,
  },
  {
    title: "AWS solutions",
    description:
      "Well-architected foundations, modernization, and managed patterns on Amazon Web Services.",
    href: "/solutions/aws",
    icon: BoltIcon,
  },
  {
    title: "Procurement platform",
    description:
      "Streamlined sourcing for hardware, software, and cloud with approvals and audit trails.",
    href: "/procurement",
    icon: CartIcon,
  },
  {
    title: "Data & AI",
    description:
      "Analytics platforms, governance, and responsible AI adoption with clear business outcomes.",
    href: "/solutions/data-ai",
    icon: SparkIcon,
    badge: "New",
  },
] as const;

export function HomeSolutionsSection() {
  return (
    <section
      className="scroll-mt-24 border-t border-slate-200/80 bg-white py-16 sm:scroll-mt-28 sm:py-20 lg:py-24"
      aria-labelledby="solutions-grid-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="solutions-grid-heading"
            className="text-2xl font-semibold tracking-tight text-[#1B224B] sm:text-3xl"
          >
            Technology solutions that drive results
          </h2>
          <p className="mt-4 text-slate-600">
            From strategy through operations—aligned to procurement, compliance, and uptime
            expectations.
          </p>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {solutions.map((item) => (
            <li key={item.title} className="flex min-w-0">
              <Link
                href={item.href}
                className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-7 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)] ring-1 ring-slate-900/[0.04] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-sky-200/80 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.14),0_4px_8px_-4px_rgba(15,23,42,0.06)] sm:p-8"
              >
                {"badge" in item && item.badge ? (
                  <span className="absolute right-4 top-4 z-10 rounded-full bg-violet-600 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white shadow-sm ring-2 ring-white">
                    {item.badge}
                  </span>
                ) : null}

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 via-white to-sky-100/70 text-sky-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-sky-200/70 [&_svg]:h-7 [&_svg]:w-7">
                  <item.icon />
                </div>

                <h3 className="mt-6 text-lg font-semibold tracking-tight text-[#1B224B] transition-colors group-hover:text-sky-800">
                  {item.title}
                </h3>
                <p className="mt-3 min-h-[4.75rem] flex-1 text-pretty text-sm leading-relaxed text-slate-600 sm:min-h-[5.25rem] lg:min-h-[5.5rem]">
                  <span className="line-clamp-4">{item.description}</span>
                </p>

                <div className="mt-7 border-t border-slate-100 pt-5 lg:mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700">
                    Learn more
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M12 3l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" strokeLinejoin="round" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M7 18a4 4 0 01-1-7.87 5 5 0 019.9-1A3.5 3.5 0 0117 18H7z" strokeLinejoin="round" />
    </svg>
  );
}

function WindowIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" strokeLinejoin="round" />
      <path d="M3 9h18M8 14h2M8 17h4" strokeLinecap="round" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" strokeLinejoin="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M6 6h15l-2 9H8L6 6zm0 0L5 3H3M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M12 3l1.5 5L19 10l-5.5 2L12 21l-1.5-9L5 10l5.5-2L12 3z" strokeLinejoin="round" />
    </svg>
  );
}
