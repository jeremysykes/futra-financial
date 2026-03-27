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
        default: 'py-16 sm:py-20 md:py-28 lg:py-32',
        compact: 'py-12 sm:py-16 md:py-20',
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
  /** Small label displayed above the heading */
  eyebrow?: ReactNode;
  /** Section heading text */
  heading?: ReactNode;
  /**
   * HTML id attribute for anchor linking.
   * @default "how-it-works"
   */
  sectionId?: string;
  /** Section content (typically ProcessSteps) */
  children: ReactNode;
  /** Additional CSS classes for the root element */
  className?: string;
}

/**
 * Section wrapper for "how it works" content.
 *
 * Provides a heading area and content slot, typically used with
 * `ProcessSteps` as children. Supports background and padding variants.
 *
 * @default background "default"
 * @default padding "default"
 */
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
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        {(eyebrow || heading) && (
          <div className="text-center mb-10 md:mb-16">
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
