import type { ContractVehicle } from "@/lib/marketing/contract-vehicles";

export type ContractVehicleDetail = {
  contractNumber: string;
  contractHolder: string;
  region: string;
  manufacturers: string;
  description: string;
  term: string;
};

export const contractVehicleDetails: Partial<
  Record<ContractVehicle["id"], ContractVehicleDetail[]>
> = {
  gsa: [
    {
      contractNumber: "GS-35F-0511T",
      contractHolder: "EC AMERICA, INC/Immix Group",
      region: "National",
      manufacturers: "CheckPoint, PaloAlto Networks, Symantec, Extreme Networks, Citrix",
      description:
        "vCloud Tech offers Checkpoint, PaloAlto Networks, Symantec, Extreme Networks software, and services in all states via EC America GSA Schedule contract.",
      term: "6/26/2027",
    },
    {
      contractNumber: "GS-35F-0349S",
      contractHolder: "Tech Data",
      region: "National",
      manufacturers: "VMware",
      description:
        "vCloud Tech offers VMware Software Licenses, Support (SnS), Managed Services, End User Computing, Airwatch, Cloud Subscription Services, Training, and Professional Services via TechData GSA contract.",
      term: "4/4/2026",
    },
    {
      contractNumber: "GS-35F-0119Y",
      contractHolder: "Carahsoft",
      region: "National",
      manufacturers:
        "Adobe, VMware By Broadcom, Symantec, Cellebrite, Dell & EMC, MicroFocus, Trend Micro, Veritas, Tenable, Granicus, Data Locker, Red Hat, Smart Sheet, OSISoft, Nutanix, SalesForce, UiPath, ExaBeam, Beyond Trust, Quantum, Rubrik, EnterpriseDB",
      description:
        "vCloud Tech offers IT hardware, software, and services in all states via Carahsoft's GSA contract.",
      term: "Through August 21, 2028",
    },
    {
      contractNumber: "GS-35F-303DA",
      contractHolder: "Promark",
      region: "National",
      manufacturers:
        "Adobe, VMware By Broadcom, Symantec, Cellebrite, Dell & EMC, MicroFocus, Trend Micro, Veritas, Tenable, Granicus, Data Locker, Red Hat, Smart Sheet, OSISoft, Nutanix, SalesForce, UiPath, ExaBeam, Beyond Trust, Quantum, Rubrik, EnterpriseDB",
      description:
        "vCloud Tech offers IT hardware, software, and services in all states via Promark's GSA contract.",
      term: "1/10/2025 – 1/10/2026",
    },
  ],
  tips: [
    {
      contractNumber: "260105",
      contractHolder: "vCloud Tech Inc.",
      region: "8 ESC Texas",
      manufacturers:
        "Adobe, Acer, Acronis, Arista, Asus, APC Schneider, AWS, Appspace, Avast, Axiom, Barracuda Networks, Belkin, BeyondTrust, BitDefender, Brightsign, Checkpoint, Citrix, Corel, Eaton, Ergotron, Exagrid, Extreme Networks, Fortinet, Informatica, Ivanti, Liquidware Labs, Malwarebytes, McAfee, Navicat, Network Critical, NetGear, Nuance Dragon, Omnicharge, Oxygenxml, Polycom, Proofpoint, Pulse Secure, Red Hat, Seagate, Singlewire, Solarwinds, Sonicwall, Sophos, Symantec, Synology, Targus, Techsmith, Tintri, Trend Micro, Tripplite, vbrick, Veeam, Veritas, Vertiv, Viewsonic, Vmware, Western Digital, Zyxel",
      description:
        "vCloud offers wide range of Technology Solutions, Products and Services",
      term: "5 years – 06/01/2026 to 05/31/2031",
    },
  ],
  costars: [
    {
      contractNumber: "003-E24-681",
      contractHolder: "vCloud Tech Inc.",
      region: "Pennsylvania",
      manufacturers:
        "Acer, Adesso, Ambir, APC, Tableau, Barracuda, Brother International, Buffalo Americas, CTA Digital, Dell, Eaton, Ergotron, HP, Kensington, Kingston, Philips, Viewsonic, Xerox, Cisco, IBM, Lenovo, LG",
      description:
        "vCloud Tech offers a wide range of hardware and software under the contract.",
      term: "5/1/2024 – 4/30/2026",
    },
    {
      contractNumber: "006-E25-283",
      contractHolder: "vCloud Tech Inc.",
      region: "Pennsylvania",
      manufacturers:
        "Acer, Adesso, Ambir, APC, Tableau, Barracuda, Brother International, Buffalo Americas, CTA Digital, Dell, Eaton, Ergotron, HP, Kensington, Kingston, Philips, Viewsonic, Xerox, Cisco, IBM, Lenovo, LG",
      description:
        "vCloud Tech offers a wide range of hardware and software under the contract.",
      term: "5/1/2024 – 4/30/2026",
    },
  ],
  epic6: [
    {
      contractNumber: "22.25",
      contractHolder: "vCloud Tech Inc.",
      region: "Region 6",
      manufacturers: "Computer hardware, software, equipment, and technology services",
      description:
        "Computer Hardware & Software – Equipment, Supplies, Technology Solutions and Services",
      term: "1 July 2025 – 1 July 2030 (5 Year)",
    },
    {
      contractNumber: "21.25",
      contractHolder: "vCloud Tech Inc.",
      region: "Region 6",
      manufacturers: "Computer hardware, software, equipment, and technology services",
      description:
        "Computer Hardware & Software – Equipment, Supplies, Technology Solutions and Services",
      term: "1 July 2025 – 1 July 2030 (5 Year)",
    },
  ],
  allied: [
    {
      contractNumber: "25-7511",
      contractHolder: "vCloud Tech Inc.",
      region: "Region 19",
      manufacturers: "Technology hardware and software vendors per contract scope",
      description:
        "Technology Hardware and Software Services and related supplemental",
      term: "January 7, 2025 – January 31, 2027",
    },
  ],
  sourcewell: [
    {
      contractNumber: "112124-VCO",
      contractHolder: "vCloud Tech Inc.",
      region: "National",
      manufacturers:
        "Canon, HP, Xerox, Lexmark, Brother, Epson, Dell, Zebra Technologies, Honeywell",
      description:
        "Copiers, Printers, and Multi-Function Devices with Related Supplies, Accessories, and Services. See Sourcewell for further contract details.",
      term: "January 10, 2025 – January 10, 2029",
    },
  ],
  buyboard: [
    {
      contractNumber: "759-25",
      contractHolder: "vCloud Tech Inc.",
      region: "National",
      manufacturers:
        "Adobe, Acer, Acronis, Arista, Asus, APC Schneider, Appspace, Avast, Axiom, Barracuda Networks, Belkin, BeyondTrust, BitDefender, Brightsign, Checkpoint, Citrix, Corel, Eaton, Ergotron, Exagrid, Extreme Networks, Fortinet, Informatica, Ivanti, Liquidware Labs, Malwarebytes, McAfee, Navicat, Network Critical, NetGear, Nuance Dragon, Omnicharge, Oxygenxml, Polycom, Proofpoint, Pulse Secure, Red Hat, Seagate, Singlewire, Solarwinds, Sonicwall, Sophos, Symantec, Synology, Targus, Techsmith, Tintri, Trend Micro, Tripplite, vbrick, Veeam, Veritas, Vertiv, Viewsonic, Vmware, Western Digital, Zyxel",
      description:
        "vCloud offers wide range of Technology Software and Services under the Buyboard Purchasing Cooperative Contract",
      term: "02/01/2025 to 01/31/2026",
    },
  ],
  cmas: [
    {
      contractNumber: "3-24-09-1021",
      contractHolder: "vCloud Tech Inc.",
      region: "California",
      manufacturers:
        "Acer, Adesso, APC, Belkin, Brother International, Canon, Cyber Power, Dell, Ergotron, IBM, Kensington, LG Electronics, Logitech, Netgear, Lenovo, HPE, Philips, Plantronics, Samsung, Seagate, Targus, Tripplite, Vertiv, WatchGuard, Xerox",
      description:
        "vCloud Tech offers products from manufacturers/publishers under GSA Base Schedule via its California Multiple Award Schedule (CMAS) contract.",
      term: "September 11, 2024 – March 2, 2026 (2-year term)",
    },
  ],
};
