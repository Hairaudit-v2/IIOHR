import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const techniqueCards = [
  {
    title: "Modified FUE Technique with Implanter Pen",
    description:
      "The core technical focus of the Gurgaon partner site is Modified FUE Technique with Implanter Pen for modern hair transplantation.",
  },
  {
    title: "Foundation",
    description:
      "An entry pathway for doctors seeking foundational knowledge of FUE and exposure to modern techniques.",
  },
  {
    title: "Intermediate pathways",
    description:
      "Two intermediate levels provide a progression route for doctors moving from guided execution toward independent sessions under supervision.",
  },
  {
    title: "Advanced immersion",
    description:
      "A longer immersion option is positioned for doctors seeking mastery and the ability to scale a hair transplant practice.",
  },
  {
    title: "Optional continued support",
    description:
      "Optional continued mentorship and surgical audit support are available after the core course pathways.",
  },
];

export function TechnicalDevelopmentSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Techniques and Training Options"
        title="Structured practical options built around the partner site's core technique"
        description="The Gurgaon partner site presents one primary technique pathway and multiple training levels, allowing IIOHR to show a public-safe view of practical options without exposing protected curriculum detail."
      />
      <ol className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {techniqueCards.map((card, index) => (
          <Card key={card.title} as="li" interactive>
            <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">{`Option ${index + 1}`}</p>
            <h3 className="mt-2 text-lg font-semibold">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
          </Card>
        ))}
      </ol>
    </SectionShell>
  );
}
