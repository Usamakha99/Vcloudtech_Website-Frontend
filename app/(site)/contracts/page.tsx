import type { Metadata } from "next";

import { ContractsLandingPage } from "@/components/contracts-landing/ContractsLandingPage";
import { contractsPageHero } from "@/lib/marketing/contracts-page-content";

export const metadata: Metadata = {
  title: "Contracts | vCloudTech",
  description: contractsPageHero.lede,
  openGraph: {
    title: "Contracts | vCloudTech",
    description: contractsPageHero.lede,
    type: "website",
  },
};

export default function ContractsPage() {
  return <ContractsLandingPage />;
}
