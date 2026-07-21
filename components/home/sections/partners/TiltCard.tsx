"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";

const MAX_TILT_DEG = 8;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

type TiltCardProps = {
  className?: string;
  children: ReactNode;
};

/**
 * 3D magnetic tilt card — tracks the cursor and tilts toward it (max ±8°),
 * with a gold spotlight glow following the pointer. No external tilt library.
 */
export function TiltCard({ className, children }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const halfW = rect.width / 2 || 1;
    const halfH = rect.height / 2 || 1;
    setMouseX(x);
    setMouseY(y);
    setTilt({
      x: clamp(((x - halfW) / halfW) * MAX_TILT_DEG, -MAX_TILT_DEG, MAX_TILT_DEG),
      y: clamp((-(y - halfH) / halfH) * MAX_TILT_DEG, -MAX_TILT_DEG, MAX_TILT_DEG),
    });
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const tiltX = isHovered ? tilt.x : 0;
  const tiltY = isHovered ? tilt.y : 0;

  return (
    <div style={{ perspective: "1000px" }}>
      <div
        ref={cardRef}
        className={className}
        data-tilt={isHovered ? "on" : "off"}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${tiltY}deg) rotateY(${tiltX}deg) translateZ(10px) scale(1.03)`
            : "rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)",
          transition: isHovered
            ? "transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 200ms cubic-bezier(0.2, 0.8, 0.2, 1), border-color 200ms ease-out"
            : "transform 400ms ease-out, box-shadow 400ms ease-out, border-color 400ms ease-out",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            borderRadius: "inherit",
            pointerEvents: "none",
            background: `radial-gradient(140px circle at ${mouseX}px ${mouseY}px, rgba(201, 168, 76, 0.15), transparent 70%)`,
            opacity: isHovered ? 1 : 0,
            transition: isHovered ? "opacity 200ms ease-out" : "opacity 400ms ease-out",
          }}
        />
        {children}
      </div>
    </div>
  );
}
