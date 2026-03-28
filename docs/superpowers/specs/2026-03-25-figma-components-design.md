# Convert Figma Frames to Components — Design Spec

> Convert the existing Figma UI library frames into proper Figma Components with variant properties, enabling Zeroheight import.

## Context

The Figma UI library (file key `pMroF1oVmzBSUY99ZnmeIl`) currently contains regular frames, not Figma Components. Zeroheight's Figma integration requires actual Components (created via `createComponent` / `combineAsVariants`) to import them. The existing BU showcase frames stay as visual reference.

## Key Decisions

- **BU is NOT a variant property** — it's a theme-level concern in code. Components are theme-agnostic.
- **Colors use shared BU primary (#6C6FE4)** — not the white-label default (#555555), since every BU overrides primary to Indigo.
- **No Figma Variables** — enterprise paywall blocks Variable REST API. Using literal hex values.
- **Components live on their existing pages** — each ComponentSet sits at the top of its respective page (e.g., Button ComponentSet on the Button page), above the BU showcase frames.
- **Accent simplification** — In code, `accent` varies per BU (Indigo for Spend/Plan, Grove for Save, Slate for Credit, Terracotta for Together). In these components, accent is represented as #6C6FE4 (Indigo) since the components are theme-agnostic. The per-BU accent colors are visible in the BU showcase frames below each ComponentSet.

## Color Palette

All components use these values (light background, shared Indigo primary):

| Token              | Hex     | Usage                                  |
| ------------------ | ------- | -------------------------------------- |
| primary            | #6C6FE4 | Button bg, active states               |
| primary-foreground | #FFFFFF | Text on primary bg                     |
| accent             | #6C6FE4 | Decorative highlights, accent borders  |
| foreground         | #0B0B0B | Body text, headings                    |
| surface            | #FFFFFF | Card/component backgrounds             |
| muted              | #EEEEEE | Badge bg, progress track, subtle fills |
| muted-foreground   | #717171 | Secondary text, labels, captions       |
| border             | #D7D7D7 | Card borders, accordion item borders   |

## Component Specifications

### Button — 4 variants

Properties: `Intent` (Primary, Inverse) × `Size` (sm, md)

| Variant                 | Background | Text Color | Padding   | Font Size |
| ----------------------- | ---------- | ---------- | --------- | --------- |
| Intent=Primary, Size=md | #6C6FE4    | #FFFFFF    | 32h / 12v | 16px      |
| Intent=Primary, Size=sm | #6C6FE4    | #FFFFFF    | 20h / 8v  | 14px      |
| Intent=Inverse, Size=md | #FFFFFF    | #6C6FE4    | 32h / 12v | 16px      |
| Intent=Inverse, Size=sm | #FFFFFF    | #6C6FE4    | 20h / 8v  | 14px      |

Base: rounded 10px, Inter Semi Bold, auto-layout horizontal, center-aligned. Width: hug contents.
Primary text: "Get Started". Inverse text: "Learn More".

Note: Inverse text uses `text-accent` in code, which varies per BU. Here it resolves to #6C6FE4.

### Badge — 9 variants

Properties: `Shape` (Square, Rounded, Circle) × `Size` (sm, md, lg)

| Size | Dimensions | Font Size |
| ---- | ---------- | --------- |
| sm   | 40×40      | 14px      |
| md   | 56×56      | 18px      |
| lg   | 64×64      | 22px      |

| Shape   | Corner Radius         |
| ------- | --------------------- |
| Square  | 0px                   |
| Rounded | 16px                  |
| Circle  | half width (20/28/32) |

Base: bg #EEEEEE, text "A" in JetBrains Mono Semi Bold (600) #0B0B0B, center-aligned both axes. Fixed dimensions per size.

**Content variant omitted intentionally:** The code supports `content` types (icon, text, image). Only `text` is represented here because `icon` requires importing SVG assets and `image` requires placeholder images — neither is practical via the Plugin API. The BU showcase frames show the text content type.

### Avatar — 9 variants

Properties: `Size` (sm, md, lg) × `Ring` (None, Accent, Primary)

Sizes: sm=40, md=56, lg=64. Always circular. bg #EEEEEE, initials "JS" in JetBrains Mono Medium #6C6FE4. Fixed dimensions per size.
Font sizes: sm=12px, md=16px, lg=20px.

| Ring    | Stroke               |
| ------- | -------------------- |
| None    | no stroke            |
| Accent  | 2px outside, #6C6FE4 |
| Primary | 2px outside, #6C6FE4 |

Note: Accent and Primary resolve to the same color in the shared theme. They are kept as separate variants because they map to different semantic tokens in code (`ring-accent` vs `ring-primary`) which differ per BU.

### Card — 5 variants

Properties: `Accent` (None, Left, Top, Right, Bottom)

Base: bg #FFFFFF, border 1px #D7D7D7, radius 12px, padding 24px, vertical auto-layout 12px gap. Width: 260px.
Content: "Card Title" Inter Semi Bold 16px #0B0B0B + "Sample content for the card component." Inter Regular 14px #717171.

| Accent | Border                      |
| ------ | --------------------------- |
| None   | standard 1px all sides      |
| Left   | + 4px left border #6C6FE4   |
| Top    | + 2px top border #6C6FE4    |
| Right  | + 4px right border #6C6FE4  |
| Bottom | + 2px bottom border #6C6FE4 |

Note: Accent border uses `border-*-accent` in code, which varies per BU. Here it resolves to #6C6FE4.

### NavLink — 2 variants

Properties: `Size` (sm, base)

Text: "Dashboard" in Inter Medium, color #717171. sm=14px, base=16px. Width: hug contents.

### Accordion — 4 variants

Properties: `Spacing` (Default, Compact) × `State` (Expanded, Collapsed)

Item: border 1px #D7D7D7, radius 12px. Width: 500px.
Trigger: padding 24h/16v, Inter Semi Bold 16px. Collapsed: #0B0B0B. Expanded: #6C6FE4 (maps to `text-primary` in code).
Chevron: 18px, #717171. ▶ collapsed, ▼ expanded.
Content (expanded only): Inter Regular 14px #717171, padding 24h/16v bottom.
Sample: trigger "What is Futra?", content "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

Each variant shows 2 accordion items stacked. For `State=Expanded`, item 1 is expanded and item 2 is collapsed, showing both states. For `State=Collapsed`, both items are collapsed.

- Default spacing: 12px gap
- Compact spacing: 8px gap

### ProgressCard — 2 variants

Properties: `Size` (Default, Compact)

Base: bg #FFFFFF, border 1px #D7D7D7, radius 12px, shadow 0 2px 8px rgba(0,0,0,0.04). Width: 260px.
Default: padding 20px. Compact: padding 16px.
Header: "Trip to Japan" Inter Semi Bold 15px #0B0B0B + "67%" JetBrains Mono Medium 13px #6C6FE4.
Track: 8px, rounded, #EEEEEE. Fill: 67% width, #6C6FE4.
Amount: "$3,015" JetBrains Mono Medium 14px #0B0B0B + "of $4,500" JetBrains Mono Medium 13px #717171.

**Percentage is not a variant property** — it represents data state, not a design decision. A single representative fill (67%) is used. The BU showcase frames show multiple percentages (25/50/75/100%) for visual reference.

### StatItem — 2 variants

Properties: `ValueColor` (Accent, Foreground)

Accent: "$12,450" JetBrains Mono Medium 36px #6C6FE4.
Foreground: "$12,450" JetBrains Mono Medium 36px #0B0B0B.
Label: "TOTAL BALANCE" Inter Medium 12px uppercase, letter-spacing 8%, #717171.
Container: center-aligned, vertical auto-layout, 8px gap. Width: hug contents.

## Execution Strategy

1. For each component page, build individual variant frames as Figma Components (`figma.createComponent()`)
2. Combine variants into a ComponentSet using `figma.combineAsVariants([...components], page)`
3. Position the ComponentSet at the top of the page (y=0), push existing BU frames down
4. Name each variant following Figma convention: property values are set via `component.name = "Intent=Primary, Size=md"`
5. Process one component type per `use_figma` call
6. Auto-layout direction per component: Button (horizontal), Badge (none — fixed size), Avatar (none — fixed size), Card (vertical), NavLink (horizontal), Accordion (vertical), ProgressCard (vertical), StatItem (vertical)

## Figma Plugin API Reference

```javascript
// Create a component from scratch
const comp = figma.createComponent();
comp.name = 'Intent=Primary, Size=md';
// ... set up the component's visual properties ...

// Combine variants into a ComponentSet
const componentSet = figma.combineAsVariants(
  [comp1, comp2, comp3, comp4],
  page,
);
componentSet.name = 'Button';
// ComponentSet appears at (0,0) — reposition existing BU frames below it
```

## Total: 37 variants across 8 ComponentSets
