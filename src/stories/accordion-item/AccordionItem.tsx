import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const accordionItemVariants = cva(
  'border border-border rounded-xl',
  {
    variants: {
      variant: {
        default: '',
        flush: 'border-x-0 rounded-none border-t-0 last:border-b-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const triggerVariants = cva(
  'font-sans font-semibold text-base pr-4 transition-colors duration-200',
  {
    variants: {
      state: {
        open: 'text-primary',
        closed: 'text-foreground',
      },
    },
    defaultVariants: {
      state: 'closed',
    },
  },
);

export interface AccordionItemProps
  extends VariantProps<typeof accordionItemVariants> {
  trigger: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

const AccordionItem = ({
  trigger,
  children,
  isOpen = false,
  onToggle,
  variant,
  className,
}: AccordionItemProps) => {
  return (
    <div className={cn(accordionItemVariants({ variant }), className)}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer bg-transparent"
      >
        <span className={triggerVariants({ state: isOpen ? 'open' : 'closed' })}>
          {trigger}
        </span>
        <ChevronDown
          size={18}
          className={cn(
            'text-muted-foreground shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

AccordionItem.displayName = 'AccordionItem';

export { AccordionItem, accordionItemVariants, triggerVariants };
