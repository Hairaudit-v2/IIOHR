import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface ScopeOfPracticeAlertProps {
  title?: string;
  body: string;
}

export function ScopeOfPracticeAlert({
  title = "Scope of Practice",
  body,
}: ScopeOfPracticeAlertProps) {
  return (
    <AcademyPanel title={title} className="border-amber-500/30">
      <p>{body}</p>
    </AcademyPanel>
  );
}
