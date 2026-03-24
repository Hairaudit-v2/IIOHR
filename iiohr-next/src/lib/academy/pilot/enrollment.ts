import type { SupabaseClient } from "@supabase/supabase-js";
import type { ProgramEnrollmentRow } from "@/lib/academy/db/types";
import { PILOT_DOCTOR_PROGRAM_SLUG } from "@/lib/academy/pilot/constants";

export async function getPilotProgramEnrollment(
  supabase: SupabaseClient,
  userId: string
): Promise<ProgramEnrollmentRow | null> {
  const { data, error } = await supabase
    .from("program_enrollments")
    .select("*")
    .eq("user_id", userId)
    .eq("program_slug", PILOT_DOCTOR_PROGRAM_SLUG)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  return data as ProgramEnrollmentRow | null;
}
