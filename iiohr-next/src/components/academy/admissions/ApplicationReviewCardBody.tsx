import { groupAnswersForReview } from "@/lib/academy/admissions/group-application-answers";
import { consentLabelForKey } from "@/lib/academy/admissions/stream-forms";
import type { AcademyStreamSlug } from "@/lib/academy/constants";
import type { ApplicationReviewRow } from "@/lib/academy/services/academy-service-contracts";
import { answerToPlainString } from "@/lib/academy/admissions/answer-utils";
import type { ApplicationAnswerRow } from "@/lib/academy/db/types";

function answerByKey(answers: ApplicationReviewRow["answers"], key: string): string {
  const row = answers.find((a) => a.question_key === key);
  return row ? answerToPlainString(row.answer) : "";
}

function snapshotToAnswerRows(snapshot: unknown): ApplicationAnswerRow[] {
  if (!snapshot || typeof snapshot !== "object" || Array.isArray(snapshot)) {
    return [];
  }
  const o = snapshot as Record<string, unknown>;
  return Object.keys(o).map((question_key) => ({
    id: "",
    application_id: "",
    question_key,
    answer: o[question_key],
  }));
}

function isRichSnapshot(snapshot: unknown): snapshot is Record<string, unknown> {
  if (snapshot == null || typeof snapshot !== "object" || Array.isArray(snapshot)) {
    return false;
  }
  return Object.keys(snapshot as object).length > 0;
}

function reviewerDisplayLabel(actorUserId: string | null, reviewerLabelByUserId: Record<string, string>): string {
  if (!actorUserId) {
    return "System";
  }
  const resolved = reviewerLabelByUserId[actorUserId]?.trim();
  if (resolved) {
    return resolved;
  }
  return `Reviewer (…${actorUserId.slice(-8)})`;
}

function GroupedAnswerSections({
  title,
  applicant,
  streamSpecific,
  other,
}: {
  title: string;
  applicant: ReturnType<typeof groupAnswersForReview>["applicant"];
  streamSpecific: ReturnType<typeof groupAnswersForReview>["streamSpecific"];
  other: ReturnType<typeof groupAnswersForReview>["other"];
}) {
  return (
    <div className="mt-4 space-y-6 border-t border-border pt-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-readable-muted">{title}</h3>
      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-readable-muted">Applicant details</h4>
        <dl className="mt-2 space-y-2">
          {applicant.length === 0 ? (
            <p className="text-sm text-readable-muted">No applicant fields recorded.</p>
          ) : (
            applicant.map((item) => (
              <div key={item.key}>
                <dt className="text-xs font-medium text-readable-muted">{item.label}</dt>
                <dd className="mt-0.5 whitespace-pre-wrap text-sm text-foreground">{item.value || "—"}</dd>
              </div>
            ))
          )}
        </dl>
      </section>
      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-readable-muted">
          Professional / stream-specific
        </h4>
        <dl className="mt-2 space-y-2">
          {streamSpecific.map((item) => (
            <div key={item.key}>
              <dt className="text-xs font-medium text-readable-muted">{item.label}</dt>
              <dd className="mt-0.5 whitespace-pre-wrap text-sm text-foreground">{item.value || "—"}</dd>
            </div>
          ))}
        </dl>
      </section>
      {other.length > 0 ? (
        <section>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-readable-muted">Other responses</h4>
          <dl className="mt-2 space-y-2">
            {other.map((item) => (
              <div key={item.key}>
                <dt className="text-xs font-medium text-readable-muted">{item.label}</dt>
                <dd className="mt-0.5 whitespace-pre-wrap text-sm text-foreground">{item.value || "—"}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
    </div>
  );
}

export function ApplicationReviewCardBody({
  app,
  reviewerLabelByUserId = {},
}: {
  app: ApplicationReviewRow;
  reviewerLabelByUserId?: Record<string, string>;
}) {
  const stream = app.target_stream_slug as AcademyStreamSlug;
  const { applicant, streamSpecific, other } = groupAnswersForReview(stream, app.answers);

  const snapshotEvents = app.admissions_events.filter((e) => isRichSnapshot(e.answers_snapshot));

  const fullName = answerByKey(app.answers, "applicant:full_name");
  const email = answerByKey(app.answers, "applicant:email");
  const phone = answerByKey(app.answers, "applicant:phone");

  return (
    <>
      {app.internal_notes?.trim() ? (
        <div className="mt-4 rounded-md border border-border bg-[var(--bg-soft)] p-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-readable-muted">Internal notes</h3>
          <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">{app.internal_notes}</p>
        </div>
      ) : null}

      {app.admissions_events.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-readable-muted">Status history</h3>
          <ol className="mt-2 space-y-3 border-l border-border pl-4">
            {app.admissions_events.map((ev) => (
              <li key={ev.id} className="relative text-sm">
                <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-border" aria-hidden />
                <time className="text-xs text-readable-muted" dateTime={ev.created_at}>
                  {ev.created_at}
                </time>
                <p className="mt-0.5 text-foreground">
                  <span className="font-mono text-xs">{ev.from_status ?? "—"}</span>
                  {" → "}
                  <span className="font-mono text-xs">{ev.to_status}</span>
                  <span className="text-readable-muted"> · {reviewerDisplayLabel(ev.actor_user_id, reviewerLabelByUserId)}</span>
                </p>
                {ev.applicant_message?.trim() ? (
                  <p className="mt-1 text-xs text-readable-muted">
                    <span className="font-medium text-foreground">Applicant-facing text: </span>
                    {ev.applicant_message}
                  </p>
                ) : null}
                {ev.internal_note?.trim() ? (
                  <p className="mt-1 whitespace-pre-wrap text-xs text-readable-muted">
                    <span className="font-medium text-foreground">Internal: </span>
                    {ev.internal_note}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {snapshotEvents.map((ev, index) => {
        const rows = snapshotToAnswerRows(ev.answers_snapshot);
        if (rows.length === 0) {
          return null;
        }
        const grouped = groupAnswersForReview(stream, rows);
        const labelDate = new Date(ev.created_at).toISOString();
        return (
          <GroupedAnswerSections
            key={`snap-${ev.id}`}
            title={`Information request snapshot ${index + 1} · ${labelDate}`}
            applicant={grouped.applicant}
            streamSpecific={grouped.streamSpecific}
            other={grouped.other}
          />
        );
      })}

      {fullName || email || phone ? (
        <p className="mt-3 text-sm text-foreground">
          <span className="font-medium">Admissions contact:</span>{" "}
          {[fullName, email, phone].filter(Boolean).join(" · ") || "—"}
        </p>
      ) : null}

      <GroupedAnswerSections
        title="Current responses"
        applicant={applicant}
        streamSpecific={streamSpecific}
        other={other}
      />

      <div className="mt-6 border-t border-border pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-readable-muted">Consents</h3>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-foreground">
          {app.consents.length === 0 ? (
            <li className="list-none text-readable-muted">None recorded.</li>
          ) : (
            app.consents.map((c) => (
              <li key={c.consent_key}>
                {consentLabelForKey(stream, c.consent_key)}
                <span className="text-readable-muted"> · v{c.consent_version}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}
