import type { Metadata } from "next";
import Link from "next/link";
import type { AcademyStreamSlug } from "@/lib/academy/constants";
import { getCurriculumMap } from "@/lib/academy/curriculum-map";
import { getStreamPrograms } from "@/lib/academy/content-loader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Academy curriculum preview",
  robots: { index: false, follow: false },
};

function StreamProgramList({
  stream,
  heading,
  subheading,
}: {
  stream: AcademyStreamSlug;
  heading: string;
  subheading: string;
}) {
  const programs = getStreamPrograms(stream);
  const programBase = stream === "doctors" ? "/doctors/programs" : "/consultants/programs";

  return (
    <section className="rounded-xl border border-border bg-[var(--bg-secondary)] p-6 shadow-sm">
      <h2 className="text-base font-semibold tracking-tight text-foreground">{heading}</h2>
      <p className="mt-1 text-sm leading-relaxed text-readable-muted">{subheading}</p>
      <ul className="mt-5 space-y-6">
        {programs.map((program) => {
          const map = getCurriculumMap(program.slug);
          const modules =
            map?.levels.flatMap((level) =>
              level.sections.flatMap((section) => section.modules)
            ) ?? [];

          return (
            <li key={program.id} className="border-t border-border pt-5 first:border-t-0 first:pt-0">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <Link
                  href={`${programBase}/${program.slug}`}
                  className="link-premium text-sm font-medium text-foreground"
                >
                  {program.workingTitle || program.title}
                </Link>
                <span className="text-xs text-readable-muted">
                  {program.status === "published" ? "Published" : `Status: ${program.status}`}
                </span>
              </div>
              {modules.length > 0 ? (
                <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                  {modules.map((mod) => (
                    <li key={mod.id}>
                      <Link
                        href={`${programBase}/${program.slug}/modules/${mod.slug}`}
                        className="text-xs text-readable-muted transition-colors hover:text-foreground"
                      >
                        {mod.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-xs text-readable-muted">No modules resolved for this program slug.</p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function AcademyPreviewPage() {
  return (
    <main
      className="section-light section-flow w-full min-h-[50vh] text-sm text-foreground"
      data-section-tone="light"
    >
      <div className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--gold-primary)]">Internal</p>
        <h1 className="mt-2 text-xl font-semibold tracking-tight">Academy curriculum preview</h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-readable-muted">
          Read-only navigation across doctor and consultant (including nurse pathway) programmes. This hub does not
          enroll you or change learner progress. Access is granted only through explicit roles in{" "}
          <code className="rounded bg-[var(--bg-soft)] px-1 font-mono text-[0.85em]">user_roles</code> (
          <span className="font-mono text-[0.85em]">academy_preview</span>, or staff{" "}
          <span className="font-mono text-[0.85em]">admin</span> / <span className="font-mono text-[0.85em]">faculty</span>
          ).
        </p>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <StreamProgramList
            stream="doctors"
            heading="Doctors stream"
            subheading="Postgraduate and physician-facing programmes, assessments, and certificates."
          />
          <StreamProgramList
            stream="consultants"
            heading="Consultants & nurses stream"
            subheading="Consultant, coordinator, and nurse certificate pathways share this stream in the content model."
          />
        </div>
        <div className="mt-10 flex flex-wrap gap-3 text-xs text-readable-muted">
          <Link href="/doctors/programs" className="link-premium font-medium">
            Doctors programme index
          </Link>
          <span aria-hidden>·</span>
          <Link href="/consultants/programs" className="link-premium font-medium">
            Consultant programme index
          </Link>
          <span aria-hidden>·</span>
          <Link href="/doctors/pilot-academy" className="link-premium font-medium">
            Doctor pilot surfaces
          </Link>
        </div>
      </div>
    </main>
  );
}
