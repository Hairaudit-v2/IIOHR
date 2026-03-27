import type { SupabaseClient } from "@supabase/supabase-js";
import type { AcademyStreamSlug } from "@/lib/academy/constants";
import type {
  AssessmentAttemptRow,
  CertificateAwardRow,
  ModuleProgressRow,
  ProgramEnrollmentRow,
} from "@/lib/academy/db/types";

export type LearnerDashboardSnapshot = {
  enrollment: ProgramEnrollmentRow | null;
  moduleProgress: ModuleProgressRow[];
  certificates: CertificateAwardRow[];
  lessonCompletionCount: number;
  assessmentAttempts: Pick<
    AssessmentAttemptRow,
    "assessment_id" | "passed" | "submitted_at" | "faculty_review_status"
  >[];
};

const EMPTY: LearnerDashboardSnapshot = {
  enrollment: null,
  moduleProgress: [],
  certificates: [],
  lessonCompletionCount: 0,
  assessmentAttempts: [],
};

async function fetchPrimaryEnrollment(
  supabase: SupabaseClient,
  userId: string,
  stream: AcademyStreamSlug
): Promise<ProgramEnrollmentRow | null> {
  const active = await supabase
    .from("program_enrollments")
    .select("*")
    .eq("user_id", userId)
    .eq("stream_slug", stream)
    .eq("status", "active")
    .maybeSingle();
  if (!active.error && active.data) {
    return active.data as ProgramEnrollmentRow;
  }
  const latest = await supabase
    .from("program_enrollments")
    .select("*")
    .eq("user_id", userId)
    .eq("stream_slug", stream)
    .order("enrolled_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!latest.error && latest.data) {
    return latest.data as ProgramEnrollmentRow;
  }
  return null;
}

/**
 * Loads enrollment, progress, certificates, and assessment rows for the learner dashboard VM.
 * Tolerates RLS/network errors — returns empty snapshot on failure.
 */
export async function fetchLearnerDashboardSnapshot(
  supabase: SupabaseClient,
  userId: string,
  stream: AcademyStreamSlug
): Promise<LearnerDashboardSnapshot> {
  try {
    const enrollment = await fetchPrimaryEnrollment(supabase, userId, stream);
    if (!enrollment) {
      return { ...EMPTY };
    }

    const [mpRes, certRes, lcRes, asRes] = await Promise.all([
      supabase.from("module_progress").select("*").eq("program_enrollment_id", enrollment.id),
      supabase
        .from("certificate_awards")
        .select("*")
        .eq("program_enrollment_id", enrollment.id)
        .order("issued_at", { ascending: false }),
      supabase
        .from("lesson_completions")
        .select("id", { count: "exact", head: true })
        .eq("program_enrollment_id", enrollment.id),
      supabase
        .from("assessment_attempts")
        .select("assessment_id, passed, submitted_at, faculty_review_status")
        .eq("program_enrollment_id", enrollment.id)
        .order("created_at", { ascending: false }),
    ]);

    const moduleProgress = mpRes.error ? [] : ((mpRes.data ?? []) as ModuleProgressRow[]);
    const certificates = certRes.error ? [] : ((certRes.data ?? []) as CertificateAwardRow[]);
    const assessmentAttempts = asRes.error
      ? []
      : ((asRes.data ?? []) as LearnerDashboardSnapshot["assessmentAttempts"]);

    let lessonCompletionCount = 0;
    if (!lcRes.error && typeof lcRes.count === "number") {
      lessonCompletionCount = lcRes.count;
    }

    return {
      enrollment,
      moduleProgress,
      certificates,
      lessonCompletionCount,
      assessmentAttempts,
    };
  } catch {
    return { ...EMPTY };
  }
}
