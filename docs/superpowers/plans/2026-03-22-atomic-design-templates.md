# Atomic Design Templates — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract 6 shared CVA template components, rewire SavePage as proof-of-concept, and organize Storybook to reflect the full atomic design hierarchy.

**Architecture:** Composition-driven templates define section layout/structure and accept `children` slots for BU content. All new components use CVA with `cn()` from `src/lib/utils`. Existing BU components remain untouched — pages simply stop importing them.

**Tech Stack:** React, CVA, Tailwind v4 CSS variable tokens, Storybook, Lucide icons

**Spec:** `docs/superpowers/specs/2026-03-22-atomic-design-templates-design.md`

---

## File Map

### New Files (Create)

| File | Responsibility |
|------|---------------|
| `src/stories/cta-section/CTASection.tsx` | Shared CTA template — gradient/solid background, center/left alignment, children slot for buttons |
| `src/stories/cta-section/CTASection.stories.tsx` | Stories: variants, per-BU examples |
| `src/stories/footer/Footer.tsx` | Shared Footer template — columns/simple layout, always-dark, children slot |
| `src/stories/footer/Footer.stories.tsx` | Stories: variants, per-BU examples |
| `src/stories/stats-row/StatsRow.tsx` | Shared StatsRow template — 3/4 column grid, children slot |
| `src/stories/stats-row/StatsRow.stories.tsx` | Stories: variants, per-BU examples |
| `src/stories/testimonial-section/TestimonialSection.tsx` | Shared TestimonialSection template — 2/3 column grid, children slot |
| `src/stories/testimonial-section/TestimonialSection.stories.tsx` | Stories: variants, per-BU examples |
| `src/stories/feature-section/FeatureSection.tsx` | Shared FeatureSection template — heading + children slot for card grid |
| `src/stories/feature-section/FeatureSection.stories.tsx` | Stories: variants, per-BU examples |
| `src/stories/hero-section/HeroSection.tsx` | Shared HeroSection template — layout variants, background image, children slots |
| `src/stories/hero-section/HeroSection.stories.tsx` | Stories: variants, per-BU examples |

### Modified Files

| File | Change |
|------|--------|
| `src/stories/save/SavePage.tsx` | Rewire imports from `src/components/save/` to shared templates |

---

## Task 1: CTASection Template

**Files:**
- Create: `src/stories/cta-section/CTASection.tsx`
- Create: `src/stories/cta-section/CTASection.stories.tsx`

The simplest template — good starting point to establish the pattern.

- [ ] **Step 1: Create CTASection component**

Reference existing: `src/components/save/CTASection.tsx` and `src/components/spend/CTASection.tsx`

```tsx
// src/stories/cta-section/CTASection.tsx
import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const ctaSectionVariants = cva(
  'relative overflow-hidden py-24 md:py-32',
  {
    variants: {
      background: {
        gradient: 'bg-gradient-to-br from-muted to-accent/10',
        solid: 'bg-gradient-to-br from-primary to-primary-hover',
      },
      alignment: {
        center: 'text-center',
        left: 'text-left',
      },
    },
    defaultVariants: {
      background: 'gradient',
      alignment: 'center',
    },
  },
);

const ctaTextVariants = cva('', {
  variants: {
    background: {
      gradient: '',
      solid: '',
    },
  },
});

export interface CTASectionProps
  extends VariantProps<typeof ctaSectionVariants> {
  heading: ReactNode;
  description?: ReactNode;
  backgroundImage?: string;
  backgroundOpacity?: string;
  sectionId?: string;
  children: ReactNode;
  className?: string;
}

const CTASection = ({
  heading,
  description,
  backgroundImage,
  backgroundOpacity = 'opacity-[0.08]',
  background,
  alignment,
  sectionId = 'cta',
  children,
  className,
}: CTASectionProps) => {
  const isSolid = background === 'solid';
  return (
    <section
      id={sectionId}
      className={cn(ctaSectionVariants({ background, alignment }), className)}
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
      <div className={cn(
        'relative z-10 mx-auto px-6',
        alignment === 'center' ? 'max-w-[600px]' : 'max-w-[1200px]',
      )}>
        <h2 className={cn(
          'mb-4 font-sans font-bold tracking-[-0.01em] text-[clamp(28px,4vw,40px)]',
          isSolid ? 'text-primary-foreground' : 'text-foreground',
        )}>
          {heading}
        </h2>
        {description && (
          <p className={cn(
            'mb-10 font-sans text-lg leading-[1.7]',
            isSolid ? 'text-primary-foreground/80' : 'text-muted-foreground',
          )}>
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};

CTASection.displayName = 'CTASection';

export { CTASection, ctaSectionVariants };
```

