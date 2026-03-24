import type { BadgeRecord } from "@/lib/academy/operational-types";

export function createBadgeRecord(params: {
  programEnrollmentId: string;
  levelId: string | null;
  badgeTemplateKey: string;
  downloadUrl: string;
}): BadgeRecord {
  return {
    id: `badge_${params.programEnrollmentId}_${params.badgeTemplateKey}`,
    programEnrollmentId: params.programEnrollmentId,
    levelId: params.levelId,
    badgeTemplateKey: params.badgeTemplateKey,
    issuedAt: new Date().toISOString(),
    downloadUrl: params.downloadUrl,
  };
}
