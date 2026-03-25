# Figma Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert existing Figma UI library frames into proper Figma ComponentSets with variant properties, enabling Zeroheight import.

**Architecture:** For each of 8 component types, create individual Figma Components via `figma.createComponent()`, then combine them into a ComponentSet via `figma.combineAsVariants()`. Each ComponentSet lives on its existing page above the BU showcase frames. All components use the shared Indigo theme palette.

**Tech Stack:** Figma Plugin API via MCP (`use_figma` tool). No local code changes.

**Spec:** `docs/superpowers/specs/2026-03-25-figma-components-design.md`

---

## Shared Reference

**File key:** `pMroF1oVmzBSUY99ZnmeIl`

**Color palette (hex → Figma RGB):**

| Token | Hex | Figma RGB |
|-------|-----|-----------|
| primary | #6C6FE4 | {r:0.424, g:0.435, b:0.894} |
| primary-foreground | #FFFFFF | {r:1, g:1, b:1} |
| foreground | #0B0B0B | {r:0.043, g:0.043, b:0.043} |
| surface | #FFFFFF | {r:1, g:1, b:1} |
| muted | #EEEEEE | {r:0.933, g:0.933, b:0.933} |
| muted-foreground | #717171 | {r:0.443, g:0.443, b:0.443} |
| border | #D7D7D7 | {r:0.843, g:0.843, b:0.843} |

**Fonts to load in every call:**
```javascript
await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
await figma.loadFontAsync({ family: 'JetBrains Mono', style: 'Medium' });
await figma.loadFontAsync({ family: 'JetBrains Mono', style: 'Semi Bold' });
```

**Key Figma Plugin API patterns:**

```javascript
// Create a component
const comp = figma.createComponent();
comp.name = "Property1=Value1, Property2=Value2";  // Figma variant naming
comp.layoutMode = "HORIZONTAL";  // or "VERTICAL"
comp.primaryAxisAlignItems = "CENTER";
comp.counterAxisAlignItems = "CENTER";
comp.paddingLeft = 32; comp.paddingRight = 32;
comp.paddingTop = 12; comp.paddingBottom = 12;
comp.cornerRadius = 10;
comp.fills = [{type: 'SOLID', color: {r:0.424, g:0.435, b:0.894}}];
comp.clipsContent = false;

// Fixed size component (Badge, Avatar)
comp.resize(40, 40);
comp.primaryAxisSizingMode = "FIXED";
comp.counterAxisSizingMode = "FIXED";

// Create text inside component
const text = figma.createText();
text.characters = "Get Started";
text.fontSize = 16;
text.fontName = { family: 'Inter', style: 'Semi Bold' };
text.fills = [{type: 'SOLID', color: {r:1, g:1, b:1}}];
comp.appendChild(text);

// Combine into ComponentSet
const componentSet = figma.combineAsVariants([comp1, comp2, ...], page);
componentSet.name = "Button";

// Reposition existing BU frames below ComponentSet
const existingFrames = page.children.filter(c => c.id !== componentSet.id);
let yOffset = componentSet.height + 80;
for (const frame of existingFrames) {
  frame.y = yOffset;
  yOffset += frame.height + 40;
}
```

---

## Task 1: Button ComponentSet

- [ ] **Step 1: Create Button ComponentSet on the Button page**

Use `use_figma` (file key `pMroF1oVmzBSUY99ZnmeIl`). Navigate to the Button page. Create 4 components:

1. `comp1.name = "Intent=Primary, Size=md"` — bg primary, text "Get Started" white 16px, pad 32h/12v, r10
2. `comp2.name = "Intent=Primary, Size=sm"` — bg primary, text "Get Started" white 14px, pad 20h/8v, r10
3. `comp3.name = "Intent=Inverse, Size=md"` — bg white, text "Learn More" #6C6FE4 16px, pad 32h/12v, r10
4. `comp4.name = "Intent=Inverse, Size=sm"` — bg white, text "Learn More" #6C6FE4 14px, pad 20h/8v, r10

All: Inter Semi Bold, horizontal auto-layout, center-aligned both axes.

Combine: `figma.combineAsVariants([comp1, comp2, comp3, comp4], page)`, name "Button".

Reposition existing BU frames below the new ComponentSet.

- [ ] **Step 2: Verify ComponentSet**

