import { parseLessonBodyContent } from "@/lib/academy/lesson-body-blocks";

interface RichTextAcademicBodyProps {
  content: string;
  /** Benchmark pilot: optimal measure, looser cadence, softer hr rhythm (default off). */
  pilotBand?: boolean;
}

export function RichTextAcademicBody({ content, pilotBand = false }: RichTextAcademicBodyProps) {
  const blocks = parseLessonBodyContent(content);

  return (
    <div
      className={`lesson-reading-body text-readable-muted ${
        pilotBand
          ? "mx-auto max-w-[65ch] space-y-7 text-[15px] leading-[1.78] md:text-[15px] md:leading-[1.82]"
          : "space-y-5"
      }`}
    >
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={key}
                className="border-b border-[color-mix(in_srgb,var(--gold-primary)_28%,transparent)] pb-2 text-lg font-semibold tracking-tight text-foreground first:mt-0"
              >
                {block.text}
              </h2>
            );
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
                      ? "text-[1.02rem] leading-[1.72] text-foreground/95 md:text-[1.05rem]"
                      : "text-[0.95rem] leading-[1.65] text-foreground/95"
                  }
                >
                  {block.text}
                </p>
              );
            }
            return (
              <p key={key} className={pilotBand ? "text-[15px] leading-[1.78] md:leading-[1.82]" : "text-sm leading-relaxed"}>
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
                    ? "my-10 border-0 border-t border-dashed border-[color-mix(in_srgb,var(--gold-primary)_22%,var(--border))]"
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
