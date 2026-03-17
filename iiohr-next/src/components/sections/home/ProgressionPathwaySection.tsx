import { TimelineSteps } from "@/components/sections/shared/TimelineSteps";

const steps = ["Learn", "Observe", "Perform", "Audit", "Improve", "Advance"];

export function ProgressionPathwaySection() {
  return (
    <TimelineSteps
      eyebrow="Pathway"
      title="Progression from training to sustained excellence"
      description="The pathway is sequenced for practical competence, measured development, and consistent refinement."
      steps={steps}
    />
  );
}
