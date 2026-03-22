# Futra Financial — Design Audit Round 2

**Date:** 2026-03-20
**Context:** Post Phase 1 (visual differentiation), Phase 3 (motion), and image integration

---

## Progress Since Round 1

| Category               | Round 1                       | Round 2                                                                                            | Change                  |
| ---------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------- |
| Visual Distinctiveness | Critical — 4/5 look identical | Improved — each BU now has visible accent colors, tinted sections, unique card treatments          | Significant improvement |
| Color Token Usage      | Critical — dormant            | Improved — accent colors in card borders, section tints, stat numbers                              | Good progress           |
| Imagery                | Critical — none               | Resolved — 15 images integrated (hero bgs, feature accents, section textures)                      | Major improvement       |
| Layout Patterns        | High — cookie-cutter          | Partially improved — some section differentiation, but core grid patterns still shared             | Minor improvement       |
| Section Backgrounds    | High — flat                   | Improved — gradient overlays, image textures, tinted sections                                      | Good progress           |
| Animation / Motion     | High — none                   | Improved — fade-in-up entrance animations, card hover lifts, score gauge animation                 | Good progress           |
| Card Styles            | Medium — identical            | Improved — Spend has indigo left borders, Save has green top borders, Plan has indigo left borders | Good progress           |
| Typography             | Medium — uniform              | Unchanged — still using Inter/JetBrains Mono identically across all BUs                            | No change               |

---

## Current State Per BU

### Spend (Dark default)

**What's working:**

- PhoneMockup now has solid bg-surface background — looks like a real device
- Indigo left border on feature cards creates visual distinction
- Hero background image (urban night scene) adds atmosphere
- Feature accent strip image (contactless payment) is high quality and relevant
- Testimonial section has subtle texture background
- CTA gradient (indigo) is bold and distinct
- Card hover lift animations work well

**Issues found:**

- Light mode: the indigo-tinted stats section background (`rgba(108,111,228,0.04)`) is barely visible — needs to be stronger
- Light mode: the PhoneMockup looks good with solid white but the border is very faint — could benefit from a subtle shadow
- The feature accent image strip sits between the heading and cards with no transition — feels abrupt. Could use rounded corners and a subtle caption/label
- Footer in light mode uses `bg-background` which makes it blend with the page — should be dark like all other BU footers

**Severity:** Medium fixes

---

### Save (Light default)

**What's working:**

- Green-tinted HowItWorks section (`bg-muted/50`) is visible and distinctive
- Grove green top border on feature cards is a nice touch
- Green stat numbers make the StatsRow feel distinct from other BUs
- Hero background image (journal/planner) sets the right calm mood
- Feature accent strip (coastal travel scene) is beautiful and aspirational
- CTA has a green-tinted gradient — appropriate
- ProgressCards with animated bar fill are the strongest signature element

**Issues found:**

- The feature accent strip image (travel coastline) is gorgeous but has no context — a subtle label like "What you're saving for" would connect it to the product narrative
- The ProgressCards in the hero overlap nicely but the cards themselves are flat white — a subtle shadow or slight rotation would add depth and make them feel more dynamic
- Dark mode: the green tints wash out and become very subtle — the section differentiation that works in light mode disappears in dark

**Severity:** Low-medium fixes

---

### Credit (Light default)

**What's working:**

- ScoreDisplay with animated gauge fill is polished and eye-catching — the best signature element across all BUs
- Lavender gradient on feature section (`from-background to-secondary/30`) creates subtle depth
- Lavender-tinted trust section background works
- FAQ items highlight in `text-primary` when open — nice interactive touch
- CTA lavender gradient is cohesive
- Trust section is unique to Credit (no other BU has this section type)

**Issues found:**

- The trust section image (architecture, at 5% opacity) is essentially invisible — either increase opacity or remove it
- Feature cards lack any accent treatment — no border accent like Spend/Save/Plan. They blend into the gradient background
- The score display has "724 GOOD" but would benefit from a subtle descriptive caption below it explaining what range "Good" falls in
- Dark mode: the lavender identity disappears almost entirely. The page looks generic dark rather than distinctly Credit. The secondary/lavender tokens need to be more visible in dark mode

**Severity:** Medium fixes

---

### Plan (Dark default)

**What's working:**

- DashboardPreview with recharts is the most impressive hero visual of all BUs — genuinely looks like a product screenshot
- FeatureDeepDive alternating layout with real charts (area, bar, line) is unique and data-rich
- ComparisonSection with highlighted Plan column (bg-primary/5) works well
- Three-color data vocabulary (Indigo/Teal/Amber) is used consistently in charts
- Stat cards with indigo left border and teal trend arrows are distinctive
- Plan has the most unique page structure (no other BU has FeatureDeepDive or ComparisonSection)
- Background textures (data viz, night sky) add appropriate atmosphere

