import type { User } from "@supabase/supabase-js";

/**
 * Draft answers win; then fill applicant email/name from auth profile when still empty.
 */
export function mergeApplyInitialAnswers(params: {
  draftMap: Record<string, string>;
  user: User | null;
  profileFullName?: string | null;
  profileDisplayName?: string | null;
}): Record<string, string> {
  const { draftMap, user, profileFullName, profileDisplayName } = params;
  const fromProfile = (profileFullName ?? "").trim() || (profileDisplayName ?? "").trim();
  return {
    ...draftMap,
    "applicant:email": (draftMap["applicant:email"] ?? "").trim() || user?.email || "",
    "applicant:full_name": (draftMap["applicant:full_name"] ?? "").trim() || fromProfile,
  };
}
