import type { ReactNode } from "react";

interface SectionShellProps {
  children: ReactNode;
  muted?: boolean;
  dark?: boolean;
  className?: string;
}

export function SectionShell({
  children,
  muted = false,
  dark = false,
  className = "",
}: SectionShellProps) {
  const tone = dark
    ? "bg-primary text-primary-foreground border-border"
    : muted
      ? "bg-sand/70 text-foreground border-border"
      : "bg-background text-foreground border-border";

  return (
    <section className={`border-b border-border-soft ${tone} ${className}`} data-section-tone={dark ? "dark" : muted ? "muted" : "default"}>
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-16 sm:px-5 md:py-20 lg:py-24">{children}</div>
    </section>
  );
}
