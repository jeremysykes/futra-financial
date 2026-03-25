# Futra Plan — Landing Page Design

## Product Identity

**Futra Plan** is the financial planning dashboard of Futra Financial — a consumer neobank. It's a web-first surface for net worth tracking, monthly budget vs actuals, multi-year cash flow projections, and retirement runway estimation. The tagline is **"Your money, mapped."**

**Audience:** 27–40 year olds, analytically inclined. Spreadsheet users who want a better tool. They probably have a vague retirement plan they haven't reviewed in eight months. They open this product at midnight with a cup of tea and a vague sense of dread that turns into clarity.

**Emotional register:** Dense, precise, data-rich. The interface competes directly with spreadsheets — it earns trust through density, legibility, and the quality of its data visualization. Think: Bloomberg terminal energy without the chaos. Professional, analytical, quietly powerful.

**Competitors:** Monarch Money, Copilot, YNAB — tighter visual aesthetic, better chart quality, more respect for the user's analytical intelligence.

---

## Brand System

### Wordmark

The Futra Financial wordmark is: **"FUTRA"** set in Inter Black (900 weight) with tight letter-spacing (-0.03em), with **"plan"** appearing after a thin vertical bar separator in Inter Medium (500 weight), lowercase. Example rendering: **FUTRA | plan**

