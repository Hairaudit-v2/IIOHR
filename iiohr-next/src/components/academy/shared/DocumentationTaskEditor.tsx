import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface DocumentationTaskEditorProps {
  prompt: string;
}

export function DocumentationTaskEditor({ prompt }: DocumentationTaskEditorProps) {
  return (
    <AcademyPanel title="Documentation Exercise">
      <p>{prompt}</p>
      <textarea
        className="min-h-40 w-full rounded-md border border-border bg-background p-3 text-sm text-foreground"
        placeholder="Learner response workspace"
        readOnly
      />
    </AcademyPanel>
  );
}
