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
      ? "py-8 md:py-10 lg:py-12"
      : "py-6 md:py-8"
    : airy
      ? "py-16 md:py-20 lg:py-24"
      : "py-10 md:py-16";
  return (
    <div className="section-breathe" aria-hidden>
      <div className={`mx-auto max-w-6xl px-4 sm:px-5 ${pad}`} />
    </div>
  );
}
