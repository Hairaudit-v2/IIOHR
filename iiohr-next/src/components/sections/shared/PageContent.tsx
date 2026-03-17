import { FeatureGrid } from "@/components/sections/shared/FeatureGrid";
import { PageHero } from "@/components/sections/shared/PageHero";
import { TimelineSteps } from "@/components/sections/shared/TimelineSteps";

interface PageContentProps {
  eyebrow: string;
  title: string;
  description: string;
  focusTitle: string;
  focusDescription: string;
  focusItems: string[];
}

export function PageContent({
  eyebrow,
  title,
  description,
  focusTitle,
  focusDescription,
  focusItems,
}: PageContentProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <FeatureGrid
        muted
        eyebrow="Key Focus Areas"
        title={focusTitle}
        description={focusDescription}
        items={focusItems}
      />
      <TimelineSteps
        eyebrow="Development Logic"
        title="A repeatable model for continuous progression"
        description="Each program area follows the same pattern: understand principles, apply in practice, review outcomes, and refine."
        steps={["Principles", "Preparation", "Execution", "Review", "Refinement", "Advancement"]}
      />
    </>
  );
}
