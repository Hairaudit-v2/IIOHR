import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/** Paper-like content panel — training manual style, soft border, minimal shadow */
export function Card({ children, className = "" }: CardProps) {
  return (
    <article
      className={`min-w-0 rounded-md border border-border bg-surface p-6 shadow-[0_1px_3px_0_rgba(44,42,38,0.06)] md:p-7 ${className}`}
    >
      {children}
    </article>
  );
}
