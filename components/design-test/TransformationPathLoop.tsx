"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

/** Spacious canvas — room for 8 labels around a wide horizontal ∞ */
const VB_W = 1280;
const VB_H = 560;
const CX = 640;
const CY = 278;
const LOOP_A = 318;
const LOOP_FLAT = 0.46;

const NODE_FILLS = [
  "#8f5c32",
  "#9a6234",
  "#a86838",
  "#b87440",
  "#c87941",
  "#d06828",
  "#dc5c18",
  "#b3b3b3",
] as const;

function buildInfinityPath(cx: number, cy: number, a: number, flat: number, steps = 180): string {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const sinT = Math.sin(t);
    const cosT = Math.cos(t);
    const den = 1 + sinT * sinT;
    const x = cx + (a * cosT) / den;
    const y = cy + (flat * a * sinT * cosT) / den;
    d += `${i === 0 ? "M" : " L"}${x.toFixed(2)},${y.toFixed(2)}`;
  }
  return d;
}

export const INFINITY_PATH = buildInfinityPath(CX, CY, LOOP_A, LOOP_FLAT);

/**
 * Clockwise 1→8 on the curve (left loop top → right loop bottom).
 * Target coords pick the correct arc region before snapping to the path.
 */
const NODE_DEFS = [
  {
    step: "1",
    title: "Clarify Vision & Strategy",
    target: { x: CX - 72, y: CY - 66 },
  },
  {
    step: "2",
    title: "Analyze Current State",
    target: { x: CX - 210, y: CY - 72 },
  },
  {
    step: "3",
    title: "Quantify Financial Impacts & Risk",
    target: { x: CX - 318, y: CY },
  },
  {
    step: "4",
    title: "Design Future State",
    target: { x: CX - 210, y: CY + 72 },
  },
  {
    step: "5",
    title: "Drive Organizational Alignment",
    target: { x: CX + 72, y: CY + 66 },
  },
  {
    step: "6",
    title: "Finalize Plan & Roadmap",
    target: { x: CX + 210, y: CY - 72 },
  },
  {
    step: "7",
    title: "Implement & Deliver",
    target: { x: CX + 318, y: CY },
  },
  {
    step: "8",
    title: "Build Realization Program & Continuous Improvement",
    target: { x: CX + 210, y: CY + 72 },
  },
] as const;

type PathPoint = { x: number; y: number };
type Sample = PathPoint & { d: number };

type NodeLayout = PathPoint & {
  step: string;
  title: string;
  fill: string;
  wide: boolean;
};

function closestOnPath(samples: Sample[], tx: number, ty: number): Sample {
  return samples.reduce(
    (best, p) => {
      const dist = (p.x - tx) ** 2 + (p.y - ty) ** 2;
      return dist < best.dist ? { sample: p, dist } : best;
    },
    { sample: samples[0], dist: Infinity },
  ).sample;
}

function snapNodesToPath(pathEl: SVGPathElement): NodeLayout[] {
  const total = pathEl.getTotalLength();
  const samples: Sample[] = [];

  for (let i = 0; i <= 1200; i++) {
    const d = (total * i) / 1200;
    const pt = pathEl.getPointAtLength(d);
    samples.push({ x: pt.x, y: pt.y, d });
  }

  return NODE_DEFS.map((def, i) => {
    const pt = closestOnPath(samples, def.target.x, def.target.y);
    return {
      x: pt.x,
      y: pt.y,
      step: def.step,
      title: def.title,
      fill: NODE_FILLS[i],
      wide: def.title.length > 34,
    };
  });
}

function toPercent(x: number, y: number) {
  return { left: `${(x / VB_W) * 100}%`, top: `${(y / VB_H) * 100}%` };
}

/** Horizontal figure-8 lifecycle path — 8 nodes, collision-free labels. */
export function TransformationPathLoop({ active }: { active: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [nodes, setNodes] = useState<NodeLayout[] | null>(null);
  const ease = [0.22, 1, 0.36, 1] as const;

  useLayoutEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    setNodes(snapNodesToPath(el));
  }, []);

  return (
    <div className="why-choose__path-loop">
      <div className="why-choose__path-canvas" aria-label="Transformation path">
        <svg
          className="why-choose__path-svg"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <linearGradient id="why-path-stroke" gradientUnits="userSpaceOnUse" x1="80" y1="0" x2="1200" y2="0">
              <stop offset="0%" stopColor="#8f5c32" />
              <stop offset="50%" stopColor="#C87941" />
              <stop offset="100%" stopColor="#b3b3b3" />
            </linearGradient>
            <filter id="why-path-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            ref={pathRef}
            className={`why-choose__path-line why-choose__path-line--bg ${active ? "is-visible" : ""}`}
            d={INFINITY_PATH}
            pathLength={1}
          />
          <path
            className={`why-choose__path-line why-choose__path-line--draw ${active ? "is-drawn" : ""}`}
            d={INFINITY_PATH}
            pathLength={1}
            filter="url(#why-path-glow)"
          />

          {nodes?.map((node, index) => (
            <g
              key={node.step}
              className={`why-choose__path-node ${active ? "is-visible" : ""}`}
              style={{ transitionDelay: `${0.45 + index * 0.05}s` }}
            >
              <circle className="why-choose__path-node-fill" cx={node.x} cy={node.y} r="13" fill={node.fill} />
              <text
                className="why-choose__path-node-num"
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="central"
              >
                {node.step}
              </text>
            </g>
          ))}
        </svg>

        {nodes ? (
          <ol className="why-choose__path-labels">
            {nodes.map((node, index) => (
              <motion.li
                key={node.step}
                className={[
                  "why-choose__path-label",
                  `why-choose__path-label--step-${node.step}`,
                  node.wide ? "why-choose__path-label--wide" : "",
                ].join(" ")}
                style={toPercent(node.x, node.y)}
                initial={{ opacity: 0, y: 6 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.4, delay: 0.55 + index * 0.05, ease }}
              >
                <p className="why-choose__path-label-title">{node.title}</p>
              </motion.li>
            ))}
          </ol>
        ) : null}
      </div>

      <ol className="why-choose__path-fallback">
        {NODE_DEFS.map((def, index) => (
          <li
            key={def.step}
            className={`why-choose__path-fallback-item ${active ? "is-visible" : ""}`}
            style={{
              transitionDelay: active ? `${index * 0.04}s` : undefined,
              ["--path-node-color" as string]: NODE_FILLS[index],
            }}
          >
            <span className="why-choose__path-fallback-dot">{def.step}</span>
            <p className="why-choose__path-label-title">{def.title}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