Use `use_figma` to find the ComponentSet on the Button page. Confirm it has `type === 'COMPONENT_SET'`, name "Button", and 4 children of type `COMPONENT`. Print each child's name.

---

## Task 2: Badge ComponentSet

- [ ] **Step 1: Create Badge ComponentSet on the Badge page**

Navigate to Badge page. Create 9 components (3 shapes × 3 sizes):

For each combination of Shape (Square/Rounded/Circle) × Size (sm/md/lg):
- Name: `"Shape={shape}, Size={size}"`
- Fixed dimensions: sm=40, md=56, lg=64
- Corner radius: Square=0, Rounded=16, Circle=half (20/28/32)
- bg #EEEEEE, centered text "A" in JetBrains Mono Semi Bold, color #0B0B0B
- Font size: sm=14, md=18, lg=22
- Auto-layout with center alignment both axes, then resize to fixed

Combine into ComponentSet named "Badge". Reposition BU frames below.

- [ ] **Step 2: Verify ComponentSet**

Confirm 9 children, correct names and types.

---

## Task 3: Avatar ComponentSet

- [ ] **Step 1: Create Avatar ComponentSet on the Avatar page**

Navigate to Avatar page. Create 9 components (3 sizes × 3 rings):

For each combination of Size (sm/md/lg) × Ring (None/Accent/Primary):
- Name: `"Size={size}, Ring={ring}"`
- Fixed dimensions: sm=40, md=56, lg=64
- Always circular: cornerRadius = half (20/28/32)
- bg #EEEEEE, centered text "JS" in JetBrains Mono Medium #6C6FE4
- Font size: sm=12, md=16, lg=20
- Ring None: no stroke
- Ring Accent: `strokes = [{type:'SOLID', color: primary}], strokeWeight = 2, strokeAlign = 'OUTSIDE'`
- Ring Primary: same as Accent (both #6C6FE4 in shared theme)

Combine into ComponentSet named "Avatar". Reposition BU frames below.

- [ ] **Step 2: Verify ComponentSet**

Confirm 9 children, correct names.

---

## Task 4: Card ComponentSet

- [ ] **Step 1: Create Card ComponentSet on the Card page**

Navigate to Card page. Create 5 components (5 accent positions):

For each Accent (None/Left/Top/Right/Bottom):
- Name: `"Accent={accent}"`
- Width: 260px, vertical auto-layout, 12px gap, 24px padding, r12
- bg white (#FFFFFF), border 1px #D7D7D7
- Content: "Card Title" Inter Semi Bold 16px #0B0B0B + "Sample content for the card component." Inter Regular 14px #717171
- Text nodes: `layoutSizingHorizontal = 'FILL'` to span card width

Accent border approach — use a wrapper frame technique:
- **None**: standard 1px border only
- **Left**: outer frame bg #6C6FE4, r12, paddingLeft=4 paddingTop/Right/Bottom=0. Inner content frame with surface bg, all card content. The 4px left gap reveals accent color.
- **Top**: same approach, paddingTop=2, others=0
- **Right**: paddingRight=4, others=0
- **Bottom**: paddingBottom=2, others=0

Alternative simpler approach: since Figma supports `strokeTopWeight`, `strokeBottomWeight`, `strokeLeftWeight`, `strokeRightWeight` on individual sides when `individualStrokeWeights` is set, use:
```javascript
comp.strokesIncludedInLayout = true;
comp.strokes = [{type:'SOLID', color: border_color}];
comp.strokeWeight = 1;
// For accent Left:
comp.strokeLeftWeight = 4;
comp.strokes = [{type:'SOLID', color: accent_color}]; // This overrides all sides
```

Since per-side stroke colors aren't supported, use the wrapper approach for accent variants.

Combine into ComponentSet named "Card". Reposition BU frames below.

- [ ] **Step 2: Verify ComponentSet**

Confirm 5 children, correct names.

---

## Task 5: NavLink ComponentSet

- [ ] **Step 1: Create NavLink ComponentSet on the NavLink page**

Navigate to NavLink page. Create 2 components:

1. `"Size=sm"` — text "Dashboard" Inter Medium 14px #717171
2. `"Size=base"` — text "Dashboard" Inter Medium 16px #717171

Both: no background, no border, hug contents.

Combine into ComponentSet named "NavLink". Reposition BU frames below.

- [ ] **Step 2: Verify ComponentSet**

Confirm 2 children, correct names.

---

## Task 6: Accordion ComponentSet

- [ ] **Step 1: Create Accordion ComponentSet on the Accordion page**

Navigate to Accordion page. Create 4 components (2 spacings × 2 states):

For each Spacing (Default/Compact) × State (Expanded/Collapsed):
- Name: `"Spacing={spacing}, State={state}"`
- Width: 500px, vertical auto-layout
- Gap: Default=12, Compact=8

Each component contains 2 accordion items stacked:

**Collapsed item:**
- Frame: border 1px #D7D7D7, r12, horizontal auto-layout, pad 24h/16v, space-between
- Trigger text: "What is Futra?" Inter Semi Bold 16px #0B0B0B
- Chevron: "▶" 18px #717171

**Expanded item (for State=Expanded, item 1 only):**
- Frame: border 1px #D7D7D7, r12, vertical auto-layout
- Trigger row: horizontal auto-layout, pad 24h/16v, space-between. Text #6C6FE4, chevron "▼"
- Content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." Inter Regular 14px #717171, pad 24h/0top/16bottom

For State=Collapsed: both items are collapsed.
For State=Expanded: item 1 expanded, item 2 collapsed.

Combine into ComponentSet named "Accordion". Reposition BU frames below.

- [ ] **Step 2: Verify ComponentSet**

Confirm 4 children, correct names.

---

## Task 7: ProgressCard ComponentSet

- [ ] **Step 1: Create ProgressCard ComponentSet on the ProgressCard page**

Navigate to ProgressCard page. Create 2 components:

For each Size (Default/Compact):
- Name: `"Size={size}"`
- Width: 260px, vertical auto-layout, 12px gap
- bg white, border 1px #D7D7D7, r12
- Shadow: `{type:'DROP_SHADOW', color:{r:0,g:0,b:0,a:0.04}, offset:{x:0,y:2}, radius:8, visible:true}`
- Default: pad 20. Compact: pad 16.

Content:
1. Header row: horizontal, space-between, `layoutSizingHorizontal='FILL'`
   - "Trip to Japan" Inter Semi Bold 15px #0B0B0B
   - "67%" JetBrains Mono Medium 13px #6C6FE4
2. Progress bar: frame 8px tall, `layoutSizingHorizontal='FILL'`, bg #EEEEEE, r4, clipsContent=true
   - Fill rect: width = parent_width × 0.67, height 8px, bg #6C6FE4, r4
3. Amount row: horizontal, 4px gap, `layoutSizingHorizontal='FILL'`
   - "$3,015" JetBrains Mono Medium 14px #0B0B0B
   - "of" Inter Regular 13px #717171
   - "$4,500" JetBrains Mono Medium 13px #717171

Combine into ComponentSet named "ProgressCard". Reposition BU frames below.

- [ ] **Step 2: Verify ComponentSet**

Confirm 2 children, correct names.

---

## Task 8: StatItem ComponentSet

- [ ] **Step 1: Create StatItem ComponentSet on the StatItem page**

Navigate to StatItem page. Create 2 components:

1. `"ValueColor=Accent"` — "$12,450" JetBrains Mono Medium 36px #6C6FE4
2. `"ValueColor=Foreground"` — "$12,450" JetBrains Mono Medium 36px #0B0B0B

Both: vertical auto-layout, 8px gap, center-aligned. Label: "TOTAL BALANCE" Inter Medium 12px #717171, uppercase, letterSpacing 8%.

Combine into ComponentSet named "StatItem". Reposition BU frames below.

- [ ] **Step 2: Verify ComponentSet**

Confirm 2 children, correct names.

---

## Task 9: Final Verification

- [ ] **Step 1: List all ComponentSets across all pages**

Use `use_figma` to iterate all pages and find nodes of type `COMPONENT_SET`. Print: page name, ComponentSet name, number of variants.

Expected:
- Button: 4 variants
- Badge: 9 variants
- Avatar: 9 variants
- Card: 5 variants
- NavLink: 2 variants
- Accordion: 4 variants
- ProgressCard: 2 variants
- StatItem: 2 variants

Total: 37 variants across 8 ComponentSets.

- [ ] **Step 2: User review**

Share Figma file link. User verifies components appear in the Assets panel and can be imported into Zeroheight.
