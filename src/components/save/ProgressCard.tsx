export function ProgressCard({
  goalName,
  targetAmount,
  currentAmount,
  percentage,
  className = '',
}: {
  goalName: string;
  targetAmount: string;
  currentAmount: string;
  percentage: number;
  className?: string;
}) {
  return (
    <div className={`rounded-xl p-5 bg-surface border border-border shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="font-sans font-semibold text-[15px] text-foreground">{goalName}</span>
        <span className="font-mono font-medium text-[13px] text-accent">{percentage}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-muted mb-3">
        <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${percentage}%` }} />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono font-medium text-sm text-foreground">{currentAmount}</span>
        <span className="font-mono font-medium text-[13px] text-muted-foreground">of {targetAmount}</span>
      </div>
    </div>
  );
}
