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
  primary:
    "border-2 border-accent bg-accent text-primary hover:bg-accent-muted shadow-[var(--shadow-btn-primary)] focus-visible:ring-offset-background",
  secondary:
    "border-2 border-foreground/18 bg-surface text-foreground hover:border-accent/45 hover:bg-surface-elevated focus-visible:ring-offset-background",
  ghost:
    "border border-foreground/20 bg-transparent text-foreground/88 hover:border-accent/45 hover:bg-surface/80 hover:text-foreground focus-visible:ring-offset-background",
  tertiary:
    "border-0 bg-transparent text-primary shadow-none min-h-0 py-0 text-sm font-semibold underline decoration-accent/45 underline-offset-[0.2em] decoration-2 hover:text-accent hover:decoration-accent focus-visible:ring-offset-background",
  dark:
    "border-2 border-accent bg-accent text-primary hover:bg-accent-muted shadow-token-btn-dark focus-visible:ring-offset-section-charcoal",
  darkSecondary:
    "border-2 border-section-charcoal-border bg-transparent text-section-charcoal-foreground hover:bg-section-charcoal-foreground/12 hover:border-section-charcoal-border focus-visible:ring-offset-section-charcoal",
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`${ctaBase} ${variantStyles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
