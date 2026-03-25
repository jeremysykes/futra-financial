# Futra Credit — Landing Page Design

## Product Identity

**Futra Credit** is the credit monitoring and debt management surface of Futra Financial — a consumer neobank. It's a credit score monitor, credit card manager, and debt payoff planner in one. The tagline is **"Know where you stand."**

**Audience:** 23–35 year olds, building or repairing credit. Applying for apartments, car loans, or their first credit card with a real limit. They open this product with their stomach slightly knotted.

**Emotional register:** Clinical but not cold. Precise, calm, reassuring. The design must carry psychological weight carefully — a poorly chosen red can make a "fair" score feel catastrophic. The UI uses neutral architectural language: **no red for bad, no green for good.** Status is communicated through structure and labels, not color. Think: a well-designed health app that gives you clarity without panic.

**Competitors:** Credit Karma, Experian — less anxiety-inducing, more actionable, and more dignified in its visual language.

---

## Brand System

### Wordmark

The Futra Financial wordmark is: **"FUTRA"** set in Inter Black (900 weight) with tight letter-spacing (-0.03em), with **"credit"** appearing after a thin vertical bar separator in Inter Medium (500 weight), lowercase. Example rendering: **FUTRA | credit**

The wordmark should appear in the Navbar and Footer. On light backgrounds, the wordmark uses Midnight (#1A1830). On dark backgrounds, it uses Iris White (#F9F7FF).

### Typography

| Role             | Font           | Weight         | Size Range | Notes                                           |
| ---------------- | -------------- | -------------- | ---------- | ----------------------------------------------- |
| Headings (H1–H2) | Inter          | Bold (700)     | 36–56px    | Clean letter-spacing (-0.01em)                  |
| Headings (H3–H4) | Inter          | Semibold (600) | 24–32px    | Standard spacing                                |
| Body             | Inter          | Regular (400)  | 16–18px    | Line height 1.7 (generous for readability)      |
| Caption/Overline | Inter          | Medium (500)   | 11–13px    | Uppercase, wide letter-spacing (0.08em)         |
| Data/Numbers     | JetBrains Mono | Medium (500)   | 14–48px    | For credit scores, monetary values, percentages |
| Score Display    | JetBrains Mono | Bold (700)     | 48–72px    | Large score number — the signature element      |

Typographic personality for Credit: **Precise, medium-weight, generous line heights.** Clinical clarity without coldness. Headings are confident but not aggressive. Data typography is prominent and trustworthy.

### Color System

#### Light Mode (Default)

| Token          | Hex       | Usage                                                |
| -------------- | --------- | ---------------------------------------------------- |
| **Iris White** | `#F9F7FF` | Page background — faint lavender tint                |
| **Lavender**   | `#EEEAFF` | Secondary surfaces, highlight areas                  |
| **Indigo**     | `#6C6FE4` | Primary action color — buttons, links, active states |
| **Slate**      | `#9896C8` | Secondary accent, supporting elements                |
| **Amber**      | `#E8A838` | Caution states ONLY — never for decoration           |
| **Midnight**   | `#1A1830` | Headings, primary text                               |
| **Muted**      | `#6B6880` | Secondary text, captions                             |
| **Periwinkle** | `#D4D2EE` | Borders, subtle fills, dividers                      |

#### Dark Mode

| Token          | Hex       | Usage                      |
| -------------- | --------- | -------------------------- |
| **Background** | `#1A1830` | Page background (Midnight) |
| **Surface**    | `#252340` | Cards, elevated containers |
| **Indigo**     | `#6C6FE4` | Primary action color       |
| **Slate**      | `#7B79B0` | Secondary accent           |
| **Amber**      | `#E8A838` | Caution states ONLY        |
| **Primary**    | `#F9F7FF` | Headings, primary text     |
| **Muted**      | `#9896C8` | Secondary text             |
| **Periwinkle** | `#3A3860` | Borders, subtle fills      |

**Design note:** Light mode is the primary presentation, but both modes must be fully designed. This product supports both because high-stakes sessions need user control over their environment.

---

## Shared Component Architecture

Build the landing page using these specific components. Each component should be clearly defined and reusable.

### Atoms

- **Button** — Variants: primary (Indigo bg, white text), secondary (Lavender bg, Indigo text), ghost (transparent, text only), outline (Periwinkle border). Sizes: sm, md, lg. Rounded corners (8px radius).
- **Badge** — Small pill-shaped labels. Variants: filled (Lavender bg, Indigo text), outline (Periwinkle border), caution (Amber bg, Midnight text — used sparingly).
- **Logo** — The FUTRA | credit wordmark as described above.
- **Separator** — Thin horizontal rule, uses Periwinkle at 40% opacity.
- **Text** — Typographic scale following the table above.

### Molecules

- **NavItem** — Text link with hover underline animation. Active state uses Indigo.
- **FeatureCard** — Icon (top) + Heading (H4) + Description (body text). Card background with Periwinkle border. Rounded corners (12px). Icons should use Indigo or Slate color.
- **StatCard** — Large data number (JetBrains Mono, 32px+) + label beneath (caption). Minimal, precise.
- **TestimonialCard** — Quote text (italic body) + avatar circle (40px) + name (semibold) + role/context (caption, muted).
- **ScoreDisplay** — A large credit score number (JetBrains Mono, 48–72px) centered inside a circular arc or ring gauge. The gauge uses Indigo for the fill and Periwinkle for the track. No red/green — the score speaks for itself through the number and label ("Fair", "Good", "Excellent"). This is the signature component for Credit.
- **CTABlock** — Heading + short description + Button. Centered or left-aligned.
- **FAQItem** — Question (H4, semibold) + expandable answer (body text). Chevron indicator for expand/collapse state.

### Organisms

- **Navbar** — Logo left, NavItems center, CTA Button right. Sticky on scroll. Transparent over hero, white/surface bg on scroll. Height: 64px.
- **Hero** — Full-viewport section. Heading (H1) + subheading (body) + CTA Button + ScoreDisplay visual element. Clean, centered composition with the score gauge as the focal point.
- **TrustSection** — A row of trust signals: "Bank-level encryption", "No impact on your score", "Free forever". Small icons + text. Periwinkle dividers between items.
- **FeatureSection** — Section heading (overline + H2) + grid of 3–4 FeatureCards.
- **FAQSection** — Section heading (overline + H2) + 4–6 FAQItems stacked vertically. Clean, minimal expand/collapse.
- **CTASection** — Full-width section with CTABlock centered. Subtle Lavender background.
- **Footer** — Logo + navigation links in columns + legal text (caption).

---

## Page Structure

Design the landing page with these sections in order:

### 1. Navbar

Sticky navigation. FUTRA | credit logo. Links: Features, How It Works, FAQ. CTA button: "Check Your Score" (primary, sm).

### 2. Hero Section

**Headline:** A reassuring, empowering statement about understanding your credit (write compelling copy — calm, clear, never alarmist).
**Subheadline:** One sentence about free credit monitoring with no score impact.
**CTA:** "See Your Score Free" button (primary, lg).
**Visual:** A ScoreDisplay component showing a score of 724 with the label "Good" beneath it. The circular gauge should be elegant, with the Indigo arc showing approximately 75% fill. Clean and centered. No distracting embellishments.

### 3. Trust Section

A horizontal row of 3–4 trust signals:

- Bank-level encryption
- No impact to your credit score
- Updated weekly
- Free forever — no hidden costs

Each with a small, minimal icon and descriptive text. This section builds confidence immediately after the hero.

### 4. Feature Section

**Overline:** "CLARITY, NOT ANXIETY"
3–4 feature cards covering:

- Real-time credit score monitoring with weekly updates
- Credit card balance tracking and payment reminders
- Debt payoff planner with multiple payoff strategies
- Score change alerts and factor breakdown

Each card gets an icon (use precise, geometric line icons — shields, charts, bell, gauge), a heading, and a 1–2 sentence description. **Remember: no red/green iconography. Use Indigo and Slate.**

### 5. FAQ Section

**Overline:** "COMMON QUESTIONS"
4–6 FAQ items covering:

- Does checking my score affect it?
- How often is my score updated?
- What score model do you use?
- Is my data secure?
- Is Futra Credit really free?

Clean accordion-style layout. Question in semibold, answer in regular weight with generous line height.

### 6. CTA Section

Full-width Lavender background. Headline: something about taking the first step toward credit clarity. Subheadline: one reassuring sentence. Primary button: "Get Started Free."

### 7. Footer

FUTRA | credit logo. Link columns: Product (Features, Score Factors, Debt Payoff), Company (About, Careers, Press), Legal (Privacy, Terms, Security). Copyright line at bottom.

---

## Responsive Requirements

**Mobile-first.** Design for 375px width first, then scale up to 768px (tablet), 1024px, and 1440px (desktop).

- Navbar: hamburger menu on mobile, full links on desktop
- Hero: stacked layout on mobile (text above, score display below), side-by-side on desktop
- Trust section: stacked vertically on mobile, horizontal row on desktop
- Feature cards: single column on mobile, 2-column on tablet, 3–4 column on desktop
- FAQ: full-width on all breakpoints
- Testimonials: single column on mobile, row on desktop

---

## Design Direction

- **The most important rule: NO RED, NO GREEN for status indication.** This is a deliberate product decision. This demographic carries financial anxiety, and the color system must not amplify it. Use Indigo for positive actions, Amber sparingly for caution only, and structure/labels for everything else.
- The background is Iris White (#F9F7FF), NOT pure white. The faint lavender tint is the foundation of Credit's identity — it reads clinical but warm.
- Lavender (#EEEAFF) is used for secondary surfaces and highlighted areas, creating subtle depth without heavy shadows.
- The ScoreDisplay is the centerpiece — it should feel like the most polished, precise element on the page.
- Card borders use Periwinkle — visible but soft. Cards have minimal shadow (0 1px 4px rgba(26,24,48,0.06)).
- Generous whitespace throughout. The design should feel spacious and unhurried.
- Icons should be precise and geometric — shields, gauges, charts. Not playful or organic.
- The overall feeling should be: **calm, precise, trustworthy, clinical but humane, empowering.**

Design both light mode and dark mode versions of the complete page.
