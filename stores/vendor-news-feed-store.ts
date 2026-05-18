"use client";

import { create } from "zustand";

import type { VendorNewsArticle } from "@/lib/vendor-news-feed/types";
import type { VendorNewsFeedApiResponse } from "@/lib/vendor-news-feed/types";
import type { VendorNewsFeedId, VendorNewsFeedType } from "@/lib/vendor-news-feed/vendors";

type VendorFilter = VendorNewsFeedId | "all";
type TypeFilter = VendorNewsFeedType | "all";

type State = {
  articles: VendorNewsArticle[];
  loading: boolean;
  error: string | null;
  vendorFilter: VendorFilter;
  typeFilter: TypeFilter;
  loadFeeds: () => Promise<void>;
  setVendorFilter: (v: VendorFilter) => void;
  setTypeFilter: (t: TypeFilter) => void;
};

function filterArticles(
  articles: VendorNewsArticle[],
  vendor: VendorFilter,
  type: TypeFilter,
): VendorNewsArticle[] {
  return articles.filter((a) => {
    if (vendor !== "all" && a.vendorId !== vendor) return false;
    if (type !== "all" && a.type !== type) return false;
    return true;
  });
}

export const useVendorNewsFeedStore = create<State>((set) => ({
  articles: [],
  loading: false,
  error: null,
  vendorFilter: "all",
  typeFilter: "all",

  setVendorFilter: (vendorFilter) => set({ vendorFilter }),
  setTypeFilter: (typeFilter) => set({ typeFilter }),

  loadFeeds: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/vendor-news");
      if (!res.ok) throw new Error(`Failed to load feeds (${res.status})`);
      const data = (await res.json()) as VendorNewsFeedApiResponse;
      set({ articles: data.articles, loading: false });
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : "Could not load vendor news",
      });
    }
  },
}));

export function useFilteredVendorNews(): VendorNewsArticle[] {
  const articles = useVendorNewsFeedStore((s) => s.articles);
  const vendor = useVendorNewsFeedStore((s) => s.vendorFilter);
  const type = useVendorNewsFeedStore((s) => s.typeFilter);
  return filterArticles(articles, vendor, type);
}
