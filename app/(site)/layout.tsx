import { MarketingLayoutShell } from "@/components/layout/MarketingLayoutShell";

import "@/components/marketing/design-test-lab-full-width.css";
import "@/components/marketing/design-test-responsive.css";
import "@/components/marketing/design-test-typography.css";
import "@/components/home/sections/hero/minimal-hero.css";

/** Shared layout for public site routes (home, solutions, services, etc.). */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MarketingLayoutShell>{children}</MarketingLayoutShell>;
}
