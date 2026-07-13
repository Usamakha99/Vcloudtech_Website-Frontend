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
};
