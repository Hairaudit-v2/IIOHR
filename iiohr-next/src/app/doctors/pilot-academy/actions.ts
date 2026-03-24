"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  PILOT_DOCTOR_ASSESSMENT_ID,
  PILOT_DOCTOR_ASSESSMENT_RESPONSES,
  PILOT_DOCTOR_LESSON_ID,
  PILOT_DOCTOR_MODULE_ID,
  PILOT_DOCTOR_PROGRAM_SLUG,
} from "@/lib/academy/pilot/constants";
import { getPilotProgramEnrollment } from "@/lib/academy/pilot/enrollment";
import { createAssessmentSubmissionService } from "@/lib/academy/services/assessment-submission-service";
import { createProgressTrackingService } from "@/lib/academy/services/progress-tracking-service";

export async function pilotMarkLessonAndRefreshAction() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/doctors/pilot-academy?flash=auth-required");
  }

  const enrollment = await getPilotProgramEnrollment(supabase, user.id);
  if (!enrollment) {
    redirect("/doctors/pilot-academy?flash=no-enrollment");
  }

  const progress = createProgressTrackingService(supabase);
  await progress.markLessonComplete({
    programEnrollmentId: enrollment.id,
    userId: user.id,
    lessonId: PILOT_DOCTOR_LESSON_ID,
  });
  await progress.refreshModuleProgress({
    programEnrollmentId: enrollment.id,
    moduleId: PILOT_DOCTOR_MODULE_ID,
    programSlug: PILOT_DOCTOR_PROGRAM_SLUG,
    streamSlug: "doctors",
  });

  redirect("/doctors/pilot-academy?flash=lesson-complete");
}

export async function pilotSubmitAssessmentAttemptAction() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/doctors/pilot-academy?flash=auth-required");
  }

  const enrollment = await getPilotProgramEnrollment(supabase, user.id);
  if (!enrollment) {
    redirect("/doctors/pilot-academy?flash=no-enrollment");
  }

  const submissions = createAssessmentSubmissionService(supabase);
  await submissions.submitAttempt({
    programEnrollmentId: enrollment.id,
    userId: user.id,
    assessmentId: PILOT_DOCTOR_ASSESSMENT_ID,
    responses: { ...PILOT_DOCTOR_ASSESSMENT_RESPONSES },
  });

  redirect("/doctors/pilot-academy?flash=assessment-submitted");
}
