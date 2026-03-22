import {
  Home,
  HandCoins,
  Heart,
  Bell,
  Link,
  Settings,
  Eye,
} from 'lucide-react';

const TogetherFeatures = [
  {
    icon: Home,
    title: 'One view, all accounts',
    description:
      'See both checking accounts, credit cards, and shared balances in a single dashboard.',
    colorType: 'accent' as const,
  },
  {
    icon: HandCoins,
    title: 'Smart bill splitting',
    description:
      'Automatically divide recurring bills, one-off expenses, or custom ratios with zero effort.',
    colorType: 'primary' as const,
  },
  {
    icon: Heart,
    title: 'Shared savings goals',
    description:
      'Set goals together and watch both contributions grow side by side in real time.',
    colorType: 'accent' as const,
  },
  {
    icon: Bell,
    title: 'Real-time for both',
    description:
      'Instant notifications keep both users in the loop on every transaction and milestone.',
    colorType: 'primary' as const,
  },
];

const TogetherFooter = [
  {
    title: 'Product',
    links: ['Features', 'Splits', 'Shared Goals'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms'],
  },
];

const TogetherSteps = [
  {
    icon: Link,
    label: '01',
    title: 'Connect your accounts',
    description: 'Link your bank accounts. Both of you. Takes two minutes.',
  },
  {
    icon: Settings,
    label: '02',
    title: 'Set up your splits',
    description: "Choose what's shared, how to split it, and who pays what.",
  },
  {
    icon: Eye,
    label: '03',
    title: 'Live transparently',
    description: 'See every shared expense, goal, and payment in real time.',
  },
];

const TogetherLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
];

const TogetherExamples = [
  {
    label: 'Rent',
    total: '$2,400',
    splits: [
      { name: 'Alex', amount: '$1,200', percent: 50, color: 'indigo' as const },
      {
        name: 'Jordan',
        amount: '$1,200',
        percent: 50,
        color: 'terracotta' as const,
      },
    ],
  },
  {
    label: 'Groceries',
    total: '$300',
    splits: [
      { name: 'Alex', amount: '$180', percent: 60, color: 'indigo' as const },
      {
        name: 'Jordan',
        amount: '$120',
        percent: 40,
        color: 'terracotta' as const,
      },
    ],
  },
  {
    label: 'Netflix',
    total: '$15.99',
    splits: [
      {
        name: 'Jordan',
        amount: '$15.99',
        percent: 100,
        color: 'terracotta' as const,
      },
    ],
  },
];

const TogetherTestimonials = [
  {
    names: 'Sarah & Mike',
    context: 'Couple, 3 years together',
    initials: ['S', 'M'],
    quote:
      'We used to argue about groceries every single week. Now it just... happens. We see the split, it\u2019s fair, nobody\u2019s keeping score anymore.',
  },
  {
    names: 'Priya & Tom',
    context: 'Partners saving for first trip',
    initials: ['P', 'T'],
    quote:
      'The shared savings goal for our trip to Portugal literally brought us closer. Watching both bars grow together was weirdly romantic.',
  },
  {
    names: 'Maria & Alex',
    context: 'Roommates in Brooklyn',
    initials: ['M', 'A'],
    quote:
      'As roommates, we needed something more grown-up than Venmo requests. This finally makes shared living feel organized, not awkward.',
  },
];

export {
  TogetherFeatures,
  TogetherFooter,
  TogetherSteps,
  TogetherLinks,
  TogetherExamples,
  TogetherTestimonials,
};
