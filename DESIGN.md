# FUTRA FINANCIAL — Design System & Visual Identity Guide

---

## Brand Foundation

### Typography

| Role | Font | Weight | Tailwind | Notes |
|------|------|--------|----------|-------|
| Headings H1–H2 | Inter | Bold (700) | `font-sans font-bold` | Tight tracking (-0.01em to -0.02em) |
| Headings H3–H4 | Inter | Semibold (600) | `font-sans font-semibold` | Standard spacing |
| Body | Inter | Regular (400) | `font-sans` | Line height 1.6–1.7 |
| Captions/Overlines | Inter | Medium (500) | `font-sans font-medium` | Uppercase, tracking 0.08em |
| Data/Numbers | JetBrains Mono | Medium (500) | `font-mono font-medium` | Monetary values, scores, percentages |

**Rules:**
- Use `font-sans` and `font-mono` Tailwind classes — never inline `fontFamily` styles
- All fonts loaded via `src/index.css`

### Universal Action Color

**Indigo `#6C6FE4`** is the primary action color across ALL five products. Buttons, links, and interactive CTAs always use Indigo regardless of business unit.

### Token Architecture

The theme system uses CSS custom properties in `tailwind.css`, switched via `data-business-unit` attributes. Components use semantic Tailwind classes (`bg-background`, `text-foreground`, `bg-surface`, etc.) that resolve to different values per BU.

```
Primitive values → Semantic tokens → Component classes
(raw hex)         (--color-*)        (bg-background, text-accent)
```

---

## Business Unit Palettes

### Spend — "The daily driver."

**Demographic:** 22–30, urban, salaried. Glanceable, fast, dark-first.
**Emotional register:** Terminal-like precision. High contrast, zero decoration.
**Default mode:** Dark

<table>
  <tr>
    <td bgcolor="#0F0F12" align="center" width="100"><code style="color:#ffffff">#0F0F12</code><br><strong style="color:#ffffff">Void</strong></td>
    <td bgcolor="#1A1A1F" align="center" width="100"><code style="color:#ffffff">#1A1A1F</code><br><strong style="color:#ffffff">Surface</strong></td>
    <td bgcolor="#6C6FE4" align="center" width="100"><code style="color:#ffffff">#6C6FE4</code><br><strong style="color:#ffffff">Indigo</strong></td>
    <td bgcolor="#FFFFFF" align="center" width="100"><code style="color:#c9b379">#FFFFFF</code><br><strong style="color:#c9b379">Primary</strong></td>
    <td bgcolor="#8B8B9A" align="center" width="100"><code style="color:#ffffff">#8B8B9A</code><br><strong style="color:#ffffff">Muted</strong></td>
    <td bgcolor="#E4746C" align="center" width="100"><code style="color:#ffffff">#E4746C</code><br><strong style="color:#ffffff">Debit</strong></td>
    <td bgcolor="#2ABFA3" align="center" width="100"><code style="color:#ffffff">#2ABFA3</code><br><strong style="color:#ffffff">Credit</strong></td>
  </tr>
</table>

