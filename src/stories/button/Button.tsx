import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../../lib/utils';

const buttonVariants = cva('button', {
  variants: {
    intent: {
      primary: ['bg-blue-500', 'text-white', 'border-transparent not-disabled:hover:bg-blue-600'],
      secondary: ['bg-white', 'text-gray-800', 'border-gray-400 not-disabled:hover:bg-gray-100'],
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
  disabled,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot.Root : 'button';
  return (
    <Comp
      disabled={disabled ?? undefined}
      className={cn(
        buttonVariants({ intent, size }),
        disabled && 'opacity-50', 'cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
};

Button.displayName = 'Button';

export { Button };
