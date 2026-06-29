import type { Metadata } from "next";

import { MarketingDocPage } from "@/components/layout/MarketingDocPage";
import { ServicesGrid } from "@/components/services/ServicesGrid";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional and managed services for cloud, security, and enterprise IT from vCloudTech.",
};

export default function ServicesPage() {
  return (
    <>
      <MarketingDocPage
        theme="dark"
        title="Services"
        lede="Advisory, implementation, and managed operations tailored to enterprise governance and uptime requirements."
      />
      <ServicesGrid heading="What we deliver" subheading="" surface="glass" className="pt-0" />
    </>
  );
}
