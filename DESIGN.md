---
version: alpha
name: DevToolbox
description: A dense, dark-only, terminal-inspired workspace for 129 browser-based developer tools.
colors:
  background: "#0b0d13"
  foreground: "#e7ebef"
  card: "#12141c"
  card-foreground: "#e7ebef"
  popover: "#12141c"
  popover-foreground: "#e7ebef"
  primary: "#06d0f9"
  primary-foreground: "#0b0d13"
  secondary: "#1d202a"
  secondary-foreground: "#d1d9e0"
  muted: "#1d202a"
  muted-foreground: "#7e889a"
  accent: "#06d0f9"
  accent-foreground: "#0b0d13"
  destructive: "#7c1d1d"
  destructive-foreground: "#f8fafc"
  border: "#23262f"
  ring: "#06d0f9"
  danger: "#f87171"
  success: "#4ade80"
  warning: "#fbbf24"
typography:
  body:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.43
  meta:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33
  chip:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.45
  data:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
  data-small:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33
  title:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.56
  wordmark:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.5
  button:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.43
  badge:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.33
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  full: 9999px
spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  6: 24px
  8: 32px
components:
  app-shell:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
  catalogue-header:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    height: 52px
  wordmark:
    textColor: "{colors.foreground}"
    typography: "{typography.wordmark}"
  tool-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    typography: "{typography.data}"
    rounded: "{rounded.md}"
    padding: "{spacing.3}"
    height: 52px
  tool-card-icon:
    backgroundColor: "color-mix(in srgb, #06d0f9 10%, #12141c)"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    size: 32px
  tool-title:
    textColor: "{colors.foreground}"
    typography: "{typography.title}"
  section-label:
    textColor: "{colors.muted-foreground}"
    typography: "{typography.meta}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    height: 40px
    padding: "{spacing.4}"
  button-primary-hover:
    backgroundColor: "color-mix(in srgb, #06d0f9 90%, #0b0d13)"
    textColor: "{colors.primary-foreground}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    height: 40px
    padding: "{spacing.4}"
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    height: 40px
    padding: "{spacing.4}"
  field:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    height: 40px
    padding: "{spacing.3}"
  form-label:
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
  helper-text:
    textColor: "{colors.muted-foreground}"
    typography: "{typography.meta}"
  output-block:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
    typography: "{typography.data}"
    rounded: "{rounded.md}"
    padding: "{spacing.3}"
  choice-chip:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.chip}"
    rounded: "{rounded.full}"
    height: 22px
    padding: "{spacing.2}"
  choice-chip-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.chip}"
    rounded: "{rounded.full}"
    height: 22px
    padding: "{spacing.2}"
  badge:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.badge}"
    rounded: "{rounded.full}"
    padding: "{spacing.2}"
  popover:
    backgroundColor: "{colors.popover}"
    textColor: "{colors.popover-foreground}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.2}"
  selection:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
  focus-ring:
    textColor: "{colors.ring}"
  divider:
    backgroundColor: "{colors.border}"
  error-text:
    textColor: "{colors.danger}"
    typography: "{typography.data-small}"
  success-text:
    textColor: "{colors.success}"
    typography: "{typography.data-small}"
  warning-text:
    textColor: "{colors.warning}"
    typography: "{typography.data-small}"
---

# DevToolbox Design Contract

## Overview

DevToolbox is a **dense, dark-only utility workspace**, not a marketing landing page. Developers arrive with a task, find a tool in seconds, and leave. The catalogue is the product: search, categories and 129 tool rows are visible immediately, with no hero, scroll-jacking or onboarding.

The interface should feel **precise, quiet and fast**, like a well-organised terminal dashboard. Information density is a feature. Chrome recedes so data, labels and results can lead. The visual identity comes from three things: a near-black surface stack, a single cyan accent, and the pairing of Inter for UI copy with JetBrains Mono for machine data.

Use these principles when a rule below does not cover a case:

