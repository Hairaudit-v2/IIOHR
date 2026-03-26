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
        <div className="mt-16 grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {partnerOverview.map((item) => (
              <Card key={item.title}>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
          <Card className="lg:self-start">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Training academy positioning
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {academySignals.map((signal) => (
                <div key={signal.label} className="border-t border-border/70 pt-4 first:border-t-0 first:pt-0">
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
      </div>
    </SectionShell>
  );
}
