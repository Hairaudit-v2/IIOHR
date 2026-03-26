import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const partnerOverview = [
  {
    title: "Partner training host",
    description:
      "The first live partner training site is Evolved Hair Restoration / Evolved Training Institute in Gurgaon, India.",
  },
  {
    title: "Technique focus",
    description:
      "Training is built around Modified FUE Technique with Implanter Pen for doctors seeking structured practical development.",
  },
  {
    title: "Course pathways",
    description:
      "Available levels run from Foundation to Advanced Immersion, with optional continued mentorship and surgical audit support.",
  },
  {
    title: "Training environment",
    description:
      "Delivery takes place inside a state-of-the-art clinic-cum-training academy designed for live clinical exposure.",
  },
];

const academySignals = [
  { label: "Target transection rate", value: "<5%" },
  { label: "Cumulative faculty experience", value: "26+ years" },
  { label: "Doctors trained", value: "50+" },
  { label: "Successful surgeries by faculty", value: "5,000+" },
];

export function PracticalFueMeaningSection() {
  return (
    <SectionShell muted joinPrevious id="partner-training-overview" className="scroll-mt-24">
      <div>
        <SectionHeading
          eyebrow="Partner Training Overview"
          title="Institute-led pathways, delivered through a premium clinical partner site"
          description="IIOHR Practical FUE now presents partner-hosted training delivery in Gurgaon, India for international doctors seeking advanced technique, expert faculty, and a structured practical framework. The current live host is positioned around best-in-class training, supervised exposure, and disciplined clinical execution."
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-start">
          <div className="grid gap-6 md:grid-cols-2">
            {partnerOverview.map((item) => (
              <Card key={item.title} quiet className="h-full">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Overview
                </p>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
          <Card className="lg:self-start">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Proof points</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">Training academy positioning</h3>
              </div>
              <span className="rounded-full border border-foreground/18 bg-surface-elevated px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-foreground uppercase">
                Gurgaon live site
              </span>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {academySignals.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-[10px] border border-border/80 bg-surface-elevated/60 p-4"
                >
                  <p className="text-2xl font-semibold tracking-tight text-foreground">{signal.value}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{signal.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              The brochure also positions the academy around advanced technique, best-in-class training framework,
              expert faculty, and a state-of-the-art clinic-cum-training academy.
            </p>
          </Card>
        </div>
      </div>
    </SectionShell>
  );
}
