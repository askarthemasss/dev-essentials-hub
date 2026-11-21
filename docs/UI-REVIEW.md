# UI Review

This is the interface review gate for DevToolbox. It checks that a change follows [DESIGN.md](../DESIGN.md), does not regress accessibility or density, and still works at the sizes and input modes the product supports.

It complements the automated suite; it does not replace it. Tool logic, security and full WCAG audits are out of scope here.

## When a review is required

Run this gate for any pull request that changes:

- anything in `src/components/`, `src/pages/`, `src/index.css`, `tailwind.config.ts` or `index.html`;
- copy, icons, spacing, colour, typography, motion or interaction;
- a shared primitive in `src/components/ui/` or a component used by several tools;
- screenshots or public assets that are part of the product surface.

A docs-only or `src/lib/`-only change still needs the automated commands, but the manual pass can be limited to the affected surface.

## Sources of truth

1. **[DESIGN.md](../DESIGN.md)** — the design contract. Tokens, layout rules and component specs are normative. If a change needs a new token or pattern, update the contract in the same pull request and run `npm run design:lint`.
2. **[Vercel Web Interface Guidelines](https://vercel.com/design/guidelines)** — the live review checklist. Fetch the upstream command file at review time instead of relying on a vendored copy:

   ```sh
   curl -fsSL https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
   ```

   Apply it to the changed files. The output format is `file:line` findings grouped by file.
3. **The running product** — production preview, not just the dev server. Some issues (font loading, stale hashes, asset paths) only appear in the built app.

## Gate 1 — automated checks

Use Node 22 (`.nvmrc`). Run the full set before requesting review:

```sh
nvm use
npm ci
npm run design:lint
npm run lint
npm run typecheck
npm run typecheck:e2e
npm test
npm run test:e2e
```

What each check protects:

| Command | Protects |
| --- | --- |
| `npm run design:lint` | DESIGN.md structure, token references and component contrast. Must report **0 errors**. Triage warnings before merging. |
| `npm run lint` | TypeScript, React hooks, React Refresh and `jsx-a11y` rules on hand-written UI. Must report **0 errors**. |
| `npm run typecheck` / `typecheck:e2e` | Type safety in the app and the Playwright suite. |
| `npm test` | Tool logic and component behaviour. Add a unit test for every parsing, conversion or edge-case change. |
| `npm run test:e2e` | Builds the app, renders every catalogue route, checks for console/page errors and runs axe WCAG A/AA checks. |

Known noise: `npm run lint` emits a small number of warnings from generated shadcn/ui primitives under `src/components/ui/` (React Refresh exports plus a few jsx-a11y false positives). They are documented in [CONTRIBUTING.md](../CONTRIBUTING.md). Do not add new warnings elsewhere.

If axe fails, fix the cause rather than excluding the rule. If a rule is a genuine false positive in generated code, adjust the scoped override in `eslint.config.js` and explain why in the pull request.

## Gate 2 — live guideline pass

Fetch the command file above and review the changed files against it. The sections that matter most for DevToolbox:

- **Accessibility** — names for icon-only buttons and controls, semantic elements, heading order, decorative icons hidden, async updates announced.
- **Focus states** — visible `focus-visible` ring, no bare `outline-none`, sticky header must not cover the focused element.
- **Forms** — programmatic labels, correct `type`/`inputmode`, paste allowed, spellcheck off for code, inline errors, actionable error copy.
- **Animation** — `prefers-reduced-motion`, transform/opacity only, no `transition: all`, interruptible.
- **Typography** — `…`, curly quotes, tabular numerals, balanced headings.
- **Content handling** — truncation/`min-w-0`, empty states, long and Unicode input.
- **Navigation and state** — links for navigation, URL reflects filter/tab state where practical, destructive actions confirmed.
- **Touch and interaction** — 44px targets, intentional tap highlight, overscroll containment in overlays, no hover-only actions.
- **Dark mode and theming** — `color-scheme: dark`, `theme-color` matches `#0b0d13`, native select colours.
- **Hover and copy** — every interactive element has hover/active feedback; active voice, specific labels, numerals for counts.

Rules about images, media, hydration, locale and safe areas are usually not applicable to this client-only, English-only, image-light app. Note “not applicable” instead of silently skipping them.

## Gate 3 — manual pass

Build and serve the production bundle:

```sh
npm run build
npm run preview
```

Then open the preview URL (default `http://localhost:4173`) and check the changed surface plus these anchor routes:

- `/` — catalogue, search, filters, favourites, most-used/recent sections, grid.
- `/tool/json-formatter` — textarea-heavy formatter with a primary action and output.
- `/tool/uuid-generator` — generator with buttons, counts and copy actions.
- `/tool/css-gradient` — visual tool with colour inputs and live preview.
- `/tool/color-contrast` — colour picker plus hex fields, contrast output and error states.
- `/tool/not-a-real-tool` — not-found page.
- <kbd>⌘</kbd>+<kbd>K</kbd> / <kbd>Ctrl</kbd>+<kbd>K</kbd> — command palette, keyboard navigation and focus return.

### Viewports and input modes

- **360×800** — no page-level horizontal scroll, controls remain usable, cards truncate rather than overflow.
- **768×1024** — grid changes correctly, paired inputs do not collide.
- **1440×900** — containers stay at their maximum widths; no stretched empty space.
- **200% browser zoom** — text and controls remain readable; nothing is clipped or hidden.
- **Touch emulation** — targets at least 44×44px, hover-only actions discoverable, tap targets not overlapping.
- **Reduced motion** — set the OS preference or emulate it; no non-essential motion remains.
- **Keyboard only** — tab through the page in order, activate controls with <kbd>Enter</kbd>/<kbd>Space</kbd>, open and close overlays with <kbd>Escape</kbd>, confirm focus returns to the trigger.

### Checklist

**First impression and layout**

- [ ] Catalogue and search are visible immediately; no hero or decorative intro was added.
- [ ] Catalogue max width is 1152px and tool pages are 1024px; 16px page gutters are intact.
- [ ] Tool grid density and 8px gaps are preserved at 360, 768, 1024 and 1440px.
- [ ] No new one-section-per-screen marketing pattern, oversized card or empty filler block.
- [ ] Sticky header does not cover focused content or in-page anchors.

**Colour and depth**

- [ ] Dark-only; `theme-color` is `#0b0d13`, `color-scheme` is dark.
- [ ] Cyan is used for one primary action / active state / focus, not as a surface or body text.
- [ ] Surfaces use the documented tonal steps; borders are 1px `border`.
- [ ] No new glows, gradients, coloured shadows or glassmorphism beyond the existing header blur.
- [ ] Error text uses `danger`, not `destructive`; status is not conveyed by colour alone.
- [ ] Text contrast is at least 4.5:1 (3:1 for large text) on every surface it actually sits on.

**Typography and content**

- [ ] Tool names, output, IDs, code and numbers use JetBrains Mono; prose uses Inter.
- [ ] No new body text below 14px; 12px is metadata and 11px is chips.
- [ ] Long strings truncate, wrap or scroll inside their container; `min-w-0` is present on flex children.
- [ ] Empty, loading and error states exist and are actionable.
- [ ] Copy is active, specific and second person; `…`, curly quotes and `⌘&nbsp;K` follow the contract.
- [ ] Numbers use tabular numerals where they change or align.

**Interaction and accessibility**

- [ ] Every control has a programmatic name; placeholders are not the only label.
- [ ] Icon-only buttons have `aria-label`; decorative icons are `aria-hidden`.
- [ ] Focus is visible on every interactive element; `outline-none` always has a ring replacement.
- [ ] Hover, active and disabled states are distinguishable; disabled controls cannot be activated.
- [ ] Actions use `<button>`, navigation uses `<a>`/`<Link>`; no clickable `<div>`.
- [ ] Modals/palettes trap focus, close on <kbd>Escape</kbd> and restore focus.
- [ ] Async feedback uses `role="alert"` or `aria-live` and appears next to the cause.
- [ ] Forms allow paste, use correct `type`/`inputmode`, disable spellcheck for code and keep labels clickable.

**Motion and touch**

- [ ] Motion is functional and under 300ms; no scroll reveals or looping decoration.
- [ ] `prefers-reduced-motion` is honoured.
- [ ] No `transition: all`; transform/opacity are preferred.
- [ ] Targets are at least 44×44px on touch; no primary action is hidden until hover.
- [ ] Overlays contain overscroll; the page does not scroll behind them.

**Performance and resilience**

- [ ] No new network request for tool input; everything still runs locally.
- [ ] No layout reads during render and no avoidable re-render on each keystroke.
- [ ] Large lists or outputs do not freeze the page; long input is handled without layout thrash.
- [ ] The production build has no console errors, failed chunks or hydration-style mismatches.
- [ ] `npm run test:e2e` passes, including axe on every route.

## Baseline gaps

These are known gaps in the current product, not regressions introduced by a pull request. Record them as follow-ups; do not block an unrelated change for them, and do not copy them into new code.

- The decorative `⌘K` keycap is 9px. It is duplicated by the quick-open button's accessible name; do not introduce new text at that size.
- Catalogue search and category filters live in local state, not the URL. Deep-linking those states is a future improvement.
- The 129-card grid renders every card. Revisit virtualization if the catalogue grows substantially or interaction performance drops.

## Severity

Use these levels in the review record:

- **Blocker** — accessibility regression, contrast failure, broken route, horizontal page scroll at 360px, clipped content at 200% zoom, console/page error, failing test, or a direct conflict with DESIGN.md. Do not merge.
- **Should fix** — inconsistent spacing/type, unclear copy, missing hover/focus/disabled treatment, a new touch target below 44px, or an avoidable layout shift. Fix before merge unless the author documents why it is follow-up work.
- **Follow-up** — an existing gap the change does not introduce (for example URL-backed filters or virtualizing the catalogue), a broader refactor, or a nice-to-have polish item. Record it; do not block an unrelated pull request.

When in doubt, compare against `main` and ask: did this change make it worse? Existing debt is tracked separately from regressions.

## Review record

Paste this into the pull request or review comment:

```md
## UI review

- [ ] `design:lint`, `lint`, both typechecks, unit tests, build and Playwright pass
- [ ] Live Web Interface Guidelines fetched and applied to changed files
- [ ] Manual pass at 360 / 768 / 1440 and 200% zoom
- [ ] Keyboard, touch and reduced-motion pass
- [ ] Before/after screenshots attached for visual changes

Blockers: none
Should fix: none
Follow-ups:
- ...
```

## Optional: `playwright-cli` runbook

[`@playwright/cli`](https://www.npmjs.com/package/@playwright/cli) is a terminal wrapper around Playwright MCP. It is useful for a quick manual sweep and for capturing screenshots; it is **not** part of CI and does not replace `@playwright/test`.

```sh
npm run dev
npx -y @playwright/cli open http://localhost:8080 --headed
npx -y @playwright/cli resize 390 844
npx -y @playwright/cli snapshot
npx -y @playwright/cli screenshot --full-page
npx -y @playwright/cli set-reduced-motion reduce
npx -y @playwright/cli press Tab
npx -y @playwright/cli close
```

Use `snapshot` before `click`/`fill` so element references are current. Keep sessions short and close the browser when done. CI continues to use `npx playwright test`.

## What this gate does not cover

- Tool correctness, parsing edge cases and security review.
- A full WCAG audit, screen-reader matrix or browser matrix.
- Performance budgets, Lighthouse scores or bundle-size regressions.
- Visual regression screenshot diffing. Screenshots are evidence for humans, not an automated pass/fail in this phase.
