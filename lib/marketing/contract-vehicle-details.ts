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
    {
      contractNumber: "3-20-70-3866A",
      contractHolder: "TD Synnex",
      region: "California",
      manufacturers:
        "APC, Axiom, Barracuda Networks, C2G, Cradlepoint, Datacore Software Corporation, Docker, Eaton Corporation, Ergotron, Fujitsu, GFI Software, LG Electronics USA, Lifesize Inc., Netgear, Overland Storage Inc., Printerlogic, Quantum, Seagate, Tripp Lite, Visioneer, Zyxel",
      description:
        "vCloud Tech offers products from manufacturers/publishers under the Synnex GSA Base Schedule via its California Multiple Award Schedule (CMAS) contract.",
      term: "October 14, 2020 – September 26, 2025 (5-year term)",
    },
  ],
  pca: [
    {
      contractNumber: "PCA OD-372-22 – Computer Equipment, Supplies, and Services",
      contractHolder: "vCloud Tech Inc.",
      region: "Nationwide",
      manufacturers:
        "Asus, Acer, HP, Dell, Logitech, APC, Canon, Lenovo, LG, Eaton, Tripplite, Jabra, MSI, Getac, Toshiba, Intel, Sonicwall, ViewSonic, Philips",
      description:
        "vCloud Tech offers a wide range of Technology, Hardware under the contract.",
      term: "9/14/2022 – 9/13/2027",
    },
  ],
  region7: [
    {
      contractNumber: "CMPH2527",
      contractHolder: "vCloud Tech Inc.",
      region: "Region 7",
      manufacturers: "Computer hardware and supplies per contract scope",
      description: "vCloud Tech is offering Computer Hardware & Supplies under this contract.",
      term: "August 21, 2025 – August 21, 2027",
    },
  ],
  equalis: [
    {
      contractNumber: "R10-1173G",
      contractHolder: "vCloud Tech Inc.",
      region: "Region 10",
      manufacturers: "Technology software, equipment, and services per contract scope",
      description:
        "Technology Software, Equipment, Services and Related Solutions. See Equalis Group for further contract details.",
      term: "3/1/2025 – 3/1/2028",
    },
  ],
  goodbuy: [
    {
      contractNumber: "25-26 4D000",
      contractHolder: "vCloud Tech Inc.",
      region: "Region 2",
      manufacturers: "Hardware, peripherals, and networking vendors per contract scope",
      description: "Hardware/Peripherals/Networking Equipment/Repair/Service",
      term: "3/1/2025 – 2/28/2026",
    },
    {
      contractNumber: "25-26 4O000",
      contractHolder: "vCloud Tech Inc.",
      region: "Region 2",
      manufacturers: "Audio visual equipment vendors per contract scope",
      description: "Audio Visual Equipments",
      term: "3/1/2025 – 2/28/2026",
    },
    {
      contractNumber: "25-26 6U000",
      contractHolder: "vCloud Tech Inc.",
      region: "Region 2",
      manufacturers: "Computer software vendors per contract scope",
      description: "Computer Software",
      term: "9/1/2025 – 8/31/2026",
    },
  ],
  region18: [
    {
      contractNumber: "R18-2025-02-000049",
      contractHolder: "vCloud Tech Inc.",
      region: "Region 18",
      manufacturers:
        "Acer, Acronis, APC, Apple, Cisco, Dell, EATON, Google, HP, LG, McAfee, Qualys, Quest, RedHat, Samsung, Trend Micro, Vmware, Veeam",
      description:
        "vCloud Tech is offering a wide range of IT Hardwares and Softwares to Region 18",
      term: "July 1, 2025 – June 30, 2030",
    },
  ],
  texbuy: [
    {
      contractNumber: "025-066",
      contractHolder: "vCloud Tech Inc.",
      region: "Region 16",
      manufacturers:
        "Acer, Acronis, APC, Apple, Cisco, Dell, EATON, Google, HP, LG, McAfee, Qualys, Quest, RedHat, Samsung, Trend Micro, Vmware, Veeam",
      description:
        "vCloud Tech is offering a wide range of Technology Products and Solutions to TEX BUY under this contract. See TEX BUY for further contract details.",
      term: "1 July 2025 – 30 June 2026",
    },
  ],
  setx: [
    {
      contractNumber: "20250703",
      contractHolder: "vCloud Tech Inc.",
      region: "Region 5",
      manufacturers: "Computers, peripherals, supplies, and operating systems per contract scope",
      description:
        "vCloud Tech is offering a range of Computers, Peripherals, Supplies & Operating Systems, Tech Assistance",
      term: "9/1/2025 – 8/31/2026",
    },
  ],
  "northwest-isd": [
    {
      contractNumber: "025-027-02-009",
      contractHolder: "vCloud Tech Inc.",
      region: "Texas",
      manufacturers:
        "Acer, Acronis, APC, Apple, Cisco, Dell, EATON, Google, HP, LG, McAfee, Qualys, Quest, RedHat, Samsung, Trend Micro, Veeam and many more",
      description:
        "vCloud Tech is offering a range of Technology Related Equipment, Services, Software & Supplies in this contract.",
      term: "7/1/2025 – 6/30/2026",
    },
  ],
  "frisco-isd": [
    {
      contractNumber: "875-2025-05-31",
      contractHolder: "vCloud Tech Inc.",
      region: "Texas",
      manufacturers:
        "Acer, Acronis, APC, Apple, Cisco, Dell, EATON, Google, HP, LG, McAfee, Qualys, Quest, RedHat, Samsung, Trend Micro, Veeam and many more",
      description:
        "vCloud Tech is offering a range of comprehensive technology category covering hardware, software, cloud solutions, and IT services that support the full lifecycle of tech infrastructure",
      term: "09/16/2025 – 05/11/2027",
    },
  ],
  "fort-worth-isd": [
    {
      contractNumber: "25-002-A",
      contractHolder: "vCloud Tech Inc.",
      region: "Texas",
      manufacturers:
        "Adobe, Acer, Acronis, Arista, Asus, APC Schneider, Axiom, Barracuda Networks, Checkpoint, Citrix, Eaton, Exagrid, Extreme Networks, McAfee, Solarwinds, Sophos, Symantec, Tintri, Trend Micro, Veeam, Veritas, Viewsonic, Zyxel and many more",
      description:
        "vCloud Tech offers a complete portfolio of Commercial Off-the-Shelf (COTS) software, licenses, subscriptions, and technology products, materials, services, and equipment, delivering end-to-end solutions that support every stage of the IT lifecycle — from procurement and deployment to management and ongoing support.",
      term: "04/10/2025 – 9/30/2028",
    },
    {
      contractNumber: "21-091-I",
      contractHolder: "vCloud Tech Inc.",
      region: "Texas",
      manufacturers:
        "Adobe, Acer, Acronis, Arista, Asus, APC Schneider, Axiom, Barracuda Networks, Checkpoint, Citrix, Eaton, Exagrid, Extreme Networks, McAfee, Solarwinds, Sophos, Symantec, Tintri, Trend Micro, Veeam, Veritas, Viewsonic, Zyxel and many more",
      description:
        "vCloud Tech offers a complete portfolio of Commercial Off-the-Shelf (COTS) software, licenses, subscriptions, and technology products, materials, services, and equipment, delivering end-to-end solutions that support every stage of the IT lifecycle — from procurement and deployment to management and ongoing support.",
      term: "03/14/2025 – 6/30/2026",
    },
  ],
  "edge-public": [
    {
      contractNumber: "2025-107",
      contractHolder: "vCloud Tech Inc.",
      region: "Nationwide",
      manufacturers:
        "Adobe, Acer, Acronis, Arista, Asus, APC Schneider, Axiom, Barracuda Networks, Checkpoint, Citrix, Eaton, Exagrid, Extreme Networks, McAfee, Solarwinds, Sophos, Symantec, Tintri, Trend Micro, Veeam, Veritas, Viewsonic, Zyxel and many more",
      description:
        "The Alliance for Innovation (AFI) serves as the lead contracting agency for this cooperative agreement, supporting local governments and nonprofits nationwide with cost-effective technology procurement. Through this contract, AFI enables access to high-quality computing equipment, peripherals, and related services at competitive prices. vCloud Tech provides computers and workstations, peripherals and accessories, networking and infrastructure hardware, software and licensing, public safety and field technology, and cloud and virtualization services.",
      term: "09/15/2025 – 09/10/2030",
    },
  ],
  "ohio-sts": [
    {
      contractNumber: "534354",
      contractHolder: "Carahsoft",
      region: "Statewide",
      manufacturers: "McAfee",
      description: "vCloud Tech offers McAfee via Carahsoft's Ohio STS Contract",
      term: "2026",
    },
  ],
  "tx-dir-tso-4288": [
    {
      contractNumber: "DIR-TSO-4288",
      contractHolder: "Carahsoft",
      region: "Statewide",
      manufacturers: "Docusign, Micro Focus, Ui Path, Veritas, Tableau, Trend Micro",
      description:
        "vCloud Tech offers Docusign, Micro Focus, Ui Path, Veritas, Tableau, Trend Micro Products via Carahsoft's TX DIR Contract",
      term: "February 22, 2019 – February 21, 2026",
    },
  ],
  "tx-dir-cpo-5683": [
    {
      contractNumber: "CPO-5683",
      contractHolder: "Carahsoft",
      region: "Statewide",
      manufacturers: "Gigamon",
      description: "vCloud Tech is offering Education IT Products and Services under this contract",
      term: "01/22/2030",
    },
  ],
  "tx-dir-cpo-5687": [
    {
      contractNumber: "CPO-5687",
      contractHolder: "Carahsoft",
      region: "Statewide",
      manufacturers: "Broadcom, Proofpoint, UiPath, Rapid7, OpenText, SolarWinds",
      description: "vCloud Tech is offering Software COTS and Related Services",
      term: "05/19/2031",
    },
  ],
  "tx-dir-idiq": [
    {
      contractNumber: "DIR-TSO-5677",
      contractHolder: "DLT",
      region: "Statewide",
      manufacturers: "BMC",
      description: "vCloud Tech is offering Software COTS and Related Services",
      term: "01/28/2025 – 01/28/2027",
    },
  ],
  naspo: [
    {
      contractNumber: "7-17-70-40-05 (NASPO Master Contract Number: AR2472)",
      contractHolder: "Carahsoft",
      region: "National",
      manufacturers: "Vmware, Adobe, Proofpoint, Google",
      description:
        "Software Licenses, Support (SnS), Managed Services, End User Computing, Airwatch, Cloud Subscription Services, Training, Professional Services",
      term: "Through 09/15/2026",
    },
  ],
  "ncpa-promark": [
    {
      contractNumber: "01-169",
      contractHolder: "Promark",
      region: "National",
      manufacturers: "Per NCPA contract scope",
      description: "NCPA contract via Promark",
      term: "Term end: December 14, 2023 · Expiration: December 31, 2028",
    },
  ],
  "td-snx-omnia": [
    {
      contractNumber: "R250307",
      contractHolder: "TD Synnex",
      region: "Statewide",
      manufacturers:
        "PaloAlto, HP SmartBuys, Lenovo, Cisco, Crucial, F5, Global Knowledge Training, Microsoft Software, NEC, Seagate, and many more",
      description: "TD Synnex OMNIA contract — technology products and services statewide",
      term: "October 1, 2025 – September 30, 2030",
    },
  ],
};
