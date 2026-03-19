import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  `
  inline-flex items-center justify-center cursor-pointer
  `, {
  variants: {
    intent: {
      primary: ['bg-primary', 'text-primary-foreground', 'border-transparent not-disabled:hover:bg-primary-hover'],
      secondary: ['bg-secondary', 'text-secondary-foreground', 'border-border not-disabled:hover:bg-secondary-hover'],
    },
    size: {
      small: ['text-sm', 'py-1', 'px-2'],
      medium: ['text-base', 'py-2', 'px-4'],
    }
  },
  compoundVariants: [
    { intent: 'primary', size: 'medium', class: 'uppercase' },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
});

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

export { Button };
