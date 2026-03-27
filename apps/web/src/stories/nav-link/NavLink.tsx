import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const navLinkVariants = cva(
  'font-sans font-medium transition-colors',
  {
    variants: {
      size: {
        sm: 'text-sm',
        base: 'text-base',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed text-muted-foreground',
        false: 'text-muted-foreground hover:text-accent',
      },
    },
    defaultVariants: {
      size: 'sm',
      disabled: false,
    },
  },
);

export interface NavLinkProps
  extends
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    VariantProps<typeof navLinkVariants> {
  /** Target URL for the link */
  href: string;
}

/**
 * Anchor navigation link with sizing variants.
 *
 * Styled with muted foreground color and accent hover transition.
 * When disabled, reduces opacity and prevents navigation.
 *
 * @default size "sm"
 * @default disabled false
 */
const NavLink = ({
  href,
  children,
  size,
  disabled,
  className,
  ...props
}: NavLinkProps) => {
  const isDisabled = disabled === true;
  return (
    <a
      href={isDisabled ? undefined : href}
      className={cn(navLinkVariants({ size, disabled }), className)}
      aria-disabled={isDisabled || undefined}
      tabIndex={isDisabled ? -1 : undefined}
      {...props}
    >
      {children}
    </a>
  );
};

NavLink.displayName = 'NavLink';

export { NavLink };
