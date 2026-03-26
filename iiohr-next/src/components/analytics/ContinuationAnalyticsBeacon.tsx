"use client";

import { useEffect } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics/events";

interface ContinuationAnalyticsBeaconProps {
  role: "doctor" | "consultant_nurse" | "clinic_group";
  route: "/apply/doctors" | "/apply/consultants" | "/apply/clinics";
  signedIn: boolean;
}

export function ContinuationAnalyticsBeacon({
  role,
  route,
  signedIn,
}: ContinuationAnalyticsBeaconProps) {
  useEffect(() => {
    trackAnalyticsEvent("funnel_continuation_viewed", {
      role,
      route,
      signed_in: signedIn,
    });
  }, [role, route, signedIn]);

  return null;
}

