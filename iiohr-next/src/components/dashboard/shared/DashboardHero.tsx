import type { ReactNode } from "react";
import type { DashboardRoleAccent } from "@/lib/dashboard/types";
import { dashboardEyebrowClass, dashboardHeroShellClass } from "@/components/dashboard/shared/dashboard-role-styles";

interface DashboardHeroProps {
  accent: DashboardRoleAccent;
  eyebrow: string;
  title: string;
  subtitle: string;
  badge?: ReactNode;
}

export function DashboardHero({ accent, eyebrow, title, subtitle, badge }: DashboardHeroProps) {
  return (
    <div
      className={`rounded-[10px] border border-border/90 p-6 shadow-[0_1px_0_var(--shadow-text-04)] md:p-8 ${dashboardHeroShellClass(accent)}`}
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 space-y-4">
          <p className={`text-xs font-semibold tracking-[0.16em] uppercase ${dashboardEyebrowClass(accent)}`}>
            {eyebrow}
          </p>
          <h1 className="text-heading text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-[2.15rem] [text-wrap:balance]">
            {title}
          </h1>
          <p className="max-w-2xl text-[1.02rem] leading-relaxed text-readable-muted md:text-[1.06rem]">{subtitle}</p>
        </div>
        {badge ? <div className="shrink-0 md:pt-1">{badge}</div> : null}
      </div>
    </div>
  );
}
