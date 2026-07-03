import { DesignTestFooter } from "@/components/marketing/DesignTestFooter";
import { DesignTestGlobalNavbar } from "@/components/marketing/global-nav";
import { HomeMeetExpertsSection } from "@/components/home/sections/meet-experts/MeetExpertsCtaSection";
import { PageIngredientBackground } from "@/components/layout/PageIngredientBackground";
import { poppins } from "@/lib/fonts/poppins";

type Props = {
  children: React.ReactNode;
};

/** Shared enterprise shell: global nav, dark page background, and footer on all site routes. */
export function MarketingLayoutShell({ children }: Props) {
  return (
    <div
      className={`design-test-lab-page ${poppins.variable} relative flex min-h-full flex-col overflow-x-clip bg-[#041329] font-sans text-white`}
    >
      <a
        href="#main-content"
        className="pointer-events-none fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 opacity-0 shadow-lg ring-1 ring-slate-200/80 transition focus:pointer-events-auto focus:translate-y-0 focus:opacity-100 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-sky-600"
      >
        Skip to main content
      </a>
      <PageIngredientBackground />
      <DesignTestGlobalNavbar />
      <main
        id="main-content"
        className="relative flex-1 outline-none [&:not(:has(#hero))]:pt-[var(--dt-nav-occupancy)]"
        data-nav-surface="dark"
        tabIndex={-1}
      >
        {children}
        <HomeMeetExpertsSection />
      </main>
      <DesignTestFooter />
    </div>
  );
}
