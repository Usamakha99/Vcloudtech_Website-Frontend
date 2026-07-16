/** Partner marks in `public/partners/` — use lowercase filenames (Linux/production paths are case-sensitive). */
export const partnerLogos = [
  { name: "Adobe", src: "/partners/adobe.png" },
  
  { name: "Apple", src: "/partners/apple.png" },
  { name: "AWS", src: "/partners/aws.png" },
  { name: "Cisco", src: "/partners/cisco.png" },
  { name: "Dell", src: "/partners/dell.png" },
  { name: "Fortinet", src: "/partners/fortinet.png" },
  { name: "Google", src: "/partners/google.png?v=2" },
  { name: "HP", src: "/partners/hp.png?v=2" },
  { name: "HPE", src: "/partners/Hewlett_Packard_Enterprise-Logo.wine.png" },
  { name: "IBM", src: "/partners/ibm.png" },
  { name: "Intel", src: "/partners/intel.png" },
  { name: "ThreatDown", src: "/partners/ThreatDown.png" },
  { name: "Microsoft", src: "/partners/microsoft.png" },
  { name: "Samsung", src: "/partners/samsung.png" },
  { name: "Acronis", src: "/partners/acronis.png?v=2" },
  { name: "Veeam", src: "/partners/veeam-partner.png" },
  { name: "Zoom", src: "/partners/zoom.png" },
  { name: "Barracuda", src: "/partners/Barracuda-Networks-logo.png" },
  { name: "Palo Alto", src: "/partners/PANW_Parent_Brand_Primary_Logo_RGB.png" },
  { name: "Lansweeper", src: "/partners/Lansweeper.png" },
  { name: "ServiceNow", src: "/partners/servicenow.png" },
  { name: "CrowdStrike", src: "/partners/crowdstrike.png" },
  { name: "Commvault", src: "/partners/commvault.png" },
  { name: "Zscaler", src: "/partners/zscaler.png" },
] as const;

export type PartnerLogo = (typeof partnerLogos)[number];

/** Strategic partners strip — same set as major partners grid. */
export const strategicPartnerLogos = partnerLogos;

export function partnerLogoDimensions(name: PartnerLogo["name"]) {
  if (name === "Microsoft" || name === "Veeam") return { width: 200, height: 200 };
  return { width: 253, height: 100 };
}

const boostedPartnerLogos = new Set<PartnerLogo["name"]>(["Veeam"]);

const strategicStripTunedPartners = new Set<PartnerLogo["name"]>([
  "Palo Alto",
  "Lansweeper",
  "ServiceNow",
  "CrowdStrike",
  "Commvault",
]);

function partnerLogoSlug(name: PartnerLogo["name"]) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

/** Per-logo scale tweaks so strip/grid slots look visually equal. */
export function partnerLogoStripClass(name: PartnerLogo["name"]) {
  if (name === "Apple") return "tp__strategic-strip-logo--apple";
  if (name === "Google") return "tp__strategic-strip-logo--google";
  if (name === "HPE") return "tp__strategic-strip-logo--hpe";
  if (name === "HP") return "tp__strategic-strip-logo--hp";
  if (name === "Zscaler") return "tp__strategic-strip-logo--zscaler";
  if (boostedPartnerLogos.has(name)) return "tp__strategic-strip-logo--boost";
  if (strategicStripTunedPartners.has(name)) return `tp__strategic-strip-logo--${partnerLogoSlug(name)}`;
  return "";
}

/** Square artwork needs a boost inside the shared wide logo slot. */
export function partnerLogoVisualClass(name: PartnerLogo["name"]) {
  if (name === "Apple") return "tp__partner-logo--apple";
  if (name === "Google") return "tp__partner-logo--google";
  if (name === "HPE") return "tp__partner-logo--hpe";
  if (name === "HP") return "tp__partner-logo--hp";
  if (boostedPartnerLogos.has(name)) return "tp__partner-logo--boost";
  if (strategicStripTunedPartners.has(name)) return `tp__partner-logo--${partnerLogoSlug(name)}`;
  const squareLogos = ["Microsoft", "Malwarebytes", "Veeam"] as const;
  return (squareLogos as readonly string[]).includes(name) ? "tp__partner-logo--square" : "";
}
