import * as React from 'react';
import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const statItemVariants = cva(
  'text-center',
  {
    variants: {
      valueColor: {
        foreground: '',
        accent: '',
      },
    },
    defaultVariants: {
      valueColor: 'accent',
    },
  },
);

const valueVariants = cva(
  'block mb-2 font-mono font-medium text-[clamp(28px,4vw,40px)]',
  {
    variants: {
      valueColor: {
        foreground: 'text-foreground',
        accent: 'text-accent',
      },
    },
    defaultVariants: {
      valueColor: 'accent',
    },
  },
);

export interface StatItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statItemVariants> {
  value: ReactNode;
  label: ReactNode;
}

const StatItem = ({ value, label, valueColor, className, ...props }: StatItemProps) => {
  return (
    <div className={cn(statItemVariants({ valueColor }), className)} {...props}>
      <span className={valueVariants({ valueColor })}>
        {value}
      </span>
      <span className="uppercase font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
};

StatItem.displayName = 'StatItem';

export { StatItem, statItemVariants, valueVariants };
