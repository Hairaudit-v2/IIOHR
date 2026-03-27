import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const techniqueCards = [
  {
    title: "Modified FUE Technique with Implanter Pen",
    description:
      "The core technical focus of the IIOHR India Clinical Training Academy at the Gurgaon site is Modified FUE Technique with Implanter Pen for modern hair transplantation.",
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
  const [primaryTechnique, ...trainingOptions] = techniqueCards;

  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Techniques and Training Options"
        title="Structured practical options built around the IIOHR India academy's core technique"
        description="The first live Gurgaon site for the IIOHR India Clinical Training Academy presents one primary technique pathway and multiple training levels, allowing IIOHR to show a public-safe view of practical options without exposing protected curriculum detail."
      />
      <div className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <Card interactive className="h-full">
          <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">Core technique</p>
          <h3 className="mt-4 text-2xl leading-tight font-semibold tracking-tight md:text-[1.75rem]">
            {primaryTechnique?.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{primaryTechnique?.description}</p>
        </Card>
        <ol className="grid gap-4 sm:grid-cols-2">
          {trainingOptions.map((card, index) => (
            <Card key={card.title} as="li" quiet className="h-full">
              <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">{`Option 0${index + 2}`}</p>
              <h3 className="mt-3 text-lg font-semibold">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
            </Card>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
