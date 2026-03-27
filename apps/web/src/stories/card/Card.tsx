import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const cardVariants = cva(
  'rounded-xl bg-surface border border-border p-6 transition-all duration-300',
  {
    variants: {
      variant: {
        none: '',
        left: 'border-l-4 border-l-accent',
        top: 'border-t-2 border-t-accent',
        right: 'border-r-4 border-r-accent',
        bottom: 'border-b-2 border-b-accent',
      },
      interactive: {
        true: 'hover:-translate-y-1 hover:shadow-lg cursor-pointer',
        false: '',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'none',
      interactive: false,
    },
  },
);

export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

/**
 * Container with optional accent borders and interactive hover states.
 *
 * Accent borders can be placed on any edge. Interactive mode adds
 * hover elevation and pointer cursor. Disabled mode reduces opacity
 * and prevents interaction.
 *
 * @default variant "none"
 * @default interactive false
 */
const Card = ({
  className,
  variant,
  interactive,
  onClick,
  children,
  ...props
}: CardProps) => {
  const isDisabled = interactive === 'disabled';
  const isClickable = interactive === true && !!onClick && !isDisabled;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  if (isClickable) {
    return (
      <div
        className={cn(cardVariants({ variant, interactive }), className)}
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
      className={cn(cardVariants({ variant, interactive }), className)}
      {...props}
    >
      {children}
    </div>
  );
};

Card.displayName = 'Card';

export { Card };