- [ ] **Step 2: Create CTASection stories**

```tsx
// src/stories/cta-section/CTASection.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CTASection } from './CTASection';
import { Button } from '../button/Button';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Templates/CTASection',
  component: CTASection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof CTASection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GradientCenter: Story = {
  args: {
    heading: 'Your first goal is waiting',
    description:
      'No minimum amounts. No fees. Just a calm, focused way to build toward something that matters to you.',
    children: <Button>Start Saving</Button>,
  },
  globals: { businessUnit: 'save' },
};

export const SolidCenter: Story = {
  args: {
    background: 'solid',
    heading: 'Start spending smarter today.',
    description:
      'No minimum balance. No hidden fees. No waiting. Open your account in under two minutes.',
    children: (
      <Button intent="inverse" asChild>
        <a href="#">Download the App</a>
      </Button>
    ),
  },
  globals: { businessUnit: 'spend' },
};

export const WithBackgroundImage: Story = {
  args: {
    heading: 'Your first goal is waiting',
    description:
      'No minimum amounts. No fees. Just a calm, focused way to build toward something that matters to you.',
    backgroundImage: `${import.meta.env.BASE_URL}images/IMG-SAVE-03.png`,
    children: <Button>Start Saving</Button>,
  },
  globals: { businessUnit: 'save' },
};

export const LeftAligned: Story = {
  args: {
    alignment: 'left',
    heading: 'Ready to take control?',
    description: 'Join thousands already planning smarter.',
    children: <Button>Get Started</Button>,
  },
  globals: { businessUnit: 'plan' },
};
```

- [ ] **Step 3: Verify in Storybook**

Run: `npm run storybook`

Expected: `Templates/CTASection` appears in sidebar with 4 stories. Each renders correctly with proper token colors per BU theme.

- [ ] **Step 4: Commit**

```bash
git add src/stories/cta-section/
git commit -m "feat: add shared CTASection template component with CVA variants"
```

---

## Task 2: Footer Template

**Files:**
- Create: `src/stories/footer/Footer.tsx`
- Create: `src/stories/footer/Footer.stories.tsx`

Always-dark footer using hardcoded colors (per DESIGN.md exception).

- [ ] **Step 1: Create Footer component**

Reference existing: `src/components/save/Footer.tsx` and `src/components/spend/Footer.tsx`

```tsx
// src/stories/footer/Footer.tsx
import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const footerVariants = cva(
  'bg-[#1C1C1A]',
  {
    variants: {
      layout: {
        columns: 'py-16 md:py-20',
        simple: 'py-10 md:py-12',
      },
    },
    defaultVariants: {
      layout: 'columns',
    },
  },
);

export interface FooterProps
  extends VariantProps<typeof footerVariants> {
  children: ReactNode;
  className?: string;
}

const Footer = ({ layout, children, className }: FooterProps) => {
  return (
    <footer className={cn(footerVariants({ layout }), className)}>
      <div className="max-w-[1200px] mx-auto px-6">
        {children}
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export { Footer, footerVariants };
```

- [ ] **Step 2: Create Footer stories**

```tsx
// src/stories/footer/Footer.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';
import { Logo } from '../logo/Logo';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Templates/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const SaveFooterContent = () => (
  <>
    <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
      <Logo unitName="save" mode="dark" className="text-[#F7F5F0]" />
      <div className="grid grid-cols-3 gap-8 md:gap-16">
        {[
          { title: 'Product', links: ['Features', 'Goals', 'Round-Ups'] },
          { title: 'Company', links: ['About', 'Careers', 'Press'] },
          { title: 'Legal', links: ['Privacy', 'Terms'] },
        ].map((col) => (
          <div key={col.title}>
            <span className="block mb-4 uppercase font-sans font-medium text-[11px] tracking-[0.08em] text-[#9A9A90]">
              {col.title}
            </span>
            {col.links.map((link) => (
              <a
                key={link}
                href="#"
                className="block mb-3 font-sans text-sm text-[#9A9A90] transition-colors hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
    <div className="pt-8 border-t border-[rgba(154,154,144,0.2)]">
      <span className="font-sans text-xs text-[#9A9A90]">
        &copy; 2026 Futra Financial. All rights reserved.
      </span>
    </div>
  </>
);

export const Columns: Story = {
  args: {
    children: <SaveFooterContent />,
  },
  globals: { businessUnit: 'save' },
};

export const Simple: Story = {
  args: {
    layout: 'simple',
    children: (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo unitName="spend" mode="dark" className="text-[#FFFFFF]" />
        <span className="font-sans text-xs text-[#9A9A90]">
          &copy; 2026 Futra Financial, Inc. All rights reserved.
        </span>
      </div>
    ),
  },
  globals: { businessUnit: 'spend' },
};
```

