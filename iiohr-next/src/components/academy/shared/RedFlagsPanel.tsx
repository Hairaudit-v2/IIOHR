import { AcademyPanel } from "@/components/academy/shared/AcademyPanel";

interface RedFlagsPanelProps {
  redFlags: string[];
}

export function RedFlagsPanel({ redFlags }: RedFlagsPanelProps) {
  return (
    <AcademyPanel title="Red Flags">
      <ul className="space-y-2">
        {redFlags.map((redFlag) => (
          <li key={redFlag}>{redFlag}</li>
        ))}
      </ul>
    </AcademyPanel>
  );
}
