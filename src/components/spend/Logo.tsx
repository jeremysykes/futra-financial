export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-0 ${className}`}>
      <span
        className="text-[20px] tracking-[-0.03em] font-sans font-black"
      >
        FUTRA
      </span>
      <span className="mx-2 text-muted-foreground text-[20px]">|</span>
      <span
        className="text-[20px] lowercase font-sans font-medium"
      >
        spend
      </span>
    </div>
  );
}
