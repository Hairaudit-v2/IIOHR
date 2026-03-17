import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const causesCards = [
  {
    title: "Androgenic alopecia as a progressive condition",
    description:
      "Pattern hair loss typically progresses over time. Understanding staging, tempo, and individual variation helps surgeons set realistic expectations and plan treatment sequencing—medical, procedural, or combined.",
  },
  {
    title: "Genetics, hormones, and inflammation",
    description:
      "Genetic susceptibility, androgen sensitivity, and inflammatory drivers all influence presentation and response. Clinical assessment before intervention helps match strategy to biology rather than applying a one-size-fits-all approach.",
  },
  {
    title: "Timing and treatment windows",
    description:
      "When to intervene, when to defer, and how to sequence options depend on age, pattern stability, and patient goals. Science training at IIOHR emphasizes assessment-first decision-making.",
  },
  {
    title: "Why clinical assessment matters",
    description:
      "Treatment decisions should follow diagnosis and risk stratification, not the reverse. Robust clinical assessment reduces inappropriate procedures and supports better long-term outcomes and patient communication.",
  },
];

export function CausesAndAssessmentSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Causes and assessment"
        title="From biology to treatment decisions"
        description="Hair loss has multiple causes; androgenic alopecia is the most common. Understanding causes, progression, and the role of genetics, hormones, and inflammation helps surgeons recommend the right interventions—and why clinical assessment before treatment is non-negotiable."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {causesCards.map((card) => (
          <Card key={card.title}>
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
