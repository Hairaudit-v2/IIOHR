import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const standards = [
  {
    title: "For doctors",
    description: "A clearer route for building judgment, standards, and progression beyond isolated surgical exposure.",
  },
  {
    title: "For consultants and nurses",
    description: "A more structured framework for communication, triage awareness, coordination, and role-safe development.",
  },
  {
    title: "For clinics",
    description: "A stronger basis for internal consistency, team development, and clearer expectations across patient-facing work.",
  },
  {
    title: "For the field",
    description: "A model that treats development as a standards question rather than a marketing or personality question.",
  },
] as const;

export function StandardsDevelopmentSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Why It Matters"
        title="Why this model matters"
        description="The value of an institute model is not only educational. It also affects trust, consistency, and how standards are carried through the field."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {standards.map((item) => (
          <Card key={item.title}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
