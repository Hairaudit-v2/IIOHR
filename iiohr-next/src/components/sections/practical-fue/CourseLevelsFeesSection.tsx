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

export function CourseLevelsFeesSection() {
  return (
    <SectionShell id="course-levels-fees">
      <SectionHeading
        eyebrow="Course Levels and Fees"
        title="Course pathways and pricing designed for quick comparison"
        description="The Gurgaon partner site currently presents four course levels, each with a defined duration and fee for international doctors. Optional continued support is listed separately for clarity."
      />
      <div className="mt-16 grid gap-6 xl:grid-cols-4">
        {courseLevels.map((course) => (
          <Card key={course.name} interactive className="flex h-full flex-col">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Course level</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">{course.name}</h3>
            <div className="mt-8 space-y-5">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Duration
                </p>
                <p className="mt-2 text-base font-medium text-foreground">{course.duration}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">Fee</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{course.fee}</p>
              </div>
            </div>
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{course.summary}</p>
          </Card>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {supportOptions.map((option) => (
          <Card key={option.title} quiet>
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Optional support</p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <h3 className="text-lg font-semibold">{option.title}</h3>
              <p className="text-lg font-semibold text-foreground">{option.value}</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{option.description}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
