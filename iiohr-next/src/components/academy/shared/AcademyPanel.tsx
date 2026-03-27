import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

interface AcademyPanelProps {
  title: string;
  children: ReactNode;
  className?: string;
  /** Smaller capped label above the title (editorial / deck hierarchy). */
  eyebrow?: string;
  /** Softer surface for long-form reading panels. */
  quiet?: boolean;
}

export function AcademyPanel({ title, children, className = "", eyebrow, quiet = false }: AcademyPanelProps) {
  return (
    <Card quiet={quiet} className={className}>
      {eyebrow ? (
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-readable-muted">{eyebrow}</p>
      ) : null}
      <h2 className={`text-lg font-semibold tracking-tight text-foreground ${eyebrow ? "mt-2" : ""}`}>{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-readable-muted">{children}</div>
    </Card>
  );
}
