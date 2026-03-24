import { PageHero } from "@/components/sections/shared/PageHero";

interface AcademyStreamHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
}

export function AcademyStreamHero(props: AcademyStreamHeroProps) {
  return <PageHero {...props} variant="dark" />;
}
