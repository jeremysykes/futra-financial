# Page Transition Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add smooth crossfade + color blend transitions when switching between business units so the theme palette shift gets a moment.

**Architecture:** CSS `transition` declarations on consuming elements handle the color blend. A CSS keyframe animation on a keyed `<main>` wrapper handles the content fade-in. The existing `<main id="main-content">` is moved from individual BU pages to AppShell.

**Tech Stack:** CSS transitions, CSS keyframes, React key-driven remount, no new dependencies

**Spec:** `docs/specs/2026-03-23-page-transitions-design.md`

---

### Task 1: Add CSS Transitions and Page-Enter Keyframe to tailwind.css

**Files:**
- Modify: `src/tailwind.css` (after the Accessibility section, line 544)

- [ ] **Step 1: Add page-enter keyframe and transition declarations**

Add the following at the end of `src/tailwind.css`, after the `/* ─── Accessibility ─── */` section (after line 544):

```css
/* ─── Page Transitions ─── */

@keyframes page-enter {
  from { opacity: 0; }
  to { opacity: 1; }
}

.page-transition {
  animation: page-enter 300ms ease-out;
}

@media (prefers-reduced-motion: no-preference) {
  body,
  [data-business-unit] * {
    transition: background-color 300ms ease, color 300ms ease, border-color 300ms ease;
  }
}

@media (prefers-reduced-motion: reduce) {
  .page-transition {
    animation: none;
  }
}
```

- [ ] **Step 2: Verify CSS parses correctly**

