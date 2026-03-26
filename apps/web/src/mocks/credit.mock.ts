import {
  Gauge,
  CreditCard,
  Activity,
  Bell,
  Lock,
  Shield,
  RefreshCw,
  Target,
} from 'lucide-react';

const CreditFAQs = [
  {
    question: 'Is checking my score really free?',
    answer:
      'Yes, completely free. We never charge for credit score access. Our service is funded through personalized recommendations, not hidden fees.',
  },
  {
    question: 'Will this affect my credit score?',
    answer:
      'No. We use a soft inquiry to check your score, which has zero impact on your credit. You can check as often as you like without any effect.',
  },
  {
    question: 'How often is my score updated?',
    answer:
      'Your credit score is updated weekly. We pull the latest data every seven days so you always have a current picture of where you stand.',
  },
  {
    question: 'What credit bureau do you use?',
    answer:
      'We partner with TransUnion to provide your VantageScore 3.0 credit score. This is one of the most widely used scoring models by lenders.',
  },
  {
    question: 'How does the debt payoff planner work?',
    answer:
      'Enter your debts and we create a personalized payoff plan using either the avalanche or snowball method. We show you exactly how much interest you will save and when you will be debt-free.',
  },
];

const CreditFeatures = [
  {
    icon: Gauge,
    title: 'Credit Score Monitoring',
    description:
      'Track your credit score over time with clear, easy-to-read charts and weekly updates.',
  },
  {
    icon: CreditCard,
    title: 'Balance Tracking & Reminders',
    description:
      'Stay on top of your balances and never miss a payment with smart reminders.',
  },
  {
    icon: Activity,
    title: 'Debt Payoff Planner',
    description:
      'Create a personalized plan to pay down debt faster and save on interest.',
  },
  {
    icon: Bell,
    title: 'Score Alerts & Insights',
    description:
      'Get notified when your score changes and understand exactly what drove it.',
  },
];

const CreditFooter = [
  { title: 'Product', links: ['Features', 'Score Factors', 'Debt Payoff'] },
  { title: 'Company', links: ['About', 'Careers', 'Press'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
];

const CreditLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
];

const CreditSignals = [
  { icon: Lock, text: 'Bank-level encryption' },
  { icon: Shield, text: 'No impact to your credit score' },
  { icon: RefreshCw, text: 'Updated weekly' },
  { icon: Target, text: 'Free forever \u2014 no hidden costs' },
];

export { CreditFAQs, CreditFeatures, CreditFooter, CreditLinks, CreditSignals };
