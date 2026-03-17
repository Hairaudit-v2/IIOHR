import type { ReactNode } from "react";

interface SectionShellProps {
  children: ReactNode;
  muted?: boolean;
  dark?: boolean;
  className?: string;
  id?: string;
}

export function SectionShell({
  children,
  muted = false,
  dark = false,
  className = "",
  id,
}: SectionShellProps) {
  const tone = dark
    ? "bg-section-charcoal text-section-charcoal-foreground border-section-charcoal-border"
    : muted
      ? "bg-section-ivory-alt text-foreground border-border"
      : "bg-section-ivory text-foreground border-border";

  const borderClass = dark ? "border-section-charcoal-border" : "border-border-soft";

  return (
    <section
      id={id}
      className={`border-b ${borderClass} ${tone} ${className}`}
      data-section-tone={dark ? "dark" : muted ? "muted" : "default"}
    >
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-20 sm:px-5 md:py-24 lg:py-28">{children}</div>
    </section>
  );
}
