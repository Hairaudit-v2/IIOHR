export const academySchemaFiles = {
  stream: "src/content/academy/schemas/academy-stream.schema.json",
  program: "src/content/academy/schemas/program.schema.json",
  level: "src/content/academy/schemas/level.schema.json",
  section: "src/content/academy/schemas/section.schema.json",
  module: "src/content/academy/schemas/module.schema.json",
  lesson: "src/content/academy/schemas/lesson.schema.json",
  assessment: "src/content/academy/schemas/assessment.schema.json",
  assessmentItem: "src/content/academy/schemas/assessment-item.schema.json",
  caseStudy: "src/content/academy/schemas/case-study.schema.json",
  practicalTask: "src/content/academy/schemas/practical-task.schema.json",
  competency: "src/content/academy/schemas/competency.schema.json",
  facultyNote: "src/content/academy/schemas/faculty-note.schema.json",
  complianceNotice: "src/content/academy/schemas/compliance-notice.schema.json",
  reference: "src/content/academy/schemas/reference.schema.json",
  resource: "src/content/academy/schemas/downloadable-resource.schema.json",
} as const;

export function getAcademySchemaPath(
  key: keyof typeof academySchemaFiles
): (typeof academySchemaFiles)[keyof typeof academySchemaFiles] {
  return academySchemaFiles[key];
}
