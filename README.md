# FUTRA FINANCIAL

**Brand & Design System**
Strategy Document

[Live Demo](https://jeremysykes.github.io/futra-financial/) | [Storybook](https://jeremysykes.github.io/futra-financial/storybook/) | [Figma](https://www.figma.com/design/pMroF1oVmzBSUY99ZnmeIl/Futra-Financial---UI-Library?node-id=123-2&t=QxZJhncmyS4nXgwQ-0) | [Chromatic](https://www.chromatic.com/library?appId=69c33ccc2ed05dca54e3f9ff) | [Zero Height](https://zeroheight.com/829a17c3e/p/4577c9-futra-financial)

---

# Five products. One financial life.

Futra Financial is a consumer neobank ecosystem built for people navigating their first decade of real financial adulthood — first paycheck, first credit card, first apartment, first attempt at building something that lasts. It's not one app. It's five distinct product surfaces, each serving a different moment in that journey, all drawing from a single, coherent design system.

---

## COMPANY OVERVIEW

### What Futra is — and why it's built this way

Most neobanks pick a lane — spending, saving, or investing — and stay in it. Futra's premise is that financial health isn't a single behavior; it's a set of habits that develop at different rates, across different emotional contexts, with different interfaces serving each one.

A transaction feed demands glanceability. A credit dashboard demands calm and precision. A retirement planner demands depth. Serving all of them well requires not just good product thinking, but a design system architecture that can stretch across five surfaces without losing coherence or compromising each product's distinct character.

Futra's shared design language — a common token layer, component library, and theming framework — is what makes this possible. Each product looks and feels like Futra. None of them look or feel identical to each other.

> **CORE PREMISE**
>
> The design challenge isn't building five products. It's building one system that can serve five fundamentally different user needs without fragmenting into inconsistency or collapsing into uniformity.

---

## BUSINESS UNITS

### Five surfaces, one family

Each business unit targets a distinct demographic, occupies a different emotional register, and imposes its own interface constraints. What follows is the full profile for each — market position, demographic, competitive frame, palette, and the color story behind each set of decisions.

---

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./docs/assets/readme/spend-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./docs/assets/readme/spend-light.svg">
  <img alt="Futra Spend — The daily driver." src="./docs/assets/readme/spend-dark.svg">
</picture>

|                     |                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| **DEMOGRAPHIC**     | 22–30, urban, salaried or gig-economy. Checks their balance more than their email.                |
| **MARKET POSITION** | Mass-market neobank. Competes with Cash App and Chime — but with more information and less noise. |
| **DEFAULT MODE**    | Dark. Evening and commute usage dominates. Glanceability over depth.                              |

Futra Spend is the surface users live in — a real-time transaction feed, debit card controls, instant P2P transfers, and spending categorization. It's opened reflexively, not intentionally. The interface has to earn that trust by being fast, readable in low light, and free of dark patterns. Dark mode isn't a preference here — it's an ergonomic baseline for the 11pm "did that payment go through?" check.

#### Color palette — Spend

![Void](https://img.shields.io/badge/Void-%230F0F12?style=for-the-badge&color=0F0F12) ![Surface](https://img.shields.io/badge/Surface-%231A1A1F?style=for-the-badge&color=1A1A1F) ![Indigo](https://img.shields.io/badge/Indigo-%236C6FE4?style=for-the-badge&color=6C6FE4) ![Primary](https://img.shields.io/badge/Primary-%23FFFFFF?style=for-the-badge&color=FFFFFF) ![Muted](https://img.shields.io/badge/Muted-%238B8B9A?style=for-the-badge&color=8B8B9A) ![Debit](https://img.shields.io/badge/Debit-%23E4746C?style=for-the-badge&color=E4746C) ![Credit](https://img.shields.io/badge/Credit-%232ABFA3?style=for-the-badge&color=2ABFA3)

> _Near-black with a single electric indigo accent. Transaction amounts use teal for incoming and muted coral for outgoing — warm enough to read, never alarming. The palette is built for people who check balances between gigs: high contrast, zero decoration, total clarity at a glance._

---

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./docs/assets/readme/save-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./docs/assets/readme/save-light.svg">
  <img alt="Futra Save — Build toward something." src="./docs/assets/readme/save-dark.svg">
</picture>

|                     |                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| **DEMOGRAPHIC**     | 24–34, goal-oriented. Saving for a trip, a down payment, or an emergency fund they keep raiding.    |
| **MARKET POSITION** | Goal-based savings. Competes with Qapital and Marcus by Goldman Sachs — but warmer and more visual. |
| **DEFAULT MODE**    | Both. Light for daytime goal-setting; dark for late-night budget reviews.                           |

Futra Save is goal-based savings with visual progress mechanics. Users name their goals, set targets and timelines, and automate contributions through round-ups or scheduled transfers. Sessions are deliberate — someone opening Save is in a planning mindset, not a checking one. The interface should feel calm and motivating, like a journal you feel good about updating.

#### Color palette — Save

![Linen](https://img.shields.io/badge/Linen-%23F7F5F0?style=for-the-badge&color=F7F5F0) ![Card](https://img.shields.io/badge/Card-%23FFFFFF?style=for-the-badge&color=FFFFFF) ![Grove](https://img.shields.io/badge/Grove-%234A7C59?style=for-the-badge&color=4A7C59) ![Sage](https://img.shields.io/badge/Sage-%23A8C5B0?style=for-the-badge&color=A8C5B0) ![Mist](https://img.shields.io/badge/Mist-%23E8F0EB?style=for-the-badge&color=E8F0EB) ![Ink](https://img.shields.io/badge/Ink-%231C1C1A?style=for-the-badge&color=1C1C1A) ![Indigo](https://img.shields.io/badge/Indigo-%236C6FE4?style=for-the-badge&color=6C6FE4)

> _Warm off-white and earthy sage greens. The green palette evokes cultivation and slow growth — the emotional opposite of a trading dashboard. Indigo carries over from the core system as the action color; here it sits alongside Grove green rather than against pure black, softening its energy. Progress bars never use red or amber — percentage fill alone communicates momentum._

---

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./docs/assets/readme/credit-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./docs/assets/readme/credit-light.svg">
  <img alt="Futra Credit — Know where you stand." src="./docs/assets/readme/credit-dark.svg">
</picture>

|                     |                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **DEMOGRAPHIC**     | 23–35, building or repairing credit. Applying for apartments, car loans, or their first credit card with a real limit.   |
| **MARKET POSITION** | Credit monitoring and debt management. Competes with Credit Karma and Experian — less anxiety-inducing, more actionable. |
| **DEFAULT MODE**    | Both. High-stakes sessions need user control over their environment.                                                     |

Futra Credit is a credit score monitor, credit card manager, and debt payoff planner in one surface. It's the product people open with their stomach slightly knotted. Design decisions here carry psychological weight that doesn't exist in other surfaces — a poorly chosen red can make a "fair" score feel catastrophic. The UI deliberately uses neutral architectural language: no red for bad, no green for good. Status is communicated through structure and label, not color alone.

#### Color palette — Credit

![Iris White](https://img.shields.io/badge/Iris_White-%23F9F7FF?style=for-the-badge&color=F9F7FF) ![Lavender](https://img.shields.io/badge/Lavender-%23EEEAFF?style=for-the-badge&color=EEEAFF) ![Indigo](https://img.shields.io/badge/Indigo-%236C6FE4?style=for-the-badge&color=6C6FE4) ![Slate](https://img.shields.io/badge/Slate-%239896C8?style=for-the-badge&color=9896C8) ![Amber](https://img.shields.io/badge/Amber-%23E8A838?style=for-the-badge&color=E8A838) ![Midnight](https://img.shields.io/badge/Midnight-%231A1830?style=for-the-badge&color=1A1830) ![Periwinkle](https://img.shields.io/badge/Periwinkle-%23D4D2EE?style=for-the-badge&color=D4D2EE)

> _Soft lavender-whites and deep indigo-navy. The palette reads clinical but not cold — closer to a well-designed health app than a banking portal. Amber is the only warm accent, reserved strictly for caution states. The absence of red is a deliberate product decision: this demographic already carries financial anxiety, and the color system should not amplify it._

---

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./docs/assets/readme/plan-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./docs/assets/readme/plan-light.svg">
  <img alt="Futra Plan — Your money, mapped." src="./docs/assets/readme/plan-dark.svg">
</picture>

|                     |                                                                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DEMOGRAPHIC**     | 27–40, analytically inclined. Spreadsheet users who want a better tool. Probably has a vague retirement plan they haven't reviewed in eight months. |
| **MARKET POSITION** | Financial planning dashboard. Competes with Monarch Money, Copilot, YNAB — tighter visual aesthetic and better chart quality.                       |
| **DEFAULT MODE**    | Dark default, full light mode support. Long analytical sessions favor dark; presentation contexts favor light.                                      |

Futra Plan is the web-first financial planning surface: net worth tracking, monthly budget vs actuals, multi-year cash flow projections, and retirement runway estimation. Sessions are long and deliberate. The interface competes with spreadsheets — it has to earn trust through density, precision, and legibility of complex data. Dark mode is the default because this is the product users open at midnight with a cup of tea and a vague sense of dread that turns into clarity.

#### Color palette — Plan

![Abyss](https://img.shields.io/badge/Abyss-%230C1017?style=for-the-badge&color=0C1017) ![Deep](https://img.shields.io/badge/Deep-%23151E2B?style=for-the-badge&color=151E2B) ![Surface](https://img.shields.io/badge/Surface-%231F2D3D?style=for-the-badge&color=1F2D3D) ![Indigo](https://img.shields.io/badge/Indigo-%236C6FE4?style=for-the-badge&color=6C6FE4) ![Teal](https://img.shields.io/badge/Teal-%232ABFA3?style=for-the-badge&color=2ABFA3) ![Amber](https://img.shields.io/badge/Amber-%23E8A838?style=for-the-badge&color=E8A838) ![Steel](https://img.shields.io/badge/Steel-%23A0AEC0?style=for-the-badge&color=A0AEC0)

> _Deep blue-blacks with a three-color data vocabulary: indigo for primary series and interactive elements, teal for secondary data and positive variance, amber for caution and negative variance. Steel gray handles secondary text and axis labels. The palette is borrowed from professional data tools — Bloomberg terminal energy, without the chaos. Chart readability at high density is the primary constraint every color decision is made against._

---

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./docs/assets/readme/together-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./docs/assets/readme/together-light.svg">
  <img alt="Futra Together — Shared money, shared life." src="./docs/assets/readme/together-dark.svg">
</picture>

|                     |                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **DEMOGRAPHIC**     | 25–38, cohabitating couples or roommates actively trying to stop arguing about money.                                                      |
| **MARKET POSITION** | Shared household finances. Competes with Honeydue and Splitwise — but with actual banking integration and a more grown-up visual register. |
| **DEFAULT MODE**    | Light default. Used collaboratively, face-to-face, on a shared screen.                                                                     |

Futra Together is a shared finances surface for households — joint accounts, shared savings goals, bill tracking, and contribution management for two or more people. It's the only Futra surface that gets used collaboratively, face-to-face, on a shared screen. The critical design constraint: no visual hierarchy between users. Neither person's money or contributions should feel more prominent than the other's.

#### Color palette — Together

![Warm White](https://img.shields.io/badge/Warm_White-%23FFF9F5?style=for-the-badge&color=FFF9F5) ![Card](https://img.shields.io/badge/Card-%23FFFFFF?style=for-the-badge&color=FFFFFF) ![Terracotta](https://img.shields.io/badge/Terracotta-%23C4622D?style=for-the-badge&color=C4622D) ![Indigo](https://img.shields.io/badge/Indigo-%236C6FE4?style=for-the-badge&color=6C6FE4) ![Blush](https://img.shields.io/badge/Blush-%23F2E4DA?style=for-the-badge&color=F2E4DA) ![Espresso](https://img.shields.io/badge/Espresso-%231C1A18?style=for-the-badge&color=1C1A18) ![Clay](https://img.shields.io/badge/Clay-%239E8E84?style=for-the-badge&color=9E8E84)

> _Warm whites and terracotta — the only Futra surface that moves away from cool neutrals. The warmth signals domesticity and shared life rather than individual financial management. User attribution uses indigo for one person and terracotta for the other — two equally weighted, visually distinct colors with no warm/cool implication of positive/negative._

---

## DESIGN SYSTEM RATIONALE

### Why one system across five surfaces — and why that's the hard part

Futra Financial exists as a multi-surface ecosystem by design, not by accident. Each business unit targets a distinct demographic, occupies a different emotional register, and imposes its own interface constraints — from the glanceable darkness of Spend to the warm collaborative light of Together. Building five separate design languages would have been easier in the short term. It would also have been wrong.

The challenge Futra represents — and the challenge that makes it worth building — is the architecture problem underneath the visual one. A shared design system across five products isn't a shared color file. It's a layered token architecture where primitive values (raw color, spacing, radius) feed semantic tokens (surface, on-surface, status-positive, status-caution) that in turn feed component-level decisions. Each product surface consumes the same component library but maps its own semantic theme on top of the shared primitives. Futra Spend and Futra Save use the same Card component — they just resolve to different token values at render time.

This structure is what lets indigo (#6C6FE4) travel across all five products as the primary action color while each surface maintains a completely distinct visual identity. The system constraint forces coherence; the theming layer enables differentiation. Getting that boundary right — deciding what belongs in the shared layer and what belongs in the product layer — is the actual design systems work. The color palettes are the visible output of that decision-making, not the decision itself.

> **WHAT THIS DEMONSTRATES**
>
> Futra is a portfolio construct designed to show how a single design system can serve multiple products with meaningfully different audiences, interaction patterns, and emotional contexts — without fragmenting into inconsistency or collapsing into uniformity. The real skill on display isn't building five UIs. It's knowing when two surfaces should share a component and when they shouldn't, and building the token and theming infrastructure that makes both possible at the same time.

### Capabilities demonstrated

Multi-brand theming · Semantic token architecture · Cross-surface component reuse · Light/dark mode strategy · Demographic-driven design decisions · Design-to-code pipeline

---

_Futra Financial — Brand & Design System Strategy_
_Jeremy Sykes_
