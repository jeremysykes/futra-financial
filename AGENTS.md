# Agent Roles & Division of Labour

This document defines the specialized agent roles for the Futra Financial project. Each role has a clear scope, responsibilities, the context it needs, and the Claude Code skills it should invoke to perform at a high level.

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

**Skills to invoke:**
- `frontend-design:frontend-design` — Distinctive, production-grade UI design (invoke on every design task)
- `figma:implement-design` — When translating Figma designs to code specifications
- `figma:get-design-context` — When pulling design context from Figma files
- `react-best-practices` — When reviewing TSX component quality
- `agent-browser` — When visually inspecting and comparing BU pages
- `superpowers:brainstorming` — Before proposing any design direction or visual overhaul

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

**Context needed:** DESIGN.md, ARCHITECTURE.md, Figma Make source files, existing component patterns, tailwind.css token definitions

**Does not:** Make brand decisions, choose color palettes, alter DESIGN.md

**Skills to invoke:**
- `react-best-practices` — After editing TSX components, before shipping
- `figma:implement-design` — When implementing UI from Figma files
- `shadcn` — When using shadcn/ui components, Radix primitives, or CVA patterns
- `superpowers:test-driven-development` — When implementing features or fixing bugs
- `superpowers:writing-plans` — Before multi-step implementation work
- `superpowers:subagent-driven-development` — When executing plans with independent tasks
- `superpowers:verification-before-completion` — Before claiming work is done
- `superpowers:systematic-debugging` — When encountering bugs or test failures
- `agent-browser` — When verifying dev server output visually
- `agent-browser-verify` — After starting dev server, before continuing development
- `simplify` — After implementation, review for reuse, quality, and efficiency

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

**Skills to invoke:**
- `superpowers:brainstorming` — Before any brand identity decision or palette change
- `frontend-design:frontend-design` — For visual direction and aesthetic guidance
- `geist` — When considering typography decisions and font configuration

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

**Context needed:** DESIGN.md, ARCHITECTURE.md, tailwind.css, .storybook/preview.tsx

**Does not:** Build page components, make visual design decisions, write copy

**Skills to invoke:**
- `shadcn` — For theming patterns, CSS variable conventions, and Tailwind integration
- `react-best-practices` — When reviewing decorator and provider patterns
- `superpowers:systematic-debugging` — When theme switching or token resolution fails
- `agent-browser` — When verifying theme switching across BUs and modes

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

**Context needed:** Current dev server, Storybook, browser automation

**Does not:** Write code or make design decisions — only reports issues

**Skills to invoke:**
- `agent-browser` — Primary tool for all visual verification (screenshots, interaction, navigation)
- `agent-browser-verify` — Automated dev-server verification checklist
- `verification` — Full end-to-end verification orchestrator
- `superpowers:requesting-code-review` — When a major feature is complete and needs review
- `superpowers:verification-before-completion` — Before signing off on any implementation

---

## Content / Copy Writer

**Scope:** Headlines, body copy, testimonials, CTAs, FAQ content

**Responsibilities:**
- Write copy that matches each BU's emotional register (per DESIGN.md)
- Maintain appropriate tone: clinical for Credit, warm for Together, analytical for Plan
- Write testimonial quotes that reflect the target demographic
- Ensure copy is concise and action-oriented
- Source or specify image requirements (subject matter, mood, dimensions)

**Context needed:** DESIGN.md (demographics, emotional register), docs/prompts/ (Figma Make prompts), docs/image-requirements.md

**Does not:** Make code changes, choose colors, alter the design system

**Skills to invoke:**
- `superpowers:brainstorming` — Before writing copy for a new BU or section
- `frontend-design:frontend-design` — When copy needs to complement a specific visual direction

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
| Bug fixing | Frontend Engineer | QA / Visual Reviewer |
| Design system refactor | Design System Engineer | Frontend Engineer, Brand Strategist |

---

## Handoff Protocol

1. **Brand Strategist** defines the identity in DESIGN.md
2. **Frontend Designer** audits current state and proposes improvements
3. **Content / Copy Writer** provides copy and image requirements
4. **Frontend Engineer** implements changes using DESIGN.md as the source of truth
5. **Design System Engineer** maintains the token infrastructure
6. **QA / Visual Reviewer** verifies the result across all BUs and modes

---

## Skill Invocation Rules

- **Always invoke relevant skills BEFORE starting work** — not after
- If in doubt whether a skill applies, invoke it — a false positive costs less than a missed insight
- Process skills (brainstorming, debugging, TDD) come before implementation skills
- `DESIGN.md` is always the source of truth for visual decisions — skills inform execution, not brand identity
- `ARCHITECTURE.md` is the source of truth for technical decisions
