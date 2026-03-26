import type { AcademyStreamSlug } from "@/lib/academy/constants";
import type { DbAppUserRole } from "@/lib/academy/db/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ProtectedAcademyAccess = {
  stream: AcademyStreamSlug;
  userId: string | null;
  isSignedIn: boolean;
  roles: DbAppUserRole[];
  hasPrivilegedRole: boolean;
  hasActiveEnrollment: boolean;
  hasProtectedAccess: boolean;
  loginHref: string;
  dashboardHref: string;
  applyHref: string;
  admissionsHref: string;
};

const dashboardHrefByStream: Record<AcademyStreamSlug, string> = {
  doctors: "/doctors/dashboard",
  consultants: "/consultants/dashboard",
};

const applyHrefByStream: Record<AcademyStreamSlug, string> = {
  doctors: "/apply/doctors",
  consultants: "/apply/consultants",
};

export async function getProtectedAcademyAccess(
  stream: AcademyStreamSlug,
  returnPath: string
): Promise<ProtectedAcademyAccess> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const dashboardHref = dashboardHrefByStream[stream];
  const applyHref = applyHrefByStream[stream];
  const loginHref = `/login?redirectTo=${encodeURIComponent(returnPath)}`;

  if (!user) {
    return {
      stream,
      userId: null,
      isSignedIn: false,
      roles: [],
      hasPrivilegedRole: false,
      hasActiveEnrollment: false,
      hasProtectedAccess: false,
      loginHref,
      dashboardHref,
      applyHref,
      admissionsHref: "/admissions",
    };
  }

  const [{ data: rolesData }, { data: enrollmentData }] = await Promise.all([
    supabase.from("user_roles").select("role").eq("user_id", user.id),
    supabase
      .from("program_enrollments")
      .select("id")
      .eq("user_id", user.id)
      .eq("stream_slug", stream)
      .eq("status", "active")
      .limit(1),
  ]);

  const roles = ((rolesData ?? []) as Array<{ role: DbAppUserRole }>).map((entry) => entry.role);
  const hasPrivilegedRole = roles.includes("admin") || roles.includes("faculty");
  const hasActiveEnrollment = Boolean(enrollmentData?.length);

  return {
    stream,
    userId: user.id,
    isSignedIn: true,
    roles,
    hasPrivilegedRole,
    hasActiveEnrollment,
    hasProtectedAccess: hasPrivilegedRole || hasActiveEnrollment,
    loginHref,
    dashboardHref,
    applyHref,
    admissionsHref: "/admissions",
  };
}
