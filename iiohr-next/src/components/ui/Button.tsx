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
  "inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-3 text-[13px] font-semibold tracking-[0.04em] transition-[color,background-color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(108,132,168,0.45)] focus-visible:ring-offset-2";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-accent bg-accent text-section-charcoal hover:bg-accent-muted shadow-[0_1px_3px_0_rgba(0,0,0,0.12)] focus-visible:ring-offset-background",
  secondary:
    "border border-border bg-surface text-foreground hover:border-accent/40 hover:bg-surface-elevated focus-visible:ring-offset-background",
  ghost:
    "border border-border bg-transparent text-muted-foreground hover:border-accent/50 hover:bg-surface-elevated hover:text-foreground focus-visible:ring-offset-background",
  tertiary:
    "border-0 bg-transparent text-foreground shadow-none min-h-0 py-0 text-sm font-semibold text-accent hover:text-accent-muted focus-visible:ring-offset-background",
  dark:
    "border border-accent bg-accent text-section-charcoal hover:bg-accent-muted shadow-[0_1px_3px_0_rgba(0,0,0,0.2)] focus-visible:ring-offset-section-charcoal",
  darkSecondary:
    "border border-section-charcoal-border bg-transparent text-section-charcoal-foreground hover:bg-section-charcoal-foreground/10 focus-visible:ring-offset-section-charcoal",
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`${ctaBase} ${variantStyles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
