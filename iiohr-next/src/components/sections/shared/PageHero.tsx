import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
}

/** Chapter-opener style hero — warm neutral, bronze heading, generous whitespace */
export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="border-b border-border-soft bg-background">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 md:py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,340px)] lg:items-start lg:gap-14">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-5 max-w-4xl text-heading text-4xl leading-tight font-semibold tracking-tight md:text-5xl lg:text-[2.75rem]">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-9 flex flex-wrap gap-3.5">
                {primaryCta ? <Button href={primaryCta.href}>{primaryCta.label}</Button> : null}
                {secondaryCta ? (
                  <Button href={secondaryCta.href} variant="secondary">
                    {secondaryCta.label}
                  </Button>
                ) : null}
              </div>
            )}
          </div>
          {/* Optional side panel for future image — module spread layout */}
          <div className="hidden min-h-[200px] rounded border border-border bg-surface-elevated lg:block" aria-hidden />
        </div>
      </div>
    </section>
  );
}
