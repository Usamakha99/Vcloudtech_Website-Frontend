export const VENDOR_NEWS_FEED_VENDORS = [
  {
    id: "aws",
    label: "AWS",
    color: "#FF9900",
    feedUrl: "https://aws.amazon.com/about-aws/whats-new/recent/feed/",
  },
  {
    id: "microsoft",
    label: "Microsoft",
    color: "#0078D4",
    feedUrl: "https://azure.microsoft.com/en-us/blog/feed/",
  },
  {
    id: "dell",
    label: "Dell",
    color: "#007DB8",
    feedUrl: "https://www.dell.com/en-us/blog/feed/",
    feedUrlFallback: "https://investors.delltechnologies.com/rss/news-releases.xml",
  },
  {
    id: "hpe",
    label: "HPE",
    color: "#01A982",
    feedUrl: "https://www.hpe.com/us/en/newsroom/feed.rss",
    feedUrlFallback: "https://community.hpe.com/hpeb/rss?board.id=enterprise-services-news",
  },
  {
    id: "google",
    label: "Google Cloud",
    color: "#4285F4",
    feedUrl: "https://cloudblog.withgoogle.com/rss/",
  },
] as const;

export type VendorNewsFeedId = (typeof VENDOR_NEWS_FEED_VENDORS)[number]["id"];

export const VENDOR_NEWS_FEED_TYPES = ["blog", "research", "announcement"] as const;

export type VendorNewsFeedType = (typeof VENDOR_NEWS_FEED_TYPES)[number];

export const VENDOR_NEWS_FEED_TYPE_LABELS: Record<VendorNewsFeedType, string> = {
  blog: "Blog",
  research: "Research",
  announcement: "Announcement",
};

export function getVendorNewsFeedColor(id: VendorNewsFeedId): string {
  return VENDOR_NEWS_FEED_VENDORS.find((v) => v.id === id)?.color ?? "#64748b";
}

export function getVendorNewsFeedLabel(id: VendorNewsFeedId): string {
  return VENDOR_NEWS_FEED_VENDORS.find((v) => v.id === id)?.label ?? id;
}
