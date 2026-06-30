import type { Metadata } from "next";

import { AboutLandingPage } from "@/components/about-landing/AboutLandingPage";
import { aboutPageHero } from "@/lib/design-test/about-page-content";

export const metadata: Metadata = {
  title: "About vCloudTech | AI-Driven Enterprise IT Partner",
  description: aboutPageHero.lede,
  openGraph: {
    title: "About vCloudTech | Confidence in Every Connection",
    description: aboutPageHero.lede,
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutLandingPage />;
}
