"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formDataToSubmitApplicationInput } from "@/lib/academy/admissions/parse-stream-application-form";
import { createAdmissionsService } from "@/lib/academy/services/admissions-persistence";

export async function saveStreamApplicationDraftAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Sign in required");
  }
  const input = formDataToSubmitApplicationInput(user.id, formData);
  const admissions = createAdmissionsService(supabase);
  await admissions.saveDraftApplication(input);
  revalidatePath("/apply/doctors");
  revalidatePath("/apply/consultants");
}

export async function submitStreamApplicationAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Sign in required");
  }
  const input = formDataToSubmitApplicationInput(user.id, formData);
  const admissions = createAdmissionsService(supabase);
  const draft = await admissions.saveDraftApplication(input);
  await admissions.submitApplication(draft.id, user.id);
  revalidatePath("/apply/doctors");
  revalidatePath("/apply/consultants");
  const stream = input.targetStreamSlug;
  if (stream === "doctors") {
    redirect("/apply/doctors?submitted=1");
  }
  redirect("/apply/consultants?submitted=1");
}
