import type { ReactNode } from "react";
import { assertIiohrEntitledPath } from "@/lib/auth/iiohr-route-guard";

export default async function AdmissionsReviewLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  await assertIiohrEntitledPath("/academy/admissions/review");
  return children;
}
