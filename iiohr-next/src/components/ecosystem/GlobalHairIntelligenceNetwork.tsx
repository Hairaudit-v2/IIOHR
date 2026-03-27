import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { GLOBAL_NETWORK_NODE_LINKS } from "@/components/ecosystem/constants";

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
  enableLinks?: boolean;
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
  theme,
  enableLinks,
}: {
  node: NetworkNode;
  active: boolean;
  href?: string;
  theme: GlobalNetworkTheme;
  enableLinks: boolean;
}) {
  const isDark = theme === "dark";
  const visitLabel = "Visit platform";
  const cardContent = (
    <Card className="min-w-0 h-full border bg-surface transition-[background-color,border-color] duration-200 [.ghn-node-card--active &]:bg-surface-elevated [.ghn-node-card--active &]:border-accent/70 group-hover:border-accent/40">
      <h3 className="ghn-node-title text-heading">{node.title}</h3>
      <p className="ghn-node-descriptor text-sm">{node.descriptor}</p>
      {href ? (
        <span className="ghn-node-cta mt-4 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.04em] text-accent">
          {visitLabel}
          <span aria-hidden>→</span>
        </span>
      ) : null}
      {active ? (
        <p className="ghn-node-detail mt-4 text-xs text-accent uppercase">
          Training and Certification Pillar
        </p>
      ) : null}
    </Card>
  );

  if (href && enableLinks) {
    const isExternal = href.startsWith("http");
    const linkClass =
      "ghn-node-card ghn-node-card--linked group block cursor-pointer rounded-lg no-underline text-foreground hover:text-foreground focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2 " +
      (isDark
        ? "focus-visible:ring-intel/50 focus-visible:ring-offset-section-charcoal"
        : "focus-visible:ring-intel/45 focus-visible:ring-offset-background");
    return (
      <div
        className={`ghn-node-card rounded-lg ${active ? "ghn-node-card--active" : ""}`}
        data-theme={isDark ? "dark" : undefined}
      >
        {isExternal ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            aria-label={`${node.title}, ${node.descriptor}. ${visitLabel}.`}
          >
            {cardContent}
          </a>
        ) : (
          <Link href={href} className={linkClass} aria-label={`${node.title}, ${node.descriptor}. ${visitLabel}.`}>
            {cardContent}
          </Link>
        )}
      </div>
    );
  }

  return (
    <div
      className={`ghn-node-card rounded-lg ${active ? "ghn-node-card--active" : ""}`}
      data-theme={isDark ? "dark" : undefined}
    >
      {cardContent}
    </div>
  );
}

export function GlobalHairIntelligenceNetwork({
  variant = "iiohr",
  theme = "light",
  title = "Global Hair Intelligence Network",
  className = "",
  nodeLinks,
  size = "hero",
  enableLinks = true,
}: GlobalHairIntelligenceNetworkProps) {
  const maxWidth = size === "compact" ? "max-w-4xl" : "max-w-5xl";
  const resolvedTheme = theme === "auto" ? "light" : theme;
  const links = nodeLinks ?? GLOBAL_NETWORK_NODE_LINKS;
  const activeNode = nodes.find((node) => node.id === variant);
  const centerNode = nodes.find((node) => node.id === "fi");
  const orbitNodes = nodes.filter((node) => node.id !== "fi");

  return (
    <div
      className={`ghn-network min-w-0 ${maxWidth} mx-auto ${className}`}
      data-theme={resolvedTheme === "dark" ? "dark" : undefined}
    >
      <p className="ghn-network-title text-center text-[11px] uppercase">
        {title}
      </p>
      {size === "hero" ? (
        <div className="ghn-wheel relative z-10 mt-6 min-h-[24rem] md:mt-8 md:min-h-[34rem]">
          <div className="ghn-wheel-rings" aria-hidden />
          {centerNode ? (
            <div className="ghn-wheel-center">
              <NodeCard
                node={centerNode}
                active
                href={links[centerNode.id]}
                theme={resolvedTheme}
                enableLinks={enableLinks}
              />
            </div>
          ) : null}
          <div className="ghn-wheel-orbit hidden md:block">
            {orbitNodes.map((node, index) => (
              <div key={node.id} className={`ghn-wheel-node ghn-wheel-node-${index + 1}`}>
                <NodeCard
                  node={node}
                  active={node.id === variant}
                  href={links[node.id]}
                  theme={resolvedTheme}
                  enableLinks={enableLinks}
                />
              </div>
            ))}
          </div>
          <div className="mt-5 grid min-w-0 gap-4 md:hidden">
            {orbitNodes.map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                active={node.id === variant}
                href={links[node.id]}
                theme={resolvedTheme}
                enableLinks={enableLinks}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 mt-6 grid min-w-0 gap-5 md:mt-8 md:grid-cols-2 md:gap-6">
          {nodes.map((node) => (
            <NodeCard
              key={node.id}
              node={node}
              active={node.id === variant}
              href={links[node.id]}
              theme={resolvedTheme}
              enableLinks={enableLinks}
            />
          ))}
        </div>
      )}
      {activeNode ? (
        <p className="mx-auto mt-5 max-w-2xl text-center text-xs text-muted-foreground md:mt-6">
          Active standard anchor: <span className="text-foreground">{activeNode.title}</span>
        </p>
      ) : null}
    </div>
  );
}

export default GlobalHairIntelligenceNetwork;
