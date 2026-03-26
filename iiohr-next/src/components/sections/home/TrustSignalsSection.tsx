import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";

const signals = [
  {
    title: "Science-led curriculum",
    description: "Biology, diagnosis, and planning come before technique.",
  },
  {
    title: "Staged progression",
    description: "Responsibility increases through defined stages.",
  },
  {
    title: "Supervised exposure",
    description: "Live-case learning is matched to oversight and readiness.",
  },
  {
    title: "Case review",
    description: "Cases are reviewed, corrected, and revisited.",
  },
  {
    title: "Explicit standards",
    description: "Advancement is tied to standards and governance.",
  },
] as const;

export function TrustSignalsSection() {
  return (
    <SectionShell continuous compact>
      <SectionHeading
        eyebrow="Institute Model"
        title="How the training is structured"
        description="A science-led curriculum, supervised exposure, case review, and explicit standards."
      />
      <ul className="mt-8 grid list-none gap-4 md:mt-9 md:grid-cols-2 xl:grid-cols-5">
        {signals.map((item) => (
          <li key={item.title}>
            <Card quiet className="h-full">
              <span className="text-sm font-semibold text-foreground">{item.title}</span>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </Card>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
