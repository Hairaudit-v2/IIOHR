import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const sites = [
  {
    city: "Gurgaon Partner Site",
    status: "Live",
    description:
      "The first live site for the IIOHR India Clinical Training Academy is Gurgaon, delivered in partnership with Evolved Hair Restoration.",
    details:
      "Current public information includes partner faculty, course levels, pricing, optional nurse training, and Golf Course Road location details.",
  },
  {
    city: "Mumbai Partner Site",
    status: "Coming Soon",
    description:
      "A second IIOHR India academy site is planned for Mumbai and is intentionally presented without pricing, faculty, or timing details at this stage.",
    details: "Further information will be published only when the site is confirmed for public release.",
  },
];

export function PartnerTrainingSitesSection() {
  return (
    <SectionShell muted id="partner-training-sites">
      <SectionHeading
        eyebrow="Training Sites"
        title="The first IIOHR India academy site is live, with Mumbai reserved as the next location"
        description="IIOHR Practical FUE now presents academy-site information in a controlled public format: Gurgaon is the live partner site, and Mumbai is marked as coming soon."
      />
      <div className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
        <Card interactive className="h-full">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl font-semibold tracking-tight">{sites[0]?.city}</h3>
            <span className="rounded-full border border-foreground/18 bg-surface-elevated px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-foreground uppercase">
              {sites[0]?.status}
            </span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{sites[0]?.description}</p>
          <div className="mt-6 h-px bg-border/70" aria-hidden />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{sites[0]?.details}</p>
        </Card>
        <Card quiet className="h-full opacity-90">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl font-semibold tracking-tight">{sites[1]?.city}</h3>
            <span className="rounded-full border border-foreground/14 bg-transparent px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {sites[1]?.status}
            </span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{sites[1]?.description}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{sites[1]?.details}</p>
        </Card>
      </div>
    </SectionShell>
  );
}
