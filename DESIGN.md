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
  page-title:
    fontFamily: JetBrains Mono
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.2
  display:
    fontFamily: JetBrains Mono
    fontSize: 52px
    fontWeight: 700
    lineHeight: 1.08
  section:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.4
  lead:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
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
  site-header:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    height: 52px
  site-footer:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
  page-header:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    typography: "{typography.page-title}"
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

DevToolbox is a **dense, dark-only utility workspace** with a small editorial front door. Developers arrive with a task, get to the right tool in seconds and leave. The catalogue is still the product, but it now has a proper entry sequence: a homepage that explains the workbench and indexes the catalogue, a directory for search and filtering, a short usage guide, and tool pages that stay focused on the work.

The interface should feel **precise, quiet and fast**, like a well-organised terminal field guide. Information density is a feature. Chrome recedes so data, labels and results can lead. The visual identity comes from three things: a near-black surface stack, a single cyan accent, and the pairing of Inter for UI copy with JetBrains Mono for machine data and headings.

Use these principles when a rule below does not cover a case:

1. **Density over decoration.** Prefer one more useful row to one more decorative element.
2. **One accent.** Cyan marks the primary action, the active filter, focus and live emphasis — nothing else.
3. **Mono for machines.** Tool names, IDs, code, output and numeric data are JetBrains Mono. Prose is Inter.
4. **Borders over shadows.** Separate surfaces with tonal steps and 1px borders, not elevation.
5. **Fast feedback, no ceremony.** State changes are immediate and legible; motion is functional, never theatrical.
6. **Accessible by default.** Every control has a name, every state has more than colour, every action works from the keyboard.

Out of scope for this identity: a light theme, lifestyle imagery, large rounded marketing cards, gradients, glows, glassmorphism beyond the existing sticky-header blur, and scroll-triggered animation. The homepage is an index, not a sales funnel: no testimonial walls, logo clouds, pricing tables or feature-card soup.

## Information architecture

There are four surfaces, all wrapped by one sticky header and one footer:

| Route | Surface | Job |
| --- | --- | --- |
| `/` | Homepage | State the promise, search, index 12 categories, surface popular and recent tools, explain privacy |
| `/tools` | Directory | Search, filter by category or favourites, browse all 129 tools |
| `/usage` | Usage guide | Explain finding, working, keeping results, shortcuts and privacy |
| `/tool/:id` | Tool page | Run one tool, then offer notes and related tools |

Rules:

- The header is global: brand, `Tools` and `Usage` navigation with a current-page underline, and the quick-open trigger. Do not duplicate search fields there; search belongs on the homepage and the directory.
- The footer closes every route with a one-line description, the privacy statement, and links to Home, All tools, Usage, GitHub, the MIT license and favourites.
- Every surface starts with `<main id="main-content" tabIndex={-1}>`, so `RouteFocus` can move focus after client-side navigation.
- Breadcrumbs appear on the directory, usage guide and tool pages. The homepage is the root and has none.
- The directory and tool pages are the only places that render the 129-tool catalogue. The homepage only renders a curated index and short lists; do not eagerly mount every tool card there.
- Keep URLs shareable: `q`, `category` and `view=favorites` live in the directory query string.


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

**Important:** `destructive` is a fill token, not a text token. `text-destructive` (`#7c1d1d`) on `bg-secondary` is **1.59:1** and on `background` is **1.90:1**, so it is unreadable. Use `text-danger` for error copy and `bg-destructive text-destructive-foreground` only for filled destructive controls. All error text in tool components now uses `text-danger`; do not reintroduce `text-destructive` as a text colour.

Never communicate status with colour alone. Pair the colour with a word, an icon and an `aria-live` announcement where the state changes asynchronously.

## Typography

Inter carries the interface; JetBrains Mono carries anything a developer would copy, compare or scan as data. Both are self-hosted through Fontsource with `font-display: swap`, so first paint never waits on a third-party font stylesheet.

