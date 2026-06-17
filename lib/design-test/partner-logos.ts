/** Partner marks in `public/partners/` — keep in sync when adding files. */
export const partnerLogos = [
  { name: "Adobe", src: "/partners/adobe.png" },
  { name: "Apple", src: "/partners/apple.png" },
  { name: "AWS", src: "/partners/aws.png" },
  { name: "Barracuda", src: "/partners/barracuda.png" },
  { name: "Check Point", src: "/partners/checkpoint.png" },
  { name: "Cisco", src: "/partners/cisco.png" },
  { name: "DataCore", src: "/partners/datacore.png" },
  { name: "Dell", src: "/partners/dell.png" },
  { name: "Fortinet", src: "/partners/fortinet.png" },
  { name: "HP", src: "/partners/hp.png" },
  { name: "HPE", src: "/partners/hpe.png" },
  { name: "IBM", src: "/partners/ibm.png" },
  { name: "Intel", src: "/partners/intel.png" },
  { name: "Lenovo", src: "/partners/lenovo.png" },
  { name: "Malwarebytes", src: "/partners/malwarebytes.png" },
  { name: "Microsoft", src: "/partners/microsoft.png" },
  { name: "Okta", src: "/partners/okta.png" },
  { name: "Palo Alto Networks", src: "/partners/palo-alto.png" },
  { name: "Samsung", src: "/partners/samsung.png" },
  { name: "VMware", src: "/partners/vmware.png" },
  { name: "Zoom", src: "/partners/zoom.png" },
] as const;

export type PartnerLogo = (typeof partnerLogos)[number];

/** Hero strategic partners strip (marquee). */
export const strategicPartnerLogos = [
  { name: "Microsoft", src: "/partners/microsoft.png" },
  { name: "Cisco", src: "/partners/cisco.png" },
  { name: "AWS", src: "/partners/aws.png" },
  { name: "Dell", src: "/partners/dell.png" },
  { name: "VMware", src: "/partners/vmware.png" },
  { name: "Adobe", src: "/partners/adobe.png" },
  { name: "Fortinet", src: "/partners/fortinet.png" },
  { name: "HPE", src: "/partners/hpe.png" },
] as const satisfies ReadonlyArray<PartnerLogo>;

export function partnerLogoDimensions(name: PartnerLogo["name"]) {
  return name === "Microsoft" ? { width: 200, height: 200 } : { width: 253, height: 100 };
}

/** Square artwork needs a boost inside the shared wide logo slot. */
export function partnerLogoVisualClass(name: PartnerLogo["name"]) {
  const squareLogos = ["Microsoft", "VMware", "DataCore", "Malwarebytes"] as const;
  return (squareLogos as readonly string[]).includes(name) ? "tp__partner-logo--square" : "";
}
