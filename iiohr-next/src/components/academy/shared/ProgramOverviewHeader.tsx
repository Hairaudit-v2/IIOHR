import { SectionHeading } from "@/components/ui/SectionHeading";

interface ProgramOverviewHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function ProgramOverviewHeader(props: ProgramOverviewHeaderProps) {
  return <SectionHeading {...props} />;
}
