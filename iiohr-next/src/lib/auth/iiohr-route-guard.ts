import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  fetchIiohrAccessSnapshot,
  resolveIiohrPostLoginDestination,
  userCanAccessIiohrPath,
} from "@/lib/auth/iiohr-post-login";

export async function requireSessionForIiohrPath(pathname: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/login?redirectTo=${encodeURIComponent(pathname)}`);
  }
}

export async function assertIiohrEntitledPath(pathname: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/login?redirectTo=${encodeURIComponent(pathname)}`);
  }
  const snapshot = await fetchIiohrAccessSnapshot(supabase, user.id);
  if (!userCanAccessIiohrPath(pathname, snapshot)) {
    redirect(resolveIiohrPostLoginDestination(snapshot).destination);
  }
}
