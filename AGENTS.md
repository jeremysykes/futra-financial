# Agent Roles & Division of Labour

This document defines the specialized agent roles for the Futra Financial project. Each role has a clear scope, responsibilities, and the context it needs to do its work.

---

## Frontend Designer

**Scope:** Visual design decisions, UI polish, component aesthetics, layout composition

**Responsibilities:**
- Design audits — assess visual quality and distinctiveness across BUs
- Propose visual improvements (color usage, spacing, typography, motion)
- Create mockups and visual comparisons for design decisions
- Ensure each BU looks distinct and matches its emotional register per DESIGN.md
- Review component implementations for design fidelity

**Context needed:** DESIGN.md, docs/design-audit.md, Figma Make source files, current component code

**Does not:** Write production code, manage routing, handle state management

---

## Frontend Engineer

**Scope:** Component implementation, React/TypeScript code, Tailwind styling, build tooling

**Responsibilities:**
- Implement components from Figma designs using CSS variable tokens
- Build new pages and wire them into the router (AppShell)
- Refactor components to use semantic token classes
- Add animations, transitions, and interactive behaviors
- Integrate images and assets into components
- Maintain Storybook stories with correct globals
- Ensure TypeScript compiles cleanly and ESLint passes

**Context needed:** DESIGN.md, Figma Make source files, existing component patterns, tailwind.css token definitions

**Does not:** Make brand decisions, choose color palettes, alter DESIGN.md

---

## Brand Strategist

**Scope:** Brand identity, palette decisions, typography choices, emotional register

**Responsibilities:**
- Define and maintain DESIGN.md as the canonical style guide
- Make palette decisions (new colors, token adjustments)
- Define emotional register and audience profile per BU
- Establish rules (e.g., "no red/green on Credit", "three-color data vocabulary on Plan")
- Approve changes to DESIGN.md

**Context needed:** README.md (brand strategy), DESIGN.md, docs/futra-financial.md, competitive research

**Does not:** Write code, implement designs, manage the build system

---

## Design System Engineer

**Scope:** Token architecture, theme infrastructure, cross-BU consistency

**Responsibilities:**
- Maintain `tailwind.css` — all CSS custom property definitions
- Ensure token names are consistent across BUs
- Add new semantic tokens when needed
- Verify light/dark mode works correctly for all BUs
- Maintain the `data-business-unit` switching mechanism
- Ensure Storybook decorator applies tokens correctly

**Context needed:** DESIGN.md, tailwind.css, .storybook/preview.tsx

**Does not:** Build page components, make visual design decisions, write copy

---

## QA / Visual Reviewer

**Scope:** Visual verification, cross-BU consistency checks, regression catching

**Responsibilities:**
- Screenshot all 5 BUs in both light and dark mode after changes
- Verify navbar alignment, spacing, and scroll behavior
- Check theme persistence (localStorage) across navigation
- Verify Storybook renders correctly with globals
- Flag visual regressions or inconsistencies
- Run TypeScript and lint checks

**Context needed:** Current dev server, Storybook, browser automation (agent-browser)

**Does not:** Write code or make design decisions — only reports issues

---

## Content / Copy Writer

**Scope:** Headlines, body copy, testimonials, CTAs, FAQ content

**Responsibilities:**
- Write copy that matches each BU's emotional register (per DESIGN.md)
- Maintain appropriate tone: clinical for Credit, warm for Together, analytical for Plan
- Write testimonial quotes that reflect the target demographic
- Ensure copy is concise and action-oriented
- Source or specify image requirements (subject matter, mood, dimensions)

**Context needed:** DESIGN.md (demographics, emotional register), docs/prompts/ (Figma Make prompts)

**Does not:** Make code changes, choose colors, alter the design system

---

## Workflow Summary

| Task | Lead Role | Supporting Roles |
|------|-----------|-----------------|
| New BU landing page | Frontend Engineer | Frontend Designer, Brand Strategist |
| Design audit | Frontend Designer | QA / Visual Reviewer |
| Token/palette changes | Brand Strategist | Design System Engineer |
| Component polish | Frontend Engineer | Frontend Designer |
| Copy updates | Content / Copy Writer | Brand Strategist |
| Visual verification | QA / Visual Reviewer | Frontend Engineer |
| Image sourcing | Content / Copy Writer | Frontend Designer |
| Storybook maintenance | Frontend Engineer | Design System Engineer |

---

## Handoff Protocol

1. **Brand Strategist** defines the identity in DESIGN.md
2. **Frontend Designer** audits current state and proposes improvements
3. **Content / Copy Writer** provides copy and image requirements
4. **Frontend Engineer** implements changes using DESIGN.md as the source of truth
5. **Design System Engineer** maintains the token infrastructure
6. **QA / Visual Reviewer** verifies the result across all BUs and modes
