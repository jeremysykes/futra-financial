import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Badge } from '../badge/Badge';

const processStepsVariants = cva('grid grid-cols-1 relative', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    connector: {
      dashed: '',
      solid: '',
      none: '',
    },
    badgeShape: {
      square: '',
      rounded: '',
      circle: '',
    },
  },
  defaultVariants: {
    size: 'md',
    connector: 'dashed',
    badgeShape: 'rounded',
  },
});

// Size tiers match existing BU implementations:
// md = Save (lg badge, small label, larger title/desc)
// lg = Together (lg badge, bold label, compact title/desc)
const labelClasses = {
  sm: 'text-xs font-medium',
  md: 'text-[13px] font-medium',
  lg: 'text-3xl font-bold',
} as const;

const titleClasses = {
  sm: 'text-base font-semibold',
  md: 'text-xl font-semibold',
  lg: 'text-lg font-semibold',
} as const;

const descriptionClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-sm',
} as const;

const badgeSizeMap = {
  sm: 'sm',
  md: 'lg',
  lg: 'lg',
} as const;

const iconSizeMap = {
  sm: 18,
  md: 28,
  lg: 24,
} as const;

const badgeMarginMap = {
  sm: 'mb-4',
  md: 'mb-6',
  lg: 'mb-5',
} as const;

// Gap maps match existing BU implementations
const gapClasses = {
  sm: 'gap-8 md:gap-8',
  md: 'gap-8 md:gap-12',
  lg: 'gap-12 md:gap-8',
} as const;

// Static class lookup avoids dynamic Tailwind class generation
const gridColsMap: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
};

export interface StepItem {
  /** Lucide icon component for the step badge */
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    strokeWidth?: number;
  }>;
  /** Short label above the title (e.g. "Step 1") */
  label: string;
  /** Step title */
  title: string;
  /** Step description text */
  description: string;
}

export interface ProcessStepsProps
  extends
    React.HTMLAttributes<HTMLOListElement>,
    VariantProps<typeof processStepsVariants> {
  /** Array of step objects with icon, label, title, and description */
  steps: StepItem[];
  /**
   * Whether steps animate in with a fade-up effect.
   * @default true
   */
  animated?: boolean;
  /** Additional CSS classes applied to each step badge */
  badgeClassName?: string;
  /** Stroke width override for step icons */
  iconStrokeWidth?: number;
}

/**
 * Multi-step process display with badges and connector lines.
 *
 * Renders a responsive grid of steps, each with an icon badge,
 * label, title, and description. Steps can be connected with
 * dashed, solid, or no connector lines.
 *
 * @default size "md"
 * @default connector "dashed"
 * @default badgeShape "rounded"
 */
const ProcessSteps = ({
  className,
  size = 'md',
  connector = 'dashed',
  badgeShape = 'rounded',
  steps,
  animated = true,
  badgeClassName,
  iconStrokeWidth,
  ...props
}: ProcessStepsProps) => {
  const resolvedSize = size ?? 'md';

  return (
    <ol
      aria-label="Steps"
      className={cn(
        processStepsVariants({ size, connector, badgeShape }),
        gridColsMap[steps.length],
        gapClasses[resolvedSize],
        'list-none',
        className,
      )}
      {...props}
    >
      {/* Connector line */}
      {connector !== 'none' && (
        <div
          className={cn(
            'hidden md:block absolute',
            resolvedSize === 'sm' && 'top-5 left-[16.67%] right-[16.67%]',
            resolvedSize === 'md' && 'top-8 left-[16.67%] right-[16.67%]',
            resolvedSize === 'lg' && 'top-8 left-[16.67%] right-[16.67%]',
            connector === 'solid' && 'h-px bg-border',
          )}
          {...(connector === 'dashed' && {
            style: { borderTop: '2px dashed var(--color-border)' },
          })}
        />
      )}

      {steps.map((step, i) => (
        <li
          key={step.label}
          className={cn(
            'flex flex-col items-center text-center relative',
            animated && 'animate-fade-in-up',
          )}
          {...(animated && {
            style: { '--step-index': i } as React.CSSProperties,
          })}
        >
          <Badge
            shape={badgeShape}
            size={badgeSizeMap[resolvedSize]}
            className={cn(
              'mx-auto relative z-10',
              badgeMarginMap[resolvedSize],
              badgeClassName,
            )}
          >
            <step.icon
              size={iconSizeMap[resolvedSize]}
              className="text-accent"
              {...(iconStrokeWidth !== undefined && {
                strokeWidth: iconStrokeWidth,
              })}
            />
          </Badge>

          <span
            className={cn(
              'block mb-2 font-mono text-accent',
              labelClasses[resolvedSize],
            )}
          >
            {step.label}
          </span>

          <h3
            className={cn(
              'mb-2 font-sans text-foreground',
              titleClasses[resolvedSize],
            )}
          >
            {step.title}
          </h3>

          <p
            className={cn(
              'font-sans text-muted-foreground leading-relaxed max-w-[300px]',
              descriptionClasses[resolvedSize],
            )}
          >
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
};

ProcessSteps.displayName = 'ProcessSteps';

export { ProcessSteps, processStepsVariants };
