import { Card } from "@/components/ui/Card";

interface ModuleHeroProps {
  title: string;
  overview: string;
  studyTimeMinutes: number;
}

export function ModuleHero({ title, overview, studyTimeMinutes }: ModuleHeroProps) {
  return (
    <Card>
      <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Module</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
      <p className="mt-4 text-sm leading-relaxed text-readable-muted">{overview}</p>
      <p className="mt-5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        Estimated study time: {studyTimeMinutes} minutes
      </p>
    </Card>
  );
}
