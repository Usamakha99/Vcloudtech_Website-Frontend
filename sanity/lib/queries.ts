import { defineQuery } from "next-sanity";

/** Post cards / listing */
export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    "authorName": author->name
  }
`);

/** Single post by slug (includes Portable Text body) */
export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    body,
    "author": author->{ name, image }
  }
`);

/** Vendor updates (AI pipeline → Sanity) — legacy cap; prefer paginated queries below */
export const VENDOR_UPDATES_QUERY = defineQuery(`
  *[_type == "vendorUpdate" && defined(slug.current)] | order(publishedAt desc) [0...50] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    vendor,
    category,
    tags,
    summary,
    businessImpact,
    sourceUrl
  }
`);

const vendorNewsCardFields = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  vendor,
  category,
  tags,
  summary,
  businessImpact,
  sourceUrl
`;

/** Combined title + summary for content-type keyword matching. */
const vendorNewsSearchText = `lower(coalesce(title, "") + " " + coalesce(summary, ""))`;

/** GROQ: content-type filter via title + summary keywords (`$filterType` = `"all"` | blog | research | announcement). */
const vendorNewsTypeFilter = `
  $filterType == "all" ||
  (
    $filterType == "research" && (
      ${vendorNewsSearchText} match "*research*" ||
      ${vendorNewsSearchText} match "*study*" ||
      ${vendorNewsSearchText} match "*survey*" ||
      ${vendorNewsSearchText} match "*report*" ||
      ${vendorNewsSearchText} match "*analyst*" ||
      ${vendorNewsSearchText} match "*whitepaper*" ||
      ${vendorNewsSearchText} match "*benchmark*"
    )
  ) ||
  (
    $filterType == "announcement" && (
      ${vendorNewsSearchText} match "*announce*" ||
      ${vendorNewsSearchText} match "*partnership*" ||
      ${vendorNewsSearchText} match "*launch*" ||
      ${vendorNewsSearchText} match "*available*" ||
      ${vendorNewsSearchText} match "*introducing*" ||
      ${vendorNewsSearchText} match "*preview*"
    )
  ) ||
  (
    $filterType == "blog" &&
    !(
      ${vendorNewsSearchText} match "*research*" ||
      ${vendorNewsSearchText} match "*study*" ||
      ${vendorNewsSearchText} match "*survey*" ||
      ${vendorNewsSearchText} match "*report*" ||
      ${vendorNewsSearchText} match "*analyst*" ||
      ${vendorNewsSearchText} match "*whitepaper*" ||
      ${vendorNewsSearchText} match "*benchmark*"
    ) &&
    !(
      ${vendorNewsSearchText} match "*announce*" ||
      ${vendorNewsSearchText} match "*partnership*" ||
      ${vendorNewsSearchText} match "*launch*" ||
      ${vendorNewsSearchText} match "*available*" ||
      ${vendorNewsSearchText} match "*introducing*" ||
      ${vendorNewsSearchText} match "*preview*"
    )
  )
`;

/** Total vendor news rows (optional vendor: use `"all"` when unfiltered). */
export const VENDOR_UPDATES_COUNT_QUERY = defineQuery(`
  count(*[
    _type == "vendorUpdate" &&
    defined(slug.current) &&
    ($filterVendor == "all" || vendor == $filterVendor) &&
    (${vendorNewsTypeFilter})
  ])
`);

/** One page of vendor news — `$start` / `$end` GROQ slice (end exclusive), e.g. 0…10 for first 10. */
export const VENDOR_UPDATES_PAGE_QUERY = defineQuery(`
  *[
    _type == "vendorUpdate" &&
    defined(slug.current) &&
    ($filterVendor == "all" || vendor == $filterVendor) &&
    (${vendorNewsTypeFilter})
  ] | order(publishedAt desc) [$start...$end] {
    ${vendorNewsCardFields}
  }
`);

/** Global recent items for “Trending” / right column (always unfiltered). */
export const VENDOR_NEWS_TRENDING_QUERY = defineQuery(`
  *[_type == "vendorUpdate" && defined(slug.current)] | order(publishedAt desc) [0...6] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    vendor,
    category,
    summary
  }
`);

/** Platform article count for footer snapshot. */
export const VENDOR_NEWS_PLATFORM_COUNT_QUERY = defineQuery(`
  count(*[_type == "vendorUpdate" && defined(slug.current)])
`);

export const VENDOR_UPDATE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "vendorUpdate" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    vendor,
    category,
    tags,
    summary,
    businessImpact,
    sourceUrl,
    body
  }
`);

/** Lightweight fetch for `generateMetadata` on vendor news articles */
export const VENDOR_UPDATE_SEO_QUERY = defineQuery(`
  *[_type == "vendorUpdate" && slug.current == $slug][0]{
    title,
    summary
  }
`);
