import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const cardVariants = cva(
  'rounded-xl bg-surface border border-border p-6 transition-all duration-300',
  {
    variants: {
      accent: {
        none: '',
        left: 'border-l-4 border-l-accent',
        top: 'border-t-2 border-t-accent',
        right: 'border-r-4 border-r-accent',
        bottom: 'border-b-2 border-b-accent',
      },
      interactive: {
        true: 'hover:-translate-y-1 hover:shadow-lg cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      accent: 'none',
      interactive: false,
    },
  },
);

export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = ({
  className,
  accent,
  interactive,
  onClick,
  children,
  ...props
}: CardProps) => {
  const isClickable = interactive && !!onClick;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  if (isClickable) {
    return (
      <div
        className={cn(cardVariants({ accent, interactive }), className)}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(cardVariants({ accent, interactive }), className)}
      {...props}
    >
      {children}
    </div>
  );
};

Card.displayName = 'Card';

export { Card, cardVariants };
