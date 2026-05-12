import type { Metadata } from "next";

import { MarketingDocPage } from "@/components/layout/MarketingDocPage";

export const metadata: Metadata = {
  title: "Procurement",
  description:
    "Enterprise IT procurement platform and sourcing support from vCloudTech.",
};

export default function ProcurementPage() {
  return (
    <MarketingDocPage
      title="Procurement platform"
      lede="Streamlined sourcing for hardware, software, and cloud—aligned to approvals, budgets, and vendor strategy."
    />
  );
}
