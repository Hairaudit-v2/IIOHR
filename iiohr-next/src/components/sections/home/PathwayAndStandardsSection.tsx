import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";

const steps = [
  { label: "Learn", description: "Theory and clinical foundations." },
  { label: "Observe", description: "Supervised observation in practice." },
  { label: "Perform", description: "Hands-on under direct supervision." },
  { label: "Audit", description: "Outcome review and benchmarking." },
  { label: "Improve", description: "Refinement and improvement planning." },
  { label: "Advance", description: "Progression to the next stage." },
] as const;

const principles = [
  {
    title: "Staged progression",
    description:
      "Clear sequencing from observation through supervised performance, audit, and refinement.",
  },
  {
    title: "Supervised exposure",
    description: "Live feedback, structured case review, and mentorship that extends beyond initial training.",
  },
  {
    title: "Standards-based development",
    description: "Progress anchored to explicit clinical standards with measurable, benchmarked growth.",
  },
] as const;

/** Pathway timeline + “at a glance” principles in one continuous light section. */
export function PathwayAndStandardsSection() {
  return (
    <SectionShell joinPrevious>
      <SectionHeading
        eyebrow="Pathway"
        title="From learning and observation to sustained excellence"
        description="Capability builds through sequenced milestones—then shows up as supervised exposure, accountable audit loops, and development aligned to clinical standards."
      />
      <ol className="mt-14 grid list-none gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 xl:grid-cols-6">
        {steps.map((step, index) => (
          <li key={step.label}>
            <Card interactive marker={`0${index + 1}`} as="div">
              <h3 className="text-xs font-semibold tracking-[0.06em] text-heading uppercase">{step.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </Card>
          </li>
        ))}
      </ol>
      <div className="mt-16 md:mt-20">
        <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">In practice</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-3 lg:gap-6">
          {principles.map((item, index) => (
            <Card key={item.title} interactive marker={index + 1}>
              <h3 className="text-base font-semibold tracking-tight text-heading">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
