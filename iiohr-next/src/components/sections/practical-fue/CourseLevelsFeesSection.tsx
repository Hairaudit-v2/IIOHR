import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const courseLevels = [
  {
    name: "Foundation",
    duration: "3 days",
    fee: "USD 3,000",
    summary: "Foundational knowledge of FUE and exposure to modern techniques.",
  },
  {
    name: "Intermediate Level 1",
    duration: "6 days",
    fee: "USD 7,500",
    summary: "For doctors transitioning from observation to guided hands-on execution.",
  },
  {
    name: "Intermediate Level 2",
    duration: "14 days incl. 2 rest days",
    fee: "USD 17,500",
    summary: "For doctors ready for independent sessions under close supervision.",
  },
  {
    name: "Advanced Immersion",
    duration: "30 days incl. 4 rest days",
    fee: "USD 30,000",
    summary: "For doctors aiming for mastery and scaling a hair transplant practice.",
  },
];

const supportOptions = [
  {
    title: "Continued mentorship",
    value: "USD 1,500",
    description: "Up to 10 hours.",
  },
  {
    title: "Surgical audit",
    value: "USD 750",
    description: "Up to 5 surgeries per month.",
  },
];

const pricingSignals = [
  { label: "Course levels", value: "4" },
  { label: "Starting fee", value: "USD 3,000" },
  { label: "Longest format", value: "30 days" },
  { label: "Live site", value: "Gurgaon" },
];

export function CourseLevelsFeesSection() {
  return (
    <SectionShell dark id="course-levels-fees">
      <SectionHeading
        eyebrow="Course Levels and Fees"
        eyebrowOnDark
        title="Course pathways and pricing designed for quick comparison"
        description="The Gurgaon partner site currently presents four course levels, each with a defined duration and fee for international doctors. Optional continued support is listed separately for clarity."
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {pricingSignals.map((signal) => (
          <Card key={signal.label} dark quiet className="py-5">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {signal.label}
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-white">{signal.value}</p>
          </Card>
        ))}
      </div>
      <ol className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {courseLevels.map((course) => (
          <Card
            key={course.name}
            as="li"
            interactive
            dark
            className="flex h-full flex-col border-[rgba(255,255,255,0.14)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Course level
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{course.name}</h3>
              </div>
              <span className="rounded-full border border-[rgba(255,255,255,0.14)] bg-[var(--bg-dark-elevated)] px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-[#f8fafc] uppercase">
                Gurgaon
              </span>
            </div>
            <div className="mt-8 rounded-[10px] border border-[rgba(255,255,255,0.12)] bg-[var(--bg-dark-elevated)] p-5">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#9ca3af] uppercase">Fee</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{course.fee}</p>
            </div>
            <div className="mt-5">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">Duration</p>
              <p className="mt-2 inline-flex rounded-full border border-[rgba(255,255,255,0.14)] px-3 py-1 text-sm font-medium text-[#f8fafc]">
                {course.duration}
              </p>
            </div>
            <div className="mt-6 h-px bg-[rgba(255,255,255,0.08)]" aria-hidden />
            <div className="mt-6 flex-1">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Positioning
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#cbd5e1]">{course.summary}</p>
            </div>
          </Card>
        ))}
      </ol>
      <div className="mt-12">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[rgba(255,255,255,0.08)]" aria-hidden />
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#9ca3af] uppercase">
            Optional post-course support
          </p>
          <div className="h-px flex-1 bg-[rgba(255,255,255,0.08)]" aria-hidden />
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {supportOptions.map((option) => (
          <Card key={option.title} dark quiet className="h-full">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Optional support
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">{option.title}</h3>
              </div>
              <p className="text-lg font-semibold text-white">{option.value}</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#cbd5e1]">{option.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
