import Image from "next/image";
import Link from "next/link";

import { dt } from "@/components/design-test/design-test-theme";

type StatCell = {
  kind: "stat";
  count: string;
  label: string;
  accent?: "orange" | "amber";
};

type LogoCell = {
  kind: "logo";
  name: string;
  src: string;
};

type GridCell = StatCell | LogoCell;

const grid: GridCell[] = [
  { kind: "stat", count: "110+", label: "Cybersecurity Partners", accent: "orange" },
  { kind: "stat", count: "200+", label: "Software Partners", accent: "amber" },
  { kind: "logo", name: "Microsoft", src: "/partners/microsoft.png" },
  { kind: "logo", name: "Adobe", src: "/partners/adobe.png" },
  { kind: "logo", name: "Fortinet", src: "/partners/fortinet.png" },
  { kind: "logo", name: "VMware", src: "/partners/vmware.png" },
  { kind: "stat", count: "140+", label: "IT Hardware Partners", accent: "amber" },
  { kind: "stat", count: "100+", label: "Cloud Partners", accent: "amber" },
  { kind: "logo", name: "DataCore", src: "/partners/datacore.png" },
  { kind: "logo", name: "Cisco", src: "/partners/cisco.png" },
  { kind: "logo", name: "Malwarebytes", src: "/partners/malwarebytes.png" },
  { kind: "stat", count: "400+", label: "All Partners", accent: "orange" },
];

export function TechnologyPartnersSection() {
  return (
    <section
      id="partners"
      className={`relative z-10 ${dt.section} ${dt.sectionBorder}`}
      aria-labelledby="tech-partners-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className={dt.badge}>Technology Partners</p>
          <h2
            id="tech-partners-heading"
            className="mt-5 text-balance text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl lg:text-[2rem] lg:leading-tight"
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
          <Link href="/solutions" className={`text-sm font-semibold underline-offset-4 hover:underline ${dt.link}`}>
            View all partners →
          </Link>
        </p>
      </div>
    </section>
  );
}

function StatCard({ cell }: { cell: StatCell }) {
  const countColor = cell.accent === "orange" ? dt.statValue : dt.statValueAlt;

  return (
    <div
      className={`flex h-full flex-col items-center justify-center px-3 py-4 text-center sm:rounded-2xl sm:px-4 sm:py-5 ${dt.card} ${dt.cardHover}`}
    >
      <p className={`text-2xl font-bold tabular-nums tracking-tight sm:text-3xl ${countColor}`}>{cell.count}</p>
      <p className={`mt-1 text-[11px] font-medium leading-snug sm:text-xs ${dt.statLabel}`}>{cell.label}</p>
    </div>
  );
}

function LogoCard({ cell }: { cell: LogoCell }) {
  return (
    <div className={`group flex h-full items-center justify-center px-3 py-3 sm:px-4 sm:py-4 ${dt.logoCard}`}>
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