1. **Density over decoration.** Prefer one more useful row to one more decorative element.
2. **One accent.** Cyan marks the primary action, the active filter, focus and live emphasis — nothing else.
3. **Mono for machines.** Tool names, IDs, code, output and numeric data are JetBrains Mono. Prose is Inter.
4. **Borders over shadows.** Separate surfaces with tonal steps and 1px borders, not elevation.
5. **Fast feedback, no ceremony.** State changes are immediate and legible; motion is functional, never theatrical.
6. **Accessible by default.** Every control has a name, every state has more than colour, every action works from the keyboard.

Out of scope for this identity: a light theme, lifestyle imagery, large rounded marketing cards, gradients, glows, glassmorphism beyond the existing sticky-header blur, and scroll-triggered animation.

## Colors

The product is dark-only. The dark theme is the source of truth; the unused light values in `src/index.css` are legacy shadcn/ui scaffolding and must not be exposed as a user-facing theme.

### Surfaces

| Token | Hex | Role |
| --- | --- | --- |
| `background` | `#0b0d13` | Page canvas, field interiors |
| `card` | `#12141c` | Sticky header, tool cards, panels |
| `secondary` / `muted` | `#1d202a` | Chips, secondary buttons, output blocks |
| `border` | `#23262f` | All 1px borders, input outlines, dividers |
| `popover` | `#12141c` | Command palette, select menus, tooltips |

`--input` mirrors `border` (`#23262f`) and exists only to keep the shadcn variable contract intact. Do not introduce a new gray for an input outline.

### Text and accent

| Token | Hex | Contrast | Use |
| --- | --- | --- | --- |
| `foreground` | `#e7ebef` | 16.21:1 on background | Primary text, headings, data |
| `muted-foreground` | `#7e889a` | 5.43:1 on background; 4.55:1 on secondary | Metadata, captions, placeholders |
| `secondary-foreground` | `#d1d9e0` | 11.38:1 on secondary | Text on chips and secondary buttons |
| `primary` | `#06d0f9` | 10.54:1 on background | Primary action, active state, links, focus |
| `primary-foreground` | `#0b0d13` | 10.54:1 on primary | Text and icons on cyan |
| `ring` | `#06d0f9` | 10.54:1 on background | Focus ring only |

Cyan is a **spot colour**, not a surface colour. Do not fill a page section with it, set body copy in it, or add cyan glows. One primary action per view is enough. On cyan, always use `primary-foreground`; white text on cyan fails contrast.

### Semantic states

| Token | Hex | Contrast | Use |
| --- | --- | --- | --- |
| `danger` | `#f87171` | 7.02:1 on background; 5.87:1 on secondary | Error text and error icons |
| `success` | `#4ade80` | 11.15:1 on background; 9.33:1 on secondary | Success text and confirmation icons |
| `warning` | `#fbbf24` | 11.63:1 on background; 9.73:1 on secondary | Warnings and caution states |
| `destructive` | `#7c1d1d` | Filled surface only | Destructive button and badge backgrounds |
| `destructive-foreground` | `#f8fafc` | 9.79:1 on destructive | Text on a destructive fill |

**Important:** `destructive` is a fill token, not a text token. `text-destructive` (`#7c1d1d`) on `bg-secondary` is **1.59:1** and on `background` is **1.90:1**, so it is unreadable. Use `text-danger` for error copy and `bg-destructive text-destructive-foreground` only for filled destructive controls. The existing `text-destructive` usages in tool components are known debt to migrate when those files are next touched.

Never communicate status with colour alone. Pair the colour with a word, an icon and an `aria-live` announcement where the state changes asynchronously.

## Typography

Inter carries the interface; JetBrains Mono carries anything a developer would copy, compare or scan as data. Both are loaded from Google Fonts with `display=swap` and preconnect hints in `index.html`.

| Token | Family | Size / weight / line height | Use |
| --- | --- | --- | --- |
| `body` | Inter | 14 / 400 / 1.43 | Tool descriptions, panel copy, menu items |
| `label` | Inter | 14 / 500 / 1.43 | Form labels, control labels |
| `meta` | Inter | 12 / 400 / 1.33 | Captions, helper text, counts, empty states |
| `chip` | Inter | 11 / 500 / 1.45 | Category and filter chips |
| `data` | JetBrains Mono | 14 / 400 / 1.43 | Card names, output, code, values |
| `data-small` | JetBrains Mono | 12 / 400 / 1.33 | Inline errors, key hints, secondary data |
| `title` | JetBrains Mono | 18 / 700 / 1.56 | Tool page title |
| `wordmark` | JetBrains Mono | 16 / 700 / 1.5 | “DevToolbox” header mark |
| `button` | Inter | 14 / 500 / 1.43 | Button labels |
| `badge` | Inter | 12 / 600 / 1.33 | Badges and small status pills |

