import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface PatientCommunicationExamplesProps {
  examples: Array<{ id: string; title: string; example: string; rationale: string }>;
  title?: string;
}

export function PatientCommunicationExamples({
  examples,
  title = "Patient communication examples",
}: PatientCommunicationExamplesProps) {
  return (
    <AcademyPanel title={title}>
      <div className="space-y-4">
        {examples.map((item) => (
          <div key={item.id}>
            <h3 className="font-medium text-foreground">{item.title}</h3>
            <p className="mt-2 italic text-foreground">{item.example}</p>
            <p className="mt-2">{item.rationale}</p>
          </div>
        ))}
      </div>
    </AcademyPanel>
  );
}
