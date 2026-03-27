import type { ReactNode } from "react";
import { requireSessionForIiohrPath } from "@/lib/auth/iiohr-route-guard";

export default async function AccessPendingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  await requireSessionForIiohrPath("/academy/access-pending");
  return children;
}
