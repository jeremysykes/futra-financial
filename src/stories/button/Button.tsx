import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center cursor-pointer font-sans font-semibold rounded-[10px] transition-colors not-disabled:active:scale-[0.98]',
  {
    variants: {
      intent: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary-hover',
        inverse:
          'bg-white text-accent border-transparent hover:bg-white/90',
      },
      size: {
        sm: 'text-sm px-5 py-2',
        md: 'text-base px-8 py-3',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({
  className,
  intent,
  size,
  asChild,
  disabled = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot.Root : 'button';
  return (
    <Comp
      disabled={disabled ?? undefined}
      className={cn(
        buttonVariants({ intent, size }),
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
};

Button.displayName = 'Button';

export { Button, buttonVariants };
