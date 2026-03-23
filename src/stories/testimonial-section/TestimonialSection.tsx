import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const testimonialSectionVariants = cva(
  'py-16 sm:py-20 md:py-28 lg:py-32 bg-background',
  {
    variants: {
      columns: {
        2: '',
        3: '',
      },
    },
    defaultVariants: {
      columns: 3,
    },
  },
);

const testimonialGridVariants = cva(
  'grid grid-cols-1 gap-6 sm:gap-8',
  {
    variants: {
      columns: {
        2: 'md:grid-cols-2',
        3: 'sm:grid-cols-2 md:grid-cols-3',
      },
    },
    defaultVariants: {
      columns: 3,
    },
  },
);

export interface TestimonialSectionProps
  extends VariantProps<typeof testimonialSectionVariants> {
  heading?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
}

const TestimonialSection = ({
  heading,
  subtitle,
  columns,
  children,
  className,
}: TestimonialSectionProps) => {
  return (
    <section className={cn(testimonialSectionVariants({ columns }), className)}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        {(heading || subtitle) && (
          <div className="text-center mb-10 md:mb-16">
            {subtitle && (
              <p className="mb-3 uppercase font-sans font-medium text-xs tracking-[0.08em] text-accent">
                {subtitle}
              </p>
            )}
            {heading && (
              <h2 className="font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
                {heading}
              </h2>
            )}
          </div>
        )}
        <div className={testimonialGridVariants({ columns })}>
          {children}
        </div>
      </div>
    </section>
  );
};

TestimonialSection.displayName = 'TestimonialSection';

export { TestimonialSection, testimonialSectionVariants, testimonialGridVariants };
