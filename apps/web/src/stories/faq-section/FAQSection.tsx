import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Accordion } from '../accordion/Accordion';

const faqSectionVariants = cva(
  'relative overflow-hidden bg-background',
  {
    variants: {
      padding: {
        default: 'py-16 sm:py-20 md:py-28 lg:py-32',
        compact: 'py-12 sm:py-16 md:py-20',
      },
    },
    defaultVariants: {
      padding: 'default',
    },
  },
);

export interface FAQItem {
  /** The question text */
  question: string;
  /** The answer text */
  answer: string;
}

export interface FAQSectionProps
  extends VariantProps<typeof faqSectionVariants> {
  /** Small label displayed above the heading */
  eyebrow?: ReactNode;
  /** Section heading text */
  heading: ReactNode;
  /** Array of FAQ question/answer pairs */
  items: FAQItem[];
  /** URL for the background image */
  backgroundImage?: string;
  /**
   * Tailwind opacity class applied to the background image.
   * @default "opacity-[0.06]"
   */
  backgroundOpacity?: string;
  /**
   * HTML id attribute for anchor linking.
   * @default "faq"
   */
  sectionId?: string;
  /** Additional CSS classes for the root element */
  className?: string;
}

/**
 * FAQ section with accordion of questions and answers.
 *
 * Renders a heading area followed by an `Accordion` component
 * populated from the `items` array. Supports optional background
 * image overlay.
 *
 * @default padding "default"
 */
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
  const accordionItems = items.map((faq, i) => ({
    value: `faq-${i}`,
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
      <div className="relative z-10 max-w-[700px] mx-auto px-5 sm:px-6">
        <div className="text-center mb-10 md:mb-16">
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
