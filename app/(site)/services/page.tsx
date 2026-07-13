import type { Metadata } from "next";

import { ServicesLandingPage } from "@/components/services-landing/ServicesLandingPage";
import { servicesPageHero } from "@/lib/marketing/services-page-content";

export const metadata: Metadata = {
  title: "Services | vCloudTech",
  description: servicesPageHero.lede,
  openGraph: {
    title: "Services | vCloudTech",
    description: servicesPageHero.lede,
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesLandingPage />;
}
