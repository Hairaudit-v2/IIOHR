import { parseLessonBodyContent } from "@/lib/academy/lesson-body-blocks";

interface RichTextAcademicBodyProps {
  content: string;
  /** Benchmark pilot: optimal measure, looser cadence, softer hr rhythm (default off). */
  pilotBand?: boolean;
  /** Number h2 sections as teaching beats (pilot short modules; default off). */
  beatNumbers?: boolean;
}

export function RichTextAcademicBody({
  content,
  pilotBand = false,
  beatNumbers = false,
}: RichTextAcademicBodyProps) {
  const blocks = parseLessonBodyContent(content);
  let beat = 0;

  return (
    <div
      className={`lesson-reading-body text-readable-muted ${
        pilotBand
          ? "mx-auto max-w-[62ch] space-y-4 text-[15px] leading-[1.76] md:leading-[1.8]"
          : "space-y-5"
      }`}
    >
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        switch (block.type) {
          case "h2": {
            beat += 1;
            if (pilotBand && beatNumbers) {
              return (
                <div
                  key={key}
                  className={`flex gap-3 rounded-lg border-b border-[color-mix(in_srgb,var(--gold-primary)_26%,transparent)] bg-[color-mix(in_srgb,var(--gold-soft)_22%,transparent)] px-3 py-3 pb-4 sm:gap-4 sm:px-4 ${
                    beat > 1
                      ? "mt-12 border-t border-dashed border-[color-mix(in_srgb,var(--text-primary)_10%,var(--border))] pt-10"
                      : "first:pt-1"
                  }`}
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[color-mix(in_srgb,var(--gold-primary)_42%,var(--border))] bg-surface text-sm font-semibold tabular-nums text-foreground shadow-[var(--shadow-card)]"
                    aria-hidden
                  >
                    {beat}
                  </span>
                  <h2 className="flex-1 text-[1.06rem] font-semibold leading-snug tracking-tight text-foreground sm:text-[1.12rem]">
                    {block.text}
                  </h2>
                </div>
              );
            }
            return (
              <h2
                key={key}
                className="border-b border-[color-mix(in_srgb,var(--gold-primary)_28%,transparent)] pb-2 text-lg font-semibold tracking-tight text-foreground first:mt-0"
              >
                {block.text}
              </h2>
            );
          }
          case "h3":
            return (
              <h3 key={key} className="text-base font-semibold tracking-tight text-foreground">
                {block.text}
              </h3>
            );
          case "p":
            if (block.variant === "lead") {
              return (
                <p
                  key={key}
                  className={
                    pilotBand
                      ? "text-[1.02rem] leading-[1.72] text-foreground/95 md:text-[1.04rem]"
                      : "text-[0.95rem] leading-[1.65] text-foreground/95"
                  }
                >
                  {block.text}
                </p>
              );
            }
            return (
              <p
                key={key}
                className={
                  pilotBand ? "text-[15px] leading-[1.76] md:leading-[1.8]" : "text-sm leading-relaxed"
                }
              >
                {block.text}
              </p>
            );
          case "blockquote":
            return (
              <blockquote
                key={key}
                className="relative rounded-lg border border-[color-mix(in_srgb,var(--gold-primary)_18%,var(--border))] bg-[color-mix(in_srgb,var(--gold-soft)_65%,var(--bg-secondary))] py-4 pl-5 pr-4 before:absolute before:left-0 before:top-3 before:bottom-3 before:w-0.5 before:rounded-full before:bg-[var(--gold-primary)]/80 not-italic"
              >
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--gold-primary)]">
                  Think about this first
                </p>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/90">
                  {block.lines.map((line, lineIndex) => (
                    <p key={`${lineIndex}-${line.slice(0, 24)}`}>{line}</p>
                  ))}
                </div>
              </blockquote>
            );
          case "ul":
            return (
              <ul key={key} className="list-none space-y-2.5 text-sm leading-relaxed">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--gold-primary)]"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "hr":
            return (
              <hr
                key={key}
                className={
                  pilotBand
                    ? "my-8 border-0 border-t border-dashed border-[color-mix(in_srgb,var(--gold-primary)_22%,var(--border))]"
                    : "border-0 border-t border-dashed border-border/90"
                }
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
