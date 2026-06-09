import Image from "next/image";
import Link from "next/link";

type StatCell = {
  kind: "stat";
  count: string;
  label: string;
  accent?: "sky" | "red";
};

type LogoCell = {
  kind: "logo";
  name: string;
  src: string;
};

type GridCell = StatCell | LogoCell;

/** 2×6 grid — stats + partner logos, brand navy / sky / red on glass gradient. */
const grid: GridCell[] = [
  { kind: "stat", count: "110+", label: "Cybersecurity Partners", accent: "red" },
  { kind: "stat", count: "200+", label: "Software Partners", accent: "sky" },
  { kind: "logo", name: "Microsoft", src: "/partners/microsoft.png" },
  { kind: "logo", name: "Adobe", src: "/partners/adobe.png" },
  { kind: "logo", name: "Fortinet", src: "/partners/fortinet.png" },
  { kind: "logo", name: "VMware", src: "/partners/vmware.png" },
  { kind: "stat", count: "140+", label: "IT Hardware Partners", accent: "sky" },
  { kind: "stat", count: "100+", label: "Cloud Partners", accent: "sky" },
  { kind: "logo", name: "DataCore", src: "/partners/datacore.png" },
  { kind: "logo", name: "Cisco", src: "/partners/cisco.png" },
  { kind: "logo", name: "Malwarebytes", src: "/partners/malwarebytes.png" },
  { kind: "stat", count: "400+", label: "All Partners", accent: "red" },
];

export function TechnologyPartnersSection() {
  return (
    <section
      id="partners"
      className="relative z-10 scroll-mt-14 border-t border-white/10 py-16 sm:py-20"
      aria-labelledby="tech-partners-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="inline-block rounded-full border border-[#e31837]/30 bg-[#e31837]/15 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff6b7f] sm:text-[11px]">
            Technology Partners
          </p>
          <h2
            id="tech-partners-heading"
            className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl lg:text-[2rem] lg:leading-tight"
          >
            IT Solutions from World-Class Partners from around the world
          </h2>
        </header>

        <ul className="mt-10 grid grid-cols-2 gap-2 sm:mt-12 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-6 lg:gap-3">
          {grid.map((cell, index) => (
            <li key={`${cell.kind}-${index}`} className="min-h-[5.5rem] sm:min-h-[6.25rem] lg:min-h-[7rem]">
              {cell.kind === "stat" ? <StatCard cell={cell} /> : <LogoCard cell={cell} />}
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center sm:mt-12">
          <Link
            href="/solutions"
            className="text-sm font-semibold text-sky-300 underline-offset-4 transition hover:text-white hover:underline"
          >
            View all partners →
          </Link>
        </p>
      </div>
    </section>
  );
}

function StatCard({ cell }: { cell: StatCell }) {
  const countColor = cell.accent === "red" ? "text-[#ff6b7f]" : "text-sky-300";

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-xl border border-white/15 bg-[#1B224B]/65 px-3 py-4 text-center shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] ring-1 ring-sky-400/10 backdrop-blur-md transition duration-200 hover:border-sky-300/25 hover:bg-[#1B224B]/80 sm:rounded-2xl sm:px-4 sm:py-5">
      <p className={`text-2xl font-bold tabular-nums tracking-tight sm:text-3xl ${countColor}`}>{cell.count}</p>
      <p className="mt-1 text-[11px] font-medium leading-snug text-sky-100/75 sm:text-xs">{cell.label}</p>
    </div>
  );
}

function LogoCard({ cell }: { cell: LogoCell }) {
  return (
    <div className="group flex h-full items-center justify-center rounded-xl border border-white/20 bg-white/92 px-3 py-3 shadow-sm ring-1 ring-slate-900/[0.04] transition duration-200 hover:-translate-y-0.5 hover:border-sky-200/80 hover:shadow-md sm:rounded-2xl sm:px-4 sm:py-4">
      <Image
        src={cell.src}
        alt={cell.name}
        width={200}
        height={80}
        className="h-auto max-h-8 w-auto max-w-full object-contain contrast-[1.02] transition group-hover:scale-[1.02] sm:max-h-9 lg:max-h-10"
        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 140px"
      />
    </div>
  );
}
