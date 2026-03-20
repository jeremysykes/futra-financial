# Futra Together — Landing Page Design

## Product Identity

**Futra Together** is the shared household finances surface of Futra Financial — a consumer neobank. It handles joint accounts, shared savings goals, bill tracking, and contribution management for two or more people. The tagline is **"Shared money, shared life."**

**Audience:** 25–38 year olds, cohabitating couples or roommates actively trying to stop arguing about money. They use this product collaboratively, face-to-face, often on a shared screen.

**Emotional register:** Warm, domestic, equitable. This is the only Futra surface that moves away from cool neutrals into warm territory. The warmth signals shared life, not individual financial management. Think: the comfort of a well-organized shared home meets the fairness of a transparent ledger.

**Critical design constraint:** No visual hierarchy between users. Neither person's money or contributions should feel more prominent than the other's. User attribution uses two equally weighted, visually distinct colors — Indigo for one person, Terracotta for the other — with no warm/cool implication of positive/negative.

**Competitors:** Honeydue, Splitwise — but with actual banking integration and a more grown-up visual register.

---

## Brand System

### Wordmark

The Futra Financial wordmark is: **"FUTRA"** set in Inter Black (900 weight) with tight letter-spacing (-0.03em), with **"together"** appearing after a thin vertical bar separator in Inter Medium (500 weight), lowercase. Example rendering: **FUTRA | together**

