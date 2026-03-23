import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";

const signals = [
  {
    title: "Faculty-led",
    description: "Practising surgeons with real teaching responsibility.",
  },
  {
    title: "Measurable improvement",
    description: "Audit and benchmarks set priorities—not guesswork.",
  },
  {
    title: "Explicit standards",
    description: "Governance and milestones everyone can point to.",
  },
] as const;

/** Quiet strip after the ecosystem centerpiece—no second hero moment. */
export function TrustSignalsSection() {
  return (
    <SectionShell continuous compact>
      <SectionHeading
        eyebrow="Governance"
        title="How we uphold quality"
        description="Credibility, evidence, and standards you can trace."
      />
      <ul className="authority-panel mt-8 grid list-none gap-0 overflow-hidden sm:grid-cols-3 md:mt-9">
        {signals.map((item) => (
          <li
            key={item.title}
            className="border-b border-border/35 px-5 py-5 last:border-b-0 sm:border-b-0 sm:px-6 sm:py-6 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-border/35"
          >
            <span className="text-sm font-semibold text-foreground">{item.title}</span>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
