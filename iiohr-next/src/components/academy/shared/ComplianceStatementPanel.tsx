import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface ComplianceStatementPanelProps {
  notices: Array<{ id: string; title: string; body: string }>;
}

export function ComplianceStatementPanel({ notices }: ComplianceStatementPanelProps) {
  return (
    <AcademyPanel title="Compliance and Scope">
      <div className="space-y-4">
        {notices.map((notice) => (
          <div key={notice.id}>
            <h3 className="font-medium text-foreground">{notice.title}</h3>
            <p className="mt-1">{notice.body}</p>
          </div>
        ))}
      </div>
    </AcademyPanel>
  );
}
