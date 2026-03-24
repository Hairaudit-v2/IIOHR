import fs from "node:fs";
import path from "node:path";

/** True if `urlPath` maps to a file under `/public` (server-only). */
export function publicFileExists(urlPath: string | null | undefined): boolean {
  if (!urlPath || typeof urlPath !== "string" || !urlPath.startsWith("/")) {
    return false;
  }
  const relative = urlPath.replace(/^\//, "");
  const full = path.join(process.cwd(), "public", relative);
  try {
    const st = fs.statSync(full);
    return st.isFile();
  } catch {
    return false;
  }
}

export function partitionDownloadableResourcesByFile<T extends { fileUrl: string }>(
  resources: T[]
): { available: T[]; unavailable: T[] } {
  const available: T[] = [];
  const unavailable: T[] = [];
  for (const r of resources) {
    (publicFileExists(r.fileUrl) ? available : unavailable).push(r);
  }
  return { available, unavailable };
}
