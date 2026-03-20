# Futra Financial — Design Audit & Improvement Plan

**Date:** 2026-03-20

---

## Audit Summary

| Category | Status | Severity |
|----------|--------|----------|
| Visual Distinctiveness | 4/5 BUs look similar | Critical |
| Color Token Usage | Defined but dormant in components | Critical |
| Imagery / Graphics | None across all 5 BUs | Critical |
| Layout Patterns | Cookie-cutter template | High |
| Section Backgrounds | Flat, insufficient contrast | High |
| Animation / Motion | Almost nonexistent | High |
| Typography | Uniform; no character differences | Medium |
| Card Styles | Identical formulas across BUs | Medium |
| Footer Distinctiveness | Color-based only, structure identical | Medium |

---

## What Works

- Token architecture is solid — 5 distinct palettes with full light/dark variants
- Together sets the standard for bold accent color usage (Terracotta in headlines, step numbers, split bars)
- Credit's ScoreDisplay is the most polished signature element
- Plan's recharts integration gives it genuine data credibility
- DemoSwitcher + routing + Storybook infrastructure is clean

---

## Detailed Findings

### Visual Sameness (Critical)

All 5 BUs share identical structural DNA:
- Same section order (Hero → Features/Steps → Stats → Testimonials → CTA → Footer)
- Same grid configurations (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`)
- Same card styling (`rounded-xl p-6 bg-surface border border-border`)
- Same spacing (`py-20 md:py-28`, `gap-6`, `max-w-[1200px]`)

**Together is the exception** — it uses Terracotta aggressively in the headline ("fairly"), step numbers, split visualization, and paired avatars. This makes it the most distinctive BU. The others need to follow this pattern of bold accent usage.

### Dormant Color Tokens (Critical)

Accent colors are defined in `tailwind.css` but barely used in components:
- Spend accent (#6C6FE4) is the same as primary — no visual distinction
- Save accent (#4A7C59 Grove) appears only in small overline text and progress bars
- Credit accent (#9896C8 Slate) is nearly invisible — used for muted text
- Plan accent (#6C6FE4) is again identical to primary

**What's needed:** Accent colors used as section background tints, card borders, decorative elements, and icon highlights.

### No Imagery (Critical)

Zero photographs, illustrations, or custom graphics across all 5 BUs. Every section is text + cards + icons (Lucide). This makes all BUs feel like wireframes rather than finished products.

### Identical Card Treatments (Medium)

Every card across all BUs uses:
```
bg-surface border border-border rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]
```

The only variation is Together's `rounded-[14px]`. Border tinting per BU exists but is too subtle to notice.

### No Motion (High)

The only animations are:
- Navbar backdrop blur on scroll
- Basic `hover:bg-primary-hover transition-colors` on buttons
- Save ProgressCard `transition-all duration-700` on bar fill
- Credit FAQ chevron rotation

Missing: entrance animations, scroll-triggered reveals, animated signature elements, card hover lifts, staggered loading.

---

## Improvement Plan

### Phase 1: Visual Differentiation

Make each BU's accent color visible and bold:

| BU | Action |
|----|--------|
| **Spend** | Add indigo-tinted section backgrounds; feature cards with indigo left border accent; animate PhoneMockup transaction feed |
| **Save** | Use Grove green as section background tint for How It Works; animate progress bars on scroll; add green circular ring decoration behind goal cards |
| **Credit** | Use lavender gradient overlays on sections; add animated score gauge on page load; decorative circular elements echoing the gauge shape |
| **Plan** | Add subtle blue gradient overlays behind chart sections; animate charts on scroll into view; use teal/indigo/amber more prominently in stat cards |
| **Together** | Already strong — maintain aggressive Terracotta usage; add animated split bars on load; subtle warm texture on backgrounds |

### Phase 2: Imagery Integration

Each BU needs 3 images — see `docs/image-requirements.md` for full specifications:
- **Hero lifestyle photo** (1200x800) — establishes the emotional context
- **Feature section accent** (800x600) — reinforces the product concept
- **Section background texture** (1920x600) — adds depth and atmosphere

### Phase 3: Motion & Polish

- Entrance animations: fade-up on scroll for cards and sections (use Intersection Observer)
- Animated signature elements: progress bar fills, chart draws, score gauge sweeps on first view
- Card hover states: subtle lift (`hover:-translate-y-1 hover:shadow-lg transition-all`)
- Staggered loading: cards animate in sequence with `animation-delay`

### Phase 4: Layout Distinctiveness

- Vary section ordering per BU (not all need Hero → Features → Stats → Testimonials → CTA)
- Use different grid configurations: 2-col asymmetric for Credit (trust-focused), 3-col for Save (goal cards), full-width for Plan (data density)
- Introduce full-bleed accent-colored sections unique to each BU
- Consider different max-widths per BU personality (Plan already uses 1280px vs 1200px)

---

## Per-BU Recommendations

### Spend
- Most generic currently — could be any fintech landing page
- Needs: animated transaction feed in PhoneMockup, indigo section tints, urban lifestyle imagery
- PhoneMockup should feel like a real app screenshot, not a wireframe

### Save
- Grove green is completely buried despite being the defining color
- Needs: green-tinted section backgrounds, animated progress bars, growth/nature imagery
- ProgressCard needs depth (subtle shadow, slight perspective)

### Credit
- ScoreDisplay is strong but the rest of the page is flat lavender
- Needs: animated gauge on load, lavender gradients on sections, trust/confidence imagery
- FAQ accordion could use lavender accent highlights

### Plan
- Charts are the strongest feature but surrounding sections are flat
- Needs: chart entrance animations, blue gradient section backgrounds, data visualization imagery
- ComparisonSection could use a highlighted column for "Futra Plan"

### Together
- Best-in-class for accent color usage — the benchmark for other BUs
- Needs: animated split bar fills, warm texture backgrounds, couple/domestic imagery
- Already has the strongest emotional connection through paired avatars and warm tones
