import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";

interface FeatureGridProps {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  muted?: boolean;
  dark?: boolean;
  /** Optional content below the grid (e.g. contextual internal links). */
  footer?: ReactNode;
}

export function FeatureGrid({
  eyebrow,
  title,
  description,
  items,
  muted = false,
  dark = false,
  footer,
}: FeatureGridProps) {
  return (
    <SectionShell muted={muted} dark={dark}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-16 grid gap-6 lg:mt-20 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item} interactive dark={dark}>
            <h3 className="text-lg leading-snug font-semibold tracking-tight">{item}</h3>
          </Card>
        ))}
      </div>
      {footer ? <div className="mt-16 pt-4">{footer}</div> : null}
    </SectionShell>
  );
}
