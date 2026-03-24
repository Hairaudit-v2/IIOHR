import type { SupabaseClient } from "@supabase/supabase-js";
import type { AcademyStreamSlug } from "@/lib/academy/constants";
import type { LessonCompletionRow, ModuleProgressRow } from "@/lib/academy/db/types";
import type {
  LearnerModuleProgressSummary,
  MarkLessonCompleteInput,
  ProgressTrackingService,
} from "@/lib/academy/services/academy-service-contracts";
import { getLessonsForModule } from "@/lib/academy/content-loader";

async function loadCompletedLessonIds(
  supabase: SupabaseClient,
  programEnrollmentId: string,
  lessonIds: string[]
): Promise<Set<string>> {
  if (lessonIds.length === 0) {
    return new Set();
  }
  const { data, error } = await supabase
    .from("lesson_completions")
    .select("lesson_id")
    .eq("program_enrollment_id", programEnrollmentId)
    .in("lesson_id", lessonIds);
  if (error) {
    throw new Error(error.message);
  }
  return new Set((data ?? []).map((row) => row.lesson_id as string));
}

export function createProgressTrackingService(supabase: SupabaseClient): ProgressTrackingService {
  return {
    async markLessonComplete(input: MarkLessonCompleteInput): Promise<LessonCompletionRow> {
      const payload = {
        program_enrollment_id: input.programEnrollmentId,
        lesson_id: input.lessonId,
        completed_at: new Date().toISOString(),
        duration_minutes: input.durationMinutes ?? null,
        completion_source: input.completionSource ?? "self_complete",
      };

      const { data, error } = await supabase
        .from("lesson_completions")
        .upsert(payload, { onConflict: "program_enrollment_id,lesson_id" })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data as LessonCompletionRow;
    },

    async refreshModuleProgress(params: {
      programEnrollmentId: string;
      moduleId: string;
      programSlug: string;
      streamSlug: AcademyStreamSlug;
    }): Promise<ModuleProgressRow> {
      void params.streamSlug;
      const lessons = getLessonsForModule(params.programSlug, params.moduleId);
      const lessonIds = lessons.map((l) => l.id);
      const completed = await loadCompletedLessonIds(supabase, params.programEnrollmentId, lessonIds);
      const total = lessonIds.length;
      const percentComplete =
        total === 0 ? 100 : Math.min(100, Math.round((completed.size / total) * 100));
      const completedAt =
        total > 0 && completed.size >= total ? new Date().toISOString() : null;

      const upsertPayload = {
        program_enrollment_id: params.programEnrollmentId,
        module_id: params.moduleId,
        percent_complete: percentComplete,
        completed_at: completedAt,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("module_progress")
        .upsert(upsertPayload, { onConflict: "program_enrollment_id,module_id" })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data as ModuleProgressRow;
    },

    async getLearnerModuleProgressSummary(params: {
      programEnrollmentId: string;
      moduleId: string;
      programSlug: string;
    }): Promise<LearnerModuleProgressSummary> {
      const lessons = getLessonsForModule(params.programSlug, params.moduleId);
      const lessonIds = lessons.map((l) => l.id);
      const completed = await loadCompletedLessonIds(supabase, params.programEnrollmentId, lessonIds);
      const totalLessons = lessonIds.length;
      const lessonCompletionPercent =
        totalLessons === 0 ? 100 : Math.round((completed.size / totalLessons) * 100);

      const { data: row, error } = await supabase
        .from("module_progress")
        .select("*")
        .eq("program_enrollment_id", params.programEnrollmentId)
        .eq("module_id", params.moduleId)
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      const moduleProgressRow =
        (row as ModuleProgressRow | null) ??
        ({
          id: "",
          program_enrollment_id: params.programEnrollmentId,
          module_id: params.moduleId,
          percent_complete: lessonCompletionPercent,
          completed_at: null,
          updated_at: new Date().toISOString(),
        } satisfies ModuleProgressRow);

      return {
        programSlug: params.programSlug,
        moduleId: params.moduleId,
        lessonCompletionPercent,
        completedLessonCount: completed.size,
        totalLessons,
        moduleProgressRow,
      };
    },
  };
}
