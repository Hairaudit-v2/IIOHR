import { LinkArrow } from "@/components/ui/LinkArrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { siteConfig } from "@/lib/site";

export function FollicleIntelligenceSupportSection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Follicle Intelligence"
        title="Ecosystem intelligence that supports surgical development"
        description="Structured auditing, benchmarking, and case-based review connect training to real outcomes so progression is measurable and clinically meaningful."
      />
      <div className="mt-8 max-w-3xl space-y-4 text-muted-foreground">
        <p>
          Follicle Intelligence links institute training to outcomes by turning surgical work into actionable review loops. Surgeons compare performance against benchmarks, identify specific gaps, and focus development where it matters most—within the same ecosystem that supports audit and quality transparency.
        </p>
        <div className="flex flex-wrap gap-6">
          <LinkArrow href="/training-pathways">Training pathways</LinkArrow>
          <LinkArrow href={siteConfig.links.follicleIntelligence} external>
            Explore Follicle Intelligence
          </LinkArrow>
        </div>
      </div>
    </SectionShell>
  );
}
