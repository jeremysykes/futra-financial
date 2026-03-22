type Support = boolean;

const PlanFeatures = [
  'Net worth tracking',
  'Budget vs actuals',
  'Cash flow projections',
  'Retirement runway',
  'Multi-account sync',
  'Investment tracking',
  'Custom categories',
  'Data export',
];

const PlanCompetitors: { name: string; support: Support[] }[] = [
  {
    name: 'Futra Plan',
    support: [true, true, true, true, true, true, true, true],
  },
  {
    name: 'Monarch',
    support: [true, true, true, false, true, true, true, false],
  },
  {
    name: 'YNAB',
    support: [false, true, false, false, true, false, true, true],
  },
  {
    name: 'Spreadsheets',
    support: [true, true, false, false, false, false, true, true],
  },
];

const PlanNetWorthData = [
  { month: 'Jan', value: 156000 },
  { month: 'Feb', value: 158200 },
  { month: 'Mar', value: 155800 },
  { month: 'Apr', value: 161400 },
  { month: 'May', value: 164800 },
  { month: 'Jun', value: 163200 },
  { month: 'Jul', value: 168900 },
  { month: 'Aug', value: 172400 },
  { month: 'Sep', value: 170100 },
  { month: 'Oct', value: 176800 },
  { month: 'Nov', value: 180500 },
  { month: 'Dec', value: 184230 },
];

const PlanBudgetCategories = [
  { name: 'Housing', budget: 2200, actual: 2200, status: 'on-budget' as const },
  { name: 'Food', budget: 800, actual: 920, status: 'over' as const },
  { name: 'Transport', budget: 400, actual: 310, status: 'under' as const },
  { name: 'Savings', budget: 2500, actual: 2140, status: 'under' as const },
  { name: 'Utilities', budget: 350, actual: 380, status: 'over' as const },
];

const PlanStatusColors: Record<string, string> = {
  'on-budget': 'var(--color-accent)',
  over: 'var(--color-caution)',
  under: 'var(--color-positive)',
};

const PlanNetWorthLong = [
  { year: '2020', value: 98000 },
  { year: '2021', value: 112000 },
  { year: '2022', value: 108000 },
  { year: '2023', value: 134000 },
  { year: '2024', value: 158000 },
  { year: '2025', value: 184230 },
];

const PlanBudgetData = [
  { cat: 'Housing', budget: 2200, actual: 2200 },
  { cat: 'Food', budget: 800, actual: 920 },
  { cat: 'Transport', budget: 400, actual: 310 },
  { cat: 'Savings', budget: 2500, actual: 2140 },
  { cat: 'Health', budget: 300, actual: 250 },
  { cat: 'Fun', budget: 500, actual: 610 },
];

const PlanProjectionData = [
  { year: '2025', projected: 184000, optimistic: 184000, conservative: 184000 },
  { year: '2028', projected: 310000, optimistic: 360000, conservative: 265000 },
  { year: '2031', projected: 520000, optimistic: 640000, conservative: 410000 },
  {
    year: '2034',
    projected: 810000,
    optimistic: 1020000,
    conservative: 620000,
  },
  {
    year: '2037',
    projected: 1200000,
    optimistic: 1580000,
    conservative: 890000,
  },
];

const PlanRetirementData = [
  { year: '2025', balance: 184000 },
  { year: '2030', balance: 420000 },
  { year: '2035', balance: 780000 },
  { year: '2040', balance: 1250000 },
  { year: '2045', balance: 1820000 },
  { year: '2050', balance: 2400000 },
  { year: '2055', balance: 2900000 },
  { year: '2059', balance: 3200000 },
];

const PlanFooter = [
  {
    title: 'Product',
    links: ['Features', 'Projections', 'Budgets', 'Net Worth'],
  },
  { title: 'Company', links: ['About', 'Careers', 'Press'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
];

const PlanLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Compare', href: '#compare' },
  { label: 'Pricing', href: '#pricing' },
];

const PlanStats = [
  { value: '12,400+', label: 'Accounts Synced', trend: '+18%' },
  { value: '2.1M', label: 'Data Points / User', trend: '+24%' },
  { value: '94.7%', label: 'Projection Accuracy', trend: '+2.1%' },
  { value: '22 min', label: 'Avg Session Length', trend: '+8%' },
];

const PlanTestimonials = [
  {
    quote:
      'I used to dread checking my finances. Now I open Futra Plan every morning with my coffee. Seeing my net worth chart trend upward is genuinely motivating.',
    name: 'Sarah Chen',
    role: 'Software Engineer',
    initials: 'SC',
    colorClass: 'bg-accent',
  },
  {
    quote:
      'The budget vs. actuals view changed how I think about spending. I cut $400/month without feeling deprived -- I just finally saw where it was going.',
    name: 'Marcus Webb',
    role: 'Product Manager',
    initials: 'MW',
    colorClass: 'bg-positive',
  },
  {
    quote:
      'As a data analyst, I appreciate that the projections use real methodology, not just straight-line extrapolation. The confidence intervals are a nice touch.',
    name: 'Priya Kapoor',
    role: 'Data Analyst',
    initials: 'PK',
    colorClass: 'bg-caution',
  },
];

export {
  PlanBudgetCategories,
  PlanCompetitors,
  PlanFeatures,
  PlanNetWorthData,
  PlanStatusColors,
  PlanNetWorthLong,
  PlanBudgetData,
  PlanProjectionData,
  PlanRetirementData,
  PlanFooter,
  PlanLinks,
  PlanStats,
  PlanTestimonials,
};
