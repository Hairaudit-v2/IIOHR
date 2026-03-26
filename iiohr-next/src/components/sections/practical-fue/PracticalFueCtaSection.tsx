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
        title="Enquire through IIOHR about the Gurgaon academy site"
        description="The page now routes Practical FUE interest through IIOHR first, while still crediting the Gurgaon delivery partner in a controlled public format."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <Card className="h-full bg-surface-elevated/55">
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">IIOHR enquiry route</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">IIOHR India Clinical Training Academy</h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-readable-muted">
            Start with IIOHR for academy-site guidance, pathway fit, and next-step admissions routing. Delivery at
            the live Gurgaon site is presented in partnership with Evolved Hair Restoration.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/admissions" variant="primary">
              Start with IIOHR Admissions
            </Button>
            <Button href="/doctors" variant="secondary">
              Explore Doctor Pathways
            </Button>
            <Button href="mailto:nidhi@evolvedhairindia.com" variant="ghost">
              Request Gurgaon Site Contact
            </Button>
          </div>
        </Card>
        <Card quiet className="h-full">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Partner attribution</p>
              <h3 className="mt-3 text-xl font-semibold">Delivered in partnership with Evolved Hair Restoration, Gurgaon</h3>
            </div>
            <span className="rounded-full border border-foreground/18 bg-surface-elevated px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-foreground uppercase">
              Gurgaon site
            </span>
          </div>
          <div className="mt-6 space-y-4 text-sm text-readable-muted">
            <p className="font-semibold text-foreground">Nidhi Khurana</p>
            <p>Operations Head</p>
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
