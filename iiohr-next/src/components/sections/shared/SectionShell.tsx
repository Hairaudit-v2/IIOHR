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
    ? "section-dark-gradient text-section-charcoal-foreground section-sep-dark"
    : muted
      ? "section-muted-depth text-foreground section-sep-light"
      : "section-ivory-depth text-foreground section-sep-light";

  return (
    <section
      id={id}
      className={`${tone} ${className}`}
      data-section-tone={dark ? "dark" : muted ? "muted" : "default"}
    >
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-28 sm:px-5 md:py-32 lg:py-36">{children}</div>
    </section>
  );
}
