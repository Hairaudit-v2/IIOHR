import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface ReferenceListProps {
  references: Array<{ id: string; citation: string; notes?: string }>;
}

export function ReferenceList({ references }: ReferenceListProps) {
  return (
    <AcademyPanel title="References">
      <ol className="space-y-3">
        {references.map((reference) => (
          <li key={reference.id}>
            <p>{reference.citation}</p>
            {reference.notes ? <p className="mt-1 text-xs">{reference.notes}</p> : null}
          </li>
        ))}
      </ol>
    </AcademyPanel>
  );
}
