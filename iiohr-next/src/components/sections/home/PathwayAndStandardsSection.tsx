import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";

const steps = [
  { label: "Learn", description: "Theory and clinical foundations." },
  { label: "Observe", description: "Supervised observation in practice." },
  { label: "Perform", description: "Hands-on under direct supervision." },
  { label: "Audit", description: "Outcome review and benchmarking." },
  { label: "Improve", description: "Refinement and planning." },
  { label: "Advance", description: "Next stage when ready." },
] as const;

/** Supporting strip: interprets the steps without restating progression/audit jargon. */
const inPractice = [
  {
    title: "Named readiness",
    body: "You know what “ready for the next stage” means at each step.",
  },
  {
    title: "Supervision that eases",
    body: "Hands-on responsibility grows as consistency shows in the data.",
  },
  {
    title: "Evidence in the room",
    body: "Mentors and surgeons cite standards and audit—not opinion alone.",
  },
] as const;

export function PathwayAndStandardsSection() {
  return (
    <SectionShell continuous joinPrevious>
      <SectionHeading
        eyebrow="Pathway"
        title="Six stages. One thread."
        description="From foundations through supervised practice, review, and advancement—so capability accumulates instead of resetting after a course."
      />
      <ol className="mt-10 grid list-none gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 xl:grid-cols-6">
        {steps.map((step, index) => (
          <li key={step.label}>
            <Card quiet interactive marker={`0${index + 1}`} as="div" className="md:p-5">
              <h3 className="text-[11px] font-semibold tracking-[0.08em] text-heading uppercase">{step.label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </Card>
          </li>
        ))}
      </ol>
      <div className="mt-10 border-t border-border/20 pt-8 md:mt-12 md:pt-10">
        <p className="text-sm text-muted-foreground">How that shows up in the programme</p>
        <ul className="mt-5 grid list-none gap-3 sm:grid-cols-3 sm:gap-4">
          {inPractice.map((row) => (
            <li
              key={row.title}
              className="rounded-xl border border-border/35 bg-surface/25 px-4 py-3.5 md:px-5 md:py-4"
            >
              <span className="text-sm font-semibold text-heading">{row.title}</span>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
