import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";

interface TimelineStepsProps {
  eyebrow: string;
  title: string;
  description: string;
  steps: string[];
}

export function TimelineSteps({
  eyebrow,
  title,
  description,
  steps,
}: TimelineStepsProps) {
  return (
    <SectionShell muted>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <ol className="mt-10 grid gap-3 text-sm font-semibold tracking-[0.08em] uppercase sm:grid-cols-2 lg:mt-12 lg:grid-cols-6">
        {steps.map((step, index) => (
          <li key={step} className="rounded-md border border-border bg-surface px-4 py-4 shadow-[0_1px_2px_0_rgba(44,42,38,0.04)]">
            <span className="text-[10px] tracking-[0.14em] text-muted-foreground">
              {`0${index + 1}`}
            </span>
            <p className="mt-2 text-foreground">{step}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
