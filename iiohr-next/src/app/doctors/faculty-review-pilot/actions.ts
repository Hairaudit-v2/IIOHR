"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { FacultyReviewOutcome } from "@/lib/academy/services/academy-service-contracts";
import { createFacultyReviewService } from "@/lib/academy/services/faculty-review-persistence";

function parseOutcome(raw: string | null): FacultyReviewOutcome {
  if (raw === "approved" || raw === "revision_required" || raw === "rejected") {
    return raw;
  }
  throw new Error("Invalid outcome");
}

export async function facultyClaimAttemptAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Sign in required");
  }
  const attemptId = formData.get("attemptId");
  if (typeof attemptId !== "string" || !attemptId) {
    throw new Error("Missing attemptId");
  }
  const faculty = createFacultyReviewService(supabase);
  await faculty.claimAttempt({ assessmentAttemptId: attemptId, reviewerUserId: user.id });
  revalidatePath("/doctors/faculty-review-pilot");
}

export async function facultyFinalizeAttemptAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Sign in required");
  }
  const attemptId = formData.get("attemptId");
  const outcomeRaw = formData.get("outcome");
  const notes = formData.get("notes");
  const rubric = formData.get("rubricSummary");
  if (typeof attemptId !== "string" || !attemptId) {
    throw new Error("Missing attemptId");
  }
  const outcome = parseOutcome(typeof outcomeRaw === "string" ? outcomeRaw : null);
  const faculty = createFacultyReviewService(supabase);
  await faculty.finalizeAttempt({
    assessmentAttemptId: attemptId,
    reviewerUserId: user.id,
    outcome,
    notes: typeof notes === "string" ? notes : null,
    rubricSummary: typeof rubric === "string" ? rubric : null,
  });
  revalidatePath("/doctors/faculty-review-pilot");
}
