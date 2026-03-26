"use client";

export type AnalyticsEventName =
  | "journey_page_view"
  | "funnel_cta_clicked"
  | "funnel_enquiry_type_selected"
  | "funnel_continuation_viewed"
  | "funnel_form_started"
  | "funnel_form_submit_attempted"
  | "funnel_form_submit_succeeded"
  | "funnel_form_submit_failed"
  | "auth_magic_link_requested"
  | "auth_magic_link_result"
  | "auth_post_login_landing";

export type AnalyticsProps = Record<string, string | number | boolean | null | undefined>;

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

export function trackAnalyticsEvent(event: AnalyticsEventName, props: AnalyticsProps = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event,
    ts: Date.now(),
    ...props,
  };

  const w = window as DataLayerWindow;
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push(payload);
  }

  window.dispatchEvent(new CustomEvent("iiohr:analytics", { detail: payload }));
}