Run: `npx tsc --noEmit`
Expected: No errors (TypeScript doesn't parse CSS, but Storybook/Vite will pick up syntax errors on next build).

- [ ] **Step 3: Commit**

```bash
git add src/tailwind.css
git commit -m "feat(transitions): add page-enter keyframe and color transition declarations"
```

---

### Task 2: Migrate `<main>` from BU Pages to AppShell

**Files:**
- Modify: `src/stories/spend/SpendPage.tsx` (remove `<main id="main-content">` wrapper)
- Modify: `src/stories/save/SavePage.tsx` (remove `<main id="main-content">` wrapper)
- Modify: `src/stories/credit/CreditPage.tsx` (remove `<main id="main-content">` wrapper)
- Modify: `src/stories/plan/PlanPage.tsx` (remove `<main id="main-content">` wrapper)
- Modify: `src/stories/together/TogetherPage.tsx` (remove `<main id="main-content">` wrapper)
- Modify: `src/components/AppShell.tsx` (add keyed `<main>` wrapper with transition)

- [ ] **Step 1: Remove `<main id="main-content">` from SpendPage**

In `src/stories/spend/SpendPage.tsx`, replace:
```tsx
      <main id="main-content">
```
with:
```tsx
      <>
```

And replace the corresponding closing tag:
```tsx
      </main>
```
with:
```tsx
      </>
```

- [ ] **Step 2: Remove `<main id="main-content">` from SavePage**

Same change in `src/stories/save/SavePage.tsx`:
- Replace `<main id="main-content">` with `<>`
- Replace `</main>` with `</>`

- [ ] **Step 3: Remove `<main id="main-content">` from CreditPage**

Same change in `src/stories/credit/CreditPage.tsx`:
- Replace `<main id="main-content">` with `<>`
- Replace `</main>` with `</>`

- [ ] **Step 4: Remove `<main id="main-content">` from PlanPage**

Same change in `src/stories/plan/PlanPage.tsx`:
- Replace `<main id="main-content">` with `<>`
- Replace `</main>` with `</>`

- [ ] **Step 5: Remove `<main id="main-content">` from TogetherPage**

Same change in `src/stories/together/TogetherPage.tsx`:
- Replace `<main id="main-content">` with `<>`
- Replace `</main>` with `</>`

- [ ] **Step 6: Add keyed `<main>` wrapper to AppShell**

In `src/components/AppShell.tsx`:

**6a. Update imports** — add `useRef`:

```tsx
import { useState, useEffect, useCallback, useRef } from 'react';
```

**6b. Add transition key state** — inside `AppShell()`, after the existing `theme` state (line 40), add:

```tsx
  const prevUnit = useRef(unit);
  const [transitionKey, setTransitionKey] = useState(0);
```

**6c. Add the key-incrementing effect** — after the existing `useEffect` that sets theme from unit (line 43-45), add:

```tsx
  useEffect(() => {
    if (prevUnit.current !== unit) {
      setTransitionKey((k) => k + 1);
      prevUnit.current = unit;
    }
  }, [unit]);
```

**6d. Replace the `<div>` wrapper with keyed `<main>`** — change lines 78-87 from:

```tsx
      <div style={{ '--nav-top': '36px' } as React.CSSProperties}>
        <Routes>
          <Route path="/spend" element={<SpendPage />} />
          <Route path="/save" element={<SavePage />} />
          <Route path="/credit" element={<CreditPage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/together" element={<TogetherPage />} />
          <Route path="/" element={<Navigate to="/spend" replace />} />
        </Routes>
      </div>
```

to:

```tsx
      <main
        id="main-content"
        className="page-transition"
        key={transitionKey}
        style={{ '--nav-top': '36px' } as React.CSSProperties}
      >
        <Routes>
          <Route path="/spend" element={<SpendPage />} />
          <Route path="/save" element={<SavePage />} />
          <Route path="/credit" element={<CreditPage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/together" element={<TogetherPage />} />
          <Route path="/" element={<Navigate to="/spend" replace />} />
        </Routes>
      </main>
```

- [ ] **Step 7: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 8: Commit**

```bash
git add src/stories/spend/SpendPage.tsx src/stories/save/SavePage.tsx src/stories/credit/CreditPage.tsx src/stories/plan/PlanPage.tsx src/stories/together/TogetherPage.tsx src/components/AppShell.tsx
git commit -m "feat(transitions): migrate main to AppShell with keyed page-transition wrapper"
```

---

### Task 3: Visual Verification

**Files:** None (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Verify BU switching transitions**

Open the app in a browser and test:

| Check | Expected |
|-------|----------|
| Click Spend → Save | Background color blends from dark to light over ~300ms; page content fades in |
| Click Save → Credit | Colors blend smoothly; page fades in |
| Click Credit → Plan | Light-to-dark color blend; page fades in |
| Click any BU → same BU | Nothing happens (no animation, no flash) |
| Rapid click through all 5 BUs | Each click restarts the fade-in; colors retarget smoothly; no visual glitches |
| Toggle light/dark during transition | Theme toggle works; no conflict with BU transition |
| Scroll down after BU switch | `data-animate` elements stagger in as before |

- [ ] **Step 3: Verify skip link still works**

Press Tab on page load — the "Skip to main content" link should appear. Pressing Enter should scroll to the `<main id="main-content">` element.

- [ ] **Step 4: Verify reduced motion**

In browser DevTools, enable "Prefers reduced motion" (Chrome: Rendering panel → Emulate CSS media feature `prefers-reduced-motion: reduce`).

Expected: BU switching is instant — no color blend, no fade. Same as before this feature.

- [ ] **Step 5: Fix any issues found**

Address visual or functional issues. Common things to check:
- DemoSwitcher hover feels too slow (add `transition-duration: 150ms` override if needed)
- Page enter animation feels too fast/slow (adjust 300ms in tailwind.css)
- Color transitions create a flash on certain elements (exclude from transition scope)

- [ ] **Step 6: Commit any fixes**

```bash
git add -u
git commit -m "fix(transitions): polish from visual verification"
```

---

## File Map Summary

| File | Action | Purpose |
|------|--------|---------|
| `src/tailwind.css` | Modify | Add `page-enter` keyframe, `.page-transition` class, color transitions, reduced motion |
| `src/components/AppShell.tsx` | Modify | Keyed `<main>` wrapper with transition class, `transitionKey` + `prevUnit` ref |
| `src/stories/spend/SpendPage.tsx` | Modify | Remove `<main id="main-content">` wrapper |
| `src/stories/save/SavePage.tsx` | Modify | Remove `<main id="main-content">` wrapper |
| `src/stories/credit/CreditPage.tsx` | Modify | Remove `<main id="main-content">` wrapper |
| `src/stories/plan/PlanPage.tsx` | Modify | Remove `<main id="main-content">` wrapper |
| `src/stories/together/TogetherPage.tsx` | Modify | Remove `<main id="main-content">` wrapper |
