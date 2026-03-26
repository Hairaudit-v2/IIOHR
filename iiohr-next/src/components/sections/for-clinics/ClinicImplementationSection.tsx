import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const supports = [
  {
    title: "Enquiry and fit",
    description:
      "Initial discussion clarifies clinic context, current needs, and whether the IIOHR model is the right fit.",
  },
  {
    title: "Readiness review",
    description:
      "Readiness review helps identify current capability, supervision context, and whether a structured route is appropriate.",
  },
  {
    title: "Pathway design",
    description:
      "Development direction is matched at a high level so progression is structured rather than improvised.",
  },
  {
    title: "Role-aligned development",
    description:
      "Doctor, consultant, nurse, and clinic needs can be aligned without exposing protected internal content in the public layer.",
  },
  {
    title: "Review and progression",
    description:
      "Review and progression help clinics move away from ad hoc training dependence toward a clearer development system.",
  },
] as const;

export function ClinicImplementationSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Operational Model"
        title="How clinic engagement works in public-safe terms"
        description="The public page does not expose internal programme detail. It explains the high-level logic: fit, readiness, route matching, and structured progression."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {supports.map((item) => (
          <Card key={item.title}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
