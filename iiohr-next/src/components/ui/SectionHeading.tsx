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
  const descriptionWidthClass = align === "center" ? "mx-auto max-w-2xl" : "max-w-3xl";

  return (
    <header className={`space-y-3 ${alignClass}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <HeadingTag className="text-3xl leading-tight font-semibold tracking-tight md:text-4xl lg:text-[2.35rem]">
        {title}
      </HeadingTag>
      {description ? (
        <p className={`${descriptionWidthClass} text-base leading-relaxed text-muted-foreground md:text-[1.03rem]`}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
