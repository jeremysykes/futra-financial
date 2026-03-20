# Futra Save — Landing Page Design

## Product Identity

**Futra Save** is the goal-based savings surface of Futra Financial — a consumer neobank. Users name their savings goals, set targets and timelines, and automate contributions through round-ups or scheduled transfers. The tagline is **"Build toward something."**

**Audience:** 24–34 year olds, goal-oriented. Saving for a trip, a down payment, or an emergency fund they keep raiding. They open this app deliberately — in a planning mindset, not a checking one.

**Emotional register:** Calm, motivating, warm. The interface should feel like a journal you feel good about updating. It's the emotional opposite of a trading dashboard — no urgency, no anxiety, just steady progress. Think: the warmth of a well-kept planner meets the clarity of a progress tracker.

**Competitors:** Qapital, Marcus by Goldman Sachs — but warmer, more visual, and more emotionally connected to the act of saving.

---

## Brand System

### Wordmark

The Futra Financial wordmark is: **"FUTRA"** set in Inter Black (900 weight) with tight letter-spacing (-0.03em), with **"save"** appearing after a thin vertical bar separator in Inter Medium (500 weight), lowercase. Example rendering: **FUTRA | save**

The wordmark should appear in the Navbar and Footer. On light backgrounds, the wordmark uses Ink (#1C1C1A). On dark backgrounds, it uses Linen (#F7F5F0).

### Typography

| Role | Font | Weight | Size Range | Notes |
|------|------|--------|------------|-------|
| Headings (H1–H2) | Inter | Bold (700) | 36–56px | Slightly relaxed letter-spacing (-0.01em) |
| Headings (H3–H4) | Inter | Semibold (600) | 24–32px | Standard spacing |
| Body | Inter | Regular (400) | 16–18px | Line height 1.7 (more generous than Spend) |
| Caption/Overline | Inter | Medium (500) | 11–13px | Uppercase, wide letter-spacing (0.08em) |
| Data/Numbers | JetBrains Mono | Medium (500) | 14–32px | For monetary values, percentages, goal amounts |

Typographic personality for Save: **Relaxed, breathable, generous spacing.** More whitespace around text blocks. Headings feel aspirational rather than punchy. Body text has extra line height for a calm reading experience.

### Color System

#### Light Mode (Default)

| Token | Hex | Usage |
|-------|-----|-------|
| **Linen** | `#F7F5F0` | Page background — warm off-white |
| **Card** | `#FFFFFF` | Cards, elevated containers |
| **Grove** | `#4A7C59` | Primary accent — progress, success, growth |
| **Sage** | `#A8C5B0` | Secondary accent — softer green for fills, illustrations |
| **Mist** | `#E8F0EB` | Highlight backgrounds, subtle green tint |
| **Ink** | `#1C1C1A` | Headings, primary text |
| **Muted** | `#7A7A72` | Secondary text, captions |
| **Indigo** | `#6C6FE4` | Action color — buttons, links, interactive elements |

#### Dark Mode

| Token | Hex | Usage |
|-------|-----|-------|
| **Background** | `#1C1C1A` | Page background |
| **Surface** | `#2A2A26` | Cards, elevated containers |
| **Grove** | `#5A8C69` | Primary accent (slightly lightened for dark bg) |
| **Sage** | `#3D6B4A` | Secondary accent |
| **Mist** | `#2A3A2E` | Highlight backgrounds |
| **Primary** | `#F7F5F0` | Headings, primary text |
| **Muted** | `#9A9A90` | Secondary text |
| **Indigo** | `#6C6FE4` | Action color |

**Design note:** Light mode is the hero presentation. Lead with light mode, with dark mode as the secondary variant. Both must be fully designed.

---

## Shared Component Architecture

Build the landing page using these specific components. Each component should be clearly defined and reusable.

### Atoms
- **Button** — Variants: primary (Indigo bg, white text), secondary (Card bg, Grove border), ghost (transparent, text only), outline (Grove border). Sizes: sm, md, lg. Rounded corners (8px radius).
- **Badge** — Small pill-shaped labels. Variants: filled (Mist bg, Grove text), outline.
- **Logo** — The FUTRA | save wordmark as described above.
- **Separator** — Thin horizontal rule, uses Muted color at 20% opacity.
- **Text** — Typographic scale following the table above.

### Molecules
- **NavItem** — Text link with hover underline animation. Active state uses Grove.
- **FeatureCard** — Icon (top) + Heading (H4) + Description (body text). Card background with subtle border. Rounded corners (12px). Icons should use Grove color.
- **StatCard** — Large data number (JetBrains Mono, 32px+) + label beneath (caption). Minimal, clean.
- **TestimonialCard** — Quote text (italic body) + avatar circle (40px) + name (semibold) + role/context (caption, muted).
- **ProgressCard** — A goal name + target amount + current amount + visual progress bar (Grove fill on Mist track). Rounded progress bar. Percentage label. This is a signature component for Save.
- **CTABlock** — Heading + short description + Button. Centered or left-aligned.
- **StepCard** — Step number (large, Grove color) + heading + description. Used in "How it works" sections.

### Organisms
- **Navbar** — Logo left, NavItems center, CTA Button right. Sticky on scroll. Transparent over hero, Card bg on scroll. Height: 64px.
- **Hero** — Full-viewport section. Heading (H1) + subheading (body) + CTA Button + visual element showing savings goals with progress rings or progress bars. Linen background with Mist accents.
- **HowItWorks** — Section heading (overline + H2) + 3 StepCards in a row. Connected by a subtle line or dotted path between steps.
- **FeatureSection** — Section heading (overline + H2) + grid of 3–4 FeatureCards.
- **StatsRow** — 3–4 StatCards in a horizontal row.
- **TestimonialSection** — Section heading + 2–3 TestimonialCards.
- **CTASection** — Full-width section with CTABlock centered. Background uses a soft Grove-to-Sage gradient or Mist solid.
- **Footer** — Logo + navigation links in columns + legal text (caption). Ink background (dark) in light mode.

---

## Page Structure

Design the landing page with these sections in order:

### 1. Navbar
Sticky navigation. FUTRA | save logo. Links: How It Works, Features, Goals. CTA button: "Start Saving" (primary, sm).

### 2. Hero Section
**Headline:** An aspirational statement about building toward your goals (write compelling copy — warm, motivating, not corporate).
**Subheadline:** One sentence about automated savings, round-ups, and visual progress.
**CTA:** "Create Your First Goal" button (primary, lg).
**Visual:** A cluster of 3 ProgressCards showing different goals (e.g., "Trip to Japan" at 67%, "Emergency Fund" at 43%, "New Laptop" at 89%). Show realistic goal names, dollar amounts in JetBrains Mono, and Grove-colored progress bars. Arrange them in a slightly overlapping, organic layout — not a rigid grid.

### 3. How It Works
**Overline:** "THREE STEPS TO START"
3 step cards:
1. **Name your goal** — Set a target amount and a timeline that works for you.
2. **Automate it** — Round-ups, scheduled transfers, or manual deposits. Your choice.
3. **Watch it grow** — Visual progress tracking that keeps you motivated.

### 4. Feature Section
**Overline:** "SAVING, YOUR WAY"
3–4 feature cards covering:
- Visual goal tracking with progress rings
- Smart round-ups on every purchase
- Scheduled automatic transfers
- Milestone celebrations and streak tracking

Each card gets an icon (use organic, rounded line icons — leaves, circles, growth metaphors), a heading, and a 1–2 sentence description.

### 5. Stats Row
3–4 stats about savings impact. Examples: average monthly savings increase, goals completed, total saved by users, active savers. Numbers in JetBrains Mono.

### 6. Testimonial Section
2–3 testimonial cards from fictional users. Quotes should reflect the 24–34 demographic — referencing specific goals (first home, travel, emergency fund), the satisfaction of automation, seeing progress visually.

### 7. CTA Section
Full-width section with Mist or soft gradient background. Headline: something about starting your first goal today. Subheadline: one sentence about no minimum amounts. Primary button: "Start Saving."

### 8. Footer
FUTRA | save logo. Link columns: Product (Features, Goals, Round-Ups), Company (About, Careers, Press), Legal (Privacy, Terms). Copyright line at bottom.

---

## Responsive Requirements

**Mobile-first.** Design for 375px width first, then scale up to 768px (tablet), 1024px, and 1440px (desktop).

- Navbar: hamburger menu on mobile, full links on desktop
- Hero: stacked layout on mobile (text above, goals visual below), side-by-side on desktop
- How It Works: stacked vertically on mobile, horizontal row on desktop
- Feature cards: single column on mobile, 2-column on tablet, 3–4 column on desktop
- Stats: 2x2 grid on mobile, single row on desktop
- Testimonials: single column on mobile, row on desktop

---

## Design Direction

- **Light mode is the star.** The visual identity leads with warmth and calm.
- The background is Linen (#F7F5F0), NOT pure white. This warm off-white is the foundation of Save's identity.
- Green (Grove/Sage) is used for progress, growth, and accent — never for buttons. Buttons always use Indigo.
- Progress bars use Grove fill on Mist track. Never use red or amber for incomplete progress — percentage fill alone communicates momentum.
- Card borders are very subtle — 1px, Sage at 15% opacity. Cards have soft shadows (0 2px 8px rgba(0,0,0,0.04)).
- Generous whitespace throughout — more than you think is necessary. Let the design breathe.
- Icons should feel organic and rounded, not geometric or sharp.
- No harsh contrasts. The darkest element in light mode is Ink (#1C1C1A) for headings.
- The overall feeling should be: **calm, motivating, warm, trustworthy, aspirational.**

Design both light mode and dark mode versions of the complete page.
