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
        <div className={align === "center" ? "flex flex-col items-center gap-3.5" : "space-y-3.5"}>
          <Eyebrow variant={eyebrowOnDark ? "dark" : "light"}>{eyebrow}</Eyebrow>
          <div className={`section-kicker-rule ${align === "center" ? "mx-auto" : ""}`} aria-hidden />
        </div>
      ) : null}
      <HeadingTag className="text-heading text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-[3.1rem] lg:text-[3.45rem] [text-wrap:balance]">
        {title}
      </HeadingTag>
      {description ? (
        <p
          className={`${descriptionWidthClass} max-w-prose text-[1.02rem] leading-relaxed md:text-[1.09rem] [line-height:1.78] ${
            eyebrowOnDark ? "text-muted-foreground" : "text-readable-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
