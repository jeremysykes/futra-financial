import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const progressCardVariants = cva(
  'rounded-xl p-5 bg-surface border border-border shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
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

export interface ProgressCardProps extends VariantProps<
  typeof progressCardVariants
> {
  /** Display name for the savings goal */
  goalName: string;
  /** Formatted target amount string (e.g. "$4,500") */
  targetAmount: string;
  /** Formatted current saved amount string (e.g. "$3,015") */
  currentAmount: string;
  /** Progress percentage from 0 to 100 */
  percentage: number;
  /** Additional CSS classes for the card container */
  className?: string;
}

/**
 * Progress card showing a savings goal with bar indicator.
 *
 * Displays goal name, current vs target amounts, and a
 * percentage-filled progress bar with accent color.
 *
 * @default size "default"
 */
const ProgressCard = ({
  goalName,
  targetAmount,
  currentAmount,
  percentage,
  size,
  className,
}: ProgressCardProps) => {
  return (
    <div className={cn(progressCardVariants({ size }), className)}>
      <div className="flex items-center justify-between mb-3">
        <span className="font-sans font-semibold text-[15px] text-foreground">
          {goalName}
        </span>
        <span className="font-mono font-medium text-[13px] text-accent">
          {percentage}%
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-muted mb-3">
        <div
          className="h-full rounded-full bg-accent transition-all duration-700 animate-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono font-medium text-sm text-foreground">
          {currentAmount}
        </span>
        <span className="font-mono font-medium text-[13px] text-muted-foreground">
          of {targetAmount}
        </span>
      </div>
    </div>
  );
};

ProgressCard.displayName = 'ProgressCard';

export { ProgressCard };
