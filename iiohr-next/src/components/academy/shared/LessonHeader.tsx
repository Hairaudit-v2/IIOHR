interface LessonHeaderProps {
  title: string;
  overview: string;
  studyTimeMinutes: number;
  /** e.g. "Lesson 2 of 5 in this module" */
  sequenceLabel?: string | null;
}

export function LessonHeader({ title, overview, studyTimeMinutes, sequenceLabel }: LessonHeaderProps) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Lesson</p>
      {sequenceLabel ? (
        <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-readable-muted">{sequenceLabel}</p>
      ) : null}
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-readable-muted">{overview}</p>
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        Estimated study time: {studyTimeMinutes} minutes
      </p>
    </div>
  );
}
