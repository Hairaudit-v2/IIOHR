/**
 * Subtle visual break between sections. Use sparingly for rhythm.
 */
export function SectionSpacer() {
  return (
    <div className="border-b border-border-soft bg-section-ivory" aria-hidden>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-5 md:py-10" />
    </div>
  );
}
