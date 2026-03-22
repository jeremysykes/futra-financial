import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Accordion } from '../accordion/Accordion';

const faqSectionVariants = cva(
  'relative overflow-hidden bg-background',
  {
    variants: {
      padding: {
        default: 'py-20 md:py-28',
        compact: 'py-16 md:py-20',
      },
    },
    defaultVariants: {
      padding: 'default',
    },
  },
);

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps
  extends VariantProps<typeof faqSectionVariants> {
  eyebrow?: ReactNode;
  heading: ReactNode;
  items: FAQItem[];
  backgroundImage?: string;
  backgroundOpacity?: string;
  sectionId?: string;
  className?: string;
}

const FAQSection = ({
  eyebrow,
  heading,
  items,
  backgroundImage,
  backgroundOpacity = 'opacity-[0.06]',
  padding,
  sectionId = 'faq',
  className,
}: FAQSectionProps) => {
  const accordionItems = items.map((faq) => ({
    trigger: faq.question,
    content: (
      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
        {faq.answer}
      </p>
    ),
  }));

  return (
    <section
      id={sectionId}
      className={cn(faqSectionVariants({ padding }), className)}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className={cn('w-full h-full object-cover', backgroundOpacity)}
          />
        </div>
      )}
      <div className="relative z-10 max-w-[700px] mx-auto px-6">
        <div className="text-center mb-16">
          {eyebrow && (
            <p className="mb-4 uppercase font-sans font-medium text-xs tracking-[0.08em] text-accent">
              {eyebrow}
            </p>
          )}
          <h2 className="font-sans font-bold text-foreground text-3xl md:text-4xl tracking-[-0.01em]">
            {heading}
          </h2>
        </div>
        <Accordion items={accordionItems} />
      </div>
    </section>
  );
};

FAQSection.displayName = 'FAQSection';

export { FAQSection, faqSectionVariants };
