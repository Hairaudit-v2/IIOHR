/** Normalise jsonb `answer` from DB or form to a display/storage string. */
export function answerToPlainString(answer: unknown): string {
  if (typeof answer === "string") {
    return answer;
  }
  if (answer != null && typeof answer === "object" && "text" in answer) {
    const t = (answer as { text: unknown }).text;
    if (typeof t === "string") {
      return t;
    }
  }
  if (answer == null) {
    return "";
  }
  try {
    return JSON.stringify(answer);
  } catch {
    return String(answer);
  }
}

export function answerToTrimmedString(answer: unknown): string {
  return answerToPlainString(answer).trim();
}
