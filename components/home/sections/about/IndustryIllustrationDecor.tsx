type SideDash = { d: string };

type DashSpec = {
  x: number;
  y: number;
  len: number;
  angle: number;
};

function specToDash(spec: DashSpec, mirror = false): SideDash {
  const rad = (spec.angle * Math.PI) / 180;
  const dx = Math.cos(rad) * spec.len;
  const dy = Math.sin(rad) * spec.len;
  let x1 = spec.x;
  let y1 = spec.y;
  let x2 = x1 + dx;
  let y2 = y1 + dy;

  if (mirror) {
    x1 = 400 - x1;
    x2 = 400 - x2;
  }

  return {
    d: `M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`,
  };
}

/** Slightly offset specs per card so sides feel organic, not mechanical. */
const leftDashSets: DashSpec[][] = [
  [
    { x: 11, y: 34, len: 7, angle: 92 },
    { x: 15, y: 56, len: 6, angle: 84 },
    { x: 12, y: 79, len: 8, angle: 97 },
    { x: 14, y: 101, len: 5, angle: 88 },
    { x: 10, y: 123, len: 7, angle: 95 },
    { x: 16, y: 147, len: 6, angle: 81 },
    { x: 13, y: 169, len: 8, angle: 90 },
    { x: 11, y: 192, len: 5, angle: 86 },
    { x: 15, y: 214, len: 7, angle: 93 },
    { x: 12, y: 238, len: 6, angle: 89 },
    { x: 14, y: 262, len: 7, angle: 96 },
  ],
  [
    { x: 13, y: 40, len: 6, angle: 87 },
    { x: 10, y: 63, len: 8, angle: 94 },
    { x: 16, y: 86, len: 5, angle: 82 },
    { x: 12, y: 110, len: 7, angle: 91 },
    { x: 14, y: 131, len: 6, angle: 98 },
    { x: 11, y: 156, len: 8, angle: 85 },
    { x: 15, y: 178, len: 5, angle: 92 },
    { x: 13, y: 201, len: 7, angle: 88 },
    { x: 10, y: 224, len: 6, angle: 96 },
    { x: 16, y: 246, len: 8, angle: 83 },
    { x: 12, y: 268, len: 6, angle: 90 },
  ],
  [
    { x: 12, y: 37, len: 8, angle: 90 },
    { x: 14, y: 61, len: 5, angle: 95 },
    { x: 11, y: 83, len: 7, angle: 86 },
    { x: 16, y: 106, len: 6, angle: 93 },
    { x: 10, y: 128, len: 8, angle: 88 },
    { x: 13, y: 152, len: 5, angle: 84 },
    { x: 15, y: 174, len: 7, angle: 97 },
    { x: 12, y: 197, len: 6, angle: 91 },
    { x: 14, y: 219, len: 8, angle: 87 },
    { x: 11, y: 242, len: 5, angle: 94 },
    { x: 16, y: 265, len: 7, angle: 89 },
  ],
];

/** Irregular curved-side dashes — random spacing along left/right edges. */
export function IndustryIllustrationDecor({ index }: { index: number }) {
  const variant = index % 3;
  const leftSpecs = leftDashSets[variant] ?? leftDashSets[0];
  const leftDashes = leftSpecs.map((spec) => specToDash(spec));
  const rightDashes = leftSpecs.map((spec) => specToDash(spec, true));

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
        {leftDashes.map((dash, i) => (
          <path
            key={`l-${i}`}
            className="about-enterprise__industry-mark about-enterprise__industry-mark--side-dash"
            d={dash.d}
          />
        ))}

        {rightDashes.map((dash, i) => (
          <path
            key={`r-${i}`}
            className="about-enterprise__industry-mark about-enterprise__industry-mark--side-dash"
            d={dash.d}
          />
        ))}
      </svg>
    </div>
  );
}