| Token | Family | Size / weight / line height | Use |
| --- | --- | --- | --- |
| `body` | Inter | 14 / 400 / 1.43 | Tool descriptions, panel copy, menu items |
| `label` | Inter | 14 / 500 / 1.43 | Form labels, control labels |
| `meta` | Inter | 12 / 400 / 1.33 | Captions, helper text, counts, empty states |
| `chip` | Inter | 11 / 500 / 1.45 | Category and filter chips |
| `data` | JetBrains Mono | 14 / 400 / 1.43 | Card names, output, code, values |
| `data-small` | JetBrains Mono | 12 / 400 / 1.33 | Inline errors, key hints, secondary data |
| `title` | JetBrains Mono | 18 / 700 / 1.56 | Tool page title |
| `page-title` | JetBrains Mono | 30–36 / 700 / 1.2 | Directory and guide page titles |
| `display` | JetBrains Mono | 36–52 / 700 / 1.08 | Homepage statement only |
| `section` | JetBrains Mono | 16 / 700 / 1.4 | Section rules and card headings |
| `lead` | Inter | 16 / 400 / 1.6 | Homepage and guide standfirst |
| `wordmark` | JetBrains Mono | 16 / 700 / 1.5 | “DevToolbox” header mark |
| `button` | Inter | 14 / 500 / 1.43 | Button labels |
| `badge` | Inter | 12 / 600 / 1.33 | Badges and small status pills |

Rules:

- Body and UI copy never go below **14px**. 12px is reserved for metadata, captions and helper text; 11px for filter chips, counts, index numbers and keycaps. Never introduce text below 11px.
- Use the display size once per page, on the homepage statement. Directory, guide and tool titles step down from it; do not set body copy at display size.
- Use `font-variant-numeric: tabular-nums` for numeric columns, timers, byte counts, counts and generated values so digits do not jump.
- Use the ellipsis character `…`, curly quotes in prose, and non-breaking spaces in units (`10&nbsp;MB`) and key combinations (`⌘&nbsp;K`). Loading and pending labels end with `…`.
- Do not set prose in mono. Do not use more than three font weights in one panel.
- Long machine strings must wrap or scroll inside their container. Use `min-w-0` on flex children, `truncate` for one-line labels, and `break-all` / `overflow-x-auto` for hashes, URLs and code. Never let output widen the page.
- Headings may use `text-wrap: balance`; body copy may use `text-wrap: pretty`. Do not hard-code line breaks.

## Layout

The layout is a **fixed-max-width, dense grid** with a compact sticky header. There are two containers:

| Surface | Max width | Tailwind | Gutter |
| --- | --- | --- | --- |
| Homepage, directory, guide, header and footer | 1152px | `max-w-6xl` | 16px (`px-4`) |
| Tool page | 1024px | `max-w-5xl` | 16px (`px-4`) |
| Guide reading column | 768px | `max-w-3xl` | none inside the grid |

Each surface has one job and one first screen:

- **Homepage.** Two columns from `lg`: a statement, working search and three assurances on the left (7/12); the typeset category index on the right (5/12). Below, section rules introduce popular tools, recent tools, a three-step explanation and a privacy band. The catalogue grid does not appear here.
- **Directory.** A page-header band with breadcrumbs, title and counts, then a filter bar with search, the favourites toggle and one horizontally scrollable category row, then the tool grid. The result count sits above the grid and updates as filters change.
- **Usage guide.** A 200px sticky section index beside a `max-w-3xl` article at `lg`, stacked below. Sections use numbered rules and `scroll-mt-24` so the sticky header does not cover anchors.
- **Tool page.** A page-header band with breadcrumbs, tool name, description and a “Runs locally” badge, followed by the tool component, then tool notes and four related tools in a two-column rule-separated list.

Do not put the full 129-tool grid on the homepage. Do not add a second global navigation row. Do not fill the homepage with feature cards: the category index and working search are the primary content.

### Grid and spacing

- Spacing follows a **4px base**: 4, 8, 12, 16, 24, 32, 40, 64. Use 8px between tool cards; 12–16px inside compact controls; 24px between tool sections.
- Tool grid: 2 columns below 640px, 3 at `sm`, 4 at `md`, 5 at `lg` and above. Cards are 52px tall with 8px gaps. This grid belongs to the directory, not the homepage.
- The category row scrolls horizontally below `lg` and wraps at `lg` and above, so every category is visible without a hidden scroll gesture.
- The sticky header is 52px tall, uses `bg-card/90`, `backdrop-blur-md` and a bottom border. It must not cover a focused element; add scroll margin when linking to in-page anchors.
- Homepage and guide section rules are full-width 1px `border` lines with 20–24px of space below, not enclosed cards. Reserve panels for the category index, the privacy band and the guide CTA.
- Prefer flex/grid over JS measurement. Do not read `offsetWidth`, `getBoundingClientRect` or `scrollTop` during render.

### Breakpoints and touch

Tailwind defaults apply: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. Design at 360px first for the catalogue, then verify 768px, 1024px and 1440px.

