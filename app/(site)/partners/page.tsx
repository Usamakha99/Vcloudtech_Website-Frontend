import type { Metadata } from "next";

import { PartnersLandingPage } from "@/components/partners-landing/PartnersLandingPage";
import { partnersPageHero } from "@/lib/marketing/partners-page-content";

export const metadata: Metadata = {
  title: "Partners | vCloudTech",
  description: partnersPageHero.lede,
  openGraph: {
    title: "Partners | vCloudTech",
    description: partnersPageHero.lede,
    type: "website",
  },
};

export default function PartnersPage() {
  return <PartnersLandingPage />;
}
