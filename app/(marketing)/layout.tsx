import { SiteHeader } from "@/components/layout/site-header/SiteHeader";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a
        href="#main-content"
        className="pointer-events-none fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 opacity-0 shadow-lg ring-1 ring-slate-200/80 transition focus:pointer-events-auto focus:translate-y-0 focus:opacity-100 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-sky-600"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
        {children}
      </main>
    </>
  );
}
