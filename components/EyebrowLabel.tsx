import React from "react";

export interface EyebrowLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function EyebrowLabel({ children, className = "" }: EyebrowLabelProps) {
  return (
    <div
      className={`eyebrow-label ${className}`.trim()}
      style={{
        textTransform: "uppercase",
        fontSize: 11,
        letterSpacing: "0.20em",
        color: "#8B6B4A",
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

export default EyebrowLabel;

