import Link from "next/link";

import { type VendorNewsTabId, VENDOR_NEWS_TABS } from "@/lib/vendor-news-vendors";

type Props = {
  todayLabel: string;
  todayIso: string;
  activeVendor?: VendorNewsTabId;
};

function navClasses(active: boolean) {
  return active
    ? "border-b-2 border-neutral-950 pb-0.5 font-semibold text-neutral-950"
    : "text-neutral-600 transition hover:text-neutral-950";
}

export function NewsPaperMasthead({ todayLabel, todayIso, activeVendor }: Props) {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <time
          dateTime={todayIso}
          className="shrink-0 text-[13px] font-medium tabular-nums text-neutral-800"
        >
          {todayLabel}
        </time>

        <nav
          aria-label="News sections"
          className="hidden min-w-0 flex-1 justify-center md:flex"
        >
          <ul className="flex max-w-full flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[13px]">
            <li>
              <Link
                href="/vendor-updates"
                className={navClasses(!activeVendor)}
                scroll={false}
              >
                All
              </Link>
            </li>
            {VENDOR_NEWS_TABS.map((tab) => (
              <li key={tab.id}>
                <Link
                  href={`/vendor-updates?vendor=${tab.id}`}
                  className={navClasses(activeVendor === tab.id)}
                  scroll={false}
                >
                  {tab.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/posts" className="text-neutral-600 transition hover:text-neutral-950">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-neutral-600 transition hover:text-neutral-950">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <details className="relative md:hidden">
          <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center border border-neutral-300 bg-neutral-950 text-lg font-bold text-white [&::-webkit-details-marker]:hidden">
            ···
          </summary>
          <div className="absolute right-0 z-40 mt-1 w-52 border border-neutral-200 bg-white py-2 shadow-lg">
            <Link href="/vendor-updates" className="block px-4 py-2 text-sm hover:bg-neutral-50">
              All news
            </Link>
            {VENDOR_NEWS_TABS.map((tab) => (
              <Link
                key={tab.id}
                href={`/vendor-updates?vendor=${tab.id}`}
                className="block px-4 py-2 text-sm hover:bg-neutral-50"
              >
                {tab.label}
              </Link>
            ))}
            <Link href="/posts" className="block px-4 py-2 text-sm hover:bg-neutral-50">
              Blog
            </Link>
            <Link href="/contact" className="block px-4 py-2 text-sm hover:bg-neutral-50">
              Contact
            </Link>
          </div>
        </details>

        <Link
          href="/"
          className="hidden text-[13px] font-semibold text-sky-600 hover:text-sky-800 md:inline"
        >
          vCloudTech.com
        </Link>
      </div>
    </header>
  );
}
