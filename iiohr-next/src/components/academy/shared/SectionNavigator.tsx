import Link from "next/link";

interface SectionNavigatorProps {
  sections: Array<{ id: string; title: string; href?: string }>;
}

export function SectionNavigator({ sections }: SectionNavigatorProps) {
  return (
    <nav aria-label="Section navigation" className="flex flex-wrap gap-3">
      {sections.map((section) => (
        <Link
          key={section.id}
          href={section.href ?? "#"}
          className="rounded-md border border-border px-3 py-2 text-sm text-readable-muted transition-colors hover:border-accent/40 hover:text-foreground"
        >
          {section.title}
        </Link>
      ))}
    </nav>
  );
}