Interactive targets are **at least 44×44px** on coarse pointers. A dense desktop control may look 32–40px tall, but its hit area must expand to 44px on touch. The shared `touch-target` and `touch-target-y` utilities, the `Button` primitive and the 22px category chips all expand under `@media (pointer: coarse)`. The tool-card star is a permanent 44px target and is never hover-only.

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
- Honour `prefers-reduced-motion: reduce`: remove non-essential transforms and looping animation; keep instant state changes. `src/index.css` enforces this globally for every primitive and overlay, including Radix enter/exit animations.
- No scroll-triggered reveals, parallax, autoplaying decorative loops, bouncing loaders or page transitions. Content must be present without waiting for an animation.

## Shapes

- Radius scale: `sm` 4px, `md` 6px, `lg` 8px, `full` 9999px.
- Default controls, tool cards and inputs use **6px** (`rounded-md`). Small icon tiles use **4px**. Overlays and large panels use **8px**. Chips, badges and avatars use **full**.
- Use 1px borders. The only 2px line in the system is the focus ring; do not use 2px borders for decoration.
- Do not mix radius families in one group. A row of buttons must share the same radius; a row of chips must all be pills.
- No clipped corners, blobs, tilted cards, sticker shadows or decorative squiggles. Product iconography is Lucide, 16px inside compact controls and 20px for standalone navigation, with a consistent stroke. The brand mark is the only custom SVG.

## Components

### Site header

Sticky at 52px with `bg-card/90`, `backdrop-blur-md`, a bottom `border` and a 1152px container. Left: the 24px DevToolbox brand mark — a cyan tile with a dark terminal prompt — plus the mono `wordmark`, hidden below `sm` so the nav fits. Centre-left: `Tools` and `Usage` links with a 2px current-page underline in `primary` and `aria-current="page"`. Right: the visible quick-open trigger with a decorative `⌘&nbsp;K` keycap.

The header carries no search field and no favourites toggle; those live on the homepage and directory. Navigation links keep a 44px hit area on coarse pointers, a visible focus ring, and enough gap at 360px that the wordmark may disappear before the links wrap.

### Site footer

A `card/40` band with a top border on every route. Three columns at `lg`: the brand mark, a one-line description and the local-only statement; Explore links (Home, All tools, Usage); Project links (GitHub, MIT license, favourites). A bottom rule carries the copyright and the mono `129 tools · no account · no telemetry` line. External links open in a new tab, include `rel="noreferrer"` and announce `(opens in a new tab)` to screen readers. Footer links may be 14px but still need a 44px vertical hit area on touch.

### Homepage

The opening section is a **typeset statement**, not a marketing hero: an eyebrow with a cyan dot (“Local-first developer tools”), a display mono H1 (“129 tools. One local workbench.”), a `lead` paragraph, a working search form and three inline assurances (runs locally, no uploads, quick open). Search submits to `/tools?q=…`; it has a real label and a 44px button. Below the statement, the right column holds the category index.

The rest of the page is a sequence of rule-separated sections: eight popular tools in a two-column list, recent tools when local history exists, a three-step explanation of find / work / keep, and a privacy band. Use `SectionHeading` for the rule-and-title treatment and `ToolLink` for dense rows. Do not render the full catalogue, feature-card grids or testimonials.

### Directory

A page-header band with breadcrumbs, the H1 `All 129 developer tools`, a short description and a mono count. The filter bar contains a labelled search field (clear button when non-empty), a favourites toggle with `aria-pressed` and a live count, and a category chip row that scrolls horizontally. Category, query and favourites are URL-backed: filters use `setSearchParams` and browser back restores the previous view.

The result count is a polite live region (“13 tools in Formatters”). When filters are active, offer one Clear filters action. With no filters and local usage history, show a “Most used” list above the grid. Empty states distinguish no favourites from no search matches and always offer a visible next action.

### Usage guide

A page-header band with breadcrumbs and the H1, then a two-column layout at `lg`: a sticky “On this page” index with numbered anchor links, and a `max-w-3xl` article. Six numbered sections cover finding a tool, working with a tool, keeping results, keyboard shortcuts, privacy and troubleshooting. Shortcuts use a real table with `<th scope>`; troubleshooting uses native `<details>`; the guide closes with a CTA back to the directory and the issue tracker. Inline links inside prose carry a permanent underline, not colour alone.

### Category index

A `card` panel with an 8px radius and a header row (“Index”, “12 categories”). Each of the 12 category rows is a 40px link with a two-digit index, the category name, a dotted leader and the tool count, ending in an arrow. Rows separate with 1px dividers; hover raises the row to `secondary/60`. The panel footer states `129 tools, all local` and links to the directory. The dotted leader is decorative and `aria-hidden`.

### Directory filters

