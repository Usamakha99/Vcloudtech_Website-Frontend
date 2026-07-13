import type { Metadata } from "next";

import { IndustriesLandingPage } from "@/components/industries-landing/IndustriesLandingPage";

export const metadata: Metadata = {
  title: "Industry | vCloudTech",
  description:
    "Secure, connected infrastructure for government, education, healthcare, financial services, public sector, and commercial enterprise.",
  openGraph: {
    title: "Industry | vCloudTech",
    description:
      "Secure, connected infrastructure for government, education, healthcare, financial services, public sector, and commercial enterprise.",
    type: "website",
  },
};

export default function IndustryPage() {
  return <IndustriesLandingPage />;
}
