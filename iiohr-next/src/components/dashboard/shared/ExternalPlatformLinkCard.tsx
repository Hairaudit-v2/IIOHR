import { Card } from "@/components/ui/Card";

interface ExternalPlatformLinkCardProps {
  title: string;
  description: string;
  href: string;
  linkLabel?: string;
  /** "internal" when same ecosystem SSO expected; still opens in new tab for safety. */
  variant?: "external" | "ecosystem";
}

export function ExternalPlatformLinkCard({
  title,
  description,
  href,
  linkLabel = "Open platform",
  variant = "external",
}: ExternalPlatformLinkCardProps) {
  return (
    <Card quiet className="h-full">
      <h3 className="text-base font-semibold text-heading">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-readable-muted">{description}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-foreground/28 bg-surface px-5 py-2.5 text-[13px] font-semibold tracking-[0.03em] text-foreground transition-[border-color,background-color] duration-150 hover:border-foreground/45 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {linkLabel}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
      {variant === "ecosystem" ? (
        <p className="mt-3 text-xs text-readable-subtle">Ecosystem partner — use institute-approved access where configured.</p>
      ) : null}
    </Card>
  );
}
