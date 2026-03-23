interface EyebrowProps {
  children: string;
  className?: string;
  /** Dark charcoal sections (hero, final CTA) — light label treatment */
  variant?: "light" | "dark";
}

/** Small chapter label — neutral border on light sections; soft ivory on dark sections. */
export function Eyebrow({ children, className = "", variant = "light" }: EyebrowProps) {
  const tone =
    variant === "dark"
      ? "border-section-charcoal-border bg-section-charcoal-foreground/[0.06] text-section-charcoal-muted"
      : "border-border bg-surface/78 text-heading";
  return (
    <p
      className={`inline-block border px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase md:text-[11px] ${tone} ${className}`}
    >
      {children}
    </p>
  );
}
