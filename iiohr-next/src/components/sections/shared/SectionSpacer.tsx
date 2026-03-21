/**
 * Vertical rhythm between sections — soft tone wash, no hard divider.
 * `airy` adds extra pause before a major dark centerpiece.
 */
export function SectionSpacer({ airy = false }: { airy?: boolean }) {
  return (
    <div className="section-breathe" aria-hidden>
      <div
        className={`mx-auto max-w-6xl px-4 sm:px-5 ${airy ? "py-12 md:py-16 lg:py-20" : "py-8 md:py-12"}`}
      />
    </div>
  );
}
