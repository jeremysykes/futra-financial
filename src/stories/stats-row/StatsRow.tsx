import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const statsRowVariants = cva(
  'py-20 md:py-28',
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

const statsGridVariants = cva(
  'grid gap-8 md:gap-12',
  {
    variants: {
      columns: {
        3: 'grid-cols-1 sm:grid-cols-3',
        4: 'grid-cols-2 lg:grid-cols-4',
      },
    },
    defaultVariants: {
      columns: 4,
    },
  },
);

export interface StatsRowProps
  extends VariantProps<typeof statsRowVariants> {
  children: ReactNode;
  className?: string;
}

const StatsRow = ({ columns, background, children, className }: StatsRowProps) => {
  return (
    <section className={cn(statsRowVariants({ columns, background }), className)}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className={statsGridVariants({ columns })}>
          {children}
        </div>
      </div>
    </section>
  );
};

StatsRow.displayName = 'StatsRow';

export { StatsRow, statsRowVariants, statsGridVariants };
