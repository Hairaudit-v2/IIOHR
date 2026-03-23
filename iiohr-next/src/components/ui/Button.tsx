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
  "btn inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 text-[13px] font-semibold tracking-[0.03em] transition-[color,background-color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2";

const variantStyles: Record<ButtonVariant, string> = {
  /* Primary on light sections: near-black fill with white text. */
  primary:
    "btn-primary border border-slate-900 bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-offset-background",
  /* Secondary: neutral outline; supportive action only. */
  secondary:
    "btn-secondary border border-foreground/30 bg-surface text-foreground hover:border-foreground/45 hover:bg-surface-elevated focus-visible:ring-offset-background",
  /* Ghost: low-emphasis alternative action. */
  ghost:
    "btn-ghost border border-foreground/24 bg-transparent text-foreground hover:border-foreground/40 hover:bg-surface/72 focus-visible:ring-offset-background",
  /* Tertiary: clear link appearance — underline provides identification */
  tertiary:
    "btn-tertiary border-0 bg-transparent min-h-0 h-auto px-0 py-0 rounded-none text-sm font-semibold link-premium focus-visible:ring-offset-background",
  /* Dark sections: gold primary action with dark text. */
  dark:
    "btn-dark border border-gold bg-gold text-slate-950 hover:bg-[#b99749] focus-visible:ring-offset-section-charcoal",
  darkSecondary:
    "btn-dark-secondary border border-[rgba(255,255,255,0.14)] bg-[var(--bg-dark-elevated)] text-[#f8fafc] hover:bg-[var(--bg-dark-panel)] hover:border-[rgba(255,255,255,0.14)] focus-visible:ring-offset-section-charcoal",
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`${ctaBase} ${variantStyles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
