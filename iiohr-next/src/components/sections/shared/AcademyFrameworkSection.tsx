import { SectionShell } from "@/components/sections/shared/SectionShell";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkArrow } from "@/components/ui/LinkArrow";

const frameworkItems = [
  {
    title: "Academy",
    description:
      "Structured education that integrates practical development, science, standards, and long-term progression logic.",
    href: "/academy",
  },
  {
    title: "Admissions",
    description:
      "Readiness and entrant-level guidance that helps doctors and clinics identify the most suitable pathway entry stage.",
    href: "/admissions",
  },
  {
    title: "Certification Framework",
    description:
      "A standards-led, evidence-informed framework that supports staged capability progression and credible development review.",
    href: "/certification-framework",
  },
  {
    title: "Faculty & Mentorship",
    description:
      "Faculty oversight and mentorship support that reinforce reflective learning, supervised progression, and ongoing maturity.",
    href: "/faculty-and-mentorship",
  },
] as const;

export function AcademyFrameworkSection() {
  return (
    <SectionShell muted>
      <SectionHeading
        eyebrow="Connected model"
        title="How the IIOHR development model fits together"
        description="IIOHR combines structured education, admissions guidance, certification logic, and mentorship into a connected framework designed for sustained clinical development."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {frameworkItems.map((item) => (
          <Card key={item.href}>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            <div className="mt-5">
              <LinkArrow href={item.href}>Explore {item.title}</LinkArrow>
            </div>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
