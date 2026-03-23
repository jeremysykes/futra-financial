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
  value: string;
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

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
