# Figma UI Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Figma component library from Storybook source code using the Figma MCP Plugin API, organized for Zeroheight integration.

**Architecture:** Each task is a `use_figma` MCP call that executes Figma Plugin API JavaScript against file key `pMroF1oVmzBSUY99ZnmeIl`. Pages are created sequentially. Each component page has 5 BU frames built one at a time. Every frame and sub-element must be individually named.

**Tech Stack:** Figma Plugin API via MCP (`use_figma` tool), no local code changes.

**Spec:** `docs/superpowers/specs/2026-03-25-figma-ui-library-design.md`

---

## Shared Constants

These values are used across all tasks. The executing agent should reference these rather than hardcoding per-task.

```javascript
const FILE_KEY = 'pMroF1oVmzBSUY99ZnmeIl';

const BU_THEMES = {
  Spend: {
    mode: 'dark',
    bg: '#0F0F12',
    fg: '#FFFFFF',
    surface: '#1A1A1F',
    accent: '#6C6FE4',
    primary: '#6C6FE4',
    border: [255, 255, 255, 0.08],
    muted: '#1A1A1F',
    mutedFg: '#8B8B9A',
  },
  Save: {
    mode: 'light',
    bg: '#F7F5F0',
    fg: '#1C1C1A',
    surface: '#FFFFFF',
    accent: '#4A7C59',
    primary: '#6C6FE4',
    border: [74, 124, 89, 0.15],
    muted: '#E8F0EB',
    mutedFg: '#7A7A72',
  },
  Credit: {
    mode: 'light',
    bg: '#F9F7FF',
    fg: '#1A1830',
    surface: '#EEEAFF',
    accent: '#9896C8',
    primary: '#6C6FE4',
    border: [108, 111, 228, 0.15],
    muted: '#D4D2EE',
    mutedFg: '#6B6880',
  },
  Plan: {
    mode: 'dark',
    bg: '#0C1017',
    fg: '#E2E8F0',
    surface: '#151E2B',
    accent: '#6C6FE4',
    primary: '#6C6FE4',
    border: [255, 255, 255, 0.08],
    muted: '#1F2D3D',
    mutedFg: '#A0AEC0',
  },
  Together: {
    mode: 'light',
    bg: '#FFF9F5',
    fg: '#1C1A18',
    surface: '#FFFFFF',
    accent: '#C4622D',
    primary: '#6C6FE4',
    border: [196, 98, 45, 0.15],
    muted: '#F2E4DA',
    mutedFg: '#9E8E84',
  },
};

// Shared palette
const SHARED_COLORS = {
  indigo: '#6C6FE4',
  teal: '#2ABFA3',
  coral: '#E4746C',
  amber: '#E8A838',
  white: '#FFFFFF',
  black: '#000000',
};

// Helper: hex string to Figma RGB {r, g, b} (0-1 range)
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16) / 255,
    g: parseInt(h.substring(2, 4), 16) / 255,
    b: parseInt(h.substring(4, 6), 16) / 255,
  };
}

// Helper: create a text node with specific properties
async function createText(
  parent,
  name,
  content,
  { fontSize, fontWeight, fontFamily, fill, letterSpacing, textCase, x, y },
) {
  const text = figma.createText();
  text.name = name;
  await figma.loadFontAsync({
    family: fontFamily || 'Inter',
    style: fontWeight || 'Regular',
  });
  text.characters = content;
  text.fontSize = fontSize || 16;
  if (fill) text.fills = [{ type: 'SOLID', color: hexToRgb(fill) }];
  if (letterSpacing) text.letterSpacing = letterSpacing;
  if (textCase) text.textCase = textCase;
  if (x !== undefined) text.x = x;
  if (y !== undefined) text.y = y;
  parent.appendChild(text);
  return text;
}
```

**Important execution notes:**

- Each `use_figma` call is self-contained JS — helpers must be redefined in each call (Figma Plugin API has no persistent state between calls)
- Font loading is async — always `await figma.loadFontAsync(...)` before setting text
- Figma colors are `{r, g, b}` in 0–1 range, not 0–255
- Auto-layout is set via `layoutMode`, `itemSpacing`, `primaryAxisAlignItems`, etc.
- Frame width is set via `resize(width, height)` after enabling auto-layout

---

## Task 1: Create Pages

Create all 9 pages in the Figma file. Remove the default "Page 1" if it exists.

- [ ] **Step 1: Create all pages via `use_figma`**

Use `use_figma` with file key `pMroF1oVmzBSUY99ZnmeIl`. The code should:

