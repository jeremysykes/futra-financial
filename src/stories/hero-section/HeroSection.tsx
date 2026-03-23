import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const heroSectionVariants = cva(
  'relative overflow-hidden flex items-center pt-[calc(var(--nav-top,0px)+64px)] bg-background',
  {
    variants: {
      layout: {
        'left-right': '',
        centered: 'text-center',
      },
      size: {
        default: 'min-h-[85vh] sm:min-h-screen',
        tall: 'min-h-[95vh] sm:min-h-[110vh]',
      },
    },
    defaultVariants: {
      layout: 'left-right',
      size: 'default',
    },
  },
);

const contentVariants = cva(
  'relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 py-16 sm:py-20 md:py-28 lg:py-32 w-full',
  {
    variants: {
      layout: {
        'left-right': '',
        centered: 'flex flex-col items-center',
      },
    },
    defaultVariants: {
      layout: 'left-right',
    },
  },
);

export interface HeroSectionProps
  extends VariantProps<typeof heroSectionVariants> {
  heading: ReactNode;
  subheading: ReactNode;
  eyebrow?: ReactNode;
  backgroundImage?: string;
  backgroundOpacity?: string;
  overlayOpacity?: string;
  actions: ReactNode;
  children?: ReactNode;
  className?: string;
}

const HeroSection = ({
  heading,
  subheading,
  eyebrow,
  backgroundImage,
  backgroundOpacity = 'opacity-[0.08]',
  overlayOpacity = 'bg-background/70',
  layout = 'left-right',
  size,
  actions,
  children,
  className,
}: HeroSectionProps) => {
  return (
    <section className={cn(heroSectionVariants({ layout, size }), className)}>
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className={cn('w-full h-full object-cover', backgroundOpacity)}
          />
          <div className={cn('absolute inset-0', overlayOpacity)} />
        </div>
      )}
      <div className={contentVariants({ layout })}>
        {layout !== 'centered' ? (
          <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-16 lg:gap-20">
            <div className="flex-1 max-w-xl">
              {eyebrow && (
                <p className="mb-4 uppercase font-sans font-medium text-xs tracking-[0.08em] text-accent">
                  {eyebrow}
                </p>
              )}
              <h1 className="mb-6 font-sans font-bold text-foreground leading-[1.1] tracking-[-0.01em] text-[clamp(36px,5vw,56px)]">
                {heading}
              </h1>
              <p className="mb-10 font-sans text-lg leading-[1.7] text-muted-foreground max-w-[460px]">
                {subheading}
              </p>
              <div className="w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">{actions}</div>
            </div>
            {children && (
              <div className="flex-1 relative w-full max-w-[300px] sm:max-w-[320px] lg:max-w-lg mx-auto lg:mx-0">
                {children}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="mb-4 uppercase font-sans font-medium text-xs tracking-[0.08em] text-accent">
                {eyebrow}
              </p>
            )}
            <h1 className="mb-6 font-sans font-bold text-foreground leading-[1.1] tracking-[-0.01em] text-[clamp(36px,5vw,56px)]">
              {heading}
            </h1>
            <p className="mb-10 font-sans text-lg leading-[1.7] text-muted-foreground">
              {subheading}
            </p>
            {actions}
            {children && <div className="mt-16">{children}</div>}
          </div>
        )}
      </div>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';

export { HeroSection, heroSectionVariants };
