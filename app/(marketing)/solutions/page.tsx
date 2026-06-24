import type { Metadata } from "next";

import { MarketingDocPage } from "@/components/layout/MarketingDocPage";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "AI data center solutions plus cloud, security, and platform offerings for enterprise organizations.",
};

export default function SolutionsPage() {
  return (
    <MarketingDocPage
      title="Enterprise solutions"
      lede="Purpose-built offerings across cloud, security, and platforms—designed for procurement, compliance, and scale."
    />
  );
}
