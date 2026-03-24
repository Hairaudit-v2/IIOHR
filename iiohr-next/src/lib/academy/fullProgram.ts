import adminWorkflowJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/admin-workflow.json";
import completionRulesJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/completion-rules.json";
import modulesJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/modules/index.json";
import programJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/program.json";
import sectionsJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/sections/index.json";
import assessmentSchemaJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/templates/assessment-schema.json";
import lessonTemplateJson from "@/content/academy/programs/postgraduate-certificate-clinical-trichology-hair-restoration-medicine/templates/lesson-template.json";

export const academyProgram = programJson;
export const academySections = sectionsJson;
export const academyModules = modulesJson;
export const academyLessonTemplate = lessonTemplateJson;
export const academyAssessmentSchema = assessmentSchemaJson;
export const academyCompletionSchema = completionRulesJson;
export const academyAdminWorkflow = adminWorkflowJson;

const sectionById = new Map(academySections.map((section) => [section.id, section]));
const moduleBySlug = new Map(academyModules.map((programModule) => [programModule.slug, programModule]));

export function getAcademyProgram() {
  return academyProgram;
}

export function getAcademySectionCatalog() {
  return academySections.map((section) => ({
    ...section,
    modules: academyModules.filter((programModule) => programModule.sectionId === section.id)
  }));
}

export function getAcademyModuleCatalog() {
  return academyModules.map((programModule) => ({
    ...programModule,
    section: sectionById.get(programModule.sectionId) ?? null
  }));
}

export function getAcademyModuleBySlug(moduleSlug: string) {
  return moduleBySlug.get(moduleSlug) ?? null;
}
