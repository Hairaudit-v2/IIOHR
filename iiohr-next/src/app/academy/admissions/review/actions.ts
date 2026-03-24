"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createAdmissionsService } from "@/lib/academy/services/admissions-persistence";
import { dispatchAdmissionNotification } from "@/lib/notifications/dispatch-admission-notification";

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Sign in required");
  }
  const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
  const isAdmin = (roles ?? []).some((r: { role: string }) => r.role === "admin");
  if (!isAdmin) {
    throw new Error("Admin role required");
  }
  return { supabase, user };
}

function readApplicationId(formData: FormData): string {
  const id = formData.get("applicationId");
  if (typeof id !== "string" || !id.trim()) {
    throw new Error("Missing applicationId");
  }
  return id.trim();
}

function readOptionalNote(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (typeof v !== "string") {
    return null;
  }
  const t = v.trim();
  return t.length ? t : null;
}

export async function admissionsAcceptAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = readApplicationId(formData);
  const admissions = createAdmissionsService(supabase);
  await admissions.acceptApplication(id);
  void dispatchAdmissionNotification(supabase, {
    applicationId: id,
    event: { kind: "application_accepted" },
  });
  revalidatePath("/academy/admissions/review");
  revalidatePath("/apply/doctors");
  revalidatePath("/apply/consultants");
  revalidatePath("/doctors/dashboard");
  revalidatePath("/consultants/dashboard");
}

export async function admissionsDeclineAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = readApplicationId(formData);
  const note = readOptionalNote(formData, "internalNote");
  const admissions = createAdmissionsService(supabase);
  await admissions.declineApplication(id, note);
  void dispatchAdmissionNotification(supabase, {
    applicationId: id,
    event: { kind: "application_declined" },
  });
  revalidatePath("/academy/admissions/review");
  revalidatePath("/apply/doctors");
  revalidatePath("/apply/consultants");
  revalidatePath("/doctors/dashboard");
  revalidatePath("/consultants/dashboard");
}

export async function admissionsMarkUnderReviewAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = readApplicationId(formData);
  const note = readOptionalNote(formData, "internalNote");
  const admissions = createAdmissionsService(supabase);
  await admissions.markUnderReview(id, note);
  void dispatchAdmissionNotification(supabase, {
    applicationId: id,
    event: { kind: "application_under_review" },
  });
  revalidatePath("/academy/admissions/review");
  revalidatePath("/apply/doctors");
  revalidatePath("/apply/consultants");
  revalidatePath("/doctors/dashboard");
  revalidatePath("/consultants/dashboard");
}

export async function admissionsRequestMoreInformationAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = readApplicationId(formData);
  const msgRaw = formData.get("applicantMessage");
  if (typeof msgRaw !== "string" || !msgRaw.trim()) {
    throw new Error("Applicant message is required");
  }
  const note = readOptionalNote(formData, "internalNote");
  const admissions = createAdmissionsService(supabase);
  const msg = msgRaw.trim();
  await admissions.requestMoreInformation(id, msg, note);
  void dispatchAdmissionNotification(supabase, {
    applicationId: id,
    event: { kind: "needs_more_information", messageToApplicant: msg },
  });
  revalidatePath("/academy/admissions/review");
  revalidatePath("/apply/doctors");
  revalidatePath("/apply/consultants");
  revalidatePath("/doctors/dashboard");
  revalidatePath("/consultants/dashboard");
}

export async function admissionsUpdateInternalNotesAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = readApplicationId(formData);
  const notesRaw = formData.get("internalNotes");
  const notes = typeof notesRaw === "string" ? notesRaw : "";
  const admissions = createAdmissionsService(supabase);
  await admissions.updateInternalNotes(id, notes);
  revalidatePath("/academy/admissions/review");
}
