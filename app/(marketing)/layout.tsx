import { MarketingLayoutShell } from "@/components/layout/MarketingLayoutShell";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MarketingLayoutShell>{children}</MarketingLayoutShell>;
}
