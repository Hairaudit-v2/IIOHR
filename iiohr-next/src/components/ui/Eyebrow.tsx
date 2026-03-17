interface EyebrowProps {
  children: string;
  className?: string;
}

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`text-[10px] font-semibold tracking-[0.16em] text-accent/95 uppercase md:text-[11px] ${className}`}
    >
      {children}
    </p>
  );
}
