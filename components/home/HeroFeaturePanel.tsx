import Link from "next/link";

const tiles = [
  {
    title: "Microsoft solutions",
    description: "Azure, Microsoft 365, and hybrid platforms for regulated workloads.",
    href: "/solutions/microsoft",
  },
  {
    title: "AWS services",
    description: "Landing zones, modernization, and managed operations on AWS.",
    href: "/solutions/aws",
  },
  {
    title: "Cloud infrastructure",
    description: "Architecture, migration, and resilient multi-cloud operations.",
    href: "/solutions/cloud-infrastructure",
  },
  {
    title: "Cybersecurity & data",
    description: "Zero trust alignment, protection, and data & AI readiness.",
    href: "/solutions/cybersecurity",
  },
] as const;

/**
 * Right-column hero panel — dark enterprise card grid (B2B reference pattern).
 */
export function HeroFeaturePanel() {
  return (
    <div className="rounded-2xl border border-slate-800/80 bg-gradient-to-br from-[#0f172a] via-[#121c3d] to-[#1B224B] p-3 shadow-2xl shadow-slate-900/25 ring-1 ring-white/10 sm:p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {tiles.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className="group rounded-xl border border-white/5 bg-slate-900/35 px-5 py-5 transition-colors hover:border-sky-500/20 hover:bg-slate-800/40 sm:px-6 sm:py-6"
          >
            <p className="text-sm font-semibold tracking-tight text-white group-hover:text-sky-200">
              {tile.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300">
              {tile.description}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-sky-400/90">
              Learn more
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
