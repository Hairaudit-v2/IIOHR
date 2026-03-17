import { LinkArrow } from "@/components/ui/LinkArrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SplitSection } from "@/components/sections/shared/SplitSection";
import { follicleSectionImage } from "@/lib/homeImages";
import { siteConfig } from "@/lib/site";

export function FollicleIntelligenceSupportSection() {
  return (
    <SplitSection image={follicleSectionImage} imagePosition="right" className="section-ai-accent">
      <SectionHeading
        eyebrow="Follicle Intelligence"
        title="Ecosystem intelligence that supports surgical development"
        description="Structured auditing, benchmarking, and case-based review connect training to real outcomes so progression is measurable and clinically meaningful."
      />
      <div className="mt-10 max-w-2xl space-y-5 text-muted-foreground">
        <p className="text-base leading-relaxed">
          Follicle Intelligence links institute training to outcomes by turning surgical work into actionable review loops.
        </p>
        <p className="text-base leading-relaxed">
          Surgeons compare performance against benchmarks, identify specific gaps, and focus development where it matters most—within the same ecosystem that supports audit and quality transparency.
        </p>
        <div className="flex flex-wrap gap-6 pt-1">
          <LinkArrow href="/training-pathways">Training pathways</LinkArrow>
          <LinkArrow href={siteConfig.links.follicleIntelligence} external>
            Explore Follicle Intelligence
          </LinkArrow>
        </div>
      </div>
    </SplitSection>
  );
}
