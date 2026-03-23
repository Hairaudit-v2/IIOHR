interface EyebrowProps {
  children: string;
  className?: string;
  /** Dark charcoal sections (hero, final CTA) — light label treatment */
  variant?: "light" | "dark";
}

/** Small chapter label — plain text emphasis (no box treatment). */
export function Eyebrow({ children, className = "", variant = "light" }: EyebrowProps) {
  const tone =
    variant === "dark"
      ? "text-[#d1d5db]"
      : "text-heading";
  return (
    <p
      className={`inline-block text-[0.84rem] font-bold tracking-[0.08em] uppercase md:text-[0.9rem] ${tone} ${className}`}
    >
      {children}
    </p>
  );
}
