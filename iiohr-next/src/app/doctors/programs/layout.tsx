import type { Metadata } from "next";
import type { ReactNode } from "react";
import { assertIiohrEntitledPath } from "@/lib/auth/iiohr-route-guard";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DoctorProgramsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  await assertIiohrEntitledPath("/doctors/programs");
  return children;
}
