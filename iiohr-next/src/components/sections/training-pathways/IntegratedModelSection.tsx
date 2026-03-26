import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const integrationBlocks = [
  {
    title: "Science and clinical understanding",
    description:
      "Progression needs a stronger base than exposure alone, so scientific and clinical understanding remain part of the pathway model.",
  },
  {
    title: "Practical responsibility",
    description:
      "Responsibility should increase in a controlled way rather than being handed over informally.",
  },
  {
    title: "Standards alignment",
    description:
      "Development is tied to clearer expectations so readiness can be discussed and justified.",
  },
  {
    title: "Review and accountability",
    description:
      "Feedback, review, and accountability keep progression visible rather than opaque.",
  },
  {
    title: "Scope-appropriate development",
    description:
      "Doctors, consultants, nurses, and clinics do not follow the same route, but the institute progression logic remains consistent across them.",
  },
] as const;

export function IntegratedModelSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="What Progression Is Built Around"
        title="What progression is built around"
        description="The pathway model is not only about practice. It is built around science, responsibility, standards, review, and role-appropriate development."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {integrationBlocks.map((block) => (
          <Card key={block.title} interactive>
            <h3 className="text-lg font-semibold text-heading">{block.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{block.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
