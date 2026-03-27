/**
 * Pilot-only helpers: extract teaching-manual lines from existing lesson body strings (no schema).
 */

/** Paragraph that enumerates journey phases (Volume 1 Week 1 teaching notes). */
export function extractJourneyParagraphFromLessonBody(content: string): string | null {
  const chunks = content.trim().split(/\n\n+/);
  for (const chunk of chunks) {
    const t = chunk.trim();
    if (t.startsWith("Map the typical journey")) {
      return t;
    }
  }
  return null;
}

/** Phases after the colon, split on commas — preserves manual wording. */
export function splitJourneyPhases(journeyParagraph: string): string[] {
  const idx = journeyParagraph.indexOf(":");
  if (idx === -1) {
    return [];
  }
  return journeyParagraph
    .slice(idx + 1)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
