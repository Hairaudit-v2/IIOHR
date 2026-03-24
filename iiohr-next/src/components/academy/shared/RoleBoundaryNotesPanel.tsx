import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface RoleBoundaryNotesPanelProps {
  notes: Array<{ id: string; title: string; note: string }>;
}

export function RoleBoundaryNotesPanel({ notes }: RoleBoundaryNotesPanelProps) {
  return (
    <AcademyPanel title="Role Boundary Notes">
      <div className="space-y-4">
        {notes.map((item) => (
          <div key={item.id}>
            <h3 className="font-medium text-foreground">{item.title}</h3>
            <p className="mt-1">{item.note}</p>
          </div>
        ))}
      </div>
    </AcademyPanel>
  );
}
