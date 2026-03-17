import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const skillModules = [
  "Donor assessment and handling discipline",
  "Extraction strategy and procedural control",
  "Implantation technique and recipient management",
  "Surgical planning and case preparation",
  "Refinement through post-case review",
];

export function TechnicalDevelopmentSection() {
  return (
    <SectionShell dark>
      <SectionHeading
        eyebrow="Technical Skill Development"
        title="Core operative competencies developed through deliberate practice"
        description="Practical FUE training is organized into technical modules so progression remains precise, consistent, and clinically grounded. Donor assessment, planning, extraction strategy, graft handling, and recipient management are developed deliberately—so surgical discipline supports long-term outcomes."
      />
      <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {skillModules.map((module, index) => (
          <Card key={module} className="border-white/20 bg-white/5 shadow-none">
            <p className="text-xs tracking-[0.14em] text-primary-foreground/70 uppercase">
              {`Module ${index + 1}`}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground">{module}</p>
          </Card>
        ))}
      </ol>
    </SectionShell>
  );
}
