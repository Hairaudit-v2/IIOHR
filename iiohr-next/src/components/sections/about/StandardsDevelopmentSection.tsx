import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const standards = [
  "Explicit progression standards from foundational exposure to advanced clinical responsibility.",
  "Review cadence that links training activity to measurable performance outcomes.",
  "Long-term development orientation rather than short-cycle certification behavior.",
  "Clinical accountability through structured supervision, feedback, and mentor-guided refinement.",
];

export function StandardsDevelopmentSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Standards and Development"
        title="Built for long-term surgical quality"
        description="The institute framework is designed to support sustained development over years, not single training events."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {standards.map((item) => (
          <Card key={item}>
            <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
