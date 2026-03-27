/**
 * Allow only same-origin relative paths (open-redirect safe).
 * Returns "/" when invalid or empty.
 */
export function sanitizeRedirectPath(raw: string | null | undefined): string {
  if (raw == null || typeof raw !== "string") {
    return "/";
  }
  const s = raw.trim();
  if (s.length === 0 || s.length > 512) {
    return "/";
  }
  if (!s.startsWith("/") || s.startsWith("//") || s.includes("\\") || s.includes("..")) {
    return "/";
  }
  if (s.includes("://") || s.toLowerCase().startsWith("/javascript:")) {
    return "/";
  }
  return s;
}
