interface EyebrowProps {
  children: string;
  className?: string;
}

/** Small boxed chapter/module label — training-manual style */
export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`inline-block border border-heading/30 bg-surface px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-heading uppercase md:text-[11px] ${className}`}
    >
      {children}
    </p>
  );
}
