import type { Metadata } from "next";

import { HomePage } from "./_home/HomePage";

export const metadata: Metadata = {
  title: "Enterprise IT solutions",
  description:
    "vCloudTech delivers secure cloud migration, managed infrastructure, and 24/7 operations for enterprises that demand reliability and governance.",
  openGraph: {
    title: "vCloudTech — Enterprise IT solutions",
    description:
      "Secure, scalable infrastructure for modern enterprises. Migration, modernization, and always-on support.",
    type: "website",
  },
};

export default function Home() {
  return <HomePage />;
}