Rules:

- Body and UI copy never go below **14px**; 12px is reserved for metadata, and 11px for filter chips. The only 9px text is the decorative `⌘K` keycap, which is duplicated by the search field's accessible name.
- Use `font-variant-numeric: tabular-nums` for numeric columns, timers, byte counts and generated values so digits do not jump.
- Use the ellipsis character `…`, curly quotes in prose, and non-breaking spaces in units (`10&nbsp;MB`) and key combinations (`⌘&nbsp;K`). Loading and pending labels end with `…`.
- Do not set prose in mono. Do not use more than three font weights in one panel.
- Long machine strings must wrap or scroll inside their container. Use `min-w-0` on flex children, `truncate` for one-line labels, and `break-all` / `overflow-x-auto` for hashes, URLs and code. Never let output widen the page.
- Headings may use `text-wrap: balance`; body copy may use `text-wrap: pretty`. Do not hard-code line breaks.

## Layout

The layout is a **fixed-max-width, dense grid** with a compact sticky header. There are two containers:

| Surface | Max width | Tailwind | Gutter |
| --- | --- | --- | --- |
| Catalogue and header | 1152px | `max-w-6xl` | 16px (`px-4`) |
| Tool page | 1024px | `max-w-5xl` | 16px (`px-4`) |

The catalogue is the first screen: header, category filter row and tool grid. Never insert a hero, a feature section or a full-screen intro above it.

### Grid and spacing

- Spacing follows a **4px base**: 4, 8, 12, 16, 24, 32, 40, 64. Use 8px between tool cards; 12–16px inside compact controls; 24px between tool sections.
- Tool grid: 2 columns below 640px, 3 at `sm`, 4 at `md`, 5 at `lg` and above. Cards are 52px tall with 8px gaps.
- The category row scrolls horizontally inside its own container (`overflow-x-auto`, hidden scrollbar). The page itself must never scroll horizontally.
- The sticky header is 52px tall, uses `bg-card/90`, `backdrop-blur-md` and a bottom border. It must not cover a focused element; add scroll margin when linking to in-page anchors.
- Tool pages use a compact header band (title + description) followed by a single `main` region with 24px vertical padding. Controls stack above output; on wide screens, paired inputs may sit side by side.
- Prefer flex/grid over JS measurement. Do not read `offsetWidth`, `getBoundingClientRect` or `scrollTop` during render.

### Breakpoints and touch

Tailwind defaults apply: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. Design at 360px first for the catalogue, then verify 768px, 1024px and 1440px.

Interactive targets should be **at least 44×44px** on coarse pointers. A dense desktop control may look 32–40px tall, but its hit area must expand to 44px on touch. Do not hide a primary action behind hover. The current tool-card star button is roughly 22px and hover-only; it is a known gap for the next UI phase and must not be copied into new components.

## Elevation & Depth

The system is **flat**. Hierarchy comes from tonal surfaces and 1px borders:

- `background` is the page; `card` lifts panels and the header; `secondary` / `muted` recesses output blocks and chips.
- Do not add `box-shadow` to page sections, cards, buttons or inputs. Do not add glows (`glow-cyan` has been removed and must not return).
- Floating overlays that detach from the page — command palette, select content, dropdown, tooltip — may use one soft neutral shadow (`shadow-md` / `shadow-lg`) plus a border. No coloured shadows.
- The focus ring is the strongest depth cue. Keep it visible above borders and backgrounds.
- Use the existing z-index ladder: page content 0, sticky header 50, overlays/dialogs 50, toasts above overlays. Do not invent new values without checking existing primitives.

## Motion

Motion exists to explain a state change, not to decorate.

