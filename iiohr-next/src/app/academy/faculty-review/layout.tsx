import type { ReactNode } from "react";
import { assertIiohrEntitledPath } from "@/lib/auth/iiohr-route-guard";

export default async function FacultyReviewLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  await assertIiohrEntitledPath("/academy/faculty-review");
  return children;
}
