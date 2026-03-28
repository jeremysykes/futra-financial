import type { ReactNode } from 'react';
import { Accordion as RadixAccordion } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { AccordionItem } from '../accordion-item/AccordionItem';

const accordionVariants = cva('', {
  variants: {
    spacing: {
      default: 'space-y-3',
      compact: 'space-y-2',
    },
  },
  defaultVariants: {
    spacing: 'default',
  },
});

export interface AccordionItemData {
  value: string;
  trigger: ReactNode;
  content: ReactNode;
}

export interface AccordionProps extends VariantProps<typeof accordionVariants> {
  /** Array of accordion item data objects with value, trigger, and content */
  items: AccordionItemData[];
  /** Allow multiple accordion items to be open simultaneously */
  multiple?: boolean;
  /** Additional CSS classes for the accordion root */
  className?: string;
}

/**
 * Collapsible accordion with support for single or multiple open items.
 *
 * Renders a list of `AccordionItem` components driven by the `items` data array.
 *
 * @default spacing "default"
 * @default multiple false
 */
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
        <AccordionItem
          key={item.value}
          value={item.value}
          trigger={item.trigger}
        >
          {item.content}
        </AccordionItem>
      ))}
    </RadixAccordion.Root>
  );
};

Accordion.displayName = 'Accordion';

export { Accordion };
