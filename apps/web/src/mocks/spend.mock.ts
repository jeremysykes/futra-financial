import { Zap, Send, Shield, BarChart3 } from 'lucide-react';

const SpendFeatures = [
  {
    icon: Zap,
    title: 'Real-Time Feed',
    desc: 'Every transaction appears instantly with smart categorization. No more refreshing, no more guessing.',
  },
  {
    icon: Send,
    title: 'Instant P2P Transfers',
    desc: 'Send money to anyone in seconds — no fees, no delays. Split dinner or pay rent without thinking twice.',
  },
  {
    icon: Shield,
    title: 'Card Controls',
    desc: "Freeze your card, set spending limits, and get instant push notifications. You're always in control.",
  },
  {
    icon: BarChart3,
    title: 'Spending Insights',
    desc: 'Weekly summaries and category breakdowns show you exactly where your money goes. No surprises.',
  },
];

const SpendFooter = [
  { title: 'Product', links: ['Features', 'Security', 'Pricing'] },
  { title: 'Company', links: ['About', 'Careers', 'Press'] },
  { title: 'Legal', links: ['Privacy', 'Terms'] },
];

const SpendLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Security', href: '#security' },
  { label: 'Pricing', href: '#pricing' },
];

const SpendTransactions = [
  {
    name: 'Blue Bottle Coffee',
    category: 'Coffee',
    amount: -5.75,
    time: '2 min ago',
  },
  {
    name: 'Whole Foods Market',
    category: 'Groceries',
    amount: -47.32,
    time: '1 hr ago',
  },
  {
    name: 'Netflix',
    category: 'Subscription',
    amount: -15.99,
    time: '3 hrs ago',
  },
  {
    name: 'Alex M.',
    category: 'P2P Transfer',
    amount: 120.0,
    time: 'Yesterday',
  },
  { name: 'Uber Eats', category: 'Food', amount: -23.48, time: 'Yesterday' },
];

const SpendStats = [
  { value: '<300ms', label: 'Transaction Speed' },
  { value: '99.99%', label: 'Platform Uptime' },
  { value: '2.4M+', label: 'Active Users' },
  { value: '38', label: 'Countries Supported' },
];

const SpendTestimonials = [
  {
    quote:
      "I got a notification before the barista even handed me my coffee. That's when I knew Futra was different.",
    name: 'Jasmine K.',
    role: 'Freelance Designer, NYC',
    initials: 'JK',
  },
  {
    quote:
      'Splitting rent with three roommates used to be a nightmare. Now it takes literally five seconds, no fees.',
    name: 'Marcus T.',
    role: 'Software Engineer, Austin',
    initials: 'MT',
  },
  {
    quote:
      "The weekly spending breakdown actually changed how I budget. I didn't know I was spending that much on food delivery.",
    name: 'Priya S.',
    role: 'Product Manager, LA',
    initials: 'PS',
  },
];

export {
  SpendFeatures,
  SpendFooter,
  SpendLinks,
  SpendTransactions,
  SpendStats,
  SpendTestimonials,
};
