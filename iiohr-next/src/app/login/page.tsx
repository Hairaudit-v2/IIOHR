import type { Metadata } from "next";
import Link from "next/link";
import { sanitizeRedirectPath } from "@/lib/auth/safe-redirect-path";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to IIOHR academy and admissions tools.",
};

export const dynamic = "force-dynamic";

const errorCopy: Record<string, string> = {
  auth: "Sign-in could not be completed. Request a new link and try again.",
  config: "Authentication is not configured. Check environment variables.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ redirectTo?: string; error?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const redirectTo = sanitizeRedirectPath(sp.redirectTo);
  const defaultRedirect = redirectTo === "/" ? "" : redirectTo;
  const err = sp.error ? errorCopy[sp.error] ?? "Something went wrong." : null;

  return (
    <main className="mx-auto max-w-md px-6 py-16 text-sm text-foreground">
      <h1 className="text-lg font-semibold tracking-tight">Sign in</h1>
      <p className="mt-2 leading-relaxed text-[var(--text-secondary)]">
        We will email you a one-time link. No password is stored for this sign-in method.
      </p>

      {err ? (
        <p className="mt-6 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-destructive">
          {err}
        </p>
      ) : null}

      <div className="mt-8 rounded-lg border border-border bg-surface p-6">
        <LoginForm defaultRedirect={defaultRedirect} />
      </div>

      <p className="mt-8 text-center text-[var(--text-secondary)]">
        <Link href="/" className="link-premium font-medium">
          Back to site
        </Link>
      </p>
    </main>
  );
}
