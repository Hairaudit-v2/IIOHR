import type { ReactNode } from "react";
import { requireSessionForIiohrPath } from "@/lib/auth/iiohr-route-guard";

export default async function ApplicationStatusLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  await requireSessionForIiohrPath("/academy/application-status");
  return children;
}
