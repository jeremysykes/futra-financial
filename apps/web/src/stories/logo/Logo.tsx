import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const logoVariants = cva('flex items-center gap-0', {
  variants: {
    mode: {
      light: 'text-foreground',
      dark: '',
    },
  },
  defaultVariants: {
    mode: 'light',
  },
});

export interface LogoProps extends VariantProps<typeof logoVariants> {
  /** Business unit name displayed after the FUTRA brand */
  unitName: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * FUTRA brand logo with business unit name.
 *
 * Renders the FUTRA wordmark followed by the unit name in accent color.
 * Supports light and dark mode variants.
 *
 * @default mode "light"
 */
const Logo = ({ unitName, mode, className }: LogoProps) => {
  return (
    <div className={cn(logoVariants({ mode }), className)}>
      <span className="font-sans font-black text-xl tracking-[-0.03em]">
        FUTRA
      </span>
      <span className="mx-2 opacity-30 font-light">|</span>
      <span className="font-sans font-medium text-xl">{unitName}</span>
    </div>
  );
};

Logo.displayName = 'Logo';

export { Logo, logoVariants };
