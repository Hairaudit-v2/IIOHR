import type { ReactNode } from "react";
import { assertIiohrEntitledPath } from "@/lib/auth/iiohr-route-guard";

export default async function DoctorPilotAcademyLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  await assertIiohrEntitledPath("/doctors/pilot-academy");
  return children;
}
