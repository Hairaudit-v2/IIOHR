import type { LessonChapterNavItem } from "@/lib/academy/lesson-chapter-nav";

interface LessonChapterNavProps {
  items: LessonChapterNavItem[];
  /** Accessible name; defaults to in-page navigation. */
  "aria-label"?: string;
  /** Benchmark pilot: larger hit targets, snap scroll, calmer chrome. */
  variant?: "default" | "benchmark";
}

export function LessonChapterNav({
  items,
  "aria-label": ariaLabel = "On this lesson",
  variant = "default",
}: LessonChapterNavProps) {
  if (items.length === 0) {
    return null;
  }

  const benchmark = variant === "benchmark";

  return (
    <nav
      aria-label={ariaLabel}
      className={`sticky top-14 z-40 border-b backdrop-blur-md supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--bg-secondary)_82%,transparent)] ${
        benchmark
          ? "border-[color-mix(in_srgb,var(--gold-primary)_12%,var(--border))] bg-[color-mix(in_srgb,var(--bg-secondary)_97%,transparent)] shadow-[0_1px_0_color-mix(in_srgb,var(--text-primary)_4%,transparent)]"
          : "border-border/80 bg-[color-mix(in_srgb,var(--bg-secondary)_94%,transparent)]"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <p
          className={`font-semibold uppercase tracking-[0.18em] text-readable-muted ${benchmark ? "pt-3.5 text-[0.62rem]" : "pt-3 text-[0.6rem]"}`}
        >
          In this lesson
        </p>
        <ul
          className={`flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain py-3.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2.5 sm:py-4 [&::-webkit-scrollbar]:hidden ${
            benchmark ? "touch-pan-x pb-1 [scroll-padding-inline:1rem]" : ""
          }`}
        >
          {items.map((item) => (
            <li key={item.id} className={`shrink-0 ${benchmark ? "snap-start" : ""}`}>
              <a
                href={`#${item.id}`}
                className={`inline-flex max-w-[14rem] items-center rounded-full border bg-surface/90 text-foreground shadow-[var(--shadow-text-04)] transition-colors hover:border-[color-mix(in_srgb,var(--gold-primary)_35%,var(--border))] hover:bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--accent-blue)_45%,transparent)] ${
                  benchmark
                    ? "min-h-[2.75rem] border-border/85 px-3.5 py-2 text-[0.72rem] font-medium leading-tight tracking-wide sm:max-w-none sm:px-4 sm:text-[0.74rem]"
                    : "border-border/90 px-3 py-1.5 text-[0.7rem] font-medium tracking-wide"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
