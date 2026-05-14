/** Vendor tabs / filters for News (matches automation `VendorId` set). */
export const VENDOR_NEWS_TABS = [
  { id: "microsoft", label: "Microsoft" },
  { id: "aws", label: "AWS" },
  { id: "dell", label: "Dell" },
  { id: "nvidia", label: "NVIDIA" },
  { id: "cisco", label: "Cisco" },
] as const;

export type VendorNewsTabId = (typeof VENDOR_NEWS_TABS)[number]["id"];

const TAB_IDS = new Set<string>(VENDOR_NEWS_TABS.map((t) => t.id));

/** Normalize `?vendor=` query; returns `undefined` for All or invalid. */
export function parseVendorFilter(raw: string | string[] | undefined): VendorNewsTabId | undefined {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (!v || typeof v !== "string") return undefined;
  const id = v.trim().toLowerCase();
  if (!TAB_IDS.has(id)) return undefined;
  return id as VendorNewsTabId;
}
