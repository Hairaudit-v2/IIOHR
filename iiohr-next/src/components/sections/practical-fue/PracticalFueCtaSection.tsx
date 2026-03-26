import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function PracticalFueCtaSection() {
  return (
    <SectionShell anchor id="partner-enquiry">
      <SectionHeading
        eyebrow="Enquiry"
        title="Enquire about Gurgaon partner-led practical FUE training"
        description="For the first live partner site, brochure contact details are provided for training enquiries. IIOHR can present the public programme structure here while retaining a premium institutional route into further conversation."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <Card className="h-full bg-surface-elevated/55">
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Direct enquiry</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">Gurgaon partner training enquiries</h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-readable-muted">
            Use the brochure contact route for the first live partner site, or continue into IIOHR admissions if
            you need broader pathway guidance first.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="mailto:nidhi@evolvedhairindia.com" variant="primary">
              Email Nidhi Khurana
            </Button>
            <Button href="tel:+919711284755" variant="secondary">
              Call or WhatsApp
            </Button>
            <Button href="/admissions" variant="ghost">
              Explore Admissions
            </Button>
          </div>
        </Card>
        <Card quiet className="h-full">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Contact</p>
              <h3 className="mt-3 text-xl font-semibold">Nidhi Khurana</h3>
            </div>
            <span className="rounded-full border border-foreground/18 bg-surface-elevated px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-foreground uppercase">
              Operations Head
            </span>
          </div>
          <div className="mt-6 space-y-4 text-sm text-readable-muted">
            <p>
              <a href="mailto:nidhi@evolvedhairindia.com" className="link-premium">
                nidhi@evolvedhairindia.com
              </a>
            </p>
            <p>
              <a href="tel:+919711284755" className="link-premium">
                +91 97112 84755
              </a>
            </p>
          </div>
          <div className="mt-6 h-px bg-border/70" aria-hidden />
          <p className="mt-6 text-sm leading-relaxed text-readable-muted">
            <Link href="/training-pathways" className="link-premium">
              Full training pathways
            </Link>
            {" · "}
            <Link href="/admissions" className="link-premium">
              Admissions route
            </Link>
            {" · "}
            <Link href="/doctors" className="link-premium">
              Doctor pathways
            </Link>
          </p>
        </Card>
      </div>
    </SectionShell>
  );
}
