/** Accent styles per vendor for News listing + article chrome (brand-adjacent, not official logos). */
export function getVendorChrome(vendor: string | null | undefined): {
  bar: string;
  badge: string;
} {
  const v = (vendor ?? "").toLowerCase();
  const map: Record<string, { bar: string; badge: string }> = {
    microsoft: {
      bar: "bg-[#0078D4]",
      badge:
        "bg-[#0078D4]/10 text-[#005a9e] ring-1 ring-inset ring-[#0078D4]/20",
    },
    aws: {
      bar: "bg-[#FF9900]",
      badge: "bg-amber-500/12 text-amber-950 ring-1 ring-inset ring-amber-500/25",
    },
    dell: {
      bar: "bg-slate-600",
      badge: "bg-slate-100 text-slate-800 ring-1 ring-inset ring-slate-300/90",
    },
    nvidia: {
      bar: "bg-[#76B900]",
      badge: "bg-lime-500/12 text-lime-950 ring-1 ring-inset ring-lime-600/25",
    },
    cisco: {
      bar: "bg-sky-600",
      badge: "bg-sky-50 text-sky-950 ring-1 ring-inset ring-sky-300/80",
    },
  };
  return (
    map[v] ?? {
      bar: "bg-slate-400",
      badge: "bg-slate-100 text-slate-800 ring-1 ring-inset ring-slate-200",
    }
  );
}

export function formatNewsDate(iso: string | null | undefined): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
