import { Card } from "@/components/ui/Card";

interface FacultyReviewStatusCardProps {
  status: string;
  summary: string;
}

export function FacultyReviewStatusCard({ status, summary }: FacultyReviewStatusCardProps) {
  return (
    <Card quiet>
      <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Faculty Review</p>
      <p className="mt-3 text-base font-semibold text-foreground">{status}</p>
      <p className="mt-2 text-sm leading-relaxed text-readable-muted">{summary}</p>
    </Card>
  );
}
