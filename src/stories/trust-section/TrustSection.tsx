import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const trustSectionVariants = cva(
  'relative overflow-hidden border-y border-border',
  {
    variants: {
      background: {
        default: 'bg-secondary/30',
        muted: 'bg-muted',
      },
      padding: {
        default: 'py-8',
        compact: 'py-6',
      },
    },
    defaultVariants: {
      background: 'default',
      padding: 'default',
    },
  },
);

export interface TrustSectionProps
  extends VariantProps<typeof trustSectionVariants> {
  backgroundImage?: string;
  backgroundOpacity?: string;
  children: ReactNode;
  className?: string;
}

const TrustSection = ({
  background,
  padding,
  backgroundImage,
  backgroundOpacity = 'opacity-[0.12]',
  children,
  className,
}: TrustSectionProps) => {
  return (
    <section className={cn(trustSectionVariants({ background, padding }), className)}>
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className={cn('w-full h-full object-cover', backgroundOpacity)}
          />
        </div>
      )}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {children}
        </div>
      </div>
    </section>
  );
};

TrustSection.displayName = 'TrustSection';

export { TrustSection, trustSectionVariants };
