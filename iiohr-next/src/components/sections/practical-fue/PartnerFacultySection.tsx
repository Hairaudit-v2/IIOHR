import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const faculty = [
  {
    name: "Dr Ajay Dubey",
    role: "Medical Director",
  },
  {
    name: "Dr Sambhav Upadhyay",
    role: "Senior Hair Transplant Surgeon & Head of Training",
  },
  {
    name: "Paul Green",
    role: "Internationally Acclaimed Trichologist",
  },
];

export function PartnerFacultySection() {
  return (
    <SectionShell compact id="partner-faculty">
      <SectionHeading
        eyebrow="Meet the Partner Faculty"
        title="Named faculty presented for the first live IIOHR India academy site"
        description="The first live Gurgaon site for the IIOHR India Clinical Training Academy is supported by world-class faculty named in the brochure, combining clinical leadership, surgical training oversight, and trichology expertise."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {faculty.map((member, index) => (
          <Card key={member.name} quiet className="h-full">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {`Faculty 0${index + 1}`}
            </p>
            <h3 className="mt-3 text-xl font-semibold">{member.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.role}</p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
