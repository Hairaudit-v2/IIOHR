import { Card } from "@/components/ui/Card";

interface CertificateEligibilityCardProps {
  isEligible: boolean;
  unmetRequirements: string[];
}

export function CertificateEligibilityCard({
  isEligible,
  unmetRequirements,
}: CertificateEligibilityCardProps) {
  return (
    <Card>
      <h2 className="text-lg font-semibold tracking-tight text-foreground">Certificate Eligibility</h2>
      <p className="mt-3 text-sm leading-relaxed text-readable-muted">
        {isEligible ? "Eligible" : "Not yet eligible"}
      </p>
      {!isEligible && unmetRequirements.length > 0 ? (
        <ul className="mt-4 space-y-2 text-sm text-readable-muted">
          {unmetRequirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </Card>
  );
}
