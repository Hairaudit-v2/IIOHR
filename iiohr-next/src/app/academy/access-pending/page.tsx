import type { Metadata } from "next";
import Link from "next/link";
import { applyTrainingHref } from "@/lib/navigation";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Access pending",
  robots: { index: false, follow: false },
};

export default async function AcademyAccessPendingPage() {
  return (
    <main
      className="section-light section-flow w-full min-h-[50vh] text-sm text-foreground"
      data-section-tone="light"
    >
      <div className="mx-auto max-w-xl px-6 py-12">
        <h1 className="text-lg font-semibold tracking-tight">Access pending</h1>
        <p className="mt-3 leading-relaxed text-readable-muted">
          You are signed in, but this account does not yet have an active IIOHR academy role, enrollment, or application
          on record. If you recently applied or were invited, admissions may still be processing your record.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-readable-muted">
          <li>
            <Link href={applyTrainingHref} className="link-premium font-medium">
              Start or continue an application
            </Link>
          </li>
          <li>
            <Link href="/apply/clinics" className="link-premium font-medium">
              Clinic or group enquiry continuation
            </Link>
          </li>
          <li>
            <Link href="/login" className="link-premium font-medium">
              Use a different email
            </Link>{" "}
            (sign out first if needed)
          </li>
        </ul>
        <p className="mt-8">
          <Link
            href="/logout"
            className="rounded-md border border-border bg-[var(--bg-secondary)] px-4 py-2 font-medium hover:bg-[var(--bg-soft)]"
          >
            Sign out
          </Link>
        </p>
      </div>
    </main>
  );
}