The wordmark should appear in the Navbar and Footer. On light backgrounds, the wordmark uses Espresso (#1C1A18). On dark backgrounds, it uses Warm White (#FFF9F5).

### Typography

| Role | Font | Weight | Size Range | Notes |
|------|------|--------|------------|-------|
| Headings (H1–H2) | Inter | Bold (700) | 36–56px | Slightly relaxed letter-spacing (-0.01em), warm |
| Headings (H3–H4) | Inter | Semibold (600) | 24–32px | Standard spacing |
| Body | Inter | Regular (400) | 16–18px | Line height 1.7 (generous, approachable) |
| Caption/Overline | Inter | Medium (500) | 11–13px | Uppercase, wide letter-spacing (0.08em) |
| Data/Numbers | JetBrains Mono | Medium (500) | 14–32px | For monetary values, split amounts, percentages |

Typographic personality for Together: **Warm, approachable, generous spacing.** The most relaxed typography of all Futra surfaces. Headings should feel inviting, not corporate. Body text has generous line height and comfortable reading rhythm. The feel is closer to a lifestyle product than a banking product.

### Color System

#### Light Mode (Default)

| Token | Hex | Usage |
|-------|-----|-------|
| **Warm White** | `#FFF9F5` | Page background — warm cream tint |
| **Card** | `#FFFFFF` | Cards, elevated containers |
| **Terracotta** | `#C4622D` | Primary accent — warmth, one user's attribution color |
| **Indigo** | `#6C6FE4` | Action color + second user's attribution color |
| **Blush** | `#F2E4DA` | Highlight backgrounds, soft accent fills |
| **Espresso** | `#1C1A18` | Headings, primary text |
| **Clay** | `#9E8E84` | Secondary text, captions, muted content |
| **Muted** | `#C4B8AE` | Borders, disabled states |

#### Dark Mode

| Token | Hex | Usage |
|-------|-----|-------|
| **Background** | `#1C1A18` | Page background (Espresso) |
| **Surface** | `#2A2622` | Cards, elevated containers |
| **Terracotta** | `#D4724A` | Primary accent (slightly lightened for dark bg) |
| **Indigo** | `#6C6FE4` | Action color + user attribution |
| **Blush** | `#3A322C` | Highlight backgrounds |
| **Primary** | `#FFF9F5` | Headings, primary text |
| **Clay** | `#9E8E84` | Secondary text |
| **Muted** | `#5A524C` | Borders, disabled states |

**Design note:** Light mode is the hero presentation. Together defaults to light because it's used collaboratively, face-to-face, on shared screens where warm, bright interfaces read best. Dark mode is the secondary variant. Both must be fully designed.

---

## Shared Component Architecture

Build the landing page using these specific components. Each component should be clearly defined and reusable.

### Atoms
- **Button** — Variants: primary (Indigo bg, white text), secondary (Card bg, Terracotta border), ghost (transparent, text only), outline (Terracotta or Indigo border). Sizes: sm, md, lg. Rounded corners (10px — slightly rounder than other BUs).
- **Badge** — Small pill-shaped labels. Variants: filled (Blush bg, Espresso text), terracotta (Terracotta bg, white text), indigo (Indigo bg, white text).
- **Logo** — The FUTRA | together wordmark as described above.
- **Separator** — Thin horizontal rule, uses Clay at 20% opacity.
- **Text** — Typographic scale following the table above.
- **Avatar** — Circular user avatar. Two sizes: 40px and 56px. Used in pairs for the two-user pattern.

### Molecules
- **NavItem** — Text link with hover underline animation. Active state uses Terracotta.
- **FeatureCard** — Icon (top) + Heading (H4) + Description (body text). Card background with subtle warm border. Rounded corners (14px — warmest radius). Icons use Terracotta or Indigo.
- **StatCard** — Large data number (JetBrains Mono, 32px+) + label beneath (caption). Warm styling.
- **TestimonialCard** — Quote text (italic body) + TWO avatar circles side by side (40px each) + names (semibold) + context (caption, Clay). Testimonials in Together always feature pairs, not individuals.
- **SplitDisplay** — A visual showing how an expense or goal is split between two users. Two colored bars side by side (Indigo and Terracotta) showing each person's contribution. Amounts in JetBrains Mono. The two bars should be equally weighted visually. This is the signature component for Together.
- **CTABlock** — Heading + short description + Button. Centered or left-aligned.
- **StepCard** — Step number (large, Terracotta) + heading + description. Used in "How it works" sections.

### Organisms
- **Navbar** — Logo left, NavItems center, CTA Button right. Sticky on scroll. Transparent over hero, Card bg on scroll. Height: 64px.
- **Hero** — Full-viewport section. Heading (H1) + subheading (body) + CTA Button + visual showing two users' financial connection. Warm White background.
- **HowItWorks** — Section heading (overline + H2) + 3 StepCards in a row. Connected by a subtle curved line between steps.
- **FeatureSection** — Section heading (overline + H2) + grid of 3–4 FeatureCards.
- **SplitShowcase** — A section demonstrating the split functionality. Shows 2–3 SplitDisplay components with different scenarios (rent, groceries, subscription). Emphasizes fairness and transparency.
- **TestimonialSection** — Section heading + 2–3 TestimonialCards (always featuring pairs).
- **CTASection** — Full-width section with CTABlock. Blush background.
- **Footer** — Logo + navigation links in columns + legal text (caption). Espresso background (dark) in light mode.

---

## Page Structure

Design the landing page with these sections in order:

### 1. Navbar
Sticky navigation. FUTRA | together logo. Links: How It Works, Features, Pricing. CTA button: "Get Started Together" (primary, sm).

### 2. Hero Section
**Headline:** A warm, relatable statement about managing money as a team (write compelling copy — human, conversational, not corporate. Reference the real friction of splitting bills or sharing finances).
**Subheadline:** One sentence about joint accounts, fair splits, and shared goals without the arguments.
**CTA:** "Start Sharing" button (primary, lg).
**Visual:** A composition showing:
- Two overlapping user avatars or profile circles (one with Indigo accent, one with Terracotta accent)
- A SplitDisplay showing a rent split: "Rent — $2,400" with Alex contributing $1,200 (Indigo) and Jordan contributing $1,200 (Terracotta)
- A small shared goal card showing "Weekend Getaway" at 62% progress
- Arrange these elements in an organic, slightly overlapping layout — warm and human, not rigid

### 3. How It Works
**Overline:** "SIMPLE AS IT SHOULD BE"
3 step cards:
1. **Connect your accounts** — Link your bank accounts. Both of you. Takes two minutes.
2. **Set up your splits** — Choose what's shared, how to split it, and who pays what.
3. **Live transparently** — See every shared expense, goal, and payment in real time.

### 4. Feature Section
**Overline:** "MONEY WITHOUT THE ARGUMENTS"
3–4 feature cards covering:
- Joint and individual accounts in one view
- Automatic bill splitting with customizable ratios
- Shared savings goals with dual progress tracking
- Real-time notifications for both users

Each card gets an icon (use warm, rounded icons — hands, home, heart, coins), a heading, and a 1–2 sentence description.

### 5. Split Showcase
**Overline:** "FAIR AND TRANSPARENT"
A section showing 3 SplitDisplay examples:
- **Rent** — 50/50 split, $1,200 each (Indigo and Terracotta bars, equal width)
- **Groceries** — 60/40 split, $180 and $120 (bars reflect the ratio)
- **Netflix** — One person covers, $15.99 Terracotta only

Show these as clean, horizontal split bars with amounts in JetBrains Mono. The visual equality of the two colors is essential — neither Indigo nor Terracotta should feel like it "wins."

### 6. Testimonial Section
2–3 testimonial cards from fictional couples/roommates. Quotes should reflect the 25–38 demographic — referencing the end of arguments about money, the clarity of seeing everything in one place, shared goals bringing them closer. **Each testimonial card shows two avatars and two names** (e.g., "Sarah & Mike" or "Alex & Jordan").

### 7. CTA Section
Full-width Blush (#F2E4DA) background. Headline: something about starting your shared financial journey. Subheadline: one sentence about free for both users. Primary button: "Get Started Together."

### 8. Footer
FUTRA | together logo. Link columns: Product (Features, Splits, Shared Goals), Company (About, Careers, Press), Legal (Privacy, Terms). Copyright line at bottom.

---

## Responsive Requirements

**Mobile-first.** Design for 375px width first, then scale up to 768px (tablet), 1024px, and 1440px (desktop).

- Navbar: hamburger menu on mobile, full links on desktop
- Hero: stacked layout on mobile (text above, visual below), side-by-side on desktop
- How It Works: stacked vertically on mobile, horizontal row on desktop
- Feature cards: single column on mobile, 2-column on tablet, 3–4 column on desktop
- Split showcase: stacked on mobile, horizontal arrangement on desktop
- Testimonials: single column on mobile, row on desktop

---

## Design Direction

- **Light mode is the star.** Together's identity is defined by warmth — warm whites, terracotta, and domestic comfort.
- The background is Warm White (#FFF9F5), NOT pure white. This warm cream tint is the foundation of Together's identity — the only Futra surface that moves away from cool neutrals.
- Terracotta (#C4622D) and Indigo (#6C6FE4) are the dual user-attribution colors. They must always appear with equal visual weight. Never make one larger, bolder, or more prominent than the other.
- Blush (#F2E4DA) is used for highlighted sections and soft backgrounds. It's the warmest tone in the system.
- Card corners are 14px — slightly rounder than other BUs. Everything about Together should feel a touch softer and more approachable.
- Card borders: 1px, Clay at 15% opacity. Shadows are warm-tinted (0 2px 8px rgba(28,26,24,0.05)).
- Generous whitespace. The design should feel spacious, unhurried, and inviting.
- Icons should feel warm and rounded — home, hands, hearts, coins. Not sharp or geometric.
- The SplitDisplay is the signature element. It must clearly show fairness and transparency. The two-color bar visualization is central to the product's visual identity.
- The overall feeling should be: **warm, equitable, domestic, trustworthy, grown-up, collaborative.**

Design both light mode and dark mode versions of the complete page.
