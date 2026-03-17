import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const limitations = [
  "Short-course structures often prioritize exposure over sustained capability development.",
  "Post-course support is frequently limited, leaving surgeons without ongoing correction loops.",
  "Outcome feedback mechanisms are often absent or too informal for reliable improvement.",
  "Progression pathways are rarely explicit, making long-term standards consistency difficult.",
];

export function ShortCourseLimitationsSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Training Context"
        title="Why traditional short-course models are insufficient"
        description="Hair restoration surgery requires more than isolated technical exposure. Development quality depends on structured progression, supervision, and review continuity."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {limitations.map((item) => (
          <Card key={item}>
            <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
