import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface ComplianceNoticeLike {
  id: string;
  title: string;
  body: string;
  severity?: "info" | "caution" | "critical";
}

interface ComplianceStatementPanelProps {
  notices: ComplianceNoticeLike[];
  /** Panel heading */
  title?: string;
  /** Stronger framing for learner-facing scope/safety content */
  tone?: "default" | "safety";
}

export function ComplianceStatementPanel({
  notices,
  title = "Compliance and scope",
  tone = "default",
}: ComplianceStatementPanelProps) {
  if (notices.length === 0) {
    return null;
  }

  const shell =
    tone === "safety"
      ? "rounded-xl border border-[color-mix(in_srgb,var(--gold-primary)_22%,transparent)] bg-[var(--gold-soft)] p-5 sm:p-6"
      : "";

  return (
    <div className={shell}>
      <AcademyPanel title={title}>
        <div className="space-y-5">
          {notices.map((notice) => {
            const sev = notice.severity ?? "info";
            const bar =
              sev === "critical"
                ? "border-l-[3px] border-destructive/70 pl-4"
                : sev === "caution"
                  ? "border-l-[3px] border-gold-primary/60 pl-4"
                  : "border-l-[3px] border-border pl-4";
            return (
              <div key={notice.id} className={bar}>
                <h3 className="font-medium text-foreground">{notice.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-readable-muted">{notice.body}</p>
              </div>
            );
          })}
        </div>
      </AcademyPanel>
    </div>
  );
}
