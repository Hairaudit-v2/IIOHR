import {
  getProgramAssessmentBySlug,
  getProgramLessonBySlug,
  getProgramModuleBySlug,
  getProgramContentBundle,
} from "@/lib/academy/content-loader";
import { getAssessmentPageViewModel } from "@/lib/academy/view-models/assessment";
import { getLessonPageViewModel } from "@/lib/academy/view-models/lesson";
import { getModulePageViewModel } from "@/lib/academy/view-models/module";

const doctorProgramSlug = "postgraduate-certificate-clinical-trichology-hair-restoration-medicine";

const bundle = getProgramContentBundle(doctorProgramSlug);

export const volume1 = bundle?.sections[0] ?? null;
export const volume1Modules = bundle?.modules ?? [];
export const volume1Lessons = bundle?.lessons ?? [];
export const volume1Quizzes = bundle?.assessments ?? [];
export const volume1CasePrompts = bundle?.caseStudies ?? [];
export const volume1References = bundle?.references ?? [];
export const volume1Resources = bundle?.resources ?? [];

export const volume1ImplementationSequence = [
  "Generalise the academy core before keeping any stream-specific content helpers.",
  "Resolve doctor seed content through the shared program bundle loader.",
  "Expose compatibility helpers while doctor routes migrate to the shared academy core.",
  "Keep doctor content and consultant content distinct even while they share infrastructure.",
  "Layer learner progress, scoring, moderation, and certificates on top of shared content services."
] as const;

export function getVolume1ModuleBySlug(moduleSlug: string) {
  return getProgramModuleBySlug(doctorProgramSlug, moduleSlug);
}

export function getVolume1LessonBySlug(lessonSlug: string) {
  return getProgramLessonBySlug(doctorProgramSlug, lessonSlug);
}

export function getVolume1QuizBySlug(quizSlug: string) {
  return getProgramAssessmentBySlug(doctorProgramSlug, quizSlug);
}

export function getVolume1ModulePageViewModel(moduleSlug: string) {
  return getModulePageViewModel(doctorProgramSlug, moduleSlug);
}

export function getVolume1LessonPageViewModel(lessonSlug: string) {
  return getLessonPageViewModel(doctorProgramSlug, lessonSlug);
}

export function getVolume1AssessmentPageViewModel(assessmentSlug: string) {
  return getAssessmentPageViewModel(doctorProgramSlug, assessmentSlug);
}

export function getVolume1CurriculumMap() {
  return volume1Modules
    .map((module) => ({
      module,
      lessons: volume1Lessons.filter((lesson) => lesson.moduleId === module.id),
      assessment: volume1Quizzes.find((assessment) => assessment.moduleId === module.id) ?? null,
      caseStudy: volume1CasePrompts.find((caseStudy) => caseStudy.moduleId === module.id) ?? null,
    }));
}
