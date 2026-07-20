import { dt } from "@/components/marketing/design-test-theme";

/**
 * Lightweight hero shell for marketing subpages (solutions, services, etc.).
 * Left-aligned title/lede — matches other marketing heroes (homepage hero unchanged).
 */
export function MarketingDocPage({
  eyebrow = "vCloudTech",
  title,
  lede,
  theme = "light",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  /** Dark matches site theme (#041329); light for legacy placeholder pages. */
  theme?: "light" | "dark";
}) {
  const dark = theme === "dark";

  return (
    <div
      className={dark ? "min-h-full bg-transparent text-white" : "min-h-full bg-white text-slate-900"}
      data-nav-surface={dark ? "dark" : undefined}
    >
      <div
        className={
          dark
            ? "border-b border-white/10 bg-transparent"
            : "border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-white"
        }
      >
        <div className="w-full px-[var(--site-align-x,clamp(0.75rem,4vw,3rem))] py-20 text-left sm:py-24">
          <div className="w-full max-w-[var(--site-hero-copy-max,40.625rem)]">
            <p
              className={
                dark
                  ? dt.metaLabel
                  : "text-xs font-semibold uppercase tracking-[0.2em] text-sky-700"
              }
            >
              {eyebrow}
            </p>
            <h1
              className={`mt-3 whitespace-nowrap text-[clamp(1.875rem,4.2vw,3.125rem)] font-semibold leading-[1.08] tracking-[-0.035em] max-sm:whitespace-normal sm:text-[clamp(2.125rem,4.5vw,3.375rem)] ${
                dark ? "text-white" : "text-slate-900"
              }`}
            >
              {title}
            </h1>
            {lede ? (
              <p
                className={`mt-5 max-w-[650px] text-[0.9375rem] leading-relaxed sm:text-[1.0625rem] ${
                  dark ? dt.body : "text-slate-600"
                }`}
              >
                {lede}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
