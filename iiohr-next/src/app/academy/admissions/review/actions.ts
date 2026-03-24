"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createAdmissionsService } from "@/lib/academy/services/admissions-persistence";

export async function admissionsAcceptAction(formData: FormData) {
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
  const id = formData.get("applicationId");
  if (typeof id !== "string" || !id) {
    throw new Error("Missing applicationId");
  }
  const admissions = createAdmissionsService(supabase);
  await admissions.acceptApplication(id);
  revalidatePath("/academy/admissions/review");
}

export async function admissionsRejectAction(formData: FormData) {
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
  const id = formData.get("applicationId");
  if (typeof id !== "string" || !id) {
    throw new Error("Missing applicationId");
  }
  const admissions = createAdmissionsService(supabase);
  await admissions.rejectApplication(id);
  revalidatePath("/academy/admissions/review");
}

export async function admissionsMarkUnderReviewAction(formData: FormData) {
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
  const id = formData.get("applicationId");
  if (typeof id !== "string" || !id) {
    throw new Error("Missing applicationId");
  }
  const admissions = createAdmissionsService(supabase);
  await admissions.markUnderReview(id);
  revalidatePath("/academy/admissions/review");
}
