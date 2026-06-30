import type { Metadata } from "next";

import { AboutLandingPage } from "@/components/about-landing/AboutLandingPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about vCloudTech—enterprise IT solutions, AI infrastructure, procurement, and cloud services.",
};

export default function AboutPage() {
  return <AboutLandingPage />;
}
