import type { AcademyAssessment, AssessmentItem } from "@/lib/academy/assessment-types";
import type { AssessmentDomainTag, ComplianceNoticeType } from "@/lib/academy/constants";
import type { ComplianceNotice } from "@/lib/academy/content-types";
import { getProgram, getProgramComplianceNotices } from "@/lib/academy/content-loader";

function collectDomainTags(assessment: AcademyAssessment, items: AssessmentItem[]): Set<AssessmentDomainTag> {
  const tags = new Set<AssessmentDomainTag>();
  for (const t of assessment.mandatoryDomainTags) {
    tags.add(t);
  }
  for (const t of assessment.completionRules.mandatoryDomainTags) {
    tags.add(t);
  }
  for (const item of items) {
    for (const t of item.domainTags) {
      tags.add(t);
    }
  }
  return tags;
}

const NOTICE_TYPES_BY_DOMAIN: Partial<Record<AssessmentDomainTag, ComplianceNoticeType[]>> = {
  "ethics-scope": ["scope-of-practice", "diagnostic-boundary", "surgical-training-boundary", "consent-boundary"],
  "consent-support": ["consent-boundary", "scope-of-practice", "diagnostic-boundary"],
  "red-flags": ["escalation-boundary", "diagnostic-boundary", "scope-of-practice"],
  escalation: ["escalation-boundary", "diagnostic-boundary"],
  triage: ["escalation-boundary", "scope-of-practice", "diagnostic-boundary"],
  knowledge: ["scope-of-practice", "diagnostic-boundary"],
  documentation: ["scope-of-practice", "escalation-boundary"],
  communication: ["scope-of-practice", "diagnostic-boundary", "escalation-boundary"],
  "care-coordination": ["escalation-boundary", "scope-of-practice"],
};

/**
 * Merges program-level compliance ids with notices implied by assessment and item domain tags.
 * Always includes program.complianceNoticeIds, then adds any notices whose noticeType matches tag-derived types.
 */
export function resolveComplianceNoticeIdsForAssessment(
  programSlug: string,
  assessment: AcademyAssessment,
  items: AssessmentItem[]
): string[] {
  const program = getProgram(programSlug);
  const notices = getProgramComplianceNotices(programSlug);
  const ids = new Set<string>(program?.complianceNoticeIds ?? []);
  const tags = collectDomainTags(assessment, items);
  const typesToInclude = new Set<ComplianceNoticeType>();

  for (const tag of tags) {
    const mapped = NOTICE_TYPES_BY_DOMAIN[tag];
    if (mapped) {
      for (const nt of mapped) {
        typesToInclude.add(nt);
      }
    }
  }

  if (typesToInclude.size > 0) {
    for (const n of notices) {
      if (typesToInclude.has(n.noticeType as ComplianceNoticeType)) {
        ids.add(n.id);
      }
    }
  }

  return [...ids];
}

export function orderComplianceNoticesForDisplay(notices: ComplianceNotice[]): ComplianceNotice[] {
  const severityRank = { critical: 0, caution: 1, info: 2 } as const;
  return [...notices].sort((a, b) => {
    const sev =
      severityRank[a.severity as keyof typeof severityRank] -
      severityRank[b.severity as keyof typeof severityRank];
    if (sev !== 0) {
      return sev;
    }
    return a.title.localeCompare(b.title);
  });
}
