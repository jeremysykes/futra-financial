# Page Transition Animations — Design Spec

## Overview

Add smooth transitions when switching between business units. Currently BU switching hard-cuts — theme colors change instantly and page content swaps with no animation. This spec adds a crossfade on page content and a color blend on theme tokens so the palette shift gets a moment.

## What Happens on BU Switch

When the user clicks a BU link in the DemoSwitcher:

1. **Theme colors begin transitioning** (~300ms) — Background, text, borders, and accent colors smoothly blend from old palette to new via CSS `transition` properties on consuming elements.
2. **Page content fades in** (~300ms, concurrent with colors) — The new page animates from `opacity: 0 → 1` using a CSS keyframe. Combined with the background color transitioning underneath, this creates the perception of a crossfade.
3. **Scroll animations replay** — After the new page mounts, `data-animate="fade-in-up"` elements fire their stagger animations as they enter the viewport. Same behavior as initial page load. The `useScrollAnimations()` hook in AppShell uses a MutationObserver that automatically detects newly added `[data-animate]` elements after the key-driven remount — no changes to the hook are needed.
4. **DemoSwitcher stays fixed** — The header navigation bar doesn't fade or animate its layout. Its background and text colors transition smoothly via the global CSS transitions.

**Total perceived transition time:** ~300ms. Fast and fluid, not theatrical.

## CSS Color Transitions

Add `transition` declarations in `@layer base` within `tailwind.css`. These target the CSS properties that change between BUs:

```css
@media (prefers-reduced-motion: no-preference) {
  body,
  [data-business-unit] * {
    transition: background-color 300ms ease, color 300ms ease, border-color 300ms ease;
  }
}
```

**What transitions:**
- `background-color` — Page background, card surfaces, buttons, secondary fills
- `color` — All text including headings, body, muted, accent
- `border-color` — Card borders, dividers, input outlines

**What does NOT transition:**
- `box-shadow`, `fill`, `stroke`, SVG elements, `outline` — Kept out to avoid unexpected flickers
- Any property not in the transition list — Instant switch as before

**How it works:** The underlying CSS custom properties (`--color-background`, etc.) still change instantly when `data-business-unit` is updated. But the *rendered* properties (`background-color`, `color`, `border-color`) on the consuming elements transition smoothly because of the CSS `transition` declaration.

**Selector scope:** `[data-business-unit] *` targets all descendants of the element carrying the attribute (which is `<html>`), so every element in the page gets the transition. The `body` selector ensures the page background itself transitions.

**Performance note:** The universal descendant selector applies transition declarations to every element. With the simple property list (`background-color`, `color`, `border-color`) and 300ms duration, this is not a performance concern in practice — browsers optimize transition evaluation efficiently for these properties.

**DemoSwitcher interaction:** The DemoSwitcher already uses Tailwind's `transition-colors` utility (150ms) for hover effects on its pill links. The global 300ms transition will override this for BU-switch color changes, but hover effects will still feel responsive because the hover state change is a different property value change that starts its own 300ms transition. If the slower hover is noticeable, a more specific `transition-duration: 150ms` can be added to the DemoSwitcher links — but this is a polish concern to evaluate during implementation, not a spec requirement.

## Page Content Crossfade

**Approach: CSS keyframe animation on `<main>` via React key remount**

Rather than managing two page components in the DOM simultaneously, use a simpler technique:

1. `AppShell` tracks a transition key that increments when the active BU changes
2. This key is passed as the `key` prop on the `<main>` element wrapping the `<Routes>`
3. When the key changes, React unmounts and remounts `<main>`, which replays the CSS animation
4. The `page-enter` animation fades content from `opacity: 0 → 1` over 300ms

The old page disappears instantly (React unmount), but the simultaneous color transition on the body provides visual continuity during the opacity ramp — the user sees colors shifting while new content materializes. This creates the perception of a crossfade without the complexity of maintaining two DOM trees.

**New keyframe in `tailwind.css`:**

```css
@keyframes page-enter {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Animation applied via `.page-transition` class on the wrapper:**

```css
.page-transition {
  animation: page-enter 300ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .page-transition {
    animation: none;
  }
}
```

**AppShell change:**

The current AppShell wraps routes in `<div style={{ '--nav-top': '36px' }}>`. This div becomes the keyed transition wrapper. The `--nav-top` CSS property is preserved.

Additionally, each BU page component currently has its own `<main id="main-content">`. These must be removed from the individual pages, and AppShell will own the sole `<main>` element for correct HTML semantics (no nested `<main>` tags).

```tsx
// Track a key that changes when BU changes, forcing remount
const prevUnit = useRef(unit);
const [transitionKey, setTransitionKey] = useState(0);

useEffect(() => {
  if (prevUnit.current !== unit) {
    setTransitionKey((k) => k + 1);
    prevUnit.current = unit;
  }
}, [unit]);

// The keyed wrapper replaces the existing div:
<main
  className="page-transition"
  key={transitionKey}
  style={{ '--nav-top': '36px' } as React.CSSProperties}
>
  <Routes>...</Routes>
</main>
```

**Migration:** Remove `<main id="main-content">` from all 5 BU page components (SpendPage, SavePage, CreditPage, PlanPage, TogetherPage). Each page's content moves up to be a direct child of fragments or wrapper divs — they no longer own a `<main>` element.

## Reduced Motion

All transitions respect `prefers-reduced-motion`:
- Color transitions: wrapped in `@media (prefers-reduced-motion: no-preference)` — disabled means instant color switch (current behavior)
- Page-enter animation: wrapped in `@media (prefers-reduced-motion: reduce)` with `animation: none` — disabled means instant page swap (current behavior)

## Edge Cases

- **Rapid clicking** — Each click increments the transition key, remounting `<main>` and restarting the fade-in. CSS color transitions naturally retarget to the newest palette mid-blend. No debouncing needed.
- **Same-BU click** — React Router doesn't re-render for same-path navigation. No transition fires. The `unit` value doesn't change, so the effect doesn't trigger.
- **Theme toggle during transition** — Light/dark toggle changes the `.dark` class. CSS color transitions retarget naturally. No conflict with the BU transition.
- **Initial page load** — The page-enter animation plays on first mount (the `<main>` mounts once). This is a nice touch — content fades in on arrival. The `prevUnit` ref guard prevents a spurious key increment on mount.

## File Changes

| File | Action |
|------|--------|
| `src/tailwind.css` | Add `page-enter` keyframe, `.page-transition` class, color transition declarations, reduced motion wrappers |
| `src/components/AppShell.tsx` | Add `transitionKey` state with `prevUnit` ref guard, wrap routes in keyed `<main class="page-transition">`, preserve `--nav-top` style |
| `src/stories/spend/SpendPage.tsx` | Remove `<main id="main-content">` wrapper |
| `src/stories/save/SavePage.tsx` | Remove `<main id="main-content">` wrapper |
| `src/stories/credit/CreditPage.tsx` | Remove `<main id="main-content">` wrapper |
| `src/stories/plan/PlanPage.tsx` | Remove `<main id="main-content">` wrapper |
| `src/stories/together/TogetherPage.tsx` | Remove `<main id="main-content">` wrapper |

No new files. No new dependencies.

## Non-Goals

- Exit animations on the old page (adds complexity for minimal benefit)
- Directional slide transitions (implies spatial ordering of BUs)
- Framer Motion or other animation library dependency
- Animating CSS custom properties directly (`@property` browser support is incomplete)
- Transition on theme toggle (light/dark switch) — only BU switching transitions
