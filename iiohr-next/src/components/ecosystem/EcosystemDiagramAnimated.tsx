import type { GlobalNetworkVariant } from "@/components/ecosystem/GlobalHairIntelligenceNetwork";

interface EcosystemDiagramAnimatedProps {
  highlightNode?: GlobalNetworkVariant;
  className?: string;
}

/**
 * Import-ready placeholder for a shared animated ecosystem diagram.
 * Replace this with the cross-brand implementation when available.
 */
export function EcosystemDiagramAnimated({
  highlightNode = "iiohr",
  className = "",
}: EcosystemDiagramAnimatedProps) {
  return (
    <div
      className={`rounded-xl border border-dashed border-border bg-surface p-6 text-center text-sm text-muted-foreground ${className}`}
    >
      {`Animated ecosystem diagram placeholder (highlight: ${highlightNode}).`}
    </div>
  );
}
