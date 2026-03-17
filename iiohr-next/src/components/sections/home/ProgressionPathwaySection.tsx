import { TimelineSteps } from "@/components/sections/shared/TimelineSteps";
import type { TimelineStepItem } from "@/components/sections/shared/TimelineSteps";

const steps: TimelineStepItem[] = [
  { label: "Learn", description: "Theory and clinical foundations." },
  { label: "Observe", description: "Supervised observation in practice." },
  { label: "Perform", description: "Hands-on under direct supervision." },
  { label: "Audit", description: "Outcome review and benchmarking." },
  { label: "Improve", description: "Refinement and improvement planning." },
  { label: "Advance", description: "Progression to the next stage." },
];

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
