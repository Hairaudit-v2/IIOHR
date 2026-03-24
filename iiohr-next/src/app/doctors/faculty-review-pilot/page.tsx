import { redirect } from "next/navigation";

/** @deprecated Use `/academy/faculty-review?stream=doctors`. */
export default function FacultyReviewPilotRedirectPage() {
  redirect("/academy/faculty-review?stream=doctors");
}
