import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const integrationBlocks = [
  {
    title: "Practical Training",
    description:
      "Hands-on surgical exposure develops technical confidence, procedural discipline, and operational consistency.",
  },
  {
    title: "Clinical Theory",
    description:
      "Hair-loss science and trichology strengthen clinical reasoning, patient selection, and long-term treatment strategy.",
  },
  {
    title: "Structured Audit",
    description:
      "Outcome review and benchmarking create objective feedback loops that support targeted, measurable improvement.",
  },
  {
    title: "Mentorship Continuity",
    description:
      "Ongoing mentor guidance helps translate training into mature judgment and reproducible surgical quality.",
  },
];

const modelFlow = ["Practical Exposure", "Theory Integration", "Audit Feedback", "Mentorship Refinement"];

export function IntegratedModelSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Integrated Development Model"
        title="How practical training, theory, audit, and mentorship work together"
        description="IIOHR's system is deliberately interconnected. Each development pillar reinforces the others to accelerate safe, standards-led progression."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {integrationBlocks.map((block) => (
          <Card key={block.title} interactive>
            <h3 className="text-lg font-semibold text-heading">{block.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{block.description}</p>
          </Card>
        ))}
      </div>
      <div className="mt-16 pt-10">
        <div
          className="mb-8 h-px max-w-3xl bg-gradient-to-r from-transparent via-border/55 to-transparent"
          aria-hidden
        />
        <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">Development Loop</p>
        <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {modelFlow.map((item, index) => (
            <li
              key={item}
              className="rounded-md border border-border bg-surface-elevated/80 px-3 py-3 text-sm text-foreground"
            >
              <span className="mr-2 text-xs tracking-[0.12em] text-muted-foreground">{`0${index + 1}`}</span>
              {item}
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
