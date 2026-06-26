import type { Metadata } from "next";

import { ContactLandingPage } from "@/components/design-test/contact-landing/ContactLandingPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact vCloudTech to speak with solutions architecture and enterprise IT experts.",
};

export default function ContactPage() {
  return <ContactLandingPage />;
}
