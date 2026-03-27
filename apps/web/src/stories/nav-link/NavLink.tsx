import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const navLinkVariants = cva(
  'font-sans font-medium text-muted-foreground hover:text-accent transition-colors',
  {
    variants: {
      size: {
        sm: 'text-sm',
        base: 'text-base',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

export interface NavLinkProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navLinkVariants> {
  /** Target URL for the link */
  href: string;
}

/**
 * Anchor navigation link with sizing variants.
 *
 * Styled with muted foreground color and accent hover transition.
 *
 * @default size "sm"
 */
const NavLink = ({
  href,
  children,
  size,
  className,
  ...props
}: NavLinkProps) => {
  return (
    <a
      href={href}
      className={cn(navLinkVariants({ size }), className)}
      {...props}
    >
      {children}
    </a>
  );
};

NavLink.displayName = 'NavLink';

export { NavLink, navLinkVariants };
