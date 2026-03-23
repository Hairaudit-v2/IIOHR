import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "tertiary" | "dark" | "darkSecondary";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

/** Shared CTA sizing and focus for consistency across sections */
const ctaBase =
  "inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-3 text-[13px] font-semibold tracking-[0.04em] transition-[color,background-color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2";

const variantStyles: Record<ButtonVariant, string> = {
  /* Primary: maximum contrast — gold fill pops against cream, strong shadow defines elevation */
  primary:
    "border-2 border-gold bg-gold text-primary font-semibold tracking-[0.04em] hover:bg-gold/90 shadow-[var(--shadow-btn-primary)] focus-visible:ring-offset-background",
  /* Secondary: clear border definition (30% opacity) — readable on cream without competing with primary */
  secondary:
    "border-2 border-foreground/30 bg-surface text-foreground font-semibold tracking-[0.03em] hover:border-accent/55 hover:bg-surface-elevated focus-visible:ring-offset-background",
  /* Ghost: visible border for identification as an actionable element (slightly lighter than secondary) */
  ghost:
    "border-2 border-foreground/25 bg-transparent text-foreground font-semibold tracking-[0.03em] hover:border-accent/50 hover:bg-surface/80 focus-visible:ring-offset-background",
  /* Tertiary: clear link appearance — underline provides identification */
  tertiary:
    "border-0 bg-transparent shadow-none min-h-0 h-auto px-0 py-0 rounded-none text-sm font-semibold link-premium focus-visible:ring-offset-background",
  /* Dark variants: maintain strong contrast on charcoal */
  dark:
    "border-2 border-gold bg-gold text-primary font-semibold tracking-[0.04em] hover:bg-gold/90 shadow-token-btn-dark focus-visible:ring-offset-section-charcoal",
  darkSecondary:
    "border-2 border-section-charcoal-border/80 bg-section-charcoal-foreground/[0.08] text-section-charcoal-foreground font-semibold tracking-[0.03em] hover:bg-section-charcoal-foreground/15 hover:border-section-charcoal-border focus-visible:ring-offset-section-charcoal",
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`${ctaBase} ${variantStyles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
