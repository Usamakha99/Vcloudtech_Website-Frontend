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

/** Vendor updates (AI pipeline → Sanity) */
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
