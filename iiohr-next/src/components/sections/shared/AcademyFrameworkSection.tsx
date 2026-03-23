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

interface AcademyFrameworkSectionProps {
  muted?: boolean;
  joinPrevious?: boolean;
}

export function AcademyFrameworkSection({
  muted = true,
  joinPrevious = false,
}: AcademyFrameworkSectionProps = {}) {
  const [primaryItem, ...supportingItems] = frameworkItems;

  return (
    <SectionShell muted={muted} joinPrevious={joinPrevious}>
      <SectionHeading
        eyebrow="Connected model"
        title="How the IIOHR development model fits together"
        description="IIOHR combines structured education, admissions guidance, certification logic, and mentorship into a connected framework designed for sustained clinical development."
      />
      <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start">
        {primaryItem ? (
          <Card className="h-full">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Core entry point
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-[1.75rem]">
              {primaryItem.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{primaryItem.description}</p>
            <div className="mt-6">
              <LinkArrow href={primaryItem.href}>Explore {primaryItem.title}</LinkArrow>
            </div>
          </Card>
        ) : null}
        <ul className="list-rail">
          {supportingItems.map((item) => (
            <li key={item.href} className="list-rail-item">
              <h3 className="text-base font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <div className="mt-4">
                <LinkArrow href={item.href}>Explore {item.title}</LinkArrow>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
