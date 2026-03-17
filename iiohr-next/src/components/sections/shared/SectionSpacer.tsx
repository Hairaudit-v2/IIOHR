/**
 * Subtle visual break between sections. Use sparingly for rhythm.
 */
export function SectionSpacer() {
  return (
    <div className="border-b border-border-soft bg-background" aria-hidden>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-5" />
    </div>
  );
}
