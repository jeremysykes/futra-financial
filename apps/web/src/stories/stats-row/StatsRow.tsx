import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const statsRowVariants = cva(
  'py-12 sm:py-16 md:py-20',
  {
    variants: {
      columns: {
        3: '',
        4: '',
      },
      background: {
        default: 'bg-background',
        muted: 'bg-muted',
      },
    },
    defaultVariants: {
      columns: 4,
      background: 'muted',
    },
  },
);

const gridClasses: Record<number, string> = {
  3: 'grid-cols-1 sm:grid-cols-3 text-center sm:text-left',
  4: 'grid-cols-2 lg:grid-cols-4',
};

export interface StatsRowProps
  extends VariantProps<typeof statsRowVariants> {
  /** StatItem children to display in the grid */
  children: ReactNode;
  /** Additional CSS classes for the section element */
  className?: string;
}

/**
 * Row container for statistic items in a responsive grid.
 *
 * Wraps `StatItem` children in a 3 or 4 column grid layout
 * with configurable background.
 *
 * @default columns 4
 * @default background "muted"
 */
const StatsRow = ({ columns, background, children, className }: StatsRowProps) => {
  const cols = columns ?? 4;
  return (
    <section className={cn(statsRowVariants({ columns, background }), className)}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className={cn('grid gap-6 sm:gap-8 md:gap-12', gridClasses[cols])}>
          {children}
        </div>
      </div>
    </section>
  );
};

StatsRow.displayName = 'StatsRow';

export { StatsRow, statsRowVariants };
