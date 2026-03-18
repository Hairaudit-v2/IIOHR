import { Eyebrow } from "@/components/ui/Eyebrow";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const HeadingTag = as;
  const descriptionWidthClass =
    align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl lg:max-w-[40rem]";

  return (
    <header className={`space-y-8 ${alignClass}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <HeadingTag className="text-heading text-3xl leading-tight font-semibold tracking-tight md:text-4xl lg:text-[2.35rem] [text-wrap:balance]">
        {title}
      </HeadingTag>
      {description ? (
        <p className={`${descriptionWidthClass} max-w-prose text-base leading-relaxed text-muted-foreground md:text-[1.03rem] [line-height:1.7]`}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
