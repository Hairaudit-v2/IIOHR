import { Card } from "@/components/ui/Card";

interface LevelProgressionRailProps {
  levels: Array<{ id: string; title: string; overview: string }>;
}

export function LevelProgressionRail({ levels }: LevelProgressionRailProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {levels.map((level, index) => (
        <Card key={level.id} marker={`0${index + 1}`}>
          <h3 className="text-base font-semibold tracking-tight text-foreground">{level.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-readable-muted">{level.overview}</p>
        </Card>
      ))}
    </div>
  );
}
