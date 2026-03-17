import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { ECOSYSTEM_PLATFORMS } from "@/lib/ecosystemAuthority";

const CTA_CLASS =
  "mt-4 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.04em] text-heading hover:text-accent";

export function EcosystemAuthoritySection() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Connected System"
        title="The Global Hair Intelligence Ecosystem"
        description="IIOHR sits within a connected multi-platform hair intelligence ecosystem. Each platform has a distinct role in training, measurement, analysis, and patient-centred care—together they form a strategic authority architecture for modern hair restoration."
        align="center"
      />
      <div className="mt-10 grid min-w-0 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
        {ECOSYSTEM_PLATFORMS.map((platform) => {
          const displayName = platform.id === "iiohr" ? "IIOHR" : platform.name;
          const ctaLabel = platform.isInternal ? "Explore IIOHR" : "Visit";
          const arrow = platform.isInternal ? "→" : "↗";
          const content = (
            <>
              <h3 className="text-lg font-semibold tracking-tight">{displayName}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {platform.blurb}
              </p>
              <span className={CTA_CLASS}>
                {ctaLabel}
                <span aria-hidden>{arrow}</span>
              </span>
            </>
          );
          return (
            <Card key={platform.id} className="min-w-0">
              {platform.isInternal ? (
                <Link href="/" className="block text-foreground no-underline hover:text-foreground">
                  {content}
                </Link>
              ) : (
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-foreground no-underline hover:text-foreground"
                >
                  {content}
                </a>
              )}
            </Card>
          );
        })}
      </div>
    </SectionShell>
  );
}