- [ ] **Step 3: Verify in Storybook**

Run: `npm run storybook`

Expected: `Templates/Footer` appears in sidebar with 2 stories. Dark background renders correctly.

- [ ] **Step 4: Commit**

```bash
git add src/stories/footer/
git commit -m "feat: add shared Footer template component with CVA layout variants"
```

---

## Task 3: StatsRow Template

**Files:**
- Create: `src/stories/stats-row/StatsRow.tsx`
- Create: `src/stories/stats-row/StatsRow.stories.tsx`

- [ ] **Step 1: Create StatsRow component**

Reference existing: `src/components/save/StatsRow.tsx`

```tsx
// src/stories/stats-row/StatsRow.tsx
import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const statsRowVariants = cva(
  'py-20 md:py-28',
  {
    variants: {
      columns: {
        3: '',
        4: '',
      },
      background: {
        default: 'bg-background',
        muted: 'bg-muted',
      },
    },
    defaultVariants: {
      columns: 4,
      background: 'muted',
    },
  },
);

const statsGridVariants = cva(
  'grid gap-8 md:gap-12',
  {
    variants: {
      columns: {
        3: 'grid-cols-1 sm:grid-cols-3',
        4: 'grid-cols-2 lg:grid-cols-4',
      },
    },
    defaultVariants: {
      columns: 4,
    },
  },
);

export interface StatsRowProps
  extends VariantProps<typeof statsRowVariants> {
  children: ReactNode;
  className?: string;
}

const StatsRow = ({ columns, background, children, className }: StatsRowProps) => {
  return (
    <section className={cn(statsRowVariants({ columns, background }), className)}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className={statsGridVariants({ columns })}>
          {children}
        </div>
      </div>
    </section>
  );
};

StatsRow.displayName = 'StatsRow';

export { StatsRow, statsRowVariants, statsGridVariants };
```

- [ ] **Step 2: Create StatsRow stories**

```tsx
// src/stories/stats-row/StatsRow.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatsRow } from './StatsRow';
import { withStoryDisplay } from '../decorators';

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center animate-fade-in-up">
    <span className="block mb-2 font-mono font-medium text-accent text-[clamp(28px,4vw,40px)]">
      {value}
    </span>
    <span className="uppercase font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
      {label}
    </span>
  </div>
);

const meta = {
  title: 'Templates/StatsRow',
  component: StatsRow,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof StatsRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FourColumns: Story = {
  args: {
    children: (
      <>
        <StatItem value="$42M+" label="Total saved by users" />
        <StatItem value="128K" label="Goals completed" />
        <StatItem value="+34%" label="Avg. monthly savings increase" />
        <StatItem value="89K" label="Active savers" />
      </>
    ),
  },
  globals: { businessUnit: 'save' },
};

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    children: (
      <>
        <StatItem value="2.4M" label="Active users" />
        <StatItem value="$18B" label="Transactions processed" />
        <StatItem value="<1s" label="Average transaction time" />
      </>
    ),
  },
  globals: { businessUnit: 'spend' },
};

export const DefaultBackground: Story = {
  args: {
    background: 'default',
    children: (
      <>
        <StatItem value="$42M+" label="Total saved by users" />
        <StatItem value="128K" label="Goals completed" />
        <StatItem value="+34%" label="Avg. monthly savings increase" />
        <StatItem value="89K" label="Active savers" />
      </>
    ),
  },
  globals: { businessUnit: 'plan' },
};
```

- [ ] **Step 3: Verify in Storybook**

Run: `npm run storybook`

Expected: `Templates/StatsRow` appears with 3 stories. Grid columns match variant selection.

- [ ] **Step 4: Commit**

```bash
git add src/stories/stats-row/
git commit -m "feat: add shared StatsRow template component with column and background variants"
```

---

## Task 4: TestimonialSection Template

