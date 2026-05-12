import type { Metadata } from "next";

import { MarketingDocPage } from "@/components/layout/MarketingDocPage";

export const metadata: Metadata = {
  title: "Search",
  description: "Search vCloudTech solutions, services, and resources.",
};

export default function SearchPage() {
  return (
    <MarketingDocPage
      title="Search"
      lede="Site search is coming soon. Until then, browse solutions or reach out to our team for tailored recommendations."
    />
  );
}
