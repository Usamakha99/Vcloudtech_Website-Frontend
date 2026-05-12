import type { Metadata } from "next";

import { MarketingDocPage } from "@/components/layout/MarketingDocPage";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Microsoft, AWS, cloud infrastructure, cybersecurity, and data & AI solutions for enterprise organizations.",
};

export default function SolutionsPage() {
  return (
    <MarketingDocPage
      title="Enterprise solutions"
      lede="Purpose-built offerings across cloud, security, and platforms—designed for procurement, compliance, and scale."
    />
  );
}
