interface AssessmentHeaderProps {
  title: string;
  passMark: number;
  retryLimit: number;
}

export function AssessmentHeader({ title, passMark, retryLimit }: AssessmentHeaderProps) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Assessment</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
      <p className="mt-4 text-sm leading-relaxed text-readable-muted">
        Pass mark: {passMark}% | Retries: {retryLimit}
      </p>
    </div>
  );
}
