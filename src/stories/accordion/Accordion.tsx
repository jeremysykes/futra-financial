import { useState, type ReactNode } from 'react';
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
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const handleToggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={cn(accordionVariants({ spacing }), className)}>
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          trigger={item.trigger}
          isOpen={openIndices.has(i)}
          onToggle={() => handleToggle(i)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

Accordion.displayName = 'Accordion';

export { Accordion, accordionVariants };