**Files:**
- Create: `src/stories/testimonial-section/TestimonialSection.tsx`
- Create: `src/stories/testimonial-section/TestimonialSection.stories.tsx`

- [ ] **Step 1: Create TestimonialSection component**

Reference existing: `src/components/save/TestimonialSection.tsx`

```tsx
// src/stories/testimonial-section/TestimonialSection.tsx
import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const testimonialSectionVariants = cva(
  'py-24 md:py-32 bg-background',
  {
    variants: {
      columns: {
        2: '',
        3: '',
      },
    },
    defaultVariants: {
      columns: 3,
    },
  },
);

const testimonialGridVariants = cva(
  'grid grid-cols-1 gap-6',
  {
    variants: {
      columns: {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
      },
    },
    defaultVariants: {
      columns: 3,
    },
  },
);

export interface TestimonialSectionProps
  extends VariantProps<typeof testimonialSectionVariants> {
  heading?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
}

const TestimonialSection = ({
  heading,
  subtitle,
  columns,
  children,
  className,
}: TestimonialSectionProps) => {
  return (
    <section className={cn(testimonialSectionVariants({ columns }), className)}>
      <div className="max-w-[1200px] mx-auto px-6">
        {(heading || subtitle) && (
          <div className="text-center mb-16">
            {subtitle && (
              <p className="mb-3 uppercase font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
                {subtitle}
              </p>
            )}
            {heading && (
              <h2 className="font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
                {heading}
              </h2>
            )}
          </div>
        )}
        <div className={testimonialGridVariants({ columns })}>
          {children}
        </div>
      </div>
    </section>
  );
};

TestimonialSection.displayName = 'TestimonialSection';

export { TestimonialSection, testimonialSectionVariants, testimonialGridVariants };
```

- [ ] **Step 2: Create TestimonialSection stories**

```tsx
// src/stories/testimonial-section/TestimonialSection.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TestimonialSection } from './TestimonialSection';
import { Card } from '../card/Card';
import { withStoryDisplay } from '../decorators';

const TestimonialCard = ({
  quote,
  name,
  role,
  initials,
  color,
}: {
  quote: string;
  name: string;
  role: string;
  initials: string;
  color: string;
}) => (
  <Card interactive className="animate-fade-in-up">
    <p className="mb-6 font-sans text-base leading-[1.7] text-foreground italic">
      &ldquo;{quote}&rdquo;
    </p>
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-sans font-semibold text-[13px]"
        style={{ backgroundColor: color }}
      >
        {initials}
      </div>
      <div>
        <span className="block font-sans font-semibold text-sm text-foreground">
          {name}
        </span>
        <span className="font-sans font-medium text-xs text-muted-foreground">
          {role}
        </span>
      </div>
    </div>
  </Card>
);

const meta = {
  title: 'Templates/TestimonialSection',
  component: TestimonialSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof TestimonialSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = {
  args: {
    subtitle: 'From our savers',
    heading: 'Real goals, real progress',
    children: (
      <>
        <TestimonialCard
          quote="I finally saved enough for my first solo trip to Portugal."
          name="Maya Chen"
          role="Saved $3,200 for travel"
          initials="MC"
          color="#A8C5B0"
        />
        <TestimonialCard
          quote="The round-ups are sneaky good. I've saved over $1,400 in six months."
          name="Jordan Ellis"
          role="Building an emergency fund"
          initials="JE"
          color="#3D8B5E"
        />
        <TestimonialCard
          quote="Futra makes saving feel like I'm actually building something."
          name="Priya Kapoor"
          role="Saving for a down payment"
          initials="PK"
          color="#4A7C59"
        />
      </>
    ),
  },
  globals: { businessUnit: 'save' },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    subtitle: 'What our users say',
    heading: 'Trusted by thousands',
    children: (
      <>
        <TestimonialCard
          quote="Planning our finances together has never been easier."
          name="Alex Rivera"
          role="Couple planning"
          initials="AR"
          color="#D4718A"
        />
        <TestimonialCard
          quote="We finally have visibility into our shared expenses."
          name="Sam Taylor"
          role="Joint account holder"
          initials="ST"
          color="#C25D7B"
        />
      </>
    ),
  },
  globals: { businessUnit: 'together' },
};
```

- [ ] **Step 3: Verify in Storybook**

Run: `npm run storybook`

Expected: `Templates/TestimonialSection` appears with 2 stories. Grid columns match variant.

- [ ] **Step 4: Commit**

