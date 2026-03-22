import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CreditFAQs } from '../../mocks/credit.mock';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-20 md:py-28 bg-background"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/IMG-CREDIT-03.png`}
          alt=""
          className="w-full h-full object-cover opacity-[0.06]"
        />
      </div>
      <div className="relative z-10 max-w-[700px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="mb-4 uppercase font-sans font-medium text-xs tracking-[0.08em] text-accent">
            FAQ
          </p>
          <h2 className="font-sans font-bold text-foreground text-3xl md:text-4xl tracking-[-0.01em]">
            Common questions
          </h2>
        </div>
        <div className="space-y-3">
          {CreditFAQs.map((faq, i) => (
            <div key={i} className="border border-border rounded-xl">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer bg-transparent"
              >
                <span
                  className={`font-sans font-semibold text-base pr-4 transition-colors duration-200 ${openIndex === i ? 'text-primary' : 'text-foreground'}`}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-muted-foreground shrink-0 transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
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
}
