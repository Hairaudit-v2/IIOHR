import { LinkArrow } from "@/components/ui/LinkArrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { siteConfig } from "@/lib/site";

export function FollicleIntelligenceSupportSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Follicle Intelligence"
        title="Follicle Intelligence support"
        description="Structured auditing, feedback, benchmarking, and case-based review help surgeons progress with clarity and measurable direction."
      />
      <div className="mt-8 max-w-3xl space-y-4 text-muted-foreground">
        <p>
          Follicle Intelligence links training to outcomes by turning surgical work into actionable review loops. Surgeons can compare performance against benchmarks, identify specific gaps, and focus development where it matters most.
        </p>
        <LinkArrow href={siteConfig.links.follicleIntelligence}>
          Explore Follicle Intelligence
        </LinkArrow>
      </div>
    </SectionShell>
  );
}
