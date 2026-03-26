import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";

const steps = [
  { label: "Learn", description: "Science, assessment, and surgical foundations." },
  { label: "Observe", description: "Live cases and decision-making under faculty guidance." },
  { label: "Assist", description: "Defined roles in supervised clinical settings." },
  { label: "Perform", description: "Hands-on steps under direct supervision." },
  { label: "Audit", description: "Case review against standards." },
  { label: "Advance", description: "Progression when the next scope is earned." },
] as const;

/** Supporting strip: interprets the steps without restating progression/audit jargon. */
const inPractice = [
  {
    title: "Defined responsibilities",
    body: "Each stage has a named scope, rather than leaving readiness open to interpretation.",
  },
  {
    title: "Supervision before autonomy",
    body: "Clinical exposure expands with oversight, correction, and responsibility matched to performance.",
  },
  {
    title: "Review before advancement",
    body: "Case review and standards shape when the next step is appropriate.",
  },
] as const;

export function PathwayAndStandardsSection() {
  return (
    <SectionShell continuous muted joinPrevious>
      <SectionHeading
        eyebrow="Pathway"
        title="A staged route into clinical responsibility"
        description="The route is clear: learn the science, observe live cases, take defined responsibilities, review performance, and advance when ready."
      />
      <ol className="mt-10 grid list-none gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 xl:grid-cols-6">
        {steps.map((step, index) => (
          <li key={step.label}>
            <Card interactive marker={`0${index + 1}`} as="div" className="h-full md:p-5">
              <h3 className="text-[11px] font-semibold tracking-[0.08em] text-heading uppercase">{step.label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </Card>
          </li>
        ))}
      </ol>
      <div className="mt-10 border-t border-border/20 pt-8 md:mt-12 md:pt-10">
        <p className="text-sm text-muted-foreground">In practice</p>
        <div className="list-rail mt-5">
          {inPractice.map((row) => (
            <div key={row.title} className="list-rail-item">
              <span className="text-sm font-semibold text-heading">{row.title}</span>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{row.body}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
