import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const locationFacts = [
  {
    title: "Training location",
    description: "Golf Course Road, Gurgaon.",
  },
  {
    title: "Accommodation options",
    description: "3-star to 5-star hotels and Airbnb options.",
  },
  {
    title: "Indicative stay cost",
    description: "USD 40 to USD 140 per night.",
  },
  {
    title: "Distance to clinic",
    description: "Most accommodation options are within 5 to 10 km of the clinic.",
  },
  {
    title: "Local transport",
    description: "Easy Uber and taxi availability.",
  },
];

export function GurgaonTrainingLocationSection() {
  return (
    <SectionShell muted id="gurgaon-training-location">
      <SectionHeading
        eyebrow="Gurgaon Training Location"
        title="A premium Gurgaon setting for the first live partner-led training site"
        description="The brochure locates the training experience on Golf Course Road, Gurgaon, with accommodation and transport details intended to help international doctors plan a practical training stay with confidence."
      />
      <div className="mt-16 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="h-full">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Live partner site</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">Evolved Hair Restoration / Evolved Training Institute</h3>
            </div>
            <span className="rounded-full border border-foreground/18 bg-surface-elevated px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-foreground uppercase">
              Gurgaon
            </span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            The Gurgaon site is presented as a state-of-the-art clinic-cum-training academy and currently serves
            as the first confirmed partner training host for IIOHR Practical FUE.
          </p>
          <div className="mt-6 h-px bg-border/70" aria-hidden />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Travel, stay, transport, and excursions remain outside course fees and are borne separately by the
            trainee.
          </p>
        </Card>
        <Card className="h-full">
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Location details</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {locationFacts.map((fact) => (
              <div key={fact.title} className="rounded-[10px] border border-border/80 bg-surface-elevated/60 p-4">
                <h3 className="text-base font-semibold">{fact.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fact.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </SectionShell>
  );
}
