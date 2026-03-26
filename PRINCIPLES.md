# Design System Principles

These principles guide every decision in the Futra Financial design system — from token architecture to component APIs to build tooling. They exist to prevent the system from drifting toward complexity that doesn't serve the product.

---

## Facilitate, don't configure

Prefer shaping data and structure so that tools work out of the box over writing custom configuration to bend tools to your will. If a restructured JSON file eliminates a custom build format, restructure the JSON. The best configuration is the one you don't have to write.

## Compose, don't configure

Favor composition through children, slots, and CVA variants over deeply nested prop APIs. A component that accepts content as children is more flexible than one that accepts twelve string props — and easier to maintain when requirements change.

## Tokens are the contract

Components never own their colors — they consume semantic tokens. This single rule is what makes five business units possible from one component library. When the token layer changes, every component responds. No search-and-replace, no missed hex values. A component is never duplicated per business unit — if it needs to look different, that difference comes from the token layer, not a second implementation.

## Build small, compose up

Start with atoms that do one thing well, then assemble them into molecules and organisms. Every component earns its place by being used in at least two contexts. If it only exists in one place, it's not a component yet — it's a detail.

## Theme at the boundary, not the component

Theme switching happens once at the page shell via `data-business-unit` — individual components never know which brand they're rendering. This keeps components portable and prevents theme logic from leaking into business logic.

## Single source, no copies

Every piece of knowledge — a color value, a component implementation, a build configuration — exists in exactly one place. Token values live in `tokens.json`, not scattered across CSS files. A Navbar is one component themed via tokens, not five components with subtle drift. Documentation lives in one canonical file per topic, not duplicated across locations. When something needs to change, you change it once.
