import type { ReactNode } from 'react';
import { Accordion } from 'radix-ui';
import { ChevronDown } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const accordionItemVariants = cva(
  'border border-border rounded-xl',
);

const triggerVariants = cva(
  'w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer bg-transparent min-h-[44px]',
);

export interface AccordionItemProps {
  /** Unique identifier for the accordion item */
  value: string;
  /** Clickable header content that toggles open/close */
  trigger: ReactNode;
  /** Collapsible body content revealed when open */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Individual accordion item with trigger and collapsible content.
 *
 * Must be used inside an `Accordion` component. The trigger area
 * includes a chevron icon that rotates when expanded.
 */
const AccordionItem = ({
  value,
  trigger,
  children,
  className,
}: AccordionItemProps) => {
  return (
    <Accordion.Item value={value} className={cn(accordionItemVariants(), className)}>
      <Accordion.Header asChild>
        <h3>
          <Accordion.Trigger className={cn(triggerVariants(), 'group')}>
            <span className="font-sans font-semibold text-base pr-4 transition-colors duration-200 text-foreground group-data-[state=open]:text-primary">
              {trigger}
            </span>
            <ChevronDown
              size={18}
              className="text-muted-foreground shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </Accordion.Trigger>
        </h3>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div className="px-6 pb-4">
          {children}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
};

AccordionItem.displayName = 'AccordionItem';

export { AccordionItem, accordionItemVariants };