1. Get existing pages and remove any default empty page
2. Create 9 pages named: "Foundations", "Button", "Badge", "Avatar", "Card", "NavLink", "Accordion", "ProgressCard", "StatItem"

- [ ] **Step 2: Verify pages were created**

Use `use_figma` to list all pages and confirm 9 exist with correct names.

---

## Task 2: Foundations — Shared Colors

Build the "Shared" color row on the Foundations page.

- [ ] **Step 1: Create shared color swatches**

On the "Foundations" page, create a frame named "Colors / Shared" with horizontal auto-layout (16px gap). Add 80×80 rounded (8px radius) rectangles for: Indigo (#6C6FE4), Teal (#2ABFA3), Coral (#E4746C), Amber (#E8A838). Each swatch is a named frame containing the rectangle + hex label + color name label (vertical auto-layout, 4px gap). Labels in Inter Regular 12px, color #717171.

---

## Task 3: Foundations — Spend Colors

- [ ] **Step 1: Create Spend color row**

Create frame "Colors / Spend" with horizontal auto-layout (16px gap). Add 80×80 rounded (8px radius) swatches for each Spend primitive from `src/tailwind.css`:

- Void (#0F0F12), Surface (#1A1A1F), Indigo (#6C6FE4), White (#FFFFFF), Muted (#8B8B9A), Debit/Coral (#E4746C), Credit/Teal (#2ABFA3)

Same swatch format as Task 2: named frame, 80×80 rect, hex label, color name. Labels in Inter Regular 12px, color #717171.

---

## Task 4: Foundations — Save Colors

- [ ] **Step 1: Create Save color row**

Create frame "Colors / Save": Linen (#F7F5F0), Card (#FFFFFF), Grove (#4A7C59), Sage (#A8C5B0), Mist (#E8F0EB), Ink (#1C1C1A), Indigo (#6C6FE4)

---

## Task 5: Foundations — Credit Colors

- [ ] **Step 1: Create Credit color row**

Create frame "Colors / Credit": Iris White (#F9F7FF), Lavender (#EEEAFF), Indigo (#6C6FE4), Slate (#9896C8), Amber (#E8A838), Midnight (#1A1830), Periwinkle (#D4D2EE)

---

## Task 6: Foundations — Plan Colors

- [ ] **Step 1: Create Plan color row**

Create frame "Colors / Plan": Abyss (#0C1017), Deep (#151E2B), Surface (#1F2D3D), Indigo (#6C6FE4), Teal (#2ABFA3), Amber (#E8A838), Steel (#A0AEC0)

---

## Task 7: Foundations — Together Colors

- [ ] **Step 1: Create Together color row**

Create frame "Colors / Together": Warm White (#FFF9F5), Card (#FFFFFF), Terracotta (#C4622D), Indigo (#6C6FE4), Blush (#F2E4DA), Espresso (#1C1A18), Clay (#9E8E84)

---

## Task 8: Foundations — Typography

- [ ] **Step 1: Create typography section**

On the Foundations page, create a frame "Typography" with vertical auto-layout (32px gap), white background (#FFFFFF). For each font weight, create a named sub-frame with the weight name, sample at 24px ("Futra Financial"), and sample at 16px ("The quick brown fox jumps over the lazy dog."):

Inter weights: Regular (400), Medium (500), Semibold (600), Bold (700), Black (900)
JetBrains Mono: Medium (500)

Each sub-frame named: "Type / Inter Regular", "Type / Inter Medium", etc.
All text in #0B0B0B (default foreground). Weight label in Inter Medium 12px #717171 uppercase.

---

## Task 9: Foundations — Logo

- [ ] **Step 1: Create logo section**

Create frame "Logo" with horizontal auto-layout (48px gap). Two sub-frames:

- "Logo / Light" — white (#FFFFFF) bg, padding 32px, "FUTRA" in Inter Black 28px, text #0F0F12
- "Logo / Dark" — #0F0F12 bg, padding 32px, "FUTRA" in Inter Black 28px, text #FFFFFF

---

## Task 10: Button — Proof of Concept

Build the Button page to validate the approach before proceeding.

- [ ] **Step 1: Create "Button / Spend" frame**

On the "Button" page, create top-level frame "Button / Spend":

- Width: 1200px, auto-layout vertical, 24px gap, padding 48px
- Background: #0F0F12 (Spend dark)

Inside, create labeled rows:

- **Row "Primary":** horizontal auto-layout, 16px gap
  - "Button / Primary / md" — frame with bg #6C6FE4, rounded 10px, padding 32px h / 12px v, text "Get Started" in Inter Semibold 16px white
  - "Button / Primary / sm" — same but padding 20px h / 8px v, text 14px
- **Row "Inverse":** horizontal auto-layout, 16px gap
  - "Button / Inverse / md" — frame with bg white, rounded 10px, padding 32px h / 12px v, text "Learn More" in Inter Semibold 16px #6C6FE4 (Spend accent)
  - "Button / Inverse / sm" — same but padding 20px h / 8px v, text 14px

Each row has a label text node ("Primary", "Inverse") in Inter Medium 12px, color #8B8B9A (Spend muted foreground), uppercase.

- [ ] **Step 2: Verify layer structure**

Use `use_figma` to traverse the "Button" page and print the full layer tree with names and types. Confirm every element has its own named layer.

- [ ] **Step 3: User review checkpoint**

Pause for user to inspect the Figma file. Confirm the layer naming, colors, and dimensions are correct before building the remaining 4 BU frames.

---

## Task 11: Button — Remaining BUs

- [ ] **Step 1: Create "Button / Save" frame**

Same structure as Spend but: bg #F7F5F0, foreground #1C1C1A, inverse text color #4A7C59 (Save accent), row labels #7A7A72.

- [ ] **Step 2: Create "Button / Credit" frame**

bg #F9F7FF, foreground #1A1830, inverse text color #9896C8 (Credit accent), row labels #6B6880.

- [ ] **Step 3: Create "Button / Plan" frame**

bg #0C1017, foreground #E2E8F0, inverse text color #6C6FE4 (Plan accent), row labels #A0AEC0.

- [ ] **Step 4: Create "Button / Together" frame**

bg #FFF9F5, foreground #1C1A18, inverse text color #C4622D (Together accent), row labels #9E8E84.

---

## Task 12: Badge — All BUs

For each BU, create a frame "Badge / {BU}" showing a grid of variants. Showing text content type only (`font-mono font-semibold` with letter initial). Icon content would require importing SVG icons; image content would require placeholder images — both can be added in a future pass.

- [ ] **Step 1: Create "Badge / Spend"**

Frame: 1200px wide, bg #0F0F12, padding 48px, vertical auto-layout 24px gap.

Rows by shape, each with 3 sizes (horizontal auto-layout, 16px gap):

- **Row "Square"**: label "Square" (Inter Medium 12px #8B8B9A uppercase), then 3 badges (sm 40×40 r0, md 56×56 r0, lg 64×64 r0), bg #1A1A1F (muted), text content "A" in JetBrains Mono Semibold, text color #FFFFFF
- **Row "Rounded"**: label + 3 badges (sm 40×40 r16, md 56×56 r16, lg 64×64 r16), bg #1A1A1F
- **Row "Circle"**: label + 3 badges (sm r=20, md r=28, lg r=32 — half of width for circle), bg #1A1A1F

Each badge is a named frame: "Badge / Square / sm", "Badge / Square / md", etc.

- [ ] **Step 2: Create "Badge / Save"**

bg #F7F5F0, muted #E8F0EB, text #1C1C1A, labels #7A7A72.

- [ ] **Step 3: Create "Badge / Credit"**

bg #F9F7FF, muted #D4D2EE, text #1A1830, labels #6B6880.

- [ ] **Step 4: Create "Badge / Plan"**

bg #0C1017, muted #1F2D3D, text #E2E8F0, labels #A0AEC0.

- [ ] **Step 5: Create "Badge / Together"**

bg #FFF9F5, muted #F2E4DA, text #1C1A18, labels #9E8E84.

---

## Task 13: Avatar — All BUs

For each BU, create "Avatar / {BU}" with a grid: 3 sizes × 3 ring variants = 9 avatars.

- [ ] **Step 1: Create "Avatar / Spend"**

Frame: 1200px, bg #0F0F12, padding 48px, vertical auto-layout 24px gap.

Rows by ring type (horizontal auto-layout, 24px gap):

- **Row "No Ring"**: label "No Ring" (Inter Medium 12px #8B8B9A uppercase), then 3 circles (40, 56, 64px), bg #1A1A1F (muted), initials "JS" in accent color #6C6FE4
- **Row "Accent Ring"**: label + same circles with 2px ring in #6C6FE4
- **Row "Primary Ring"**: label + same circles with 2px ring in #6C6FE4

Each named: "Avatar / sm / none", "Avatar / md / accent", "Avatar / lg / primary", etc.

- [ ] **Step 2: Create "Avatar / Save"**

bg #F7F5F0, muted #E8F0EB, accent ring #4A7C59, primary ring #6C6FE4, initials color #4A7C59, labels #7A7A72.

- [ ] **Step 3: Create "Avatar / Credit"**

bg #F9F7FF, muted #D4D2EE, accent ring #9896C8, primary ring #6C6FE4, initials color #9896C8, labels #6B6880.

- [ ] **Step 4: Create "Avatar / Plan"**

bg #0C1017, muted #1F2D3D, accent ring #6C6FE4, primary ring #6C6FE4, initials color #6C6FE4, labels #A0AEC0.

- [ ] **Step 5: Create "Avatar / Together"**

bg #FFF9F5, muted #F2E4DA, accent ring #C4622D, primary ring #6C6FE4, initials color #C4622D, labels #9E8E84.

---

## Task 14: Card — All BUs

For each BU, create "Card / {BU}" showing 5 accent variants.

- [ ] **Step 1: Create "Card / Spend"**

Frame: 1200px, bg #0F0F12, padding 48px. Horizontal auto-layout, 24px gap.

5 cards, each 220px wide:

- "Card / none" — bg #1A1A1F, border 1px rgba(255,255,255,0.08), radius 12px, padding 24px. Sample content: title "Card Title" Inter Semibold 16px #FFFFFF, body "Sample content for the card component." Inter Regular 14px #8B8B9A
- "Card / left" — same + 4px left border #6C6FE4
- "Card / top" — same + 2px top border #6C6FE4
- "Card / right" — same + 4px right border #6C6FE4
- "Card / bottom" — same + 2px bottom border #6C6FE4

- [ ] **Step 2: Create "Card / Save"**

surface #FFFFFF, border rgba(74,124,89,0.15), accent #4A7C59, fg #1C1C1A, mutedFg #7A7A72.

- [ ] **Step 3: Create "Card / Credit"**

surface #EEEAFF, border rgba(108,111,228,0.15), accent #9896C8, fg #1A1830, mutedFg #6B6880.

- [ ] **Step 4: Create "Card / Plan"**

surface #151E2B, border rgba(255,255,255,0.08), accent #6C6FE4, fg #E2E8F0, mutedFg #A0AEC0.

- [ ] **Step 5: Create "Card / Together"**

surface #FFFFFF, border rgba(196,98,45,0.15), accent #C4622D, fg #1C1A18, mutedFg #9E8E84.

---

## Task 15: NavLink — All BUs

For each BU, create "NavLink / {BU}" showing sm and base variants.

- [ ] **Step 1: Create "NavLink / Spend"**

Frame: 1200px, bg #0F0F12, padding 48px. Horizontal auto-layout, 32px gap.

- "NavLink / sm" — "Dashboard" in Inter Medium 14px, color #8B8B9A
- "NavLink / base" — "Dashboard" in Inter Medium 16px, color #8B8B9A

- [ ] **Step 2: Create "NavLink / Save"**

bg #F7F5F0, text #7A7A72.

- [ ] **Step 3: Create "NavLink / Credit"**

bg #F9F7FF, text #6B6880.

- [ ] **Step 4: Create "NavLink / Plan"**

bg #0C1017, text #A0AEC0.

- [ ] **Step 5: Create "NavLink / Together"**

bg #FFF9F5, text #9E8E84.

---

## Task 16: Accordion — All BUs

For each BU, show default and compact spacing, each with expanded + collapsed items.

- [ ] **Step 1: Create "Accordion / Spend"**

Frame: 1200px, bg #0F0F12, padding 48px. Two columns side by side (horizontal auto-layout, 48px gap):

**Column "Default Spacing"** (vertical, 12px gap, width 500px):

- "Item / Collapsed" — frame: border 1px rgba(255,255,255,0.08), radius 12px, padding 24px/16px. Trigger: "What is Futra?" Inter Semibold 16px #FFFFFF, chevron "▸" 18px #8B8B9A
- "Item / Expanded" — same border/radius. Trigger: text in #6C6FE4 (primary), chevron "▾" rotated. Content area below: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." Inter Regular 14px #8B8B9A, padding 24px h / 16px bottom

**Column "Compact Spacing"** (vertical, 8px gap, width 500px):

- Same two items

- [ ] **Step 2: Create "Accordion / Save"**

bg #F7F5F0, fg #1C1C1A, primary #6C6FE4, border rgba(74,124,89,0.15), mutedFg #7A7A72.

- [ ] **Step 3: Create "Accordion / Credit"**

bg #F9F7FF, fg #1A1830, primary #6C6FE4, border rgba(108,111,228,0.15), mutedFg #6B6880.

- [ ] **Step 4: Create "Accordion / Plan"**

bg #0C1017, fg #E2E8F0, primary #6C6FE4, border rgba(255,255,255,0.08), mutedFg #A0AEC0.

- [ ] **Step 5: Create "Accordion / Together"**

bg #FFF9F5, fg #1C1A18, primary #6C6FE4, border rgba(196,98,45,0.15), mutedFg #9E8E84.

---

## Task 17: ProgressCard — All BUs

For each BU, show default and compact sizes at 25%, 50%, 75%, 100% fill.

- [ ] **Step 1: Create "ProgressCard / Spend"**

Frame: 1200px, bg #0F0F12, padding 48px.

**Row "Default"** (horizontal, 16px gap):
4 cards at 25/50/75/100%, each 260px wide:

- Frame: bg #1A1A1F, border 1px rgba(255,255,255,0.08), radius 12px, padding 20px, shadow 0 2px 8px rgba(0,0,0,0.04)
- "Goal Name" row: "Vacation Fund" Inter Semibold 15px #FFFFFF + "75%" JetBrains Mono Medium 13px #6C6FE4
- Progress track: 100% width, 8px height, bg #1A1A1F (muted), radius full. Fill: 75% width, 8px height, bg #6C6FE4, radius full
- Amount row: "$3,750" JetBrains Mono Medium 14px #FFFFFF + "of $5,000" JetBrains Mono Medium 13px #8B8B9A

**Row "Compact"** (horizontal, 16px gap):
Same 4 cards but with 16px padding.

Each card named: "ProgressCard / Default / 25%", "ProgressCard / Default / 50%", etc.

- [ ] **Step 2: Create "ProgressCard / Save"**

bg #F7F5F0, surface #FFFFFF, border rgba(74,124,89,0.15), accent #4A7C59, fg #1C1C1A, muted #E8F0EB, mutedFg #7A7A72.

- [ ] **Step 3: Create "ProgressCard / Credit"**

bg #F9F7FF, surface #EEEAFF, border rgba(108,111,228,0.15), accent #9896C8, fg #1A1830, muted #D4D2EE, mutedFg #6B6880.

- [ ] **Step 4: Create "ProgressCard / Plan"**

bg #0C1017, surface #151E2B, border rgba(255,255,255,0.08), accent #6C6FE4, fg #E2E8F0, muted #1F2D3D, mutedFg #A0AEC0.

- [ ] **Step 5: Create "ProgressCard / Together"**

bg #FFF9F5, surface #FFFFFF, border rgba(196,98,45,0.15), accent #C4622D, fg #1C1A18, muted #F2E4DA, mutedFg #9E8E84.

---

## Task 18: StatItem — All BUs

For each BU, show foreground and accent value color variants.

- [ ] **Step 1: Create "StatItem / Spend"**

Frame: 1200px, bg #0F0F12, padding 48px. Horizontal auto-layout, 64px gap.

- "StatItem / accent" — center-aligned frame: "$12,450" JetBrains Mono Medium 36px #6C6FE4, below: "TOTAL BALANCE" Inter Medium 12px uppercase tracking 0.08em #8B8B9A, 8px gap
- "StatItem / foreground" — same but value color #FFFFFF

- [ ] **Step 2: Create "StatItem / Save"**

bg #F7F5F0, accent #4A7C59, fg #1C1C1A, mutedFg #7A7A72.

- [ ] **Step 3: Create "StatItem / Credit"**

bg #F9F7FF, accent #9896C8, fg #1A1830, mutedFg #6B6880.

- [ ] **Step 4: Create "StatItem / Plan"**

bg #0C1017, accent #6C6FE4, fg #E2E8F0, mutedFg #A0AEC0.

- [ ] **Step 5: Create "StatItem / Together"**

bg #FFF9F5, accent #C4622D, fg #1C1A18, mutedFg #9E8E84.

---

## Task 19: Final Review

- [ ] **Step 1: Traverse all pages and print layer tree**

Use `use_figma` to iterate every page and log the full frame hierarchy with names. Confirm no unnamed or "Frame 1"-style default names exist.

- [ ] **Step 2: User review**

Share the Figma file link with the user for final inspection before connecting to Zeroheight.