```bash
git add src/stories/testimonial-section/
git commit -m "feat: add shared TestimonialSection template with column variants"
```

---

## Task 5: FeatureSection Template

**Files:**
- Create: `src/stories/feature-section/FeatureSection.tsx`
- Create: `src/stories/feature-section/FeatureSection.stories.tsx`

- [ ] **Step 1: Create FeatureSection component**

Reference existing: `src/components/save/FeatureSection.tsx`

```tsx
// src/stories/feature-section/FeatureSection.tsx
import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const featureSectionVariants = cva(
  '',
  {
    variants: {
      background: {
        default: 'bg-background',
        muted: 'bg-muted',
      },
      padding: {
        default: 'py-24 md:py-32',
        compact: 'py-16 md:py-20',
      },
    },
    defaultVariants: {
      background: 'default',
      padding: 'default',
    },
  },
);

export interface FeatureSectionProps
  extends VariantProps<typeof featureSectionVariants> {
  heading: ReactNode;
  subtitle?: ReactNode;
  sectionId?: string;
  children: ReactNode;
  className?: string;
}

const FeatureSection = ({
  heading,
  subtitle,
  background,
  padding,
  sectionId = 'features',
  children,
  className,
}: FeatureSectionProps) => {
  return (
    <section
      id={sectionId}
      className={cn(featureSectionVariants({ background, padding }), className)}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {subtitle && (
          <p className="mb-3 uppercase text-center font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
            {subtitle}
          </p>
        )}
        <h2 className="text-center mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          {heading}
        </h2>
        {children}
      </div>
    </section>
  );
};

FeatureSection.displayName = 'FeatureSection';

export { FeatureSection, featureSectionVariants };
```

- [ ] **Step 2: Create FeatureSection stories**

```tsx
// src/stories/feature-section/FeatureSection.stories.tsx
import type { ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleDot, Coins, CalendarClock, Trophy } from 'lucide-react';
import { FeatureSection } from './FeatureSection';
import { Card } from '../card/Card';
import { withStoryDisplay } from '../decorators';

const FeatureCard = ({
  icon: Icon,
  title,
  desc,
  delay = 0,
}: {
  icon: ComponentType<{ size: number; className: string; strokeWidth?: number }>;
  title: string;
  desc: string;
  delay?: number;
}) => (
  <Card
    variant="top"
    interactive
    className="animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center bg-muted">
      <Icon size={22} className="text-accent" strokeWidth={1.5} />
    </div>
    <h4 className="mb-2 font-sans font-semibold text-[17px] text-foreground">
      {title}
    </h4>
    <p className="font-sans text-[15px] leading-[1.7] text-muted-foreground">
      {desc}
    </p>
  </Card>
);

const meta = {
  title: 'Templates/FeatureSection',
  component: FeatureSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof FeatureSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    subtitle: 'Saving, your way',
    heading: 'Tools that fit your life',
    children: (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard icon={CircleDot} title="Visual goal tracking" desc="See every goal at a glance with progress rings and bars." delay={0} />
        <FeatureCard icon={Coins} title="Smart round-ups" desc="Every purchase rounds up to the nearest dollar." delay={100} />
        <FeatureCard icon={CalendarClock} title="Scheduled transfers" desc="Set it and forget it. Automatic transfers keep you on track." delay={200} />
        <FeatureCard icon={Trophy} title="Milestones & streaks" desc="Celebrate each milestone. Streaks reward your consistency." delay={300} />
      </div>
    ),
  },
  globals: { businessUnit: 'save' },
};

export const MutedBackground: Story = {
  args: {
    background: 'muted',
    heading: 'Everything you need',
    children: (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard icon={CircleDot} title="Feature one" desc="Description of the feature." delay={0} />
        <FeatureCard icon={Coins} title="Feature two" desc="Description of the feature." delay={100} />
        <FeatureCard icon={CalendarClock} title="Feature three" desc="Description of the feature." delay={200} />
        <FeatureCard icon={Trophy} title="Feature four" desc="Description of the feature." delay={300} />
      </div>
    ),
  },
  globals: { businessUnit: 'credit' },
};

export const Compact: Story = {
  args: {
    padding: 'compact',
    heading: 'Key features',
    children: (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard icon={CircleDot} title="Feature one" desc="Description." delay={0} />
        <FeatureCard icon={Coins} title="Feature two" desc="Description." delay={100} />
        <FeatureCard icon={CalendarClock} title="Feature three" desc="Description." delay={200} />
      </div>
    ),
  },
  globals: { businessUnit: 'plan' },
};
```

