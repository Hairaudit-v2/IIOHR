import { TimelineSteps } from "@/components/sections/shared/TimelineSteps";

const steps = ["Learn", "Observe", "Perform", "Audit", "Improve", "Advance"];

export function ProgressionPathwaySection() {
  return (
    <TimelineSteps
      eyebrow="Pathway"
      title="Progression from learning and observation to sustained excellence"
      description="The pathway is sequenced from theory and observation through supervised performance, audit, and refinement—so capability builds with clarity and accountability."
      steps={steps}
    />
  );
}
