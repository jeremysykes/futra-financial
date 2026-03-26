import type { ReactNode } from 'react';
import { Accordion as RadixAccordion } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { AccordionItem } from '../accordion-item/AccordionItem';

const accordionVariants = cva(
  '',
  {
    variants: {
      spacing: {
        default: 'space-y-3',
        compact: 'space-y-2',
      },
    },
    defaultVariants: {
      spacing: 'default',
    },
  },
);

export interface AccordionItemData {
  value: string;
  trigger: ReactNode;
  content: ReactNode;
}

export interface AccordionProps
  extends VariantProps<typeof accordionVariants> {
  items: AccordionItemData[];
  multiple?: boolean;
  className?: string;
}

const Accordion = ({
  items,
  multiple = false,
  spacing,
  className,
}: AccordionProps) => {
  // Radix uses a discriminated union — collapsible only applies to type="single"
  const rootProps = multiple
    ? { type: 'multiple' as const }
    : { type: 'single' as const, collapsible: true as const };

  return (
    <RadixAccordion.Root
      {...rootProps}
      className={cn(accordionVariants({ spacing }), className)}
    >
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value} trigger={item.trigger}>
          {item.content}
        </AccordionItem>
      ))}
    </RadixAccordion.Root>
  );
};

Accordion.displayName = 'Accordion';

export { Accordion, accordionVariants };