The wordmark should appear in the Navbar and Footer. On dark backgrounds, the wordmark uses a light gray (#E2E8F0). On light backgrounds, it uses Abyss (#0C1017).

### Typography

| Role             | Font           | Weight         | Size Range | Notes                                             |
| ---------------- | -------------- | -------------- | ---------- | ------------------------------------------------- |
| Headings (H1–H2) | Inter          | Bold (700)     | 36–56px    | Tight letter-spacing (-0.02em), heavier presence  |
| Headings (H3–H4) | Inter          | Semibold (600) | 24–32px    | Standard spacing                                  |
| Body             | Inter          | Regular (400)  | 15–17px    | Line height 1.6                                   |
| Caption/Overline | Inter          | Medium (500)   | 11–13px    | Uppercase, wide letter-spacing (0.08em)           |
| Data/Numbers     | JetBrains Mono | Medium (500)   | 14–36px    | For all monetary values, percentages, data points |
| Chart Labels     | JetBrains Mono | Regular (400)  | 10–12px    | Axis labels, data annotations                     |

Typographic personality for Plan: **Dense, tight, information-rich.** Heavier heading weights. Tighter line heights for data areas. Monospace is used extensively — this is the most data-heavy surface. Text should feel like it belongs on a professional dashboard.

### Color System

#### Dark Mode (Default)

| Token       | Hex       | Usage                                      |
| ----------- | --------- | ------------------------------------------ |
| **Abyss**   | `#0C1017` | Page background — deepest dark             |
| **Deep**    | `#151E2B` | Card background, primary surface           |
| **Surface** | `#1F2D3D` | Elevated containers, active states         |
| **Indigo**  | `#6C6FE4` | Primary action + primary data series       |
| **Teal**    | `#2ABFA3` | Secondary data series, positive variance   |
| **Amber**   | `#E8A838` | Caution, negative variance, alerts         |
| **Primary** | `#E2E8F0` | Headings, primary text                     |
| **Steel**   | `#A0AEC0` | Secondary text, axis labels, muted content |
| **Muted**   | `#64748B` | Tertiary text, disabled states             |

#### Light Mode

| Token          | Hex       | Usage                                |
| -------------- | --------- | ------------------------------------ |
| **Background** | `#F0F4F8` | Page background                      |
| **Surface**    | `#FFFFFF` | Cards, elevated containers           |
| **Elevated**   | `#E8EDF2` | Active states, hover fills           |
| **Indigo**     | `#6C6FE4` | Primary action + primary data series |
| **Teal**       | `#1FA88E` | Secondary data, positive variance    |
| **Amber**      | `#D4962E` | Caution, negative variance           |
| **Primary**    | `#0C1017` | Headings, primary text               |
| **Steel**      | `#64748B` | Secondary text, labels               |
| **Muted**      | `#94A3B8` | Tertiary text                        |

**Design note:** Dark mode is the hero presentation. The entire visual identity of Plan leads with dark mode — deep blue-blacks that feel professional and focused. Light mode is the secondary variant for presentation contexts. Both must be fully designed.

---

## Shared Component Architecture

Build the landing page using these specific components. Each component should be clearly defined and reusable.

### Atoms

- **Button** — Variants: primary (Indigo bg, white text), secondary (Surface bg, border), ghost (transparent, text only), outline (border only). Sizes: sm, md, lg. Rounded corners (8px radius).
- **Badge** — Small pill-shaped labels. Variants: filled (Surface bg, Steel text), indigo, teal, amber.
- **Logo** — The FUTRA | plan wordmark as described above.
- **Separator** — Thin horizontal rule, uses Steel at 15% opacity.
- **Text** — Typographic scale following the table above.

### Molecules

- **NavItem** — Text link with hover underline animation. Active state uses Indigo.
- **FeatureCard** — Icon (top) + Heading (H4) + Description (body text). Deep background with subtle border. Rounded corners (12px). Icons use Indigo or Teal.
- **StatCard** — Large data number (JetBrains Mono, 32px+) + label beneath (caption) + optional trend indicator (small arrow + percentage, Teal for up, Amber for down). This is the most data-forward StatCard of all BUs.
- **TestimonialCard** — Quote text (italic body) + avatar circle (40px) + name (semibold) + role/context (caption, Steel).
- **DashboardPreview** — A stylized preview of a financial dashboard showing charts, numbers, and data tables. This is the signature visual for Plan — a detailed, realistic-looking dashboard mock showing net worth chart, budget breakdown, and cash flow projection. Uses the three-color data vocabulary (Indigo, Teal, Amber).
- **CTABlock** — Heading + short description + Button. Centered or left-aligned.
- **ComparisonRow** — A feature name + checkmark/x for Plan vs competitor columns. Used in comparison tables.

### Organisms

- **Navbar** — Logo left, NavItems center, CTA Button right. Sticky on scroll. Transparent over hero, Deep bg on scroll. Height: 64px.
- **Hero** — Full-viewport section. Heading (H1) + subheading (body) + CTA Button + DashboardPreview visual. Dark Abyss background. The dashboard preview should be the dominant visual element.
- **FeatureDeepDive** — A series of feature blocks, alternating layout (text-left/image-right, then text-right/image-left). Each block has an overline, heading, description, and a detailed chart/visualization preview. 3–4 blocks total.
- **ComparisonSection** — Section heading + comparison table with Plan vs 2–3 competitors. Clean grid layout.
- **StatsRow** — 3–4 StatCards in a horizontal row with trend indicators.
- **TestimonialSection** — Section heading + 2–3 TestimonialCards.
- **CTASection** — Full-width section with CTABlock. Indigo-tinted gradient or Surface background.
- **Footer** — Logo + navigation links in columns + legal text (caption). Abyss background.

---

## Page Structure

Design the landing page with these sections in order:

### 1. Navbar

Sticky navigation. FUTRA | plan logo. Links: Features, Compare, Pricing. CTA button: "Start Planning" (primary, sm).

### 2. Hero Section

**Headline:** A confident statement about seeing your complete financial picture (write compelling copy — analytical, empowering, not salesy).
**Subheadline:** One sentence about net worth tracking, budgets, projections, and retirement planning in one dashboard.
**CTA:** "Map Your Finances" button (primary, lg).
**Visual:** A DashboardPreview showing a realistic financial dashboard. Include:

- A line chart showing net worth over 12 months (Indigo line with Teal area fill)
- A row of key metrics: Net Worth ($184,230), Monthly Savings ($2,140), Runway (34 years) — all in JetBrains Mono
- Budget category bars partially filled
- Use the three-color data vocabulary: Indigo (primary), Teal (positive), Amber (caution)
  Make this feel like a real product screenshot, not a generic illustration.

### 3. Feature Deep-Dive

3–4 alternating feature blocks:

**Block 1 — Net Worth Tracking**
Overline: "THE BIG PICTURE"
Show a line chart with net worth over time. Indigo line, subtle grid, JetBrains Mono axis labels. Include data points and a trend annotation.

**Block 2 — Budget vs Actuals**
Overline: "WHERE IT GOES"
Show horizontal bar charts comparing budgeted vs actual spending by category. Use Indigo for budgeted, Teal for actual (under budget), Amber for actual (over budget).

**Block 3 — Cash Flow Projections**
Overline: "WHERE IT'S HEADING"
Show a projection chart with confidence bands. Indigo for projected, Teal dashed for optimistic, Steel for conservative. JetBrains Mono for all values.

**Block 4 — Retirement Runway**
Overline: "THE LONG VIEW"
Show a long-horizon chart. Large number for "Years until financial independence" in JetBrains Mono. Simple, powerful data presentation.

### 4. Comparison Section

**Overline:** "HOW PLAN COMPARES"
A clean comparison table: Futra Plan vs Monarch Money vs YNAB vs Spreadsheets. Features to compare: Net worth tracking, Multi-year projections, Retirement planning, Real-time sync, Chart quality, Dark mode. Checkmarks for Plan, mixed for others.

### 5. Stats Row

4 stats about the product's analytical power. Examples: accounts synced, data points analyzed per user, projection accuracy, average session length. JetBrains Mono for numbers, trend arrows where appropriate.

### 6. Testimonial Section

2–3 testimonial cards from fictional users. Quotes should reflect the 27–40 analytical demographic — referencing spreadsheet replacement, the quality of visualizations, the retirement planner, midnight planning sessions.

### 7. CTA Section

Full-width section with subtle Indigo gradient on Abyss background. Headline: something about replacing your spreadsheet. Subheadline: one sentence about free to start, no credit card required. Primary button: "Start Planning Free."

### 8. Footer

FUTRA | plan logo. Link columns: Product (Features, Projections, Budgets, Net Worth), Company (About, Careers, Press), Legal (Privacy, Terms, Security). Copyright line at bottom.

---

## Responsive Requirements

**Mobile-first.** Design for 375px width first, then scale up to 768px (tablet), 1024px, and 1440px (desktop).

- Navbar: hamburger menu on mobile, full links on desktop
- Hero: stacked layout on mobile (text above, dashboard preview below — simplified on mobile), side-by-side on desktop
- Feature deep-dive: stacked on mobile (text above visualization), alternating on desktop
- Comparison table: horizontal scroll on mobile, full table on desktop
- Stats: 2x2 grid on mobile, single row on desktop
- Dashboard preview: simplified/cropped on mobile, full detail on desktop
- Charts in feature blocks: simplified to key metrics on mobile, full visualization on desktop

---

## Design Direction

- **Dark mode is the star.** Plan's identity is defined by its dark mode — deep blue-blacks that feel like a professional data tool.
- The background is Abyss (#0C1017), cards use Deep (#151E2B), and elevated/active states use Surface (#1F2D3D). Three tiers of dark create depth without heavy shadows.
- **Three-color data vocabulary is sacrosanct:** Indigo for primary series/actions, Teal for positive/secondary, Amber for caution/negative. No other colors appear in charts or data.
- Steel (#A0AEC0) handles all secondary text, axis labels, and muted content. It's the workhorse neutral.
- Card borders: 1px, Steel at 10% opacity. Very subtle. Depth comes from background tiers, not borders.
- Charts should feel premium — clean grid lines (Steel at 5%), precise labels (JetBrains Mono), proper data density. Not toy charts. These compete with spreadsheets.
- The DashboardPreview in the hero is the single most important design element. It sells the product. Make it detailed, realistic, and beautiful.
- No playful illustrations. Visual interest comes from data visualizations, typography hierarchy, and the precision of the layout.
- The overall feeling should be: **analytical, powerful, precise, professional, quietly confident.**

Design both dark mode and light mode versions of the complete page.
