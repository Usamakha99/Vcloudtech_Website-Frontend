import type { Metadata } from "next";

import { VendorNewsDashboard } from "@/components/vendor-news/VendorNewsDashboard";

export const metadata: Metadata = {
  title: "Vendor news | vCloudTech",
  description:
    "Live vendor headlines from AWS, Microsoft, Dell, HPE, and Google Cloud — filter by vendor and content type.",
};

export default function VendorNewsPage() {
  return <VendorNewsDashboard />;
}
