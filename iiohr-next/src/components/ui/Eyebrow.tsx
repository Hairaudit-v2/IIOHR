interface EyebrowProps {
  children: string;
  className?: string;
  /** Dark charcoal sections (hero, final CTA) — light label treatment */
  variant?: "light" | "dark";
}

/** Small chapter label — gold-tinged border on cream; soft ivory on charcoal */
export function Eyebrow({ children, className = "", variant = "light" }: EyebrowProps) {
  const tone =
    variant === "dark"
      ? "border-section-charcoal-border/65 bg-section-charcoal-foreground/[0.08] text-section-charcoal-muted"
      : "border-accent/35 bg-surface/72 text-heading";
  return (
    <p
      className={`inline-block border px-3 py-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase md:text-[11px] ${tone} ${className}`}
    >
      {children}
    </p>
  );
}
