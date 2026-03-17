import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-primary bg-primary text-primary-foreground shadow-[0_8px_20px_-16px_rgba(31,47,64,0.75)] hover:brightness-95",
  secondary:
    "border-accent/80 bg-surface text-foreground hover:bg-surface-elevated",
  ghost:
    "border-border bg-transparent text-muted-foreground hover:border-accent/60 hover:bg-surface-elevated hover:text-foreground",
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-lg border px-5 py-2.5 text-[13px] font-semibold tracking-[0.04em] transition-[color,background-color,border-color,box-shadow,filter] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${variantStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
