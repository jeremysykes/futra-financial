import {
  CircleDot,
  Coins,
  CalendarClock,
  Trophy,
  Target,
  Repeat,
  TrendingUp,
} from 'lucide-react';

const SaveFeatures = [
  {
    icon: CircleDot,
    title: 'Visual goal tracking',
    desc: "See every goal at a glance with progress rings and bars that celebrate how far you've come.",
  },
  {
    icon: Coins,
    title: 'Smart round-ups',
    desc: 'Every purchase rounds up to the nearest dollar. Spare change adds up faster than you think.',
  },
  {
    icon: CalendarClock,
    title: 'Scheduled transfers',
    desc: 'Set it and forget it. Automatic weekly or monthly transfers keep your goals on track.',
  },
  {
    icon: Trophy,
    title: 'Milestones & streaks',
    desc: 'Hit 25%, 50%, 75% — celebrate each milestone. Streaks reward your consistency.',
  },
];

const SaveFooter = [
  { title: 'Product', links: ['Features', 'Goals', 'Round-Ups'] },
  { title: 'Company', links: ['About', 'Careers', 'Press'] },
  { title: 'Legal', links: ['Privacy', 'Terms'] },
];

const SaveSteps = [
  {
    label: 'Step 01',
    icon: Target,
    title: 'Name your goal',
    description:
      'Set a target amount and a timeline that works for you. Trip, home, rainy day — you decide.',
  },
  {
    label: 'Step 02',
    icon: Repeat,
    title: 'Automate it',
    description:
      'Round-ups, scheduled transfers, or manual deposits. Choose what fits your rhythm.',
  },
  {
    label: 'Step 03',
    icon: TrendingUp,
    title: 'Watch it grow',
    description:
      'Visual progress tracking that keeps you motivated. Every dollar gets you closer.',
  },
];

const SaveLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Goals', href: '#goals' },
];

const SaveStats = [
  { value: '$42M+', label: 'Total saved by users' },
  { value: '128K', label: 'Goals completed' },
  { value: '+34%', label: 'Avg. monthly savings increase' },
  { value: '89K', label: 'Active savers' },
];

const SaveTestimonials = [
  {
    quote:
      'I finally saved enough for my first solo trip to Portugal. Seeing that progress bar inch forward every week kept me going.',
    name: 'Maya Chen',
    role: 'Saved $3,200 for travel',
    initials: 'MC',
    color: '#A8C5B0',
  },
  {
    quote:
      "The round-ups are sneaky good. I barely notice them, but I've saved over $1,400 in six months without even trying.",
    name: 'Jordan Ellis',
    role: 'Building an emergency fund',
    initials: 'JE',
    color: '#3D8B5E',
  },
  {
    quote:
      "Other apps made saving feel like a chore. Futra makes it feel like I'm actually building something. The milestones are *chef's kiss*.",
    name: 'Priya Kapoor',
    role: 'Saving for a down payment',
    initials: 'PK',
    color: '#4A7C59',
  },
];

export {
  SaveFeatures,
  SaveFooter,
  SaveSteps,
  SaveLinks,
  SaveStats,
  SaveTestimonials,
};
