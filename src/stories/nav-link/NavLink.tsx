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
  href: string;
}

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
