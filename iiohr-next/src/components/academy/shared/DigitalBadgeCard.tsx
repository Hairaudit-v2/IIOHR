import { Card } from "@/components/ui/Card";

interface DigitalBadgeCardProps {
  title: string;
  status: string;
}

export function DigitalBadgeCard({ title, status }: DigitalBadgeCardProps) {
  return (
    <Card quiet>
      <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Digital Badge</p>
      <p className="mt-3 text-base font-semibold text-foreground">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-readable-muted">{status}</p>
    </Card>
  );
}
