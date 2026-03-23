import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";

export interface TimelineStepItem {
  label: string;
  description: string;
}

interface TimelineStepsProps {
  eyebrow: string;
  title: string;
  description: string;
  steps: string[] | TimelineStepItem[];
}

function isStepItem(step: string | TimelineStepItem): step is TimelineStepItem {
  return typeof step === "object" && step !== null && "label" in step && "description" in step;
}

export function TimelineSteps({
  eyebrow,
  title,
  description,
  steps,
}: TimelineStepsProps) {
  const items = steps.map((step, index) =>
    isStepItem(step)
      ? { key: step.label, label: step.label, description: step.description, index: index + 1 }
      : { key: step, label: step, description: "", index: index + 1 }
  );

  return (
    <SectionShell muted>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <ol className="list-rail mt-16 lg:mt-20">
        {items.map(({ key, label, description: desc, index }) => (
          <li key={key} className="list-rail-item">
            <Card interactive marker={`0${index}`} as="div" quiet>
              <h3 className="text-sm font-semibold uppercase tracking-[0.06em] text-foreground">
                {label}
              </h3>
              {desc ? (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              ) : null}
            </Card>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
