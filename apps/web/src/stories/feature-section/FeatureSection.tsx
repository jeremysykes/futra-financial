import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const featureSectionVariants = cva(
  '',
  {
    variants: {
      background: {
        default: 'bg-background',
        muted: 'bg-muted',
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

export interface FeatureSectionProps
  extends VariantProps<typeof featureSectionVariants> {
  /** Section heading text */
  heading: ReactNode;
  /** Eyebrow label displayed above the heading */
  subtitle?: ReactNode;
  /**
   * HTML id attribute for anchor linking.
   * @default "features"
   */
  sectionId?: string;
  /** Feature content (cards, grids, etc.) */
  children: ReactNode;
  /** Additional CSS classes for the root element */
  className?: string;
}

/**
 * Feature section with heading, subtitle, and content area.
 *
 * Generic section wrapper for feature-related content. Supports
 * default and muted backgrounds with configurable padding.
 *
 * @default background "default"
 * @default padding "default"
 */
const FeatureSection = ({
  heading,
  subtitle,
  background,
  padding,
  sectionId = 'features',
  children,
  className,
}: FeatureSectionProps) => {
  return (
    <section
      id={sectionId}
      className={cn(featureSectionVariants({ background, padding }), className)}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        {subtitle && (
          <p className="mb-3 uppercase text-center font-sans font-medium text-xs tracking-[0.08em] text-accent">
            {subtitle}
          </p>
        )}
        <h2 className="text-center mb-10 md:mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          {heading}
        </h2>
        {children}
      </div>
    </section>
  );
};

FeatureSection.displayName = 'FeatureSection';

export { FeatureSection };
