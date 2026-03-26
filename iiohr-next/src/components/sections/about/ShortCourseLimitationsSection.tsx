import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const limitations = [
  "Exposure without a longer development structure rarely produces consistent capability.",
  "Support after initial training is often too limited to guide correction and improvement.",
  "Review loops are frequently informal, making accountability and refinement harder to sustain.",
  "Progression standards are often unclear, so readiness is interpreted rather than defined.",
] as const;

export function ShortCourseLimitationsSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Field Context"
        title="Why the institute model is needed"
        description="Hair restoration requires more than isolated training events. It needs progression, supervision, review, and clearer standards over time."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {limitations.map((item) => (
          <Card key={item}>
            <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
