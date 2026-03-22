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
        default: 'py-24 md:py-32',
        compact: 'py-16 md:py-20',
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
  heading: ReactNode;
  subtitle?: ReactNode;
  sectionId?: string;
  children: ReactNode;
  className?: string;
}

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
      <div className="max-w-[1200px] mx-auto px-6">
        {subtitle && (
          <p className="mb-3 uppercase text-center font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
            {subtitle}
          </p>
        )}
        <h2 className="text-center mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          {heading}
        </h2>
        {children}
      </div>
    </section>
  );
};

FeatureSection.displayName = 'FeatureSection';

export { FeatureSection, featureSectionVariants };
