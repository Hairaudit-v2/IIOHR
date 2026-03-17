import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const supervisionBlocks = [
  {
    title: "Supervised hands-on training",
    description:
      "Practical work is delivered under direct supervision so technique is corrected in real time and safety standards are maintained.",
  },
  {
    title: "Live patient exposure",
    description:
      "Trainees progress from observation to supervised participation in live clinical cases, with responsibilities matched to readiness.",
  },
  {
    title: "Mentorship and correction",
    description:
      "Mentors provide structured feedback, immediate correction, and case-by-case guidance to strengthen judgment and consistency.",
  },
];

export function SupervisedHandsOnSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Clinical Supervision"
        title="Hands-on development under experienced surgical guidance"
        description="The training environment prioritizes safe execution, transparent feedback, and progressive responsibility. Practical exposure under supervision ensures technique is corrected in real time and that standards, not trial-and-error, guide development."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {supervisionBlocks.map((block) => (
          <Card key={block.title}>
            <h3 className="text-lg font-semibold">{block.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{block.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
