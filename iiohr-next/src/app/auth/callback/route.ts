import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { fetchIiohrAccessSnapshot, mergeIiohrPostLoginWithNext } from "@/lib/auth/iiohr-post-login";
import { sanitizeRedirectPath } from "@/lib/auth/safe-redirect-path";
import { linkPendingClinicInvitesForSession } from "@/lib/clinic/link-pending-invites";

/**
 * Supabase Auth redirect target (PKCE `code`, or `token_hash` + `type` for some email flows).
 * Query `next`: optional safe internal path; honored only when `userCanAccessIiohrPath` allows it,
 * otherwise the central IIOHR post-login resolver chooses the default destination.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const nextRaw = url.searchParams.get("next");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnon) {
    return NextResponse.redirect(new URL("/login?error=config", url.origin));
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, supabaseAnon, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          /* ignore when not writable */
        }
      },
    },
  });

  let sessionError: Error | null = null;
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      sessionError = error;
    }
  } else if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as "email" | "magiclink" | "signup" | "invite",
    });
    if (error) {
      sessionError = error;
    }
  } else {
    sessionError = new Error("missing auth parameters");
  }

  if (sessionError) {
    return NextResponse.redirect(new URL("/login?error=auth", url.origin));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/login?error=auth", url.origin));
  }

  await linkPendingClinicInvitesForSession(supabase);

  const safeNext = sanitizeRedirectPath(nextRaw);
  const snapshot = await fetchIiohrAccessSnapshot(supabase, user.id);
  const { destination: dest } = mergeIiohrPostLoginWithNext(
    safeNext && safeNext !== "/" ? safeNext : null,
    snapshot
  );

  return NextResponse.redirect(new URL(dest, url.origin));
}
