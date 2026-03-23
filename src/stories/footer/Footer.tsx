import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const footerVariants = cva(
  'bg-[#1C1C1A]',
  {
    variants: {
      layout: {
        columns: 'py-16 md:py-20',
        simple: 'py-10 md:py-12',
      },
    },
    defaultVariants: {
      layout: 'columns',
    },
  },
);

export interface FooterProps
  extends VariantProps<typeof footerVariants> {
  children: ReactNode;
  className?: string;
}

const Footer = ({ layout, children, className }: FooterProps) => {
  return (
    <footer className={cn(footerVariants({ layout }), className)}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        {children}
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export { Footer, footerVariants };
