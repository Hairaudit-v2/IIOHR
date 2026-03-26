import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const integrationBlocks = [
  {
    title: "Science and clinical understanding",
    description:
      "Progression is anchored to scientific understanding and clinical reasoning, not practical exposure alone.",
  },
  {
    title: "Supervised practical responsibility",
    description:
      "Practical responsibility increases in controlled stages under supervision, with correction and review built in.",
  },
  {
    title: "Standards and progression criteria",
    description:
      "Advancement is aligned to institute standards so readiness can be discussed with clarity and consistency.",
  },
  {
    title: "Review and accountability",
    description:
      "Progression decisions are supported by review over time so development remains visible and accountable.",
  },
  {
    title: "Scope-appropriate pathways",
    description:
      "Doctors, consultants, and clinics enter through role-appropriate routes while following the same institute progression logic.",
  },
] as const;

export function IntegratedModelSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="What Progression Is Built Around"
        title="What progression is built around"
        description="The integrated model connects science, supervised practice, standards, and accountable review so progression remains credible and role-appropriate."
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
