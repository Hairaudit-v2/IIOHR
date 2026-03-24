interface CompetencyTagListProps {
  competencies: Array<{ id: string; title: string }>;
}

export function CompetencyTagList({ competencies }: CompetencyTagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {competencies.map((competency) => (
        <span
          key={competency.id}
          className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground"
        >
          {competency.title}
        </span>
      ))}
    </div>
  );
}
