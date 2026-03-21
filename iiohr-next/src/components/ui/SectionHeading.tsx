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
      {eyebrow ? <Eyebrow variant={eyebrowOnDark ? "dark" : "light"}>{eyebrow}</Eyebrow> : null}
      <HeadingTag className="text-heading text-3xl leading-tight font-semibold tracking-tight md:text-4xl lg:text-[2.35rem] [text-wrap:balance]">
        {title}
      </HeadingTag>
      {description ? (
        <p
          className={`${descriptionWidthClass} max-w-prose text-base leading-relaxed md:text-[1.03rem] [line-height:1.7] ${
            eyebrowOnDark ? "text-muted-foreground" : "text-readable-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
