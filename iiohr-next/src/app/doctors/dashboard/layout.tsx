import type { ReactNode } from "react";
import { assertIiohrEntitledPath } from "@/lib/auth/iiohr-route-guard";

export default async function DoctorsDashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  await assertIiohrEntitledPath("/doctors/dashboard");
  return children;
}
