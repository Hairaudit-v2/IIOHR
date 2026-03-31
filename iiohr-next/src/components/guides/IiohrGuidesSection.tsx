import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import type { IiohrGuide } from "@/lib/guides/iiohr-guides";
import { iiohrGuideDownloadFilename, resolveIiohrGuideRelatedRef } from "@/lib/guides/iiohr-guides";

export type IiohrGuidesLayout = "section" | "compact";

interface IiohrGuidesSectionProps {
  guides: readonly IiohrGuide[];
  layout?: IiohrGuidesLayout;
  /** Used when `layout` is `section` */
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Anchor for hub linking (e.g. `iiohr-guides`) */
  sectionId?: string;
  /** Optional link to full guide list */
  viewAllHref?: string;
  viewAllLabel?: string;
  analyticsPage?: string;
  analyticsSection?: string;
}

function GuideRelatedLinks({
  guide,
  analyticsPage,
  analyticsSection,
}: {
  guide: IiohrGuide;
  analyticsPage?: string;
  analyticsSection?: string;
}) {
  const refs = guide.relatedDestinationRefs;
  if (!refs?.length) {
    return null;
  }
  return (
    <div className="mt-5 border-t border-border/60 pt-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-readable-muted">Related pages</p>
      <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-xs">
        {refs.map((ref) => {
          const d = resolveIiohrGuideRelatedRef(ref);
          const common = "link-premium font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/40 focus-visible:ring-offset-2";
          const analytics = {
            "data-analytics-event": "guide_related_link",
            "data-analytics-page": analyticsPage,
            "data-analytics-section": analyticsSection,
            "data-analytics-guide-id": guide.id,
            "data-analytics-destination": d.absoluteUrl,
          } as const;
          if (d.sitePath) {
            return (
              <li key={ref}>
                <Link href={d.sitePath} className={common} {...analytics}>
                  {d.linkLabel}
                </Link>
              </li>
            );
          }
          return (
            <li key={ref}>
              <a
                href={d.absoluteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={common}
                {...analytics}
              >
                {d.linkLabel}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function GuideActions({
  guide,
  analyticsPage,
  analyticsSection,
}: {
  guide: IiohrGuide;
  analyticsPage?: string;
  analyticsSection?: string;
}) {
  const file = iiohrGuideDownloadFilename(guide);
  const viewLabel = `${guide.primaryCtaLabel} — ${guide.shortTitle} (opens in new tab)`;
  return (
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
      <a
        href={guide.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="link-premium text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2"
        aria-label={viewLabel}
        data-analytics-event="guide_pdf_view"
        data-analytics-page={analyticsPage}
        data-analytics-section={analyticsSection}
        data-analytics-guide-id={guide.id}
        data-analytics-destination={guide.fileUrl}
      >
        {guide.primaryCtaLabel}
      </a>
      <a
        href={guide.fileUrl}
        download={file}
        className="link-premium text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-intel/45 focus-visible:ring-offset-2"
        aria-label={`${guide.secondaryCtaLabel} — ${guide.shortTitle}`}
        data-analytics-event="guide_pdf_download"
        data-analytics-page={analyticsPage}
        data-analytics-section={analyticsSection}
        data-analytics-guide-id={guide.id}
        data-analytics-destination={guide.fileUrl}
      >
        {guide.secondaryCtaLabel}
      </a>
    </div>
  );
}

export function IiohrGuidesSection({
  guides,
  layout = "section",
  eyebrow = "Resources",
  title = "IIOHR guides",
  description = "Downloadable PDFs for orientation, admissions, and institutional context. Replace files in `/public/guides/iiohr/` to update content without changing URLs.",
  sectionId,
  viewAllHref,
  viewAllLabel = "All guides on About",
  analyticsPage,
  analyticsSection = "iiohr_guides",
}: IiohrGuidesSectionProps) {
  if (guides.length === 0) {
    return null;
  }

  if (layout === "compact") {
    const first = guides[0];
    if (!first) {
      return null;
    }
    return (
      <aside
        className="mt-6 rounded-lg border border-border/80 bg-[var(--bg-secondary)] p-4 text-foreground"
        aria-label="IIOHR guide downloads"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-readable-muted">Guide</p>
        <h2 className="mt-2 text-base font-semibold tracking-tight">{first.shortTitle}</h2>
        <p className="mt-2 text-sm leading-relaxed text-readable-muted">{first.description}</p>
        <GuideActions guide={first} analyticsPage={analyticsPage} analyticsSection={analyticsSection} />
        {viewAllHref ? (
          <p className="mt-4 text-sm">
            <Link href={viewAllHref} className="link-premium font-medium">
              {viewAllLabel}
            </Link>
          </p>
        ) : null}
      </aside>
    );
  }

  return (
    <SectionShell id={sectionId} muted joinPrevious>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      {viewAllHref ? (
        <p className="mt-6 text-sm text-readable-muted">
          <Link href={viewAllHref} className="link-premium font-medium">
            {viewAllLabel}
          </Link>
        </p>
      ) : null}
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {guides.map((guide) => (
          <Card key={guide.id} quiet interactive>
            {guide.coverImageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element -- marketing cover; no optimization pipeline yet
              <img
                src={guide.coverImageSrc}
                alt=""
                className="mb-4 aspect-[3/4] w-full rounded-md border border-border/60 object-cover"
              />
            ) : null}
            <h3 className="text-lg font-semibold tracking-tight text-foreground">{guide.title}</h3>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.1em] text-readable-muted">{guide.audience}</p>
            <p className="mt-3 text-sm leading-relaxed text-readable-muted">{guide.description}</p>
            <GuideActions guide={guide} analyticsPage={analyticsPage} analyticsSection={analyticsSection} />
            <GuideRelatedLinks guide={guide} analyticsPage={analyticsPage} analyticsSection={analyticsSection} />
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
