import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const reasons = [
  "Technique without biology can produce short-term execution but weak long-term treatment decisions.",
  "Scientific understanding improves diagnosis accuracy and reduces inappropriate procedural planning.",
  "A biology-informed framework supports safer patient selection and better expectation setting.",
  "Consistent surgeon development requires both operative discipline and scientific reasoning.",
];

export function ScienceImportanceSection() {
  return (
    <SectionShell muted className="scroll-mt-24">
      <div id="science-importance">
        <SectionHeading
          eyebrow="Why Science Matters"
          title="Hair-loss science is a core part of surgeon development"
          description="IIOHR positions scientific education as a practical clinical tool. Better biological understanding leads to stronger diagnostic logic, better planning, and higher-quality surgical decisions."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {reasons.map((reason) => (
            <Card key={reason}>
              <p className="text-sm leading-relaxed text-muted-foreground">{reason}</p>
            </Card>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
