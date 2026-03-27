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
        default: 'lg:min-h-screen',
        tall: 'lg:min-h-[110vh]',
      },
    },
    defaultVariants: {
      layout: 'left-right',
      size: 'default',
    },
  },
);

const contentVariants = cva(
  'relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 landscape:py-8 lg:landscape:py-32 w-full',
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
  /** Primary headline text */
  heading: ReactNode;
  /** Supporting description below the heading */
  subheading: ReactNode;
  /** Small label displayed above the heading */
  eyebrow?: ReactNode;
  /** URL for the background image */
  backgroundImage?: string;
  /**
   * Tailwind opacity class applied to the background image.
   * @default "opacity-[0.08]"
   */
  backgroundOpacity?: string;
  /**
   * Tailwind background class for the overlay layer.
   * @default "bg-background/70"
   */
  overlayOpacity?: string;
  /** CTA buttons or action elements */
  actions: ReactNode;
  /** Optional visual content (e.g., phone mockup) displayed beside the text */
  children?: ReactNode;
  /**
   * Hide the children slot in landscape orientation.
   * @default true
   */
  hideChildrenLandscape?: boolean;
  /** Additional CSS classes for the root element */
  className?: string;
}

/**
 * Hero section with heading, subheading, CTA actions, and optional visual.
 *
 * Supports left-right and centered layouts with optional background
 * image and gradient overlay. The children slot (typically a phone
 * mockup or illustration) hides in landscape orientation by default.
 *
 * @default layout "left-right"
 * @default size "default"
 */
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
  hideChildrenLandscape = true,
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
                <p className="mb-4 landscape:hidden lg:landscape:block lg:landscape:mb-4 uppercase font-sans font-medium text-xs tracking-[0.08em] text-accent">
                  {eyebrow}
                </p>
              )}
              <h1 className="mb-6 landscape:mb-3 lg:landscape:mb-6 font-sans font-bold text-foreground leading-[1.1] tracking-[-0.01em] text-[clamp(36px,5vw,56px)]">
                {heading}
              </h1>
              <p className="mb-10 landscape:mb-3 lg:landscape:mb-10 font-sans text-lg landscape:text-base lg:landscape:text-lg leading-[1.7] landscape:leading-[1.3] lg:landscape:leading-[1.7] text-muted-foreground max-w-[460px]">
                {subheading}
              </p>
              <div className="w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">{actions}</div>
            </div>
            {children && (
              <div className={cn("flex-1 relative w-full max-w-[300px] sm:max-w-[320px] lg:max-w-lg mx-auto lg:mx-0 landscape:max-w-none lg:landscape:max-w-lg", hideChildrenLandscape && "hidden portrait:block lg:block")}>
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

export { HeroSection };
