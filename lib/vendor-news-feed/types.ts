import type { VendorNewsFeedId, VendorNewsFeedType } from "./vendors";

export type VendorNewsArticle = {
  id: string;
  vendorId: VendorNewsFeedId;
  title: string;
  excerpt: string;
  link: string;
  publishedAt: string | null;
  type: VendorNewsFeedType;
  tag: string;
};

export type VendorNewsFeedApiResponse = {
  articles: VendorNewsArticle[];
  fetchedAt: string;
};
