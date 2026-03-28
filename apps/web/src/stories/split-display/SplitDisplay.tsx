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
  /** Display name for the payer */
  name: string;
  /** Formatted amount string */
  amount: string;
  /** Percentage share from 0 to 100 */
  percent: number;
  /** Token color for the segment bar */
  tokenColor: 'primary' | 'accent';
}

export interface SplitDisplayProps extends VariantProps<
  typeof splitDisplayVariants
> {
  /** Heading text describing the expense category */
  label: string;
  /** Formatted total amount displayed alongside the label */
  total: string;
  /** Array of segment objects defining each payer's share */
  splits: SplitSegment[];
  /** Additional CSS classes for the outer container */
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

/**
 * Split percentage display with colored segments and legend.
 *
 * Shows a horizontal bar divided proportionally by each split,
 * with a legend listing names, amounts, and percentages.
 *
 * @default size "default"
 */
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

      <div
        role="img"
        aria-label={`${label} split: ${splits.map((s) => `${s.name} ${s.amount}`).join(', ')}`}
        className="flex rounded-full overflow-hidden h-3 mb-3"
      >
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
            <div
              className={cn(
                'w-2.5 h-2.5 rounded-full',
                dotColorMap[s.tokenColor],
              )}
            />
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

export { SplitDisplay };