- [ ] **Step 3: Verify in Storybook**

Run: `npm run storybook`

Expected: `Templates/FeatureSection` appears with 3 stories. Background and padding variants work.

- [ ] **Step 4: Commit**

```bash
git add src/stories/feature-section/
git commit -m "feat: add shared FeatureSection template with background and padding variants"
```

---

## Task 6: HeroSection Template

**Files:**
- Create: `src/stories/hero-section/HeroSection.tsx`
- Create: `src/stories/hero-section/HeroSection.stories.tsx`

Most complex template — two layout variants and background image support.

- [ ] **Step 1: Create HeroSection component**

Reference existing: `src/components/save/HeroSection.tsx`, `src/components/spend/HeroSection.tsx`, `src/components/credit/HeroSection.tsx`

```tsx
// src/stories/hero-section/HeroSection.tsx
import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const heroSectionVariants = cva(
  'relative overflow-hidden flex items-center pt-[calc(var(--nav-top,0px)+64px)] bg-background',
  {
    variants: {
      layout: {
        'left-right': '',
        centered: 'text-center',
      },
      size: {
        default: 'min-h-screen',
        tall: 'min-h-[110vh]',
      },
    },
    defaultVariants: {
      layout: 'left-right',
      size: 'default',
    },
  },
);

const contentVariants = cva(
  'relative z-10 max-w-[1200px] mx-auto px-6 py-20 md:py-28 w-full',
  {
    variants: {
      layout: {
        'left-right': '',
        centered: 'flex flex-col items-center',
      },
    },
    defaultVariants: {
      layout: 'left-right',
    },
  },
);

export interface HeroSectionProps
  extends VariantProps<typeof heroSectionVariants> {
  heading: ReactNode;
  subheading: ReactNode;
  eyebrow?: ReactNode;
  backgroundImage?: string;
  backgroundOpacity?: string;
  overlayOpacity?: string;
  actions: ReactNode;
  children?: ReactNode;
  className?: string;
}

const HeroSection = ({
  heading,
  subheading,
  eyebrow,
  backgroundImage,
  backgroundOpacity = 'opacity-[0.08]',
  overlayOpacity = 'bg-background/70',
  layout,
  size,
  actions,
  children,
  className,
}: HeroSectionProps) => {
  return (
    <section className={cn(heroSectionVariants({ layout, size }), className)}>
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className={cn('w-full h-full object-cover', backgroundOpacity)}
          />
          <div className={cn('absolute inset-0', overlayOpacity)} />
        </div>
      )}
      <div className={contentVariants({ layout })}>
        {layout === 'left-right' ? (
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            <div className="flex-1 max-w-xl">
              {eyebrow && (
                <p className="mb-4 uppercase font-sans font-medium text-xs tracking-[0.08em] text-accent">
                  {eyebrow}
                </p>
              )}
              <h1 className="mb-6 font-sans font-bold text-foreground leading-[1.1] tracking-[-0.01em] text-[clamp(36px,5vw,56px)]">
                {heading}
              </h1>
              <p className="mb-10 font-sans text-lg leading-[1.7] text-muted-foreground max-w-[460px]">
                {subheading}
              </p>
              {actions}
            </div>
            {children && (
              <div className="flex-1 flex justify-center w-full max-w-md lg:max-w-lg">
                {children}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="mb-4 uppercase font-sans font-medium text-xs tracking-[0.08em] text-accent">
                {eyebrow}
              </p>
            )}
            <h1 className="mb-6 font-sans font-bold text-foreground leading-[1.1] tracking-[-0.01em] text-[clamp(36px,5vw,56px)]">
              {heading}
            </h1>
            <p className="mb-10 font-sans text-lg leading-[1.7] text-muted-foreground">
              {subheading}
            </p>
            {actions}
            {children && <div className="mt-16">{children}</div>}
          </div>
        )}
      </div>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';

export { HeroSection, heroSectionVariants };
```

- [ ] **Step 2: Create HeroSection stories**

