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