**Issues found:**

- The hero background image (desk with laptop) at 12% opacity is nice but competes slightly with the DashboardPreview — consider reducing to 8% or removing it since the DashboardPreview IS the hero visual
- Light mode: the deep blue identity completely vanishes. Plan in light mode looks like a generic white page with some charts. The three-tier dark background system (Abyss → Deep → Surface) that defines Plan has no equivalent in light mode
- FeatureDeepDive chart sections could benefit from subtle grid line patterns in the background (reinforcing the analytical theme)
- The "34" retirement runway number is impactful in the chart section but could use more visual emphasis — perhaps a larger font or a decorative ring around it

**Severity:** Low-medium fixes (light mode is the bigger concern)

---

### Together (Light default)

**What's working:**

- Terracotta accent usage is STILL the strongest of any BU — "fairly" in the headline, step numbers, split bars, avatar borders
- SplitDisplay dual-color bars are the most distinctive signature element for communicating the product concept
- Paired avatars create instant recognition that this is a two-person product
- Warm White (#FFF9F5) background is noticeably different from other BUs' backgrounds
- Feature accent strip (couple with groceries) is warm and lifestyle-appropriate
- SplitShowcase section with 3 different split scenarios (50/50, 60/40, 100%) clearly demonstrates the product
- Rounded corners (14px) give Together a softer feel than other BUs

**Issues found:**

- The hero section has a lot of white space between the "Start Sharing" button and the bottom of the viewport — the visual elements (avatars, split display, goal card) could be larger or more prominently placed
- Feature cards all have the same icon container background (`bg-secondary`) with alternating Terracotta/Indigo icons — the alternation is good but the icon containers themselves look identical
- Dark mode: the warm Terracotta identity holds up better than other BUs' accents in dark mode, but the warm background tone (#1C1A18) is very similar to Spend's dark (#0F0F12) — they could be confused
- The CTA section uses `bg-secondary` (Blush) which is warm and distinctive in light mode but becomes generic dark in dark mode

**Severity:** Low fixes — Together is the most polished BU

---

## Cross-BU Issues

### 1. Dark Mode Identity Loss (High)

The biggest remaining issue: **every BU except Together loses its visual identity in dark mode.** In light mode, the background tints (Linen, Iris White, Warm White) and accent colors are visible. In dark mode, all BUs converge to "dark background with indigo buttons" — visually indistinguishable.

**Fix needed:** Each BU's dark mode needs stronger accent color presence:

- Save dark: green-tinted card borders, green section backgrounds at higher opacity
- Credit dark: lavender-tinted section backgrounds, visible Periwinkle borders
- Plan dark: already strong (three-tier dark backgrounds work), but stat cards need more teal/indigo presence

### 2. Feature Accent Strip Treatment (Medium)

Three BUs (Spend, Save, Together) have feature accent image strips between section headings and card grids. These images sit abruptly with no context. They need:

- A subtle caption or label
- Consistent max-height treatment
- Possibly a gradient overlay to blend with the section background

### 3. Footer Consistency (Low)

Spend's footer in light mode uses `bg-background` (light) instead of being always-dark like the other 4 BUs. This should be fixed.

### 4. Typography Remains Uniform (Medium)

All 5 BUs still use identical Inter/JetBrains Mono typography with the same weights, sizes, and spacing. This is the biggest unopened opportunity. Even small changes — like different heading weights, letter-spacing adjustments, or overline treatments — would help differentiate.

### 5. Animation Stagger Needs Scroll Trigger (Low)

The `animate-fade-in-up` entrance animations play on page load, not on scroll. Cards below the fold animate before the user sees them, wasting the effect. An Intersection Observer would make these scroll-triggered.

---

## Recommendations — Priority Order

### Must Fix (before shipping)

1. **Spend footer light mode** — change to always-dark like other BUs
2. **Credit feature cards** — add an accent border treatment (lavender left or top border)
3. **Dark mode identity** — increase accent color visibility in dark mode for Save, Credit

### Should Fix

4. **Feature accent strip polish** — add gradient overlay and optional label
5. **Credit trust section image** — increase opacity from 5% to 10-15%, or remove
6. **Plan hero image** — reduce opacity from 12% to 8% to not compete with DashboardPreview
7. **Save ProgressCard depth** — add subtle shadow or slight rotation to hero cards

### Nice to Have

8. **Scroll-triggered animations** — replace page-load animations with Intersection Observer
9. **Typography differentiation** — vary heading weights/spacing per BU
10. **Together hero visual sizing** — make the split display and avatars more prominent
