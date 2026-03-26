"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackAnalyticsEvent, type AnalyticsEventName } from "@/lib/analytics/events";

function getRoleFromPath(pathname: string): "doctor" | "consultant_nurse" | "clinic_group" | "unknown" {
  if (pathname.includes("/doctors")) return "doctor";
  if (pathname.includes("/consultants")) return "consultant_nurse";
  if (pathname.includes("/for-clinics") || pathname.includes("/apply/clinics")) return "clinic_group";
  return "unknown";
}

function delegatedClickTracking(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  const node = target.closest<HTMLElement>("[data-analytics-event]");
  if (!node) return;

  const eventName = (node.dataset.analyticsEvent as AnalyticsEventName | undefined) ?? "funnel_cta_clicked";
  const destination = node.dataset.analyticsDestination ?? null;
  const page = node.dataset.analyticsPage ?? null;
  const cta = node.dataset.analyticsCta ?? null;
  const section = node.dataset.analyticsSection ?? null;
  const role = node.dataset.analyticsRole ?? null;
  const journey = node.dataset.analyticsJourney ?? null;

  trackAnalyticsEvent(eventName, {
    page,
    cta,
    section,
    role,
    destination,
    journey,
  });
}

export function AnalyticsListener() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    trackAnalyticsEvent("journey_page_view", {
      page: pathname,
      role: getRoleFromPath(pathname),
    });

    if (typeof document !== "undefined" && document.referrer.includes("/auth/callback")) {
      trackAnalyticsEvent("auth_post_login_landing", {
        landing_path: pathname,
      });
    }
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => delegatedClickTracking(event);

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}

