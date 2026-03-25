# Claude Code Instructions

## Canonical Documents

**DESIGN.md** is the canonical brand identity and design system document. It defines palettes, typography, token architecture, and component patterns for all 5 business units. When making any visual design decision, consult DESIGN.md first.

Rules for DESIGN.md:

- Do not add audit findings, improvement plans, task lists, or temporary content
- Do not add image requirements, brainstorming notes, or operational content
- Only add content that defines the official brand identity and design system
- Operational docs belong in `docs/` (e.g., `docs/design-audit.md`, `docs/image-requirements.md`)
- If DESIGN.md needs updating, the change must reflect a real brand decision — not a work-in-progress

## Design System

- All components must use CSS variable token classes (`bg-background`, `text-foreground`, etc.) — never hardcoded hex colors (except in always-dark footers)
- Consult `DESIGN.md` for the correct palette, typography, and component patterns per business unit
- Each BU has its own component directory: `src/components/{spend,save,credit,plan,together}/`
- Theme switching is handled by `data-business-unit` attributes and `.dark` class in `tailwind.css`
- All Storybook decorators must be imported from `src/stories/decorators/`
- Never define inline or local decorators in story files
- Never use hardcoded colors or backgrounds in decorators — all visual properties derive from Tailwind CSS variable tokens
- The `withStoryDisplay` decorator is the single tool for wrapping components in stories
- Every story must include `argTypes` with `description`, `table.category`, and `control` for each meaningful prop
- Categories: `Appearance` (variants, className), `Layout` (layout, size, positioning), `Content` (text, data, labels), `Behavior` (interactive flags, event handlers)
- Props that accept complex JSX (`children`, `actions`, slots) should be hidden: `{ table: { disable: true } }`
- When adding a new component or decomposing an existing one, its story must include full argTypes metadata before the work is considered complete

## Project Structure

- `src/components/{bu}/` — BU-specific page components
- `src/components/AppShell.tsx` — Router, theme state, DemoSwitcher wrapper
- `src/components/DemoSwitcher.tsx` — Global demo navigation bar
- `src/stories/{bu}/` — Storybook stories per BU
- `docs/` — Operational documents (audit, specs, plans, image requirements)
- `.claude/skills/` — Project-specific Claude skills
