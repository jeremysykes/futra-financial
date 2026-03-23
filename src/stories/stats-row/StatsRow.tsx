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

const statsGridVariants = cva(
  'grid gap-6 sm:gap-8 md:gap-12',
  {
    variants: {
      columns: {
        3: 'grid-cols-1 sm:grid-cols-3 text-center sm:text-left',
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
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className={statsGridVariants({ columns })}>
          {children}
        </div>
      </div>
    </section>
  );
};

StatsRow.displayName = 'StatsRow';

export { StatsRow, statsRowVariants, statsGridVariants };
