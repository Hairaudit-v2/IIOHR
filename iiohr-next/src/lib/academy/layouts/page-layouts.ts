import type { AcademyPageLayout } from "@/lib/academy/content-types";

export const programPageLayout: AcademyPageLayout = {
  page: "program",
  tone: "premium-clinical-academic",
  sections: [
    { id: "program-header", label: "Program header", emphasis: "primary" },
    { id: "program-overview", label: "Program overview", emphasis: "primary" },
    { id: "levels", label: "Level progression", emphasis: "supporting" },
    { id: "curriculum", label: "Curriculum structure", emphasis: "primary" },
    { id: "compliance", label: "Compliance and scope", emphasis: "safety" },
  ],
};

export const levelPageLayout: AcademyPageLayout = {
  page: "level",
  tone: "premium-clinical-academic",
  sections: [
    { id: "level-header", label: "Level header", emphasis: "primary" },
    { id: "level-overview", label: "Level overview", emphasis: "primary" },
    { id: "module-sequence", label: "Module sequence", emphasis: "supporting" },
    { id: "eligibility", label: "Eligibility and award rules", emphasis: "safety" },
  ],
};

export const modulePageLayout: AcademyPageLayout = {
  page: "module",
  tone: "premium-clinical-academic",
  sections: [
    { id: "module-header", label: "Module header", emphasis: "primary" },
    { id: "outcomes", label: "Module learning outcomes", emphasis: "primary" },
    { id: "lessons", label: "Lesson sequence", emphasis: "primary" },
    { id: "assessments", label: "Assessments and tasks", emphasis: "supporting" },
    { id: "compliance", label: "Scope and safety", emphasis: "safety" },
  ],
};

export const lessonPageLayout: AcademyPageLayout = {
  page: "lesson",
  tone: "premium-clinical-academic",
  sections: [
    { id: "lesson-header", label: "Lesson header", emphasis: "primary" },
    { id: "lesson-body", label: "Lesson body", emphasis: "primary" },
    { id: "communication", label: "Communication examples", emphasis: "supporting" },
    { id: "red-flags", label: "Red flags and escalation", emphasis: "safety" },
    { id: "references", label: "References and resources", emphasis: "supporting" },
  ],
};

export const assessmentPageLayout: AcademyPageLayout = {
  page: "assessment",
  tone: "premium-clinical-academic",
  sections: [
    { id: "assessment-header", label: "Assessment header", emphasis: "primary" },
    { id: "assessment-instructions", label: "Candidate instructions", emphasis: "supporting" },
    { id: "assessment-items", label: "Assessment items", emphasis: "primary" },
    { id: "faculty-review", label: "Faculty review state", emphasis: "supporting" },
    { id: "completion", label: "Completion requirements", emphasis: "safety" },
  ],
};
