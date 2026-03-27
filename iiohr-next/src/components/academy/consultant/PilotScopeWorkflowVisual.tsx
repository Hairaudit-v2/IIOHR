import { splitScopeVersusDoctorObjective } from "@/lib/academy/pilot-lesson-ui";

interface PilotScopeWorkflowVisualProps {
  /** Verbatim third learning objective (support tasks versus doctor-led work). */
  scopeObjective: string;
}

/**
 * Central teaching device: support lane vs doctor-led lane (from existing objective wording).
 */
export function PilotScopeWorkflowVisual({ scopeObjective }: PilotScopeWorkflowVisualProps) {
  const split = splitScopeVersusDoctorObjective(scopeObjective);
  if (!split) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--gold-primary)_28%,var(--border))] bg-[linear-gradient(165deg,color-mix(in_srgb,var(--bg-secondary)_100%,transparent)_0%,var(--bg-primary)_50%)] shadow-[0_12px_40px_-14px_color-mix(in_srgb,var(--bg-dark)_32%,transparent),var(--glow-soft)] ring-1 ring-[color-mix(in_srgb,var(--gold-primary)_12%,transparent)]">
      <div className="border-b border-[color-mix(in_srgb,var(--gold-primary)_14%,var(--border))] bg-[color-mix(in_srgb,var(--gold-soft)_25%,var(--bg-secondary))] px-4 py-3.5 sm:px-5">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-readable-muted">
          Workflow · who does what
        </p>
        <p className="mt-1.5 text-sm font-semibold tracking-tight text-foreground sm:text-[0.95rem]">
          Doctor-led pathway, support-defined tasks
        </p>
      </div>
      <div className="relative grid gap-0 md:grid-cols-2">
        <span
          className="pointer-events-none absolute left-1/2 top-6 bottom-6 hidden w-px -translate-x-1/2 bg-[color-mix(in_srgb,var(--gold-primary)_35%,var(--border))] md:block"
          aria-hidden
        />
        <div className="border-border/60 bg-[color-mix(in_srgb,var(--gold-soft)_42%,var(--bg-secondary))] p-4 sm:p-6 md:border-r md:border-b-0 md:border-r-[color-mix(in_srgb,var(--gold-primary)_12%,transparent)] md:border-b-transparent">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[var(--gold-primary)]">
            Your lane (within protocol)
          </p>
          <p className="mt-3 text-sm leading-[1.65] text-foreground">{split.supportSide}</p>
        </div>
        <div className="border-t border-border/60 bg-[color-mix(in_srgb,var(--bg-primary)_40%,var(--bg-secondary))] p-4 sm:p-6 md:border-t-0">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-readable-muted">
            Remains with the clinician
          </p>
          <p className="mt-3 text-sm leading-[1.65] text-readable-muted">{split.doctorSide}</p>
        </div>
      </div>
    </div>
  );
}
