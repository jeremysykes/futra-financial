import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
        <div className="space-y-3">
          {items.map((faq, i) => (
            <div key={i} className="border border-border rounded-xl">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer bg-transparent"
              >
                <span
                  className={cn(
                    'font-sans font-semibold text-base pr-4 transition-colors duration-200',
                    openIndex === i ? 'text-primary' : 'text-foreground',
                  )}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={cn(
                    'text-muted-foreground shrink-0 transition-transform duration-200',
                    openIndex === i && 'rotate-180',
                  )}
                />
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: openIndex === i ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-4">
                    <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

FAQSection.displayName = 'FAQSection';

export { FAQSection, faqSectionVariants };
