import Image from "next/image";

import { publicAssets } from "@/lib/public-assets";

/** Processed asset (black → transparent). Regenerate with `npm run logo:knockout` after replacing source logo. */
const LOGO_SRC = publicAssets.brand.logo;
const LIGHT_LOGO_SRC = publicAssets.brand.logoLight;

type Props = {
  className?: string;
  /** Set true in the fixed header for faster LCP. */
  priority?: boolean;
  /** Light artwork for dark backgrounds (design-test navbar/footer). */
  variant?: "default" | "light";
};

/**
 * Official vCloudTech logo for the UI. Uses a knockout PNG so the old solid
 * black canvas does not show on the light header. Replace
 * `public/brand/vcloudtech-logo.png`, then run `npm run logo:knockout`.
 */
export function VCloudTechLogoImage({
  className,
  priority = false,
  variant = "default",
}: Props) {
  const src = variant === "light" ? LIGHT_LOGO_SRC : LOGO_SRC;

  return (
    <Image
      src={src}
      alt=""
      width={480}
      height={105}
      sizes="(max-width: 640px) 200px, 260px"
      priority={priority}
      className={`block leading-none ${className ?? ""}`.trim()}
    />
  );
}
