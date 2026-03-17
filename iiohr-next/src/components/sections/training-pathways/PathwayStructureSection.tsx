import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const structureItems = [
  {
    title: "Staged milestones",
    description: "Each stage has defined outcomes so you and your mentors know when you’re ready for the next level of responsibility.",
  },
  {
    title: "Supervised exposure",
    description: "Practical work is done under direct supervision with real-time correction and safety oversight.",
  },
  {
    title: "Review cadence",
    description: "Cases are reviewed against benchmarks so improvement priorities are evidence-based, not anecdotal.",
  },
];

export function PathwayStructureSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Pathway structure"
        title="How progression works in practice"
        description="The pathway is designed so capability builds step by step, with supervision and review built in from the start."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
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
