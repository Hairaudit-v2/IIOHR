import { LinkArrow } from "@/components/ui/LinkArrow";
import { Card } from "@/components/ui/Card";

export type GlobalNetworkTheme = "light" | "dark" | "auto";
export type GlobalNetworkVariant = "hli" | "hairaudit" | "fi" | "iiohr";
export type GlobalNetworkNodeId = GlobalNetworkVariant;

interface NetworkNode {
  id: GlobalNetworkNodeId;
  title: string;
  descriptor: string;
}

export interface GlobalHairIntelligenceNetworkProps {
  theme?: GlobalNetworkTheme;
  variant?: GlobalNetworkVariant;
  title?: string;
  className?: string;
  nodeLinks?: Partial<Record<GlobalNetworkNodeId, string>>;
  size?: "hero" | "compact";
}

const nodes: NetworkNode[] = [
  { id: "iiohr", title: "IIOHR", descriptor: "Education and Certification" },
  { id: "hairaudit", title: "HairAudit", descriptor: "Surgical Audit System" },
  { id: "fi", title: "Follicle Intelligence", descriptor: "Clinical AI Analysis" },
  {
    id: "hli",
    title: "Hair Longevity Institute",
    descriptor: "Biological Treatment Pathways",
  },
];

function NodeCard({
  node,
  active,
  href,
}: {
  node: NetworkNode;
  active: boolean;
  href?: string;
}) {
  return (
    <Card className={`min-w-0 ${active ? "border-accent/80 bg-surface-elevated shadow-[0_14px_28px_-22px_rgba(30,42,56,0.55)]" : ""}`}>
      <h3 className="text-base font-semibold">{node.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{node.descriptor}</p>
      {href ? (
        <LinkArrow href={href} className="mt-4">
          Visit
        </LinkArrow>
      ) : null}
      {active ? (
        <p className="mt-4 text-xs tracking-[0.12em] text-accent uppercase">
          Training and Certification Pillar
        </p>
      ) : null}
    </Card>
  );
}

export function GlobalHairIntelligenceNetwork({
  variant = "iiohr",
  title = "Global Hair Intelligence Network",
  className = "",
  nodeLinks,
  size = "hero",
}: GlobalHairIntelligenceNetworkProps) {
  const maxWidth = size === "compact" ? "max-w-4xl" : "max-w-5xl";

  return (
    <div className={`min-w-0 ${maxWidth} mx-auto ${className}`}>
      <p className="text-center text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
        {title}
      </p>
      <div className="mt-6 grid min-w-0 gap-4 md:mt-8 md:grid-cols-2 md:gap-5">
        {nodes.map((node) => (
          <NodeCard
            key={node.id}
            node={node}
            active={node.id === variant}
            href={nodeLinks?.[node.id]}
          />
        ))}
      </div>
    </div>
  );
}

export default GlobalHairIntelligenceNetwork;
