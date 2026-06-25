/** Side-only frame marks — offset from illustration, no top/bottom dashes. */
export function IndustryIllustrationDecor({ index }: { index: number }) {
  const variant = index % 3;

  return (
    <div
      className={`about-enterprise__industry-image-decor about-enterprise__industry-image-decor--v${variant}`}
      aria-hidden
    >
      <svg
        className="about-enterprise__industry-image-decor-svg"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {/* Corner slash pairs */}
        <path className="about-enterprise__industry-mark" d="M18 48 L48 18" />
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--accent" d="M28 58 L58 28" />
        <path className="about-enterprise__industry-mark" d="M382 48 L352 18" />
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--accent" d="M372 58 L342 28" />
        <path className="about-enterprise__industry-mark" d="M18 252 L48 282" />
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--accent" d="M28 242 L58 272" />
        <path className="about-enterprise__industry-mark" d="M382 252 L352 282" />
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--accent" d="M372 242 L342 272" />

        {/* Left edge — vertical dashes only */}
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--edge" d="M12 72v18" />
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--edge" d="M10 112v16" />
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--edge" d="M8 152v20" />
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--edge" d="M10 192v16" />
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--edge" d="M12 232v18" />

        {/* Right edge — vertical dashes only */}
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--edge" d="M388 72v18" />
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--edge" d="M390 112v16" />
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--edge" d="M392 152v20" />
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--edge" d="M390 192v16" />
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--edge" d="M388 232v18" />

        {/* Side accent ticks */}
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--accent" d="M22 96v14" />
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--accent" d="M22 150v14" />
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--accent" d="M22 204v14" />
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--accent" d="M378 96v14" />
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--accent" d="M378 150v14" />
        <path className="about-enterprise__industry-mark about-enterprise__industry-mark--accent" d="M378 204v14" />
      </svg>
    </div>
  );
}
