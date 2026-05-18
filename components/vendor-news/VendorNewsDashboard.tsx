"use client";

import { useEffect } from "react";

import { useVendorNewsFeedStore } from "@/stores/vendor-news-feed-store";

import { VendorNewsFilterBar } from "./VendorNewsFilterBar";
import { VendorNewsGrid } from "./VendorNewsGrid";

export function VendorNewsDashboard() {
  const loadFeeds = useVendorNewsFeedStore((s) => s.loadFeeds);

  useEffect(() => {
    void loadFeeds();
  }, [loadFeeds]);

  return (
    <div className="min-h-full bg-[#f8f9fb]">
      <header className="border-b border-slate-200/90 bg-white pt-8 sm:pt-10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.75rem]">
            Vendor news
          </h1>
        </div>
      </header>

      <VendorNewsFilterBar />
      <VendorNewsGrid />
    </div>
  );
}
