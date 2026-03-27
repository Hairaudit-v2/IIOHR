import { Button } from "@/components/ui/Button";

interface DashboardEmptyStateProps {
  title: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
}

export function DashboardEmptyState({ title, body, primaryHref, primaryLabel }: DashboardEmptyStateProps) {
  return (
    <div
      className="rounded-[10px] border border-border/90 bg-surface-elevated/40 p-6 md:p-8"
      role="status"
      aria-live="polite"
    >
      <h2 className="text-lg font-semibold text-heading">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-readable-muted">{body}</p>
      <div className="mt-5">
        <Button href={primaryHref} variant="primary">
          {primaryLabel}
        </Button>
      </div>
    </div>
  );
}
