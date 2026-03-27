# Claude Code Instructions

## Canonical Documents

**PRINCIPLES.md** defines the design system principles that guide all decisions — facilitate over configure, compose don't configure, tokens are the contract, build small compose up, theme at the boundary. Consult it when making architectural or API design choices.

**DESIGN.md** is the canonical brand identity and design system document. It defines palettes, typography, token architecture, and component patterns for all 5 business units. When making any visual design decision, consult DESIGN.md first.

Rules for DESIGN.md:

- Do not add audit findings, improvement plans, task lists, or temporary content
- Do not add image requirements, brainstorming notes, or operational content
- Only add content that defines the official brand identity and design system
- Operational docs belong in `docs/` (e.g., `docs/image-requirements.md`, `docs/testing.md`)
- If DESIGN.md needs updating, the change must reflect a real brand decision — not a work-in-progress

## Design System

- All components must use CSS variable token classes (`bg-background`, `text-foreground`, etc.) — never hardcoded hex colors
- Consult `DESIGN.md` for the correct palette, typography, and component patterns per business unit
- Primitive token values are defined in `packages/tokens/src/tokens.json` (DTCG format) — edit there, not in CSS
- Each BU has its own component directory: `apps/web/src/components/{spend,save,credit,plan,together}/`
- Theme switching is handled by `data-business-unit` attributes and `.dark` class in `apps/web/src/tailwind.css`
- All Storybook decorators must be imported from `src/stories/decorators/`
- Never define inline or local decorators in story files
- Never use hardcoded colors or backgrounds in decorators — all visual properties derive from Tailwind CSS variable tokens
- The `withStoryDisplay` decorator is the single tool for wrapping components in stories
- Every exported props interface and component must have JSDoc comments (see `FocalImage.tsx` as the reference standard)
- Every story must include `argTypes` with `table.category` and `control` for each meaningful prop (descriptions come from JSDoc on the component, not argTypes)
- Categories: `Appearance` (variants, className), `Layout` (layout, size, positioning), `Content` (text, data, labels), `Behavior` (interactive flags, event handlers)
- Props that accept complex JSX (`children`, `actions`, slots) should be hidden: `{ table: { disable: true } }`
- When adding a new component or decomposing an existing one, its story must include full argTypes metadata before the work is considered complete

## Project Structure (Turborepo Monorepo)

- `apps/web/` — Main Vite + React application
  - `apps/web/src/components/{bu}/` — BU-specific page components
  - `apps/web/src/components/AppShell.tsx` — Router, theme state, DemoSwitcher wrapper
  - `apps/web/src/components/DemoSwitcher.tsx` — Global demo navigation bar
  - `apps/web/src/stories/{bu}/` — Storybook stories per BU
  - `apps/web/src/tailwind.css` — Semantic tokens + BU themes (imports primitives from @futra/tokens)
  - `apps/web/.storybook/` — Storybook configuration
- `packages/tokens/` — @futra/tokens design token package
  - `packages/tokens/src/tokens.json` — DTCG-format source of truth for all primitive tokens
  - `packages/tokens/config/style-dictionary.config.ts` — Style Dictionary build config
  - `packages/tokens/dist/primitives.css` — Generated CSS (gitignored)
- `docs/superpowers/specs/` — Design specs (brainstormed and reviewed before implementation)
- `docs/superpowers/plans/` — Implementation plans (step-by-step execution checklists)
- `docs/prompts/` — AI tooling prompts (Figma Make, etc.)
- `docs/diagrams/` — Architecture and workflow diagrams (Mermaid wrapped in Markdown)
- `docs/` — Operational documents (testing, image requirements, workflows)
- `.claude/skills/` — Project-specific Claude skills
- `turbo.json` — Turborepo task pipeline config
- `pnpm-workspace.yaml` — pnpm workspace definition

## Diagrams

- All Mermaid diagrams must be wrapped in a Markdown file (`.md`, not `.mmd`) so they render in GitHub preview and IDE markdown viewers
- Use a fenced code block with the `mermaid` language identifier
- Place all diagrams in `docs/diagrams/`
- Include a brief description above the diagram explaining what it documents

## Documentation Maintenance

Documentation is part of the definition of done. When you change code, update the corresponding docs:

- **Token pipeline** (`packages/tokens/`, `apps/web/src/tailwind.css`) — update `docs/design-token-pipeline.md` and `docs/diagrams/token-architecture.md`
- **Test infrastructure** (Vitest config, Storybook addons, Chromatic) — update `docs/testing.md`
- **Monorepo structure** (new packages, moved files, new workspaces) — update `ARCHITECTURE.md`
- **New Storybook stories** — update the story count in `docs/testing.md` overview section
- **New docs added to `docs/`** — add an entry to the documentation index table in `README.md`
- **Diagrams** — if you change the thing a diagram describes, update the diagram to match
- **Figma workflow changes** — update `docs/figma-library-workflow.md`
