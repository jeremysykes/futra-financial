import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const splitDisplayVariants = cva(
  'rounded-[14px] p-5 bg-surface border border-border shadow-[0_2px_8px_rgba(28,26,24,0.05)]',
  {
    variants: {
      size: {
        default: '',
        compact: 'p-4',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export interface SplitSegment {
  name: string;
  amount: string;
  percent: number;
  tokenColor: 'primary' | 'accent';
}

export interface SplitDisplayProps
  extends VariantProps<typeof splitDisplayVariants> {
  label: string;
  total: string;
  splits: SplitSegment[];
  className?: string;
}

const segmentColorMap: Record<SplitSegment['tokenColor'], string> = {
  primary: 'bg-primary',
  accent: 'bg-accent',
};

const dotColorMap: Record<SplitSegment['tokenColor'], string> = {
  primary: 'bg-primary',
  accent: 'bg-accent',
};

const SplitDisplay = ({
  label,
  total,
  splits,
  size,
  className,
}: SplitDisplayProps) => {
  return (
    <div className={cn(splitDisplayVariants({ size }), className)}>
      <div className="flex justify-between items-center mb-3">
        <span className="font-sans font-semibold text-base text-foreground">
          {label}
        </span>
        <span className="font-mono font-medium text-lg text-foreground">
          {total}
        </span>
      </div>

      <div className="flex rounded-full overflow-hidden h-3 mb-3">
        {splits.map((s, i) => (
          <div
            key={i}
            className={segmentColorMap[s.tokenColor]}
            style={{ width: `${s.percent}%` }}
          />
        ))}
      </div>

      <div className="flex justify-between">
        {splits.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={cn('w-2.5 h-2.5 rounded-full', dotColorMap[s.tokenColor])} />
            <span className="text-xs text-muted-foreground font-medium">
              {s.name}
            </span>
            <span className="font-mono text-xs font-medium text-foreground">
              {s.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

SplitDisplay.displayName = 'SplitDisplay';

export { SplitDisplay, splitDisplayVariants };
