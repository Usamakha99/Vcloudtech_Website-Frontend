/** Partner marks in `public/partners/` — keep in sync when adding files. */
export const partnerLogos = [
  { name: "Adobe", src: "/partners/adobe.png" },
  { name: "Anthropic", src: "/partners/anthropic.png" },
  { name: "Apple", src: "/partners/apple.png" },
  { name: "AWS", src: "/partners/aws.png" },
  { name: "Cisco", src: "/partners/cisco.png" },
  { name: "Dell", src: "/partners/dell.png" },
  { name: "Fortinet", src: "/partners/fortinet.png" },
  { name: "Google", src: "/partners/google.png" },
  { name: "HP", src: "/partners/hp.png" },
  { name: "HPE", src: "/partners/hpe.png" },
  { name: "IBM", src: "/partners/ibm.png" },
  { name: "Intel", src: "/partners/intel.png" },
  { name: "Malwarebytes", src: "/partners/malwarebytes.png" },
  { name: "Microsoft", src: "/partners/microsoft.png" },
  { name: "Samsung", src: "/partners/samsung.png" },
  { name: "VMware", src: "/partners/vmware.png" },
  { name: "Veeam", src: "/partners/veeam.png" },
  { name: "Zoom", src: "/partners/zoom.png" },
] as const;

export type PartnerLogo = (typeof partnerLogos)[number];

/** Strategic partners strip — same set as major partners grid. */
export const strategicPartnerLogos = partnerLogos;

export function partnerLogoDimensions(name: PartnerLogo["name"]) {
  return name === "Microsoft" ? { width: 200, height: 200 } : { width: 253, height: 100 };
}

const boostedPartnerLogos = new Set<PartnerLogo["name"]>(["HP", "Veeam"]);

/** Per-logo scale tweaks so strip/grid slots look visually equal. */
export function partnerLogoStripClass(name: PartnerLogo["name"]) {
  if (name === "Apple") return "tp__strategic-strip-logo--apple";
  if (name === "Google") return "tp__strategic-strip-logo--google";
  if (boostedPartnerLogos.has(name)) return "tp__strategic-strip-logo--boost";
  return "";
}

/** Square artwork needs a boost inside the shared wide logo slot. */
export function partnerLogoVisualClass(name: PartnerLogo["name"]) {
  if (name === "Apple") return "tp__partner-logo--apple";
  if (name === "Google") return "tp__partner-logo--google";
  if (boostedPartnerLogos.has(name)) return "tp__partner-logo--boost";
  const squareLogos = ["Microsoft", "VMware", "Malwarebytes"] as const;
  return (squareLogos as readonly string[]).includes(name) ? "tp__partner-logo--square" : "";
}
