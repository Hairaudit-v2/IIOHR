import { Eyebrow } from "@/components/ui/Eyebrow";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  /** Use on `SectionShell dark` / charcoal backgrounds */
  eyebrowOnDark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  eyebrowOnDark = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const HeadingTag = as;
  const descriptionWidthClass =
    align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl lg:max-w-[40rem]";

  return (
    <header className={`space-y-8 ${alignClass}`}>
      {eyebrow ? (
        <div className={align === "center" ? "flex flex-col items-center gap-4" : "space-y-4"}>
          <Eyebrow variant={eyebrowOnDark ? "dark" : "light"}>{eyebrow}</Eyebrow>
          <div className={`section-kicker-rule ${align === "center" ? "mx-auto" : ""}`} aria-hidden />
        </div>
      ) : null}
      <HeadingTag className="text-heading text-3xl leading-[1.08] font-semibold tracking-[-0.03em] md:text-[2.5rem] lg:text-[2.85rem] [text-wrap:balance]">
        {title}
      </HeadingTag>
      {description ? (
        <p
          className={`${descriptionWidthClass} max-w-prose text-base leading-relaxed md:text-[1.05rem] [line-height:1.72] ${
            eyebrowOnDark ? "text-muted-foreground" : "text-readable-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
