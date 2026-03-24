interface LessonHeaderProps {
  title: string;
  overview: string;
  studyTimeMinutes: number;
}

export function LessonHeader({ title, overview, studyTimeMinutes }: LessonHeaderProps) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Lesson</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-readable-muted">{overview}</p>
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        Estimated study time: {studyTimeMinutes} minutes
      </p>
    </div>
  );
}