- Use 150ms `ease-out` for colour, border, background and opacity changes; 200ms for accordion or overlay entry. Nothing longer than 300ms.
- Animate only `transform` and `opacity` where possible. Never use `transition: all`; list the properties.
- Hover, focus and active states must remain understandable with motion disabled. Never make an action discoverable only on hover.
- Honour `prefers-reduced-motion: reduce`: remove non-essential transforms and looping animation; keep instant state changes.
- No scroll-triggered reveals, parallax, autoplaying decorative loops, bouncing loaders or page transitions. Content must be present without waiting for an animation.

## Shapes

- Radius scale: `sm` 4px, `md` 6px, `lg` 8px, `full` 9999px.
- Default controls, tool cards and inputs use **6px** (`rounded-md`). Small icon tiles use **4px**. Overlays and large panels use **8px**. Chips, badges and avatars use **full**.
- Use 1px borders. The only 2px line in the system is the focus ring; do not use 2px borders for decoration.
- Do not mix radius families in one group. A row of buttons must share the same radius; a row of chips must all be pills.
- No clipped corners, blobs, tilted cards, sticker shadows or decorative squiggles. Iconography is Lucide, 16px inside compact controls and 20px for standalone navigation, with a consistent stroke.

## Components

### Catalogue header

Sticky at 52px with `bg-card/90`, `backdrop-blur-md`, a bottom `border` and a 1152px container. Left: cyan Lucide terminal icon plus the mono `wordmark`. Centre: a 32px search field on a `secondary` surface with a muted search icon and a 12px mono placeholder (`Search 129 tools…`). Right: a favourites toggle and the decorative `⌘K` keycap.

The search field must have an accessible name (`aria-label` or a real label) and a visible focus ring. The favourites toggle uses `aria-pressed` and never relies on the star icon alone.

### Category filter

A horizontally scrollable row under the header. Each chip is 22px tall, full-radius, 11px medium Inter, with 8px horizontal padding. Inactive chips use `secondary` / `secondary-foreground`; the active chip uses `primary` / `primary-foreground`. The row must be keyboard reachable and must not cause page-level horizontal scroll. Use `aria-pressed` for the selected chip.

### Tool card

A 52px row on `card`, 6px radius, 1px border, 12px horizontal padding and an 8px gap in the grid. Leading 32px icon tile on `primary/10` with a cyan icon; the tool name is 14px mono, single-line with `truncate`. On hover or `focus-within`, the border becomes `primary/50`; the card itself is a link with a visible focus ring.

The favourite star is a separate button inside the card, with `aria-pressed`, a descriptive `aria-label` and a 44px hit area. It must remain reachable and visible on touch devices; hover-only reveal is not acceptable for the primary interaction on the card.

### Tool page shell

A compact header band on `card` with a 1024px container, a ghost back button (`aria-label="Back to all tools"`), an 18px mono bold title and a 14px muted description. The back button needs a 44px hit area even if its visual box is 40px. Below, `main` uses the same 1024px container and 24px vertical padding.

Tool controls stack in the order: inputs, action, output. Every result region has a label or an accessible name; read-only output textareas use the shared `Output` fallback label. Copy actions are icon buttons with explicit labels such as `Copy Dockerfile`.

### Inputs, selects and textareas

All fields are 40px tall, 6px radius, 1px `border`, page-coloured interior, 12px horizontal padding and 14px Inter text (16px below 768px to avoid iOS zoom). Placeholders use `muted-foreground` and end with `…` where they show a pattern. Focus uses a 2px cyan ring with a 2px offset.

Every field has a programmatic name: a real `<label htmlFor>`, a wrapping `<label>` around a native control, or an `aria-label` when the visual caption is intentionally separate. A visible caption that is not associated with a control must be a `<span>`, not an orphan `<label>`. Do not use the placeholder as the only label.

Errors are inline, next to the field, with `aria-invalid` and `aria-describedby`. Error text is `danger`, not `destructive`. A successful or warning state uses the matching semantic token and a word/icon, never colour alone.

### Buttons