**Signature component:** PhoneMockup (transaction feed)
**Key rule:** Teal (#2ABFA3) for incoming, Coral (#E4746C) for outgoing. Never alarming.

---

### Save — "Build toward something."

**Demographic:** 24–34, goal-oriented. Planning mindset.
**Emotional register:** Calm, warm, motivating. Like a journal you feel good about updating.
**Default mode:** Light

<table>
  <tr>
    <td bgcolor="#F7F5F0" align="center" width="100"><code style="color:#c9b379">#F7F5F0</code><br><strong style="color:#c9b379">Linen</strong></td>
    <td bgcolor="#FFFFFF" align="center" width="100"><code style="color:#c9b379">#FFFFFF</code><br><strong style="color:#c9b379">Card</strong></td>
    <td bgcolor="#4A7C59" align="center" width="100"><code style="color:#ffffff">#4A7C59</code><br><strong style="color:#ffffff">Grove</strong></td>
    <td bgcolor="#A8C5B0" align="center" width="100"><code style="color:#ffffff">#A8C5B0</code><br><strong style="color:#ffffff">Sage</strong></td>
    <td bgcolor="#E8F0EB" align="center" width="100"><code style="color:#c9b379">#E8F0EB</code><br><strong style="color:#c9b379">Mist</strong></td>
    <td bgcolor="#1C1C1A" align="center" width="100"><code style="color:#ffffff">#1C1C1A</code><br><strong style="color:#ffffff">Ink</strong></td>
    <td bgcolor="#6C6FE4" align="center" width="100"><code style="color:#ffffff">#6C6FE4</code><br><strong style="color:#ffffff">Indigo</strong></td>
  </tr>
</table>

**Signature component:** ProgressCard (goal progress bars)
**Key rule:** Progress bars use Grove green fill on Mist track. Never red/amber for incomplete progress.

---

### Credit — "Know where you stand."

**Demographic:** 23–35, building or repairing credit. Financial anxiety is real.
**Emotional register:** Clinical but humane. Precise, calm, reassuring.
**Default mode:** Light

<table>
  <tr>
    <td bgcolor="#F9F7FF" align="center" width="100"><code style="color:#c9b379">#F9F7FF</code><br><strong style="color:#c9b379">Iris White</strong></td>
    <td bgcolor="#EEEAFF" align="center" width="100"><code style="color:#c9b379">#EEEAFF</code><br><strong style="color:#c9b379">Lavender</strong></td>
    <td bgcolor="#6C6FE4" align="center" width="100"><code style="color:#ffffff">#6C6FE4</code><br><strong style="color:#ffffff">Indigo</strong></td>
    <td bgcolor="#9896C8" align="center" width="100"><code style="color:#ffffff">#9896C8</code><br><strong style="color:#ffffff">Slate</strong></td>
    <td bgcolor="#E8A838" align="center" width="100"><code style="color:#ffffff">#E8A838</code><br><strong style="color:#ffffff">Amber</strong></td>
    <td bgcolor="#1A1830" align="center" width="100"><code style="color:#ffffff">#1A1830</code><br><strong style="color:#ffffff">Midnight</strong></td>
    <td bgcolor="#D4D2EE" align="center" width="100"><code style="color:#ffffff">#D4D2EE</code><br><strong style="color:#ffffff">Periwinkle</strong></td>
  </tr>
</table>

**Signature component:** ScoreDisplay (circular SVG gauge)
**CRITICAL RULE:** NO RED, NO GREEN for status indication. Structure and labels communicate status, not color.

---

### Plan — "Your money, mapped."

**Demographic:** 27–40, analytically inclined. Spreadsheet replacers.
**Emotional register:** Dense, precise, data-rich. Bloomberg terminal energy.
**Default mode:** Dark

<table>
  <tr>
    <td bgcolor="#0C1017" align="center" width="100"><code style="color:#ffffff">#0C1017</code><br><strong style="color:#ffffff">Abyss</strong></td>
    <td bgcolor="#151E2B" align="center" width="100"><code style="color:#ffffff">#151E2B</code><br><strong style="color:#ffffff">Deep</strong></td>
    <td bgcolor="#1F2D3D" align="center" width="100"><code style="color:#ffffff">#1F2D3D</code><br><strong style="color:#ffffff">Surface</strong></td>
    <td bgcolor="#6C6FE4" align="center" width="100"><code style="color:#ffffff">#6C6FE4</code><br><strong style="color:#ffffff">Indigo</strong></td>
    <td bgcolor="#2ABFA3" align="center" width="100"><code style="color:#ffffff">#2ABFA3</code><br><strong style="color:#ffffff">Teal</strong></td>
    <td bgcolor="#E8A838" align="center" width="100"><code style="color:#ffffff">#E8A838</code><br><strong style="color:#ffffff">Amber</strong></td>
    <td bgcolor="#A0AEC0" align="center" width="100"><code style="color:#ffffff">#A0AEC0</code><br><strong style="color:#ffffff">Steel</strong></td>
  </tr>
</table>

**Signature component:** DashboardPreview (recharts-powered)
**Sacrosanct rule:** Three-color data vocabulary only — Indigo (primary), Teal (positive), Amber (caution). No other colors in charts.

---

### Together — "Shared money, shared life."

**Demographic:** 25–38, cohabitating couples. Shared-screen usage.
**Emotional register:** Warm, domestic, collaborative. The only warm-neutral surface.
**Default mode:** Light

<table>
  <tr>
    <td bgcolor="#FFF9F5" align="center" width="100"><code style="color:#c9b379">#FFF9F5</code><br><strong style="color:#c9b379">Warm White</strong></td>
    <td bgcolor="#FFFFFF" align="center" width="100"><code style="color:#c9b379">#FFFFFF</code><br><strong style="color:#c9b379">Card</strong></td>
    <td bgcolor="#C4622D" align="center" width="100"><code style="color:#ffffff">#C4622D</code><br><strong style="color:#ffffff">Terracotta</strong></td>
    <td bgcolor="#6C6FE4" align="center" width="100"><code style="color:#ffffff">#6C6FE4</code><br><strong style="color:#ffffff">Indigo</strong></td>
    <td bgcolor="#F2E4DA" align="center" width="100"><code style="color:#c9b379">#F2E4DA</code><br><strong style="color:#c9b379">Blush</strong></td>
    <td bgcolor="#1C1A18" align="center" width="100"><code style="color:#ffffff">#1C1A18</code><br><strong style="color:#ffffff">Espresso</strong></td>
    <td bgcolor="#9E8E84" align="center" width="100"><code style="color:#ffffff">#9E8E84</code><br><strong style="color:#ffffff">Clay</strong></td>
  </tr>
</table>

**Signature component:** SplitDisplay (dual-color split bars)
**Key rule:** Indigo and Terracotta have equal visual weight. No warm/cool hierarchy.

---

## Design Audit Findings

### What Works
- Token architecture is solid — 5 distinct palettes, light/dark variants
- Together sets the standard for bold accent color usage
- Credit's ScoreDisplay is the most polished hero element
- Plan's recharts integration gives it genuine data credibility
- DemoSwitcher + routing infrastructure is clean

### What Needs Improvement

| Issue | Severity | Description |
|-------|----------|-------------|
| Visual sameness | Critical | 4/5 BUs look like recolored versions of the same template |
| Dormant color tokens | Critical | Accent colors defined but barely used in components |
| No imagery | Critical | Zero photos, illustrations, or custom graphics across all 5 BUs |
| Identical layouts | High | All BUs follow the same section order and grid patterns |
| No motion | High | Almost no entrance animations, scroll effects, or micro-interactions |
| Uniform typography | Medium | All BUs use identical font treatments despite different audiences |
| Identical card styles | Medium | Same `rounded-xl p-6 bg-surface border border-border` everywhere |
| Flat section backgrounds | High | Only 2 alternating backgrounds per BU; no gradients or texture |

---

## Improvement Plan

### Phase 1: Visual Differentiation (Accent Color Usage)

Make each BU's accent color visible and bold — not just in buttons but in:
- Section background tints (accent at 5-8% opacity)
- Card accent borders (left border or top border in accent color)
- Hero section decorative elements
- Overline text and section labels
- Icon container backgrounds

### Phase 2: Imagery Integration

Each BU needs photography and/or illustration to break up the text-heavy sections and create emotional connection. See **Image Requirements** below.

### Phase 3: Motion & Polish

- Entrance animations (fade-up on scroll) for cards and sections
- Animated hero elements (progress bar fills, chart draws, score gauge animates)
- Hover states for all interactive cards
- Smooth page transitions between BU routes

### Phase 4: Layout Distinctiveness

- Vary section ordering per BU (not all need the same 8-section template)
- Use different grid configurations (2-col, 3-col, asymmetric)
- Introduce full-bleed accent sections unique to each BU

---

## Image Requirements

### Spend — 3 images needed

**IMG-SPEND-01: Hero lifestyle**
- **Subject:** Young professional (22-28) glancing at their phone in an urban setting — subway, cafe, or walking. Natural, candid, not posed. Dark/evening lighting preferred.
- **Dimensions:** 1200 x 800px (landscape)
- **Placement:** Hero section, behind or alongside the PhoneMockup
- **Tone:** Fast, urban, confident. The "checking my balance at 11pm" moment.
- **Prompt:** "Candid photo of a young professional in their mid-20s casually checking their phone while walking through a dimly lit urban street at night. City lights in the background, natural and relaxed posture. Shot in a cinematic style with shallow depth of field. Cool blue and purple tones."

**IMG-SPEND-02: Feature section accent**
- **Subject:** Close-up of a hand holding a debit card, tapping a payment terminal. Modern, clean aesthetic.
- **Dimensions:** 800 x 600px (landscape)
- **Placement:** Feature section, accompanying the "Real-Time Feed" or "Card Controls" card
- **Prompt:** "Close-up macro shot of a modern matte black debit card being tapped against a contactless payment terminal. Soft bokeh background, clean minimal aesthetic. Cool indigo accent lighting. Professional product photography style."

**IMG-SPEND-03: Testimonial section background**
- **Subject:** Abstract urban texture — concrete, glass, or steel. Moody, dark, textural.
- **Dimensions:** 1920 x 600px (wide banner)
- **Placement:** Testimonial section background at low opacity
- **Prompt:** "Abstract close-up of polished dark concrete or brushed steel surface. Subtle indigo light reflection. Minimal, textural, architectural. Dark moody tone suitable as a background overlay."

---

### Save — 3 images needed

**IMG-SAVE-01: Hero lifestyle**
- **Subject:** Person (24-32) in a calm, bright space — sitting with a planner/notebook, morning light, plants visible. Goal-setting mood.
- **Dimensions:** 1200 x 800px (landscape)
- **Placement:** Hero section, behind the ProgressCards cluster
- **Tone:** Warm, intentional, calm. The "Saturday morning planning" moment.
- **Prompt:** "Warm lifestyle photo of a person in their late 20s sitting at a clean wooden desk by a sunlit window, writing in a journal or planner. Indoor plants nearby, warm natural light, soft earth tones. Calm and intentional mood. Shot with natural lighting and a warm color grade."

**IMG-SAVE-02: Savings goal visual**
- **Subject:** Travel destination or aspirational scene — a coastline, mountain view, or charming street. Represents "what you're saving for."
- **Dimensions:** 800 x 600px (landscape)
- **Placement:** Feature section or alongside ProgressCards as a goal visualization
- **Prompt:** "Beautiful coastal landscape with turquoise water and white sand, seen from a clifftop viewpoint. Golden hour lighting, warm tones. Aspirational travel photography style. Clean and bright with green foliage in the foreground."

**IMG-SAVE-03: Growth/nature texture**
- **Subject:** Close-up of leaves, growth rings in wood, or morning dew on grass. Organic, green-tinted.
- **Dimensions:** 1920 x 600px (wide banner)
- **Placement:** How It Works or CTA section background at low opacity
- **Prompt:** "Macro photography of fresh green leaves with visible veins and morning dew drops. Soft natural light, shallow depth of field. Green and cream tones matching a calm, growth-oriented aesthetic. Suitable as a subtle background texture."

---

### Credit — 3 images needed

**IMG-CREDIT-01: Hero confidence**
- **Subject:** Person (25-33) looking confident and relieved — standing in a doorway of a new apartment, or holding keys. The "I got approved" moment.
- **Dimensions:** 1200 x 800px (landscape)
- **Placement:** Hero section, alongside or behind the ScoreDisplay
- **Tone:** Calm confidence, not celebration. Relief, not excitement.
- **Prompt:** "Portrait of a young professional in their late 20s standing in the doorway of a bright, modern apartment, looking calm and confident. Holding a set of keys casually. Soft natural light from inside the apartment. Neutral, professional tones with subtle lavender/cool accents. Reassuring and composed mood."

**IMG-CREDIT-02: Trust/security visual**
- **Subject:** Abstract architectural detail — a vault door, a clean modern building facade, or security-related imagery. Clinical precision.
- **Dimensions:** 800 x 600px (landscape)
- **Placement:** Trust section or Feature section accent
- **Prompt:** "Clean architectural photograph of a modern bank or financial building interior. Geometric lines, marble or polished concrete surfaces, soft ambient lighting. Cool lavender and white tones. Precise, trustworthy, institutional but not cold. Minimal and clinical aesthetic."

**IMG-CREDIT-03: Calm texture**
- **Subject:** Abstract gradient or soft texture — fabric, frosted glass, or water surface. Lavender-tinted.
- **Dimensions:** 1920 x 600px (wide banner)
- **Placement:** FAQ or CTA section background
- **Prompt:** "Soft abstract texture of frosted glass or smooth marble surface with subtle lavender and white color tones. Gentle light diffusion, no hard edges. Calm, clinical, and sophisticated. Suitable as a low-opacity section background."

---

### Plan — 3 images needed

**IMG-PLAN-01: Analytical workspace**
- **Subject:** Overhead or angled view of a clean desk with a laptop showing charts/data, coffee, notebook. Dark/evening lighting. The "midnight planning session."
- **Dimensions:** 1200 x 800px (landscape)
- **Placement:** Hero section, behind or alongside the DashboardPreview
- **Tone:** Professional, focused, analytical. The "cup of tea and spreadsheets at midnight" moment.
- **Prompt:** "Overhead photo of a clean modern desk at night. Laptop open showing financial charts and data visualizations (blurred on screen). A cup of coffee or tea beside it. Warm desk lamp creating contrast against dark surroundings. Dark blue and indigo tones. Professional, focused, analytical atmosphere. Cinematic lighting."

**IMG-PLAN-02: Data visualization aesthetic**
- **Subject:** Abstract data visualization — flowing lines, connected nodes, or geometric grid. Dark background with indigo/teal accents.
- **Dimensions:** 800 x 600px (landscape)
- **Placement:** Feature Deep-Dive section background or accent
- **Prompt:** "Abstract data visualization artwork on a dark navy background. Flowing lines connecting data points in indigo blue (#6C6FE4) and teal (#2ABFA3). Subtle grid pattern. Geometric and precise. Bloomberg terminal meets modern data art. Clean, minimal, professional."

**IMG-PLAN-03: Long-view texture**
- **Subject:** Night sky, star trails, or long-exposure city lights. Represents long-term planning and horizon.
- **Dimensions:** 1920 x 600px (wide banner)
- **Placement:** Retirement Runway section or CTA background
- **Prompt:** "Long-exposure night sky photograph showing star trails or subtle aurora. Deep navy and dark blue tones with hints of teal. Sense of vast time horizon and steady progress. Clean and atmospheric, suitable as a section background at low opacity."

---

### Together — 3 images needed

**IMG-TOGETHER-01: Couple/roommate lifestyle**
- **Subject:** Two people (25-35) in a domestic setting — cooking together, sitting on a couch with laptops, or at a kitchen table. Warm, natural, collaborative.
- **Dimensions:** 1200 x 800px (landscape)
- **Placement:** Hero section, behind or alongside the SplitDisplay + avatars
- **Tone:** Warm, domestic, real. The "Sunday morning planning our finances together" moment.
- **Prompt:** "Warm lifestyle photo of a diverse couple or two roommates in their late 20s sitting at a kitchen table together, one with a laptop, both engaged and smiling naturally. Warm morning light from a nearby window, cozy domestic interior with plants and coffee mugs. Earth tones, terracotta and cream color palette. Genuine, collaborative, unhurried mood."

**IMG-TOGETHER-02: Shared life moment**
- **Subject:** Two people shopping together, moving into an apartment, or carrying grocery bags. Active shared moment.
- **Dimensions:** 800 x 600px (landscape)
- **Placement:** Feature section, accompanying "Shared savings goals" or "Smart bill splitting" card
- **Prompt:** "Candid photo of two young adults carrying grocery bags together on a bright sidewalk, laughing naturally. Warm sunlight, urban residential neighborhood. Casual clothing, genuine interaction. Warm earth tones with terracotta and cream accents. Lifestyle editorial style."

**IMG-TOGETHER-03: Warm texture**
- **Subject:** Warm textile — linen, natural wood grain, or terracotta tile. Domestic warmth.
- **Dimensions:** 1920 x 600px (wide banner)
- **Placement:** Split Showcase or CTA section background
- **Prompt:** "Close-up macro photograph of natural linen fabric or warm terracotta ceramic surface. Soft warm light, earth tones in cream and burnt orange. Gentle texture visible. Domestic, warm, and tactile. Suitable as a low-opacity section background."

---

## Image Specifications Summary

| ID | BU | Dimensions | Subject | Placement |
|----|-----|------------|---------|-----------|
| IMG-SPEND-01 | Spend | 1200x800 | Urban phone check, evening | Hero |
| IMG-SPEND-02 | Spend | 800x600 | Contactless card tap | Feature section |
| IMG-SPEND-03 | Spend | 1920x600 | Dark urban texture | Testimonial bg |
| IMG-SAVE-01 | Save | 1200x800 | Journal/planner, morning light | Hero |
| IMG-SAVE-02 | Save | 800x600 | Travel destination (coastline) | Feature/goal visual |
| IMG-SAVE-03 | Save | 1920x600 | Green leaves/nature texture | Section bg |
| IMG-CREDIT-01 | Credit | 1200x800 | New apartment keys, confident | Hero |
| IMG-CREDIT-02 | Credit | 800x600 | Modern architecture, clean | Trust section |
| IMG-CREDIT-03 | Credit | 1920x600 | Frosted glass, lavender tint | Section bg |
| IMG-PLAN-01 | Plan | 1200x800 | Desk with charts, night | Hero |
| IMG-PLAN-02 | Plan | 800x600 | Abstract data visualization | Feature bg |
| IMG-PLAN-03 | Plan | 1920x600 | Night sky / star trails | CTA bg |
| IMG-TOGETHER-01 | Together | 1200x800 | Couple at kitchen table | Hero |
| IMG-TOGETHER-02 | Together | 800x600 | Shared grocery shopping | Feature section |
| IMG-TOGETHER-03 | Together | 1920x600 | Linen/terracotta texture | Section bg |

**Total: 15 images (3 per business unit)**

**File naming convention:** Place in `src/assets/{bu}/` (e.g., `src/assets/spend/hero-lifestyle.jpg`)

**Format:** JPG for photos, PNG for textures/illustrations with transparency. Optimize to <200KB each.

---

## Component Patterns

### Shared Across All BUs
- **Wordmark:** `FUTRA | {unit}` — Inter Black (900) + thin bar + Inter Medium (500) lowercase
- **Buttons:** Always `bg-primary text-primary-foreground` (Indigo). Never accent color for buttons.
- **Navbars:** `fixed top-[var(--nav-top,0px)]`, scroll-aware `bg-surface/95 backdrop-blur-sm`, `max-w-[1200px]` inner container
- **Footers:** Always dark, hardcoded backgrounds (not theme-responsive)
- **Cards:** `bg-surface border border-border` with BU-tinted border colors

### BU-Specific
- **Spend:** PhoneMockup, teal/coral transaction colors
- **Save:** ProgressCard (Grove fill, Mist track), `rounded-xl` cards
- **Credit:** ScoreDisplay (SVG arc gauge), NO red/green, Amber caution only
- **Plan:** DashboardPreview (recharts), three-color data vocabulary, `max-w-[1280px]` wider layout
- **Together:** SplitDisplay (dual-color bars), paired avatars, `rounded-[14px]` warmer corners

---

*Futra Financial — Design System & Visual Identity Guide*
*Jeremy Sykes*