A labelled search field on `secondary`, a favourites toggle and a category chip row that scrolls horizontally below `lg` and wraps above it. Each chip is 22px tall on fine pointers, full-radius, 11px medium Inter, with 12px horizontal padding. Under `@media (pointer: coarse)` the same chip expands to a 44px hit area without changing its label. Inactive chips use `secondary` / `secondary-foreground`; the active chip uses `primary` / `primary-foreground`. Use `aria-pressed` for the selected chip and an `aria-label` on the row. The row must be keyboard reachable and must not cause page-level horizontal scroll.

### Brand mark

The mark is a rounded cyan tile with a dark `>_` terminal prompt, paired with the mono wordmark. The canonical square asset is `public/logo-mark.svg`; the header renders the same geometry inline at 24px. It is the only filled cyan square in the system — do not reuse it as a control, badge or status surface. Keep `aria-hidden` on the SVG when the wordmark is visible.

The favicon set lives in `public/`: `favicon.svg`, a multi-size `favicon.ico`, 16px and 32px PNGs, a 180px Apple touch icon, and 192px/512px manifest icons. All derive from the same mark and use `#06d0f9` on `#0b0d13`.

### Tool card

A 52px-minimum row on `card`, 6px radius, 1px border, 12px horizontal padding and an 8px gap in the grid. From `lg` up, a leading 32px icon tile on `primary/10` with a cyan icon; below `lg` the tile is hidden so the tool name gets the card width. The tool name is 14px mono and may wrap to three lines (`line-clamp-3`) so long names such as “CSS Specificity Calculator” stay identifiable at 1440px and 360px. The tooltip repeats the full name and description. On hover or `focus-within`, the border becomes `primary/50`; the card itself is a link with a visible focus ring.

The favourite star is a separate button inside the card, with `aria-pressed`, a descriptive `aria-label` and a permanent 44px hit area. It is always visible: hover may change its colour, but never its presence.

### Tool page shell

A header band on `card` with a 1024px container, breadcrumbs (Home / Tools / category / tool), a 24px mono bold title, a 14px muted description and a “Runs locally” badge with a cyan shield. The category breadcrumb links back to the filtered directory. Below, `main` uses the same 1024px container and 24px vertical padding, plus `id="main-content"` and `tabIndex={-1}` so route changes can move focus there.

Tool controls stack in the order: inputs, action, output. Every result region has a label or an accessible name; read-only output textareas use the shared `Output` fallback label. Copy actions are icon buttons with explicit labels such as `Copy Dockerfile`. After the tool, a rule-separated “Tool notes” block states that input stays local, names the category and links to the guide; beside it, “More in {category}” lists four related tools with a View all link.

### Inputs, selects and textareas

All fields are 40px tall, 6px radius, 1px `border`, page-coloured interior, 12px horizontal padding and 14px Inter text (16px below 768px to avoid iOS zoom). Placeholders use `muted-foreground` and end with `…` where they show a pattern. Focus uses a 2px cyan ring with a 2px offset.

Every field has a programmatic name: a real `<label htmlFor>`, a wrapping `<label>` around a native control, or an `aria-label` when the visual caption is intentionally separate. A visible caption that is not associated with a control must be a `<span>`, not an orphan `<label>`. Do not use the placeholder as the only label.

Errors are inline, next to the field, with `aria-invalid` and `aria-describedby`. Error text is `danger`, not `destructive`. A successful or warning state uses the matching semantic token and a word/icon, never colour alone.

### Buttons

| Variant | Surface | Text | Use |
| --- | --- | --- | --- |
| `default` (primary) | `primary` | `primary-foreground` | The single main action |
| `secondary` | `secondary` | `secondary-foreground` | Alternate actions |
| `outline` | transparent, `border` | `foreground` | Tertiary actions; hover fills `secondary` |
| `ghost` | transparent | `foreground` / muted | Icon buttons, back navigation; hover fills `secondary` |
| `destructive` | `destructive` | `destructive-foreground` | Confirmed destructive actions only |
| `link` | transparent | `primary` | Inline navigation |

Default height is 40px; `sm` is 36px, `lg` is 44px, and icon buttons are 40×40px visually with a 44px touch target. Labels are 14px/500 Inter. Hover uses a `secondary` fill or 90% primary, never a cyan-tinted text hover; focus uses the 2px ring; disabled is 50% opacity with pointer events removed. No button may be identified by colour alone — the label states the action (“Generate UUID”, not “Go”).

### Output and status

Output blocks use a `muted` surface, 6px radius, 12px padding and 14px mono text. The block may scroll internally for long content but must not widen the page. Validation and async feedback use `role="alert"` or `aria-live="polite"` and appear next to the control that caused them.

