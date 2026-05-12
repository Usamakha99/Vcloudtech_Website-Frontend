import Image from "next/image";

/** Processed asset (black → transparent). Regenerate with `npm run logo:knockout` after replacing `public/brand/vcloudtech-logo.png`. */
const LOGO_SRC = "/brand/vcloudtech-logo-nobg.png";

type Props = {
  className?: string;
  /** Set true in the fixed header for faster LCP. */
  priority?: boolean;
};

/**
 * Official vCloudTech logo for the UI. Uses a knockout PNG so the old solid
 * black canvas does not show on the light header. Replace
 * `public/brand/vcloudtech-logo.png`, then run `npm run logo:knockout`.
 */
export function VCloudTechLogoImage({ className, priority = false }: Props) {
  return (
    <Image
      src={LOGO_SRC}
      alt=""
      width={480}
      height={105}
      sizes="(max-width: 640px) 200px, 260px"
      priority={priority}
      className={`block leading-none ${className ?? ""}`.trim()}
    />
  );
}
