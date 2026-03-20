import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Is checking my score really free?',
    answer: 'Yes, completely free. We never charge for credit score access. Our service is funded through personalized recommendations, not hidden fees.',
  },
  {
    question: 'Will this affect my credit score?',
    answer: 'No. We use a soft inquiry to check your score, which has zero impact on your credit. You can check as often as you like without any effect.',
  },
  {
    question: 'How often is my score updated?',
    answer: 'Your credit score is updated weekly. We pull the latest data every seven days so you always have a current picture of where you stand.',
  },
  {
    question: 'What credit bureau do you use?',
    answer: 'We partner with TransUnion to provide your VantageScore 3.0 credit score. This is one of the most widely used scoring models by lenders.',
  },
  {
    question: 'How does the debt payoff planner work?',
    answer: 'Enter your debts and we create a personalized payoff plan using either the avalanche or snowball method. We show you exactly how much interest you will save and when you will be debt-free.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative overflow-hidden py-20 md:py-28 bg-background">
      <div className="absolute inset-0 z-0">
        <img src="/images/IMG-CREDIT-03.png" alt="" className="w-full h-full object-cover opacity-[0.06]" />
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
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer bg-transparent"
              >
                <span className={`font-sans font-semibold text-base pr-4 ${openIndex === i ? 'text-primary' : 'text-foreground'}`}>
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-muted-foreground shrink-0 transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4">
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
