import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Badge } from '../badge/Badge';

const processStepsVariants = cva('grid grid-cols-1 relative list-none', {
  variants: {
    size: {
      sm: 'gap-8 md:gap-8',
      md: 'gap-8 md:gap-12',
      lg: 'gap-12 md:gap-8',
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

const connectorVariants = cva(
  'hidden md:block absolute left-[16.67%] right-[16.67%]',
  {
    variants: {
      size: {
        sm: 'top-5',
        md: 'top-8',
        lg: 'top-8',
      },
      connector: {
        dashed: '',
        solid: 'h-px bg-border',
        none: '',
      },
    },
    defaultVariants: {
      size: 'md',
      connector: 'dashed',
    },
  },
);

const labelVariants = cva('block mb-2 font-mono text-accent', {
  variants: {
    size: {
      sm: 'text-xs font-medium',
      md: 'text-[13px] font-medium',
      lg: 'text-3xl font-bold',
    },
  },
  defaultVariants: { size: 'md' },
});

const titleVariants = cva('mb-2 font-sans text-foreground', {
  variants: {
    size: {
      sm: 'text-base font-semibold',
      md: 'text-xl font-semibold',
      lg: 'text-lg font-semibold',
    },
  },
  defaultVariants: { size: 'md' },
});

const descriptionVariants = cva(
  'font-sans text-muted-foreground leading-relaxed max-w-[300px]',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-sm',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

const badgeWrapperVariants = cva('mx-auto relative z-10', {
  variants: {
    size: {
      sm: 'mb-4',
      md: 'mb-6',
      lg: 'mb-5',
    },
  },
  defaultVariants: { size: 'md' },
});

// Non-class values — must stay as lookups
const badgeSizeMap = { sm: 'sm', md: 'lg', lg: 'lg' } as const;
const iconSizeMap = { sm: 18, md: 28, lg: 24 } as const;

// Dynamic grid cols based on step count — must stay as lookup
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
  description?: string;
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
        className,
      )}
      {...props}
    >
      {/* Connector line */}
      {connector !== 'none' && (
        <div
          className={connectorVariants({ size, connector })}
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
            className={cn(badgeWrapperVariants({ size }), badgeClassName)}
          >
            <step.icon
              size={iconSizeMap[resolvedSize]}
              className="text-accent"
              {...(iconStrokeWidth !== undefined && {
                strokeWidth: iconStrokeWidth,
              })}
            />
          </Badge>

          <span className={labelVariants({ size })}>{step.label}</span>

          <h3 className={titleVariants({ size })}>{step.title}</h3>

          {step.description && (
            <p className={descriptionVariants({ size })}>{step.description}</p>
          )}
        </li>
      ))}
    </ol>
  );
};

ProcessSteps.displayName = 'ProcessSteps';

export { ProcessSteps };
