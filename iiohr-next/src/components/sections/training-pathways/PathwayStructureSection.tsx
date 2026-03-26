import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const structureItems = [
  {
    title: "Foundation",
    description: "Progression begins with the science, clinical understanding, and role context needed for safer development.",
  },
  {
    title: "Observation",
    description: "Live workflow and real clinical context help make standards visible before responsibility increases.",
  },
  {
    title: "Supported practical development",
    description: "Responsibility increases in a controlled way, with supervision and correction built into the process.",
  },
  {
    title: "Review and advancement",
    description: "Review, reflection, and standards shape when the next stage is appropriate.",
  },
] as const;

export function PathwayStructureSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="How Progression Works"
        title="How progression works in public-safe terms"
        description="Public pathway pages explain the shape of development at a high level: foundations, observation, supported responsibility, review, and advancement aligned to readiness."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {structureItems.map((item) => (
          <Card key={item.title}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
