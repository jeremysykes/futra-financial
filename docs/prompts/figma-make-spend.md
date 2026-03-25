# Futra Spend — Landing Page Design

## Product Identity

**Futra Spend** is the daily banking surface of Futra Financial — a consumer neobank. It's a real-time transaction feed, debit card controls, instant P2P transfers, and spending categorization. The tagline is **"The daily driver."**

**Audience:** 22–30 year olds, urban, salaried or gig-economy workers. They check their balance more than their email. They open the app reflexively — on the commute, in line, at 11pm wondering if a payment went through.

**Emotional register:** Fast, confident, no-nonsense. The interface draws from terminal UIs and professional audio tools — high contrast, zero decoration, total clarity at a glance. Think: the precision of a Bloomberg terminal meets the accessibility of Cash App.

**Competitors:** Cash App, Chime — but with more information density and less noise.

---

## Brand System

### Wordmark

The Futra Financial wordmark is: **"FUTRA"** set in Inter Black (900 weight) with tight letter-spacing (-0.03em), with **"spend"** appearing after a thin vertical bar separator in Inter Medium (500 weight), lowercase. Example rendering: **FUTRA | spend**

The wordmark should appear in the Navbar and Footer. On dark backgrounds, the wordmark is white. On light backgrounds, it is near-black (#1A1A1F).

### Typography

| Role             | Font           | Weight         | Size Range | Notes                                                     |
| ---------------- | -------------- | -------------- | ---------- | --------------------------------------------------------- |
| Headings (H1–H2) | Inter          | Bold (700)     | 36–56px    | Tight letter-spacing (-0.02em), uppercase optional for H1 |
| Headings (H3–H4) | Inter          | Semibold (600) | 24–32px    | Standard spacing                                          |
| Body             | Inter          | Regular (400)  | 16–18px    | Line height 1.6                                           |
| Caption/Overline | Inter          | Medium (500)   | 11–13px    | Uppercase, wide letter-spacing (0.08em)                   |
| Data/Numbers     | JetBrains Mono | Medium (500)   | 14–32px    | For monetary values, stats, metrics                       |

Typographic personality for Spend: **Tight, compact, medium-weight.** Minimal breathing room. Information-dense like a well-designed terminal. Headlines should feel punchy and direct.

### Color System

#### Dark Mode (Default)

| Token       | Hex       | Usage                                                |
| ----------- | --------- | ---------------------------------------------------- |
| **Void**    | `#0F0F12` | Page background                                      |
| **Surface** | `#1A1A1F` | Cards, elevated containers                           |
| **Indigo**  | `#6C6FE4` | Primary action color — buttons, links, active states |
| **Primary** | `#FFFFFF` | Headings, primary text                               |
| **Muted**   | `#8B8B9A` | Secondary text, captions, labels                     |
| **Debit**   | `#E4746C` | Outgoing money, expense indicators                   |
| **Credit**  | `#2ABFA3` | Incoming money, positive indicators                  |

#### Light Mode

| Token          | Hex       | Usage                      |
| -------------- | --------- | -------------------------- |
| **Background** | `#F5F5F8` | Page background            |
| **Surface**    | `#FFFFFF` | Cards, elevated containers |
| **Indigo**     | `#6C6FE4` | Primary action color       |
| **Primary**    | `#1A1A1F` | Headings, primary text     |
| **Muted**      | `#6B6B7A` | Secondary text             |
| **Debit**      | `#D4564E` | Outgoing money             |
| **Credit**     | `#1FA88E` | Incoming money             |

**Design note:** Dark mode is the hero presentation. Lead with dark mode in the design, with light mode as the secondary variant. Both must be fully designed.

---

## Shared Component Architecture

Build the landing page using these specific components. Each component should be clearly defined and reusable.

### Atoms

- **Button** — Variants: primary (Indigo bg, white text), secondary (Surface bg, border), ghost (transparent, text only), outline (border only). Sizes: sm, md, lg. Rounded corners (8px radius).
- **Badge** — Small pill-shaped labels for status or category tags. Variants: filled, outline.
- **Logo** — The FUTRA | spend wordmark as described above.
- **Separator** — Thin horizontal rule, uses Muted color at 20% opacity.
- **Text** — Typographic scale following the table above.

### Molecules

- **NavItem** — Text link with hover underline animation. Active state uses Indigo.
- **FeatureCard** — Icon (top) + Heading (H4) + Description (body text). Card background with subtle border. Rounded corners (12px).
- **StatCard** — Large data number (JetBrains Mono, 32px+) + label beneath (caption). Minimal container, no heavy borders.
- **TestimonialCard** — Quote text (italic body) + avatar circle (40px) + name (semibold) + role/context (caption, muted).
- **PhoneMockup** — A device frame (modern smartphone silhouette) containing a screenshot or UI preview. Used in hero sections.
- **CTABlock** — Heading + short description + Button. Centered or left-aligned.

### Organisms

- **Navbar** — Logo left, NavItems center, CTA Button right. Sticky on scroll. Transparent over hero, Surface bg on scroll. Height: 64px.
- **Hero** — Full-viewport section. Heading (H1) + subheading (body) + CTA Button + PhoneMockup visual on the right side. Dark gradient or solid Void background.
- **FeatureSection** — Section heading (overline + H2) + grid of 3–4 FeatureCards. Two or three columns on desktop, single column on mobile.
- **StatsRow** — 3–4 StatCards in a horizontal row. Full-width, subtle background differentiation.
- **TestimonialSection** — Section heading + 2–3 TestimonialCards in a row/carousel.
- **CTASection** — Full-width banner with CTABlock centered. Background uses Indigo or a subtle gradient.
- **Footer** — Logo + navigation links in columns + legal text (caption). Darkest background value.

---

## Page Structure

Design the landing page with these sections in order:

### 1. Navbar

Sticky navigation. FUTRA | spend logo. Links: Features, Security, Pricing. CTA button: "Get Started" (primary, sm).

### 2. Hero Section

**Headline:** A bold, short statement about instant control over your money (write compelling copy).
**Subheadline:** One sentence about real-time transactions, no fees, no friction.
**CTA:** "Open Your Account" button (primary, lg).
**Visual:** PhoneMockup on the right showing a dark-mode transaction feed with realistic-looking transactions (coffee shop, grocery store, subscription, P2P transfer). Show monetary amounts in JetBrains Mono with Debit/Credit colors.

### 3. Stats Row

4 stats communicating speed and scale. Examples: transaction speed, uptime percentage, number of users, countries supported. Use JetBrains Mono for the numbers.

### 4. Feature Section

**Overline:** "BUILT FOR YOUR DAY"
3–4 feature cards covering:

- Real-time transaction feed with smart categorization
- Instant P2P transfers with no fees
- Card controls (freeze, limits, notifications)
- Spending insights and weekly summaries

Each card gets an icon (use simple geometric/line icons), a heading, and a 1–2 sentence description.

### 5. Testimonial Section

2–3 testimonial cards from fictional users. Quotes should reflect the 22–30 demographic — casual, genuine, referencing specific features like instant notifications or the transaction feed.

### 6. CTA Section

Full-width Indigo or gradient banner. Headline: something about getting started today. Subheadline: one sentence on no minimum balance or hidden fees. Primary button: "Download the App."

### 7. Footer

FUTRA | spend logo. Link columns: Product (Features, Security, Pricing), Company (About, Careers, Press), Legal (Privacy, Terms). Copyright line at bottom.

---

## Responsive Requirements

**Mobile-first.** Design for 375px width first, then scale up to 768px (tablet), 1024px, and 1440px (desktop).

- Navbar: hamburger menu on mobile, full links on desktop
- Hero: stacked layout on mobile (text above, phone mockup below), side-by-side on desktop
- Feature cards: single column on mobile, 2-column on tablet, 3–4 column on desktop
- Stats: 2x2 grid on mobile, single row on desktop
- Testimonials: single column on mobile, row on desktop

---

## Design Direction

- **Dark mode is the star.** The entire visual identity leads with dark mode.
- No gradients except subtle ones in the hero or CTA section.
- Borders are subtle — 1px, using Muted at 15% opacity.
- Card backgrounds use Surface color, never the same as page background.
- Generous padding inside cards (24px), tighter on mobile (16px).
- All interactive elements (buttons, links) use Indigo as the action color.
- No decorative illustration. Visual interest comes from the PhoneMockup, typography hierarchy, and color contrast.
- The overall feeling should be: **fast, trustworthy, modern, effortless.**

Design both dark mode and light mode versions of the complete page.
