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
  const [primaryItem, ...supportingItems] = items;

  return (
    <SectionShell muted={muted} dark={dark}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start">
        {primaryItem ? (
          <Card interactive dark={dark} className="h-full">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Primary focus
            </p>
            <h3 className="mt-4 text-2xl leading-tight font-semibold tracking-tight text-heading md:text-[1.75rem]">
              {primaryItem}
            </h3>
          </Card>
        ) : null}
        {supportingItems.length ? (
          <ul className="list-rail">
            {supportingItems.map((item) => (
              <li key={item} className="list-rail-item">
                <p className="text-sm leading-relaxed font-medium text-foreground">{item}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {footer ? <div className="mt-16 pt-4">{footer}</div> : null}
    </SectionShell>
  );
}
