"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function revalidateClinicDashboard() {
  revalidatePath("/clinics/dashboard");
}

export async function inviteClinicTeamMember(formData: FormData) {
  const clinicId = formData.get("clinicId")?.toString();
  const email = formData.get("email")?.toString();
  const stream = formData.get("target_stream_slug")?.toString();
  const program = formData.get("target_program_slug")?.toString() ?? null;
  if (!clinicId || !email || !stream) {
    return;
  }
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("clinic_invite_team_member", {
    p_clinic_id: clinicId,
    p_invite_email: email,
    p_target_stream_slug: stream,
    p_target_program_slug: program,
  });
  if (error) {
    console.error("[inviteClinicTeamMember]", error.message);
    return;
  }
  revalidateClinicDashboard();
}

export async function cancelClinicInvite(formData: FormData) {
  const memberId = formData.get("memberId")?.toString();
  if (!memberId) {
    return;
  }
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("clinic_cancel_team_invite", {
    p_member_id: memberId,
  });
  if (error) {
    console.error("[cancelClinicInvite]", error.message);
    return;
  }
  revalidateClinicDashboard();
}

export async function upsertClinicMemberPathway(formData: FormData) {
  const clinicId = formData.get("clinicId")?.toString();
  const userId = formData.get("user_id")?.toString();
  const stream = formData.get("target_stream_slug")?.toString();
  const program = formData.get("target_program_slug")?.toString() ?? null;
  const status = formData.get("member_status")?.toString() ?? "active";
  if (!clinicId || !userId || !stream) {
    return;
  }
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("clinic_upsert_member_pathway", {
    p_clinic_id: clinicId,
    p_user_id: userId,
    p_target_stream_slug: stream,
    p_target_program_slug: program,
    p_member_status: status,
  });
  if (error) {
    console.error("[upsertClinicMemberPathway]", error.message);
    return;
  }
  revalidateClinicDashboard();
}

export async function updateClinicMemberStatus(formData: FormData) {
  const memberId = formData.get("memberId")?.toString();
  const status = formData.get("member_status")?.toString();
  if (!memberId || !status) {
    return;
  }
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("clinic_update_member_status", {
    p_member_id: memberId,
    p_target_status: status,
  });
  if (error) {
    console.error("[updateClinicMemberStatus]", error.message);
    return;
  }
  revalidateClinicDashboard();
}
