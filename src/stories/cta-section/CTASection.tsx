import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const ctaSectionVariants = cva(
  'relative overflow-hidden py-24 md:py-32',
  {
    variants: {
      background: {
        gradient: 'bg-gradient-to-br from-muted to-accent/10',
        solid: 'bg-gradient-to-br from-primary to-primary-hover',
      },
      alignment: {
        center: 'text-center',
        left: 'text-left',
      },
    },
    defaultVariants: {
      background: 'gradient',
      alignment: 'center',
    },
  },
);

export interface CTASectionProps
  extends VariantProps<typeof ctaSectionVariants> {
  heading: ReactNode;
  description?: ReactNode;
  backgroundImage?: string;
  backgroundOpacity?: string;
  sectionId?: string;
  children: ReactNode;
  className?: string;
}

const CTASection = ({
  heading,
  description,
  backgroundImage,
  backgroundOpacity = 'opacity-[0.08]',
  background,
  alignment,
  sectionId = 'cta',
  children,
  className,
}: CTASectionProps) => {
  const isSolid = background === 'solid';
  return (
    <section
      id={sectionId}
      className={cn(ctaSectionVariants({ background, alignment }), className)}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className={cn('w-full h-full object-cover', backgroundOpacity)}
          />
        </div>
      )}
      <div className={cn(
        'relative z-10 mx-auto px-6',
        alignment === 'center' ? 'max-w-[600px]' : 'max-w-[1200px]',
      )}>
        <h2 className={cn(
          'mb-4 font-sans font-bold tracking-[-0.01em] text-[clamp(28px,4vw,40px)]',
          isSolid ? 'text-primary-foreground' : 'text-foreground',
        )}>
          {heading}
        </h2>
        {description && (
          <p className={cn(
            'mb-10 font-sans text-lg leading-[1.7]',
            isSolid ? 'text-primary-foreground/80' : 'text-muted-foreground',
          )}>
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};

CTASection.displayName = 'CTASection';

export { CTASection, ctaSectionVariants };
