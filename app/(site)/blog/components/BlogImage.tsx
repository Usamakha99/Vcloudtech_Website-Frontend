import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "unoptimized">;

/** Sanity CDN images bypass Next.js optimization to avoid proxy timeouts. */
export function BlogImage(props: Props) {
  return <Image {...props} unoptimized />;
}
