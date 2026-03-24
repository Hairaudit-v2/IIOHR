import { Card } from "@/components/ui/Card";

interface ProgressSummaryCardProps {
  title: string;
  value: string;
  supportingText: string;
}

export function ProgressSummaryCard({ title, value, supportingText }: ProgressSummaryCardProps) {
  return (
    <Card quiet>
      <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">{title}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-readable-muted">{supportingText}</p>
    </Card>
  );
}
