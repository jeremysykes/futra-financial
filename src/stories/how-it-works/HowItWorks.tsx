import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const howItWorksVariants = cva(
  '',
  {
    variants: {
      background: {
        default: 'bg-muted/40',
        muted: 'bg-secondary/40',
      },
      padding: {
        default: 'py-24 md:py-32',
        compact: 'py-20',
      },
    },
    defaultVariants: {
      background: 'default',
      padding: 'default',
    },
  },
);

export interface HowItWorksProps
  extends VariantProps<typeof howItWorksVariants> {
  eyebrow?: ReactNode;
  heading?: ReactNode;
  sectionId?: string;
  children: ReactNode;
  className?: string;
}

const HowItWorks = ({
  eyebrow,
  heading,
  background,
  padding,
  sectionId = 'how-it-works',
  children,
  className,
}: HowItWorksProps) => {
  return (
    <section id={sectionId} className={cn(howItWorksVariants({ background, padding }), className)}>
      <div className="max-w-[1200px] mx-auto px-6">
        {(eyebrow || heading) && (
          <div className="text-center mb-16">
            {eyebrow && (
              <p className="mb-3 uppercase font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
                {heading}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

HowItWorks.displayName = 'HowItWorks';

export { HowItWorks, howItWorksVariants };
