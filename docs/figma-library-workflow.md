# Figma UI Library from Code — Workflow Guide

> How to generate and maintain a Figma component library from the Storybook source code using Claude + Figma MCP.

## Prerequisites

- Claude Code with Figma MCP server connected
- A Figma file to target (new or existing)
- Storybook components in `src/stories/`
- Design tokens in `src/tailwind.css`
- Brand spec in `DESIGN.md`

## The Workflow

### 1. Prepare the Figma File

Create a new Figma file or use an existing one. Copy the file key from the URL:

```
https://www.figma.com/design/{FILE_KEY}/...
```

### 2. Extract Component Specs from Code

Before generating anything in Figma, extract exact values from the source code. For each component:

- Read the CVA variant definitions in `src/stories/{component}/{Component}.tsx`
- Convert Tailwind classes to pixel values (e.g., `p-6` → 24px, `rounded-xl` → 12px)
- Note which semantic tokens are used (`bg-primary`, `text-accent`, etc.)
- Resolve semantic tokens to hex values per BU using `src/tailwind.css`

This step prevents the Figma output from drifting from the code.

### 3. Generate Foundations Page

Start with the Foundations page to validate the approach:

```
Claude, create the Foundations page in my Figma file {FILE_KEY} using use_figma.
Include:
- Color swatches for each BU (from src/tailwind.css primitives)
- Shared palette (Indigo, Teal, Coral, Amber)
- Typography scale (Inter weights + JetBrains Mono)
- FUTRA wordmark in light and dark
```

### 4. Generate Component Pages

For each component, instruct Claude to create a dedicated Figma page:

```
Claude, create the Button page in Figma file {FILE_KEY}.
Use the exact specs from the design spec.
Create 5 named frames: "Button / Spend", "Button / Save", etc.
Each frame shows all variants in that BU's default theme colors.
Every element must be on its own named layer.
```

**Critical rules for Claude:**
- Each component gets its own Figma page
- Each BU gets its own top-level named frame on that page
- Every sub-element must be individually named (not flattened to one layer)
- Use `use_figma` (Plugin API), not `generate_figma_design` (screenshot capture)
- One `use_figma` call per BU frame to keep payloads manageable

### 5. Review and Iterate

After each page is generated:

1. Open the Figma file and inspect the layer structure
2. Verify layer names match the `{Component} / {BU}` convention
3. Spot-check colors against `src/tailwind.css` values
4. Compare dimensions against the component source code
5. Request fixes via Claude if anything is off

### 6. Connect to Zeroheight

Once the Figma library is complete:

1. In Zeroheight → Integrations → Connect Figma
2. Select the Figma file
3. Annotate components using the named layers

## Updating the Library

When components change in code:

1. Identify what changed (new variant, color update, dimension change)
2. Update the design spec in `docs/superpowers/specs/`
3. Ask Claude to update the specific component page in the Figma file
4. Use `use_figma` to modify existing frames rather than recreating from scratch

### Adding New Components

1. Add the component to the design spec with exact pixel values from source
2. Ask Claude to create a new page in the Figma file
3. Follow the same 5-BU-frames-per-page structure

### Theme Changes

If `src/tailwind.css` token values change:

1. Update the BU Theme Reference in the design spec
2. Ask Claude to update the Foundations color swatches
3. Update affected component frames (any that use the changed tokens)

## MCP Tools Reference

| Tool | Purpose |
|------|---------|
| `use_figma` | Execute Plugin API JS against a Figma file — creates/edits components, frames, styles. **Use this for all library work.** |
| `generate_figma_design` | Captures a web page into Figma as vectors via Playwright screenshot. **Not suitable for component libraries** — produces flattened output. |
| `create_new_file` | Creates a blank Figma file. Use if you need a fresh file. |
| `get_design_context` | Reads design context from a Figma node. Use to inspect existing library components. |

## File Locations

| File | Purpose |
|------|---------|
| `docs/superpowers/specs/2026-03-25-figma-ui-library-design.md` | Component specifications with exact values |
| `DESIGN.md` | Brand identity and design system (canonical) |
| `src/tailwind.css` | Token definitions and BU theme overrides |
| `src/stories/{component}/` | Component source code (CVA definitions) |

## Key Lessons

- **Always extract specs from code first.** Estimating dimensions leads to Figma output that doesn't match the codebase.
- **Use `use_figma`, not `generate_figma_design`.** The Plugin API creates real, editable Figma nodes. Screenshot capture creates flattened vectors.
- **Name every layer.** Zeroheight needs individually labeled layers for annotation. Instruct Claude to name each frame and sub-element explicitly.
- **One BU frame per `use_figma` call.** Keeps payloads small and errors isolated.
- **Show each BU in its default mode.** Spend and Plan render dark; Save, Credit, and Together render light.
