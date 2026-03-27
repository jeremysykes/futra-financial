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
    Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>,
    VariantProps<typeof badgeVariants> {
  /** Badge content — icon, text, or image */
  children: React.ReactNode;
}

/**
 * Shaped container for icon, text, or image content.
 *
 * Uses CVA variants for shape (square, rounded, circle),
 * size (sm, md, lg), and content type styling hints.
 *
 * @default shape "rounded"
 * @default size "md"
 * @default content "icon"
 */
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

export { Badge };
