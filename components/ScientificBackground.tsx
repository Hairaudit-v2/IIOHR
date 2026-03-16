import React from "react";

const STROKE = "#8B6B4A";
const STROKE_WIDTH = 1.4;
const OPACITY = 0.05;

export type ScientificDiagramVariant =
  | "follicle-anatomy"
  | "hair-growth-cycle"
  | "dermal-papilla";

export interface ScientificBackgroundProps {
  variant: ScientificDiagramVariant;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

/** Hair follicle anatomy: shaft, bulge, sebaceous gland, root sheaths, dermal papilla */
function FollicleAnatomySvg() {
  return (
    <svg
      viewBox="0 0 200 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="scientific-watermark__svg"
      aria-hidden
    >
      {/* Skin surface */}
      <path d="M70 20 L130 20" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      {/* Follicle canal / infundibulum */}
      <path d="M95 20 L100 55 M105 20 L100 55" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      {/* Sebaceous gland */}
      <ellipse cx="100" cy="65" rx="18" ry="12" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      {/* Bulge region */}
      <path d="M82 85 Q100 78 118 85" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      {/* Outer root sheath */}
      <path d="M88 90 L92 200 M112 90 L108 200" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      {/* Inner root sheath / hair shaft */}
      <path d="M96 55 L98 195 M104 55 L102 195" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      {/* Matrix / bulb contour */}
      <path d="M90 200 Q100 215 110 200" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      {/* Dermal papilla */}
      <ellipse cx="100" cy="235" rx="22" ry="28" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      <circle cx="100" cy="268" r="8" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
    </svg>
  );
}

/** Hair growth cycle: anagen, catagen, telogen phases */
function HairGrowthCycleSvg() {
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="scientific-watermark__svg"
      aria-hidden
    >
      {/* Anagen: full follicle */}
      <path d="M50 25 L50 95" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      <ellipse cx="50" cy="115" rx="18" ry="22" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      <circle cx="50" cy="142" r="6" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      {/* Catagen: regressing */}
      <path d="M160 30 L158 75 Q162 95 160 110" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      <ellipse cx="160" cy="128" rx="12" ry="18" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      <circle cx="160" cy="148" r="5" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      {/* Telogen: resting / club hair */}
      <path d="M270 35 L270 88" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      <path d="M266 92 Q270 100 274 92" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      <ellipse cx="270" cy="115" rx="10" ry="14" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      <circle cx="270" cy="132" r="4" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      {/* Cycle arc label area (decorative arc) */}
      <path
        d="M55 165 Q160 130 265 165"
        stroke={STROKE}
        strokeWidth={STROKE_WIDTH}
        fill="none"
      />
    </svg>
  );
}

/** Dermal papilla cross section: papilla + surrounding matrix/cells */
function DermalPapillaSvg() {
  return (
    <svg
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="scientific-watermark__svg"
      aria-hidden
    >
      {/* Outer follicle boundary */}
      <ellipse cx="110" cy="110" rx="75" ry="85" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      {/* Concentric layers */}
      <ellipse cx="110" cy="110" rx="55" ry="62" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      <ellipse cx="110" cy="110" rx="38" ry="42" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      {/* Dermal papilla (cross section) */}
      <circle cx="110" cy="115" r="22" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      <circle cx="110" cy="115" r="12" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      {/* Radial matrix lines */}
      <path d="M88 95 L110 115 L132 95" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      <path d="M95 130 L110 115 L125 130" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      <path d="M85 115 L110 115 L135 115" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
      <path d="M100 88 L110 115 L100 142" stroke={STROKE} strokeWidth={STROKE_WIDTH} />
    </svg>
  );
}

function getDiagram(variant: ScientificDiagramVariant) {
  switch (variant) {
    case "follicle-anatomy":
      return <FollicleAnatomySvg />;
    case "hair-growth-cycle":
      return <HairGrowthCycleSvg />;
    case "dermal-papilla":
      return <DermalPapillaSvg />;
    default:
      return <FollicleAnatomySvg />;
  }
}

/**
 * Renders a section with a faint scientific diagram as a watermark background.
 * Section wrapper = relative; background = absolute inset-0 z-0 pointer-events-none;
 * content = relative z-10. Diagrams are scaled large (~30–40% in viewport) and slightly rotated.
 */
export function ScientificBackground({
  variant,
  children,
  className = "",
  contentClassName = "",
}: ScientificBackgroundProps) {
  return (
    <section className={`scientific-watermark-wrap ${className}`.trim()} style={{ position: "relative" }}>
      <div
        className="scientific-watermark-layer"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "visible",
        }}
      >
        <div
          className="scientific-watermark-diagram"
          style={{
            position: "absolute",
            width: "320%",
            height: "320%",
            maxWidth: "none",
            maxHeight: "none",
            left: "-55%",
            top: "-45%",
            transform: "rotate(-6deg)",
            transformOrigin: "center center",
          }}
        >
          <div style={{ opacity: OPACITY }}>{getDiagram(variant)}</div>
        </div>
      </div>
      <div
        className={`scientific-watermark-content ${contentClassName}`.trim()}
        style={{ position: "relative", zIndex: 10 }}
      >
        {children}
      </div>
    </section>
  );
}

export default ScientificBackground;
