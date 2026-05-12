import type { Metadata } from "next";

import { MarketingDocPage } from "@/components/layout/MarketingDocPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about vCloudTech—enterprise IT solutions, procurement, and cloud services.",
};

export default function AboutPage() {
  return (
    <MarketingDocPage
      title="About vCloudTech"
      lede="We help enterprises adopt, secure, and run modern IT—with the discipline expected of a long-term technology partner."
    />
  );
}