Error copy says what happened and what to do next. Do not render a blank panel for an empty result: show a short empty state or keep the last valid output with a clear status. A parse failure belongs in an inline error, not in the output pane as the string “Invalid JSON”.

### Copy feedback

All copy actions go through `CopyButton` or `useCopyFeedback`, which await `navigator.clipboard.writeText` and only show success after the write resolves. A rejected write is a failure: the icon changes to an alert, the accessible status says “Copy failed. Check clipboard permissions and try again.”, and the state clears after a few seconds. Copy controls keep an explicit label such as `Copy Dockerfile`; icon-only controls announce the result through `role="status"`.

### Command palette and overlays

The command palette, select menus and tooltips use the `popover` surface, 1px border and a soft neutral shadow. The command palette uses an 8px radius; select menus and tooltips use 6px. The palette opens with `⌘K` / `Ctrl+K` or the visible quick-open button, traps focus while open, closes on `Escape`, and returns focus to the trigger. If navigation unmounted the trigger, focus moves to the new page's `main`. Tool results are listed before the Home / All tools / Usage page group so a typed tool name wins on Enter. Rows are keyboard navigable at 44px, the active row uses `primary` / `primary-foreground` (including its category metadata), and a footer states the arrow, Enter and Escape keys. Footer keycaps use `foreground` on `secondary`, not muted text, so they clear 4.5:1 even at 11px. Tooltips are supplementary only — never put the only copy of an instruction in a tooltip.

### Focus

Every interactive element has a visible `focus-visible` ring: 2px `ring` with a 2px offset on the page background. Never remove the outline without an equivalent replacement. Use `:focus-within` for compound controls such as a colour picker plus hex field. A sticky header must not obscure the focused element.

Every page starts with a “Skip to main content” link that becomes visible on focus. Client-side route changes move focus to `#main-content` (`tabIndex={-1}`) and reset scroll, so catalogue cards and palette results do not leave keyboard users on `<body>`. When the destination includes a fragment (for example `/usage#privacy`), scroll to that section instead of the top; keep the focus move on `main`.

### Empty, loading and error states

- Empty: one short line, optional icon, and a clear next action. The directory empty state distinguishes “No favorites yet” from “No tools match …” and offers Clear search / Show all tools. A result count in the directory always states how many tools the current filters return.
- Loading: text ending in `…` and, if longer than a second, a restrained indicator. Keep layout dimensions stable.
- Error: semantic `danger`, inline, with an actionable sentence. Offer a retry or a link back to the input.
- Not found: a real page with a heading, explanation and links to the directory and home; never a blank screen or a raw stack trace.

## Do's and Don'ts

- **Do** make the homepage a typeset index with a working search and the 12 categories. **Don't** turn it into a marketing landing page with testimonial walls, logo clouds or feature-card grids.
- **Do** keep the directory one click away in the header and footer. **Don't** hide the catalogue behind a hero without an index or search.
- **Do** use cyan for one primary action, the active filter and focus. **Don't** paint panels, headings or body copy cyan.
- **Do** separate surfaces with tonal steps and 1px borders. **Don't** add glows, gradient text, coloured shadows or glassmorphism.
- **Do** set tool names, code, IDs and numeric output in JetBrains Mono. **Don't** set prose in mono.
- **Do** keep rows dense and scannable. **Don't** enlarge cards or spacing to fill space.
- **Do** give every control a programmatic name. **Don't** use a placeholder as the only label or an orphan `<label>` as a caption.
- **Do** use `text-danger` for error text. **Don't** use `text-destructive`; it is a fill token and fails contrast on dark surfaces.
- **Do** keep text at 4.5:1 or better. **Don't** use `muted-foreground` for essential instructions, especially below 14px.
- **Do** underline links that sit inside prose. **Don't** rely on cyan alone to distinguish an inline link from its sentence.
- **Do** make touch targets at least 44×44px. **Don't** hide primary actions behind hover or make icon buttons smaller than their hit area.
- **Do** honour `prefers-reduced-motion`. **Don't** add scroll reveals, parallax or looping decoration.
- **Do** use `…`, curly quotes and specific button labels. **Don't** use “...” or “Submit” / “Click here”.
- **Do** test at 360px and 200% zoom. **Don't** introduce page-level horizontal scrolling or clipped text.
- **Do** keep every tool local to the browser. **Don't** add a network call for user input.

## Verification

`npm run design:lint` validates this file's structure and token references. `npm run lint` includes `eslint-plugin-jsx-a11y` for hand-written UI. The manual and automated review gate lives in [docs/UI-REVIEW.md](docs/UI-REVIEW.md); use it for every UI pull request.
