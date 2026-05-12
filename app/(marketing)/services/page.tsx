import type { Metadata } from "next";

import { MarketingDocPage } from "@/components/layout/MarketingDocPage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional and managed services for cloud, security, and enterprise IT from vCloudTech.",
};

export default function ServicesPage() {
  return (
    <MarketingDocPage
      title="Services"
      lede="Advisory, implementation, and managed operations tailored to enterprise governance and uptime requirements."
    />
  );
}
