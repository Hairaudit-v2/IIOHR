import Link from "next/link";
import type { AcademyStreamSlug } from "@/lib/academy/constants";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ProtectedAcademyAccessBoundaryProps = {
  stream: AcademyStreamSlug;
  isSignedIn: boolean;
  loginHref: string;
  dashboardHref: string;
  applyHref: string;
  admissionsHref: string;
};

const streamCopy = {
  doctors: {
    eyebrow: "Doctor academy access",
    title: "Detailed doctor training content is protected",
    description:
      "Programme detail, module structure, lesson content, assessments, and teaching resources are reserved for approved doctor learners, faculty, and authorised academy users.",
  },
  consultants: {
    eyebrow: "Consultant academy access",
    title: "Detailed consultant training content is protected",
    description:
      "Programme detail, competency transcripts, modules, assessments, and academy resources are reserved for approved consultant learners, faculty, and authorised academy users.",
  },
} as const;

export function ProtectedAcademyAccessBoundary({
  stream,
  isSignedIn,
  loginHref,
  dashboardHref,
  applyHref,
  admissionsHref,
}: ProtectedAcademyAccessBoundaryProps) {
  const copy = streamCopy[stream];

  return (
    <SectionShell>
      <div className="statement-panel px-6 py-8 md:px-8 md:py-10">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            {isSignedIn ? "Your account is recognised" : "Public visitors see the admissions layer first"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-readable-muted">
            {isSignedIn
              ? "This account does not currently have protected academy access for this route. Detailed learning content opens after the relevant admissions review and approved enrolment, or for faculty/admin access."
              : "You can review the academy overview, pathway philosophy, admissions guidance, and application flow publicly. Detailed curriculum and internal academy materials become available after sign-in and approved access."}
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Next steps</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {!isSignedIn ? (
              <Link
                href={loginHref}
                className="inline-flex min-h-11 items-center rounded-lg border border-transparent bg-[var(--text-primary)] px-5 py-2.5 text-sm font-medium text-[var(--bg-secondary)] hover:opacity-90"
              >
                Sign in or create account
              </Link>
            ) : (
              <Link
                href={dashboardHref}
                className="inline-flex min-h-11 items-center rounded-lg border border-transparent bg-[var(--text-primary)] px-5 py-2.5 text-sm font-medium text-[var(--bg-secondary)] hover:opacity-90"
              >
                Open my account
              </Link>
            )}
            <Link
              href={admissionsHref}
              className="inline-flex min-h-11 items-center rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground hover:border-accent/40 hover:bg-surface-elevated"
            >
              Review admissions
            </Link>
            <Link
              href={applyHref}
              className="inline-flex min-h-11 items-center rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground hover:border-accent/40 hover:bg-surface-elevated"
            >
              Continue application
            </Link>
          </div>
        </Card>
      </div>
    </SectionShell>
  );
}
