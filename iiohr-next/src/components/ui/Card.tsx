import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <article
      className={`min-w-0 rounded-xl border border-border/95 bg-surface p-6 shadow-[0_14px_30px_-24px_rgba(28,40,54,0.45)] md:p-7 ${className}`}
    >
      {children}
    </article>
  );
}
