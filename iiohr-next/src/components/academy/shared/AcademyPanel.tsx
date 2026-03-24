import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

interface AcademyPanelProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function AcademyPanel({ title, children, className = "" }: AcademyPanelProps) {
  return (
    <Card className={className}>
      <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-readable-muted">{children}</div>
    </Card>
  );
}
