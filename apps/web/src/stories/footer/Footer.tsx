import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const footerVariants = cva('dark bg-background text-foreground', {
  variants: {
    layout: {
      columns: 'py-16 md:py-20',
      simple: 'py-10 md:py-12',
    },
  },
  defaultVariants: {
    layout: 'columns',
  },
});

export interface FooterProps extends VariantProps<typeof footerVariants> {
  /** Footer content (columns, links, copyright, etc.) */
  children: ReactNode;
  /** Additional CSS classes for the root element */
  className?: string;
}

/**
 * Footer section with layout variants.
 *
 * Applies the `dark` class so all child content resolves semantic
 * tokens to their dark-mode values. The `columns` layout provides
 * more vertical padding for multi-column content; `simple` is
 * more compact.
 *
 * @default layout "columns"
 */
const Footer = ({ layout, children, className }: FooterProps) => {
  return (
    <footer className={cn(footerVariants({ layout }), className)}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">{children}</div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export { Footer };
