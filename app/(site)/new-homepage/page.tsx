import type { Metadata } from "next";

import { NewHomePage } from "@/app/(site)/_new-home/NewHomePage";

export const metadata: Metadata = {
  title: "New Homepage | vCloudTech",
  description:
    "Enterprise IT solutions — white-theme preview of the vCloudTech homepage experience.",
  openGraph: {
    title: "vCloudTech — New Homepage",
    description:
      "Secure, scalable infrastructure for modern enterprises. Light enterprise theme preview.",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewHomepageRoute() {
  return <NewHomePage />;
}
