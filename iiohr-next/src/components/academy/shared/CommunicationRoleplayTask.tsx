import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface CommunicationRoleplayTaskProps {
  prompt: string;
}

export function CommunicationRoleplayTask({ prompt }: CommunicationRoleplayTaskProps) {
  return (
    <AcademyPanel title="Communication Roleplay Task">
      <p>{prompt}</p>
      <textarea
        className="min-h-40 w-full rounded-md border border-border bg-background p-3 text-sm text-foreground"
        placeholder="Roleplay response workspace"
        readOnly
      />
    </AcademyPanel>
  );
}
