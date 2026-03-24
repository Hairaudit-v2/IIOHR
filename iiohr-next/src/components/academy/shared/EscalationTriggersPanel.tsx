import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface EscalationTriggersPanelProps {
  triggers: Array<{ id: string; title: string; trigger: string; action: string }>;
}

export function EscalationTriggersPanel({ triggers }: EscalationTriggersPanelProps) {
  return (
    <AcademyPanel title="Escalation Triggers">
      <div className="space-y-4">
        {triggers.map((item) => (
          <div key={item.id}>
            <h3 className="font-medium text-foreground">{item.title}</h3>
            <p className="mt-1">{item.trigger}</p>
            <p className="mt-2 text-foreground">Action: {item.action}</p>
          </div>
        ))}
      </div>
    </AcademyPanel>
  );
}
