import Link from "next/link";
import { SectionShell } from "@/components/sections/shared/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function PracticalFueCtaSection() {
  return (
    <SectionShell anchor id="partner-enquiry">
      <SectionHeading
        eyebrow="Enquiry"
        title="Enquire about Gurgaon partner-led practical FUE training"
        description="For the first live partner site, brochure contact details are provided for training enquiries. IIOHR can present the public programme structure here while retaining a premium institutional route into further conversation."
      />
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
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-2 text-sm text-readable-muted">
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
        <p className="text-sm leading-relaxed text-readable-muted">
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
      </div>
    </SectionShell>
  );
}
