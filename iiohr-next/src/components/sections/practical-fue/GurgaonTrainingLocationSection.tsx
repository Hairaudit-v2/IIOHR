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
      <div className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="h-full">
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Location details</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {locationFacts.map((fact) => (
              <div key={fact.title} className="border-t border-border/70 pt-5 first:border-t-0 first:pt-0">
                <h3 className="text-base font-semibold">{fact.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fact.description}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="h-full">
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Host environment</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">Evolved Hair Restoration / Evolved Training Institute</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The Gurgaon site is presented as a state-of-the-art clinic-cum-training academy and currently serves
            as the first confirmed partner training host for IIOHR Practical FUE.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Travel, stay, transport, and excursions remain outside course fees and are borne separately by the
            trainee.
          </p>
        </Card>
      </div>
    </SectionShell>
  );
}
