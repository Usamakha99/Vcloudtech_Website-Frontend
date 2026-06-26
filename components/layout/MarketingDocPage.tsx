/**
 * Lightweight hero shell for marketing subpages (solutions, services, etc.).
 * Keeps typography and spacing aligned with the enterprise header.
 */
export function MarketingDocPage({
  eyebrow = "vCloudTech",
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="min-h-full bg-white text-slate-900">
      <div className="border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
          {lede ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              {lede}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
