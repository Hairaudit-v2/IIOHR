import { Card } from "@/components/ui/Card";

interface ProgramPillarCardGridProps {
  pillars: Array<{ title: string; body: string }>;
}

export function ProgramPillarCardGrid({ pillars }: ProgramPillarCardGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {pillars.map((pillar) => (
        <Card key={pillar.title}>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">{pillar.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-readable-muted">{pillar.body}</p>
        </Card>
      ))}
    </div>
  );
}
