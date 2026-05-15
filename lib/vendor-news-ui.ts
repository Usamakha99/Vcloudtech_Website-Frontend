/** Accent styles per vendor — listing placeholders + badges (brand-adjacent). */
export function getVendorChrome(vendor: string | null | undefined): {
  bar: string;
  badge: string;
  /** Gradient for faux hero / thumb tiles when no CMS image exists */
  thumb: string;
} {
  const v = (vendor ?? "").toLowerCase();
  const map: Record<string, { bar: string; badge: string; thumb: string }> = {
    microsoft: {
      bar: "bg-[#0078D4]",
      badge:
        "border border-[#0078D4]/30 bg-transparent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#005a9e]",
      thumb: "bg-gradient-to-br from-[#0078D4]/50 via-[#005a9e]/40 to-[#1B224B]",
    },
    aws: {
      bar: "bg-[#FF9900]",
      badge:
        "border border-amber-500/40 bg-transparent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-900",
      thumb: "bg-gradient-to-br from-amber-500/55 via-orange-700/35 to-[#1B224B]",
    },
    dell: {
      bar: "bg-slate-600",
      badge:
        "border border-slate-400 bg-transparent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-700",
      thumb: "bg-gradient-to-br from-slate-500/50 via-slate-700/35 to-neutral-950",
    },
    nvidia: {
      bar: "bg-[#76B900]",
      badge:
        "border border-lime-600/35 bg-transparent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-lime-900",
      thumb: "bg-gradient-to-br from-lime-500/50 via-green-900/35 to-neutral-950",
    },
    cisco: {
      bar: "bg-sky-600",
      badge:
        "border border-sky-500/40 bg-transparent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-900",
      thumb: "bg-gradient-to-br from-sky-500/50 via-sky-800/35 to-neutral-950",
    },
  };
  return (
    map[v] ?? {
      bar: "bg-slate-400",
      badge:
        "border border-slate-300 bg-transparent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-700",
      thumb: "bg-gradient-to-br from-slate-500/40 to-neutral-950",
    }
  );
}

export function getVendorShortLabel(vendor: string | null | undefined): string {
  const id = (vendor ?? "").toLowerCase();
  const labels: Record<string, string> = {
    microsoft: "Microsoft",
    aws: "AWS",
    dell: "Dell",
    nvidia: "NVIDIA",
    cisco: "Cisco",
  };
  if (labels[id]) return labels[id];
  if (!vendor) return "Vendor";
  return vendor.charAt(0).toUpperCase() + vendor.slice(1);
}


export function formatNewsDate(iso: string | null | undefined): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Masthead line, e.g. "Sunday, Apr 17, 2022" */
export function formatPaperMastheadDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Short line date for list meta, e.g. "Apr 17, 2022" */
export function formatNewsDateMeta(iso: string | null | undefined): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