```tsx
// src/stories/hero-section/HeroSection.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroSection } from './HeroSection';
import { Button } from '../button/Button';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Templates/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LeftRight: Story = {
  args: {
    layout: 'left-right',
    eyebrow: 'Goal-based savings',
    heading: (
      <>
        Every dollar has
        <br />a destination
      </>
    ),
    subheading:
      'Automate your savings with round-ups and scheduled transfers. Watch your goals grow with beautiful, visual progress tracking.',
    backgroundImage: `${import.meta.env.BASE_URL}images/IMG-SAVE-01.png`,
    actions: <Button>Create Your First Goal</Button>,
    children: (
      <div className="text-muted-foreground text-center p-16 border border-dashed border-border rounded-xl">
        Visual area — signature component goes here
      </div>
    ),
  },
  globals: { businessUnit: 'save' },
};

export const LeftRightWithAccent: Story = {
  args: {
    layout: 'left-right',
    heading: (
      <>
        Your money,
        <br />
        <span className="text-accent">in real time.</span>
      </>
    ),
    subheading:
      'Instant transactions, zero fees, total control. See every dollar the second it moves — not hours later.',
    backgroundImage: `${import.meta.env.BASE_URL}images/IMG-SPEND-01.png`,
    backgroundOpacity: 'opacity-10',
    overlayOpacity: 'bg-background/80',
    actions: (
      <Button asChild>
        <a href="#cta">Open Your Account</a>
      </Button>
    ),
  },
  globals: { businessUnit: 'spend' },
};

export const Centered: Story = {
  args: {
    layout: 'centered',
    eyebrow: 'Financial planning',
    heading: 'See the full picture',
    subheading:
      'A dashboard that connects every account, every goal, and every dollar into one clear view.',
    actions: <Button>Start Planning</Button>,
  },
  globals: { businessUnit: 'plan' },
};
```

- [ ] **Step 3: Verify in Storybook**

Run: `npm run storybook`

Expected: `Templates/HeroSection` appears with 3 stories. Left-right and centered layouts render correctly. Background images appear with correct opacity.

- [ ] **Step 4: Commit**

```bash
git add src/stories/hero-section/
git commit -m "feat: add shared HeroSection template with layout, size, and background variants"
```

---

## Task 7: Rewire SavePage

**Files:**
- Modify: `src/stories/save/SavePage.tsx`

Proof-of-concept: rewire SavePage to use the new shared templates instead of BU-specific components.

- [ ] **Step 1: Rewire SavePage imports and composition**

Replace the existing SavePage with shared template composition. Continue importing HowItWorks and Navbar from `src/components/save/` (Phase 2 scope).

