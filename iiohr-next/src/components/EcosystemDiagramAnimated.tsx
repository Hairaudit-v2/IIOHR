"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Shared node relationships across all Hair Intelligence ecosystem sites. */
export const ECOSYSTEM_NODES = {
  centre: {
    id: "fi",
    name: "Follicle Intelligence",
    role: "Central engine",
  },
  satellites: [
    { id: "hairaudit", name: "HairAudit", role: "Surgical audit & scoring" },
    { id: "hli", name: "Hair Longevity Institute", role: "Diagnosis & treatment" },
    { id: "iiohr", name: "IIOHR", role: "Training & certification" },
  ],
} as const;

export type EcosystemHighlightNode = "iiohr" | "hairaudit" | "hli" | null;
export type EcosystemVariant = "light" | "dark";

export interface EcosystemDiagramAnimatedProps {
  /** Visual theme: light (default) or dark section. */
  variant?: EcosystemVariant;
  /** Which satellite node to emphasise (e.g. this site). */
  highlightNode?: EcosystemHighlightNode;
  /** Optional className for the wrapper. */
  className?: string;
  /** Optional aria-label override. */
  ariaLabel?: string;
}

const CENTRE = { x: 260, y: 170 };
const SATELLITE_POSITIONS = [
  { x: 260, y: 52 },   // top – HairAudit
  { x: 72, y: 200 },   // left – HLI
  { x: 448, y: 200 },  // right – IIOHR
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (reduced: boolean) => ({
    opacity: 1,
    transition: {
      staggerChildren: reduced ? 0 : 0.06,
      delayChildren: reduced ? 0 : 0.1,
    },
  }),
};

const itemVariants = (reduced: boolean) => ({
  hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 6 },
  visible: { opacity: 1, y: 0 },
});

export function EcosystemDiagramAnimated({
  variant = "light",
  highlightNode = "iiohr",
  className = "",
  ariaLabel = "Diagram: Follicle Intelligence at centre; HairAudit for surgical audit and scoring; Hair Longevity Institute for diagnosis and treatment; IIOHR for training and certification.",
}: EcosystemDiagramAnimatedProps) {
  const reduced = useReducedMotion();
  const isDark = variant === "dark";

  return (
    <motion.div
      role="img"
      aria-label={ariaLabel}
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={!!reduced}
    >
      <svg
        viewBox="0 0 520 340"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="w-full max-w-[32rem] h-auto mx-auto block text-[var(--color-institute, #1E2A38)]"
        style={{
          color: isDark ? "var(--color-accent, #B79A67)" : "var(--color-institute, #1E2A38)",
        }}
      >
        {/* Connectors */}
        {SATELLITE_POSITIONS.map((pos, i) => (
          <motion.line
            key={i}
            x1={CENTRE.x}
            y1={CENTRE.y}
            x2={pos.x}
            y2={pos.y}
            stroke="currentColor"
            strokeWidth={1}
            strokeOpacity={0.35}
            variants={itemVariants(!!reduced)}
          />
        ))}

        {/* Central node */}
        <motion.g variants={itemVariants(!!reduced)}>
          <circle
            cx={CENTRE.x}
            cy={CENTRE.y}
            r={44}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <circle
            cx={CENTRE.x}
            cy={CENTRE.y}
            r={36}
            fill="currentColor"
            fillOpacity={0.06}
            stroke="currentColor"
            strokeWidth={1}
          />
          <text x={CENTRE.x} y={CENTRE.y - 7} textAnchor="middle" className="text-sm font-semibold fill-current">
            {ECOSYSTEM_NODES.centre.name.split(" ")[0]}
          </text>
          <text x={CENTRE.x} y={CENTRE.y + 10} textAnchor="middle" className="text-sm font-semibold fill-current">
            {ECOSYSTEM_NODES.centre.name.split(" ")[1]}
            <tspan className="text-[0.7em] align-super">™</tspan>
          </text>
          <text x={CENTRE.x} y={CENTRE.y + 30} textAnchor="middle" className="text-[11px] font-medium fill-[var(--color-text-muted,#5A6169)]">
            {ECOSYSTEM_NODES.centre.role}
          </text>
        </motion.g>

        {/* Satellite nodes */}
        {ECOSYSTEM_NODES.satellites.map((node, i) => {
          const pos = SATELLITE_POSITIONS[i];
          const isHighlight = highlightNode === node.id;
          const isMultiLine = node.name.includes(" ");
          const [line1, line2] = node.name.split(" ");
          return (
            <motion.g key={node.id} variants={itemVariants(!!reduced)}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={28}
                fill="none"
                stroke="currentColor"
                strokeWidth={isHighlight ? 1.25 : 1}
                style={isHighlight ? { stroke: "var(--color-accent, #B79A67)" } : undefined}
              />
              {isMultiLine ? (
                <>
                  <text x={pos.x} y={pos.y - 7} textAnchor="middle" className="text-xs font-semibold fill-current">
                    {line1}
                  </text>
                  <text x={pos.x} y={pos.y + 8} textAnchor="middle" className="text-xs font-semibold fill-current">
                    {line2}
                    <tspan className="text-[0.7em] align-super">™</tspan>
                  </text>
                  <text x={pos.x} y={pos.y + 24} textAnchor="middle" className="text-[10px] font-medium fill-[var(--color-text-muted,#5A6169)]">
                    {node.role}
                  </text>
                </>
              ) : (
                <>
                  <text x={pos.x} y={pos.y - 4} textAnchor="middle" className="text-xs font-semibold fill-current">
                    {node.name}
                    <tspan className="text-[0.7em] align-super">™</tspan>
                  </text>
                  <text x={pos.x} y={pos.y + 12} textAnchor="middle" className="text-[10px] font-medium fill-[var(--color-text-muted,#5A6169)]">
                    {node.role}
                  </text>
                </>
              )}
            </motion.g>
          );
        })}
      </svg>
    </motion.div>
  );
}

export default EcosystemDiagramAnimated;