| Variant | Surface | Text | Use |
| --- | --- | --- | --- |
| `default` (primary) | `primary` | `primary-foreground` | The single main action |
| `secondary` | `secondary` | `secondary-foreground` | Alternate actions |
| `outline` | transparent, `border` | `foreground` | Tertiary actions |
| `ghost` | transparent | `foreground` / `accent` on hover | Icon buttons, back navigation |
| `destructive` | `destructive` | `destructive-foreground` | Confirmed destructive actions only |
| `link` | transparent | `primary` | Inline navigation |

Default height is 40px; `sm` is 36px, `lg` is 44px, and icon buttons are 40×40px visually with a 44px touch target. Labels are 14px/500 Inter. Hover reduces the fill to 90% opacity (or `secondary/80`); focus uses the 2px ring; disabled is 50% opacity with pointer events removed. No button may be identified by colour alone — the label states the action (“Generate UUID”, not “Go”).

### Output and status

Output blocks use a `muted` surface, 6px radius, 12px padding and 14px mono text. The block may scroll internally for long content but must not widen the page. Validation and async feedback use `role="alert"` or `aria-live="polite"` and appear next to the control that caused them.

Error copy says what happened and what to do next. Do not render a blank panel for an empty result: show a short empty state or keep the last valid output with a clear status.

### Command palette and overlays

The command palette, select menus and tooltips use the `popover` surface, 1px border and a soft neutral shadow. The command palette uses an 8px radius; select menus and tooltips use 6px. The palette opens with `⌘K` / `Ctrl+K`, traps focus while open, closes on `Escape`, and returns focus to the trigger. Rows are keyboard navigable; the active row is visibly distinct, not just hovered. Tooltips are supplementary only — never put the only copy of an instruction in a tooltip.

### Focus

Every interactive element has a visible `focus-visible` ring: 2px `ring` with a 2px offset on the page background. Never remove the outline without an equivalent replacement. Use `:focus-within` for compound controls such as a colour picker plus hex field. A sticky header must not obscure the focused element.

### Empty, loading and error states

- Empty: one short line, optional icon, and a clear next action (“Clear filters”, “Paste JSON to begin”).
- Loading: text ending in `…` and, if longer than a second, a restrained indicator. Keep layout dimensions stable.
- Error: semantic `danger`, inline, with an actionable sentence. Offer a retry or a link back to the input.
- Not found: a real page with a heading, explanation and link home; never a blank screen or a raw stack trace.

## Do's and Don'ts

- **Do** put the catalogue and search above the fold. **Don't** add a hero or a one-section-per-screen marketing flow.
- **Do** use cyan for one primary action, the active filter and focus. **Don't** paint panels, headings or body copy cyan.
- **Do** separate surfaces with tonal steps and 1px borders. **Don't** add glows, gradient text, coloured shadows or glassmorphism.
- **Do** set tool names, code, IDs and numeric output in JetBrains Mono. **Don't** set prose in mono.
- **Do** keep rows dense and scannable. **Don't** enlarge cards or spacing to fill space.
- **Do** give every control a programmatic name. **Don't** use a placeholder as the only label or an orphan `<label>` as a caption.
- **Do** use `text-danger` for error text. **Don't** use `text-destructive`; it is a fill token and fails contrast on dark surfaces.
- **Do** keep text at 4.5:1 or better. **Don't** use `muted-foreground` for essential instructions, especially below 14px.
- **Do** make touch targets at least 44×44px. **Don't** hide primary actions behind hover or make icon buttons smaller than their hit area.
- **Do** honour `prefers-reduced-motion`. **Don't** add scroll reveals, parallax or looping decoration.
- **Do** use `…`, curly quotes and specific button labels. **Don't** use “...” or “Submit” / “Click here”.
- **Do** test at 360px and 200% zoom. **Don't** introduce page-level horizontal scrolling or clipped text.
- **Do** keep every tool local to the browser. **Don't** add a network call for user input.

## Verification

`npm run design:lint` validates this file's structure and token references. `npm run lint` includes `eslint-plugin-jsx-a11y` for hand-written UI. The manual and automated review gate lives in [docs/UI-REVIEW.md](docs/UI-REVIEW.md); use it for every UI pull request.
