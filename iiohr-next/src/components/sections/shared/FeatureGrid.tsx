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
}

export function FeatureGrid({
  eyebrow,
  title,
  description,
  items,
  muted = false,
  dark = false,
}: FeatureGridProps) {
  return (
    <SectionShell muted={muted} dark={dark}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {items.map((item) => (
          <Card
            key={item}
            className={dark ? "border-white/20 bg-white/5 shadow-none" : ""}
          >
            <h3 className="text-lg leading-snug font-semibold tracking-tight">{item}</h3>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
