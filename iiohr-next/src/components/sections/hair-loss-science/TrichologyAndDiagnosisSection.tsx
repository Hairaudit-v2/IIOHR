import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const modules = [
  {
    title: "Trichology foundations",
    description:
      "Understand follicular behavior, scalp condition patterns, and biological variability relevant to restoration planning.",
  },
  {
    title: "Diagnostic frameworks",
    description:
      "Use structured differential assessment to separate pattern hair loss from alternative etiologies before intervention.",
  },
  {
    title: "Pattern recognition",
    description:
      "Interpret progression trends and risk signatures to improve case suitability and long-range treatment strategy.",
  },
];

export function TrichologyAndDiagnosisSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Trichology and Diagnosis"
        title="From pattern recognition to clinically defensible diagnosis"
        description="Scientific education at IIOHR focuses on practical diagnostic clarity. Surgeons learn to distinguish biological patterns, identify risk, and link diagnosis to treatment logic."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {modules.map((module) => (
          <Card key={module.title}>
            <h3 className="text-lg font-semibold">{module.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{module.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
