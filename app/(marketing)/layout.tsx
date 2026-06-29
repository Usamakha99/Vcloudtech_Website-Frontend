import { MarketingLayoutShell } from "@/components/layout/MarketingLayoutShell";

import "@/components/design-test/design-test-lab-full-width.css";
import "@/components/design-test/design-test-responsive.css";
import "@/components/design-test/design-test-typography.css";
import "@/components/home/sections/hero/minimal-hero.css";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MarketingLayoutShell>{children}</MarketingLayoutShell>;
}
