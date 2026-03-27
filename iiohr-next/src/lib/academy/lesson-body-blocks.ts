/**
 * Lightweight markers for lesson `body.content` (richText).
 * Authors can split long reading into deck-like sections without changing JSON schema.
 *
 * Supported (opt-in per lesson):
 * - ## Section title — major break (Gamma-style chapter)
 * - ### Subsection title
 * - > Reflective prompt line(s) — blockquote
 * - --- or *** — divider
 * - - list item (block where every non-empty line starts with "- ")
 */

export type LessonBodyBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string; variant?: "lead" }
  | { type: "blockquote"; lines: string[] }
  | { type: "ul"; items: string[] }
  | { type: "hr" };

function splitChunks(raw: string): string[] {
  return raw
    .trim()
    .split(/\n\n+/)
    .map((c) => c.trim())
    .filter(Boolean);
}

export function parseLessonBodyContent(raw: string): LessonBodyBlock[] {
  const chunks = splitChunks(raw);
  if (chunks.length === 0) {
    return [];
  }

  const blocks: LessonBodyBlock[] = [];
  let paragraphIndex = 0;

  for (const chunk of chunks) {
    if (chunk === "---" || chunk === "***") {
      blocks.push({ type: "hr" });
      continue;
    }

    const h2 = chunk.match(/^##\s+([\s\S]+)$/);
    if (h2) {
      const rest = h2[1]!.trim();
      const [firstLine, ...moreLines] = rest.split("\n");
      const title = firstLine!.trim();
      if (title) {
        blocks.push({ type: "h2", text: title });
      }
      const body = moreLines.join("\n").trim();
      if (body) {
        blocks.push({ type: "p", text: body, variant: paragraphIndex === 0 ? "lead" : undefined });
        paragraphIndex++;
      }
      continue;
    }

    const h3 = chunk.match(/^###\s+([\s\S]+)$/);
    if (h3) {
      const rest = h3[1]!.trim();
      const [firstLine, ...moreLines] = rest.split("\n");
      const title = firstLine!.trim();
      if (title) {
        blocks.push({ type: "h3", text: title });
      }
      const body = moreLines.join("\n").trim();
      if (body) {
        blocks.push({ type: "p", text: body, variant: paragraphIndex === 0 ? "lead" : undefined });
        paragraphIndex++;
      }
      continue;
    }

    const lines = chunk.split("\n");
    if (lines.length > 0 && lines.every((l) => l === "" || l.startsWith(">"))) {
      const quoteLines = lines
        .filter((l) => l.trim() !== "")
        .map((l) => l.replace(/^>\s?/, "").trim());
      if (quoteLines.length > 0) {
        blocks.push({ type: "blockquote", lines: quoteLines });
      }
      continue;
    }

    const nonEmpty = lines.filter((l) => l.trim() !== "");
    if (
      nonEmpty.length > 0 &&
      nonEmpty.every((l) => /^-\s+/.test(l))
    ) {
      blocks.push({
        type: "ul",
        items: nonEmpty.map((l) => l.replace(/^-\s+/, "").trim()),
      });
      continue;
    }

    blocks.push({
      type: "p",
      text: chunk,
      variant: paragraphIndex === 0 ? "lead" : undefined,
    });
    paragraphIndex++;
  }

  return blocks;
}
