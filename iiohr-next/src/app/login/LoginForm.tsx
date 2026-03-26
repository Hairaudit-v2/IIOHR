"use client";

import { useState } from "react";
import { requestMagicLinkAction } from "./actions";
import { trackAnalyticsEvent } from "@/lib/analytics/events";

export function LoginForm({ defaultRedirect }: { defaultRedirect: string }) {
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit(formData: FormData) {
    trackAnalyticsEvent("auth_magic_link_requested", {
      redirect_to: defaultRedirect || "/",
    });
    setPending(true);
    try {
      const r = await requestMagicLinkAction(formData);
      setNotice({ ok: r.ok, text: r.message });
      trackAnalyticsEvent("auth_magic_link_result", {
        ok: r.ok,
        redirect_to: defaultRedirect || "/",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="space-y-5" action={submit}>
      <input type="hidden" name="redirectTo" value={defaultRedirect} />
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={pending}
          placeholder="you@clinic.org"
          className="w-full rounded-md border border-border bg-[var(--bg-secondary)] px-3 py-2 text-sm text-foreground placeholder:text-readable-muted"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md border border-transparent bg-[var(--text-primary)] px-4 py-2 text-sm font-medium text-[var(--bg-secondary)] hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Sending link…" : "Email me a sign-in link"}
      </button>
      {notice ? (
        <p
          className={
            notice.ok
              ? "text-sm text-foreground"
              : "text-sm text-destructive"
          }
          role="status"
        >
          {notice.text}
        </p>
      ) : null}
    </form>
  );
}
