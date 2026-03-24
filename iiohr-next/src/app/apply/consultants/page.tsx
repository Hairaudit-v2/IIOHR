import type { Metadata } from "next";
import Link from "next/link";
import { StreamApplyFormFields } from "@/components/academy/admissions/StreamApplyFormFields";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { saveStreamApplicationDraftAction, submitStreamApplicationAction } from "../stream-application-actions";

export const metadata: Metadata = {
  title: "Apply — Consultant academy stream",
  description: "Submit an admissions application for the IIOHR consultant academy stream.",
};

export const dynamic = "force-dynamic";

export default async function ApplyConsultantsPage({
  searchParams,
}: {
  searchParams?: Promise<{ submitted?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto max-w-xl px-6 py-12 text-sm text-foreground">
      <p className="text-[var(--text-secondary)]">
        <Link href="/apply" className="link-premium font-medium">
          Apply
        </Link>
        {" · "}
        <Link href="/academy" className="link-premium font-medium">
          Academy
        </Link>
      </p>
      <h1 className="mt-4 text-lg font-semibold tracking-tight">Consultant stream application</h1>
      <p className="mt-2 text-[var(--text-secondary)] leading-relaxed">
        Sign in, complete the stream-specific questions, accept the required consents, then submit. Saving a draft stores
        your answers without submitting.
      </p>

      {sp.submitted ? (
        <p className="mt-6 rounded border border-border bg-muted/30 p-4 text-foreground">
          Application submitted. Admissions will review your submission. You can continue to explore the{" "}
          <Link href="/consultants" className="link-premium font-medium">
            consultant academy
          </Link>{" "}
          areas that are open to you.
        </p>
      ) : null}

      {!user ? (
        <p className="mt-8 rounded border border-border p-4 text-[var(--text-secondary)]">
          You need to be signed in to apply. Use your site account session (Supabase auth).
        </p>
      ) : (
        <form className="mt-8 space-y-8">
          <StreamApplyFormFields stream="consultants" />
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              formAction={saveStreamApplicationDraftAction}
              className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-muted/40"
            >
              Save draft
            </button>
            <button
              type="submit"
              formAction={submitStreamApplicationAction}
              className="rounded-md border border-transparent bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
            >
              Submit application
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
