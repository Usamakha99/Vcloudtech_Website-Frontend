import { dt } from "@/components/marketing/design-test-theme";

/**
 * Lightweight hero shell for marketing subpages (solutions, services, etc.).
 * Keeps typography and spacing aligned with the enterprise header.
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
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24 lg:px-8">
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
            className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${
              dark ? "text-white" : "text-slate-900"
            }`}
          >
            {title}
          </h1>
          {lede ? (
            <p
              className={`mt-5 max-w-2xl text-lg leading-relaxed ${
                dark ? dt.body : "text-slate-600"
              }`}
            >
              {lede}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
