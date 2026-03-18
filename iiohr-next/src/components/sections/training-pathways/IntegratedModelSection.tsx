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
    <SectionShell dark>
      <SectionHeading
        eyebrow="Integrated Development Model"
        title="How practical training, theory, audit, and mentorship work together"
        description="IIOHR's system is deliberately interconnected. Each development pillar reinforces the others to accelerate safe, standards-led progression."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {integrationBlocks.map((block) => (
          <Card key={block.title} dark interactive>
            <h3 className="text-lg font-semibold">{block.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
              {block.description}
            </p>
          </Card>
        ))}
      </div>
      <div className="mt-16 border-t border-primary-foreground/20 pt-8">
        <p className="text-xs tracking-[0.14em] text-primary-foreground/70 uppercase">
          Development Loop
        </p>
        <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {modelFlow.map((item, index) => (
            <li
              key={item}
              className="rounded-md border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-3 text-sm text-primary-foreground/85"
            >
              <span className="mr-2 text-xs tracking-[0.12em] text-primary-foreground/60">{`0${index + 1}`}</span>
              {item}
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
