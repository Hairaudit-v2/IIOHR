/**
 * Vertical rhythm between sections — soft tone wash, no hard divider.
 * `airy` adds extra pause before a major dark centerpiece.
 * `minimal` keeps the handoff very tight (cream continuity).
 */
export function SectionSpacer({
  airy = false,
  minimal = false,
}: {
  airy?: boolean;
  minimal?: boolean;
}) {
  const pad = minimal
    ? airy
      ? "py-6 md:py-8 lg:py-10"
      : "py-4 md:py-6"
    : airy
      ? "py-12 md:py-16 lg:py-20"
      : "py-8 md:py-12";
  return (
    <div className="section-breathe" aria-hidden>
      <div className={`mx-auto max-w-6xl px-4 sm:px-5 ${pad}`} />
    </div>
  );
}