```tsx
// src/stories/save/SavePage.tsx
import { Navbar } from '../../components/save/Navbar';
import { HowItWorks } from '../../components/save/HowItWorks';
import { ProgressCard } from '../../components/save/ProgressCard';
import { HeroSection } from '../hero-section/HeroSection';
import { FeatureSection } from '../feature-section/FeatureSection';
import { StatsRow } from '../stats-row/StatsRow';
import { TestimonialSection } from '../testimonial-section/TestimonialSection';
import { CTASection } from '../cta-section/CTASection';
import { Footer } from '../footer/Footer';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Logo } from '../logo/Logo';
import {
  SaveFeatures,
  SaveFooter,
  SaveStats,
  SaveTestimonials,
} from '../../mocks/save.mock';

export function SavePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroSection
        eyebrow="Goal-based savings"
        heading={
          <>
            Every dollar has
            <br />a destination
          </>
        }
        subheading="Automate your savings with round-ups and scheduled transfers. Watch your goals grow with beautiful, visual progress tracking."
        backgroundImage={`${import.meta.env.BASE_URL}images/IMG-SAVE-01.png`}
        actions={<Button>Create Your First Goal</Button>}
      >
        <div className="relative" style={{ minHeight: 380 }}>
          <div className="absolute top-0 left-0 w-[280px] sm:w-[300px] z-10 shadow-xl -rotate-2">
            <ProgressCard
              goalName="Trip to Japan"
              targetAmount="$4,500"
              currentAmount="$3,015"
              percentage={67}
            />
          </div>
          <div className="absolute top-28 left-16 sm:left-24 w-[280px] sm:w-[300px] z-20 shadow-xl rotate-1">
            <ProgressCard
              goalName="Emergency Fund"
              targetAmount="$10,000"
              currentAmount="$4,300"
              percentage={43}
            />
          </div>
          <div className="absolute top-56 left-8 sm:left-12 w-[280px] sm:w-[300px] z-30 shadow-2xl -rotate-1">
            <ProgressCard
              goalName="New Laptop"
              targetAmount="$2,200"
              currentAmount="$1,958"
              percentage={89}
            />
          </div>
        </div>
      </HeroSection>

      <HowItWorks />

      <FeatureSection
        subtitle="Saving, your way"
        heading="Tools that fit your life"
      >
        <div className="mb-12 rounded-xl overflow-hidden max-h-[200px] relative">
          <img
            src={`${import.meta.env.BASE_URL}images/IMG-SAVE-02.png`}
            alt="Travel destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SaveFeatures.map((f, i) => (
            <Card
              key={f.title}
              variant="top"
              interactive
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center bg-muted">
                <f.icon
                  size={22}
                  className="text-accent"
                  strokeWidth={1.5}
                />
              </div>
              <h4 className="mb-2 font-sans font-semibold text-[17px] text-foreground">
                {f.title}
              </h4>
              <p className="font-sans text-[15px] leading-[1.7] text-muted-foreground">
                {f.desc}
              </p>
            </Card>
          ))}
        </div>
      </FeatureSection>

      <StatsRow>
        {SaveStats.map((s, i) => (
          <div
            key={s.label}
            className="text-center animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <span className="block mb-2 font-mono font-medium text-accent text-[clamp(28px,4vw,40px)]">
              {s.value}
            </span>
            <span className="uppercase font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
              {s.label}
            </span>
          </div>
        ))}
      </StatsRow>

      <TestimonialSection
        subtitle="From our savers"
        heading="Real goals, real progress"
      >
        {SaveTestimonials.map((t, i) => (
          <Card
            key={t.name}
            interactive
            className="animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <p className="mb-6 font-sans text-base leading-[1.7] text-foreground italic">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-sans font-semibold text-[13px]"
                style={{ backgroundColor: t.color }}
              >
                {t.initials}
              </div>
              <div>
                <span className="block font-sans font-semibold text-sm text-foreground">
                  {t.name}
                </span>
                <span className="font-sans font-medium text-xs text-muted-foreground">
                  {t.role}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </TestimonialSection>

      <CTASection
        heading="Your first goal is waiting"
        description="No minimum amounts. No fees. Just a calm, focused way to build toward something that matters to you."
        backgroundImage={`${import.meta.env.BASE_URL}images/IMG-SAVE-03.png`}
      >
        <Button>Start Saving</Button>
      </CTASection>

      <Footer>
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <Logo unitName="save" mode="dark" className="text-[#F7F5F0]" />
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {SaveFooter.map((col) => (
              <div key={col.title}>
                <span className="block mb-4 uppercase font-sans font-medium text-[11px] tracking-[0.08em] text-[#9A9A90]">
                  {col.title}
                </span>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block mb-3 font-sans text-sm text-[#9A9A90] transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="pt-8 border-t border-[rgba(154,154,144,0.2)]">
          <span className="font-sans text-xs text-[#9A9A90]">
            &copy; 2026 Futra Financial. All rights reserved.
          </span>
        </div>
      </Footer>
    </div>
  );
}
```

- [ ] **Step 2: Verify SavePage in Storybook**

Run: `npm run storybook`

Navigate to `Pages/Futra Save`. Verify:
- All sections render identically to the previous version
- Background images load correctly
- Animations work (fade-in-up with stagger)
- BU theme colors are correct (Save green accent)
- Mobile responsive layout works (resize browser)

- [ ] **Step 3: Run build to verify no TypeScript errors**

Run: `npm run build`

Expected: Build succeeds with no type errors.

- [ ] **Step 4: Commit**

```bash
git add src/stories/save/SavePage.tsx
git commit -m "refactor: rewire SavePage to use shared template components"
```

---

## Task 8: Verify Storybook Sidebar & Final Build

- [ ] **Step 1: Verify full Storybook sidebar hierarchy**

Run: `npm run storybook`

Expected sidebar structure:
```
Atoms/
  Avatar
  Badge
  Button
  Logo
  NavLink
Molecules/
  Card
  ProcessSteps
Organisms/
  Navbar
Templates/
  CTASection
  FeatureSection
  Footer
  HeroSection
  StatsRow
  TestimonialSection
Pages/
  Futra Spend
  Futra Save
  Futra Credit
  Futra Plan
  Futra Together
```

- [ ] **Step 2: Verify production build**

Run: `npm run build && npm run build-storybook`

Expected: Both builds succeed with no errors.

- [ ] **Step 3: Final commit**

If any fixes were needed, commit them:
```bash
git commit -m "fix: resolve build issues from template migration"
```
