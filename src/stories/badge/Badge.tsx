import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva('flex items-center justify-center bg-muted', {
  variants: {
    shape: {
      square: 'rounded-none',
      rounded: 'rounded-2xl',
      circle: 'rounded-full',
    },
    size: {
      sm: 'w-10 h-10',
      md: 'w-14 h-14',
      lg: 'w-16 h-16',
    },
    content: {
      icon: '',
      text: 'font-mono font-semibold',
      image: 'overflow-hidden',
    },
  },
  defaultVariants: {
    shape: 'rounded',
    size: 'md',
    content: 'icon',
  },
});

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

const Badge = ({
  className,
  shape,
  size,
  content,
  children,
  ...props
}: BadgeProps) => {
  return (
    <div
      className={cn(badgeVariants({ shape, size, content }), className)}
      {...props}
    >
      {children}
    </div>
  );
};

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
