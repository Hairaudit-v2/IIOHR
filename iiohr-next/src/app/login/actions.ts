"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPublicSiteUrl } from "@/lib/auth/site-url";
import { sanitizeRedirectPath } from "@/lib/auth/safe-redirect-path";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export type MagicLinkRequestState = { ok: boolean; message: string };

export async function requestMagicLinkAction(formData: FormData): Promise<MagicLinkRequestState> {
  const emailRaw = formData.get("email");
  const email = typeof emailRaw === "string" ? emailRaw.trim() : "";
  if (!email || !isValidEmail(email)) {
    return { ok: false, message: "Enter a valid email address." };
  }

  const redirectRaw = formData.get("redirectTo");
  const safeNext = sanitizeRedirectPath(typeof redirectRaw === "string" ? redirectRaw : null);
  const site = getPublicSiteUrl();
  const nextQuery =
    safeNext && safeNext !== "/" ? `?next=${encodeURIComponent(safeNext)}` : "";
  const emailRedirectTo = `${site}/auth/callback${nextQuery}`;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo,
      shouldCreateUser: true,
    },
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  return {
    ok: true,
    message: "Check your email for the sign-in link. You can close this tab.",
  };
}
