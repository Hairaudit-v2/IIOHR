import type { DashboardRoleAccent } from "@/lib/dashboard/types";

/** Distinct left accent + wash per role; keeps shared typography and cards. */
export function dashboardHeroShellClass(accent: DashboardRoleAccent): string {
  switch (accent) {
    case "doctor":
      return "border-l-[3px] border-slate-900 bg-slate-900/[0.025]";
    case "consultant":
      return "border-l-[3px] border-[color-mix(in_srgb,var(--accent-blue)_65%,var(--text-primary)_35%)] bg-[var(--accent-blue-soft)]";
    case "clinic":
      return "border-l-[3px] border-[color-mix(in_srgb,var(--gold-primary)_55%,var(--text-primary)_45%)] bg-[var(--gold-soft)]";
    default:
      return "";
  }
}

export function dashboardEyebrowClass(accent: DashboardRoleAccent): string {
  switch (accent) {
    case "doctor":
      return "text-slate-800";
    case "consultant":
      return "text-[color-mix(in_srgb,var(--accent-blue)_70%,var(--text-primary)_30%)]";
    case "clinic":
      return "text-[color-mix(in_srgb,var(--gold-primary)_75%,var(--text-primary)_25%)]";
    default:
      return "text-muted-foreground";
  }
}
