# AGENTS.md

Repository-wide instructions for coding agents working on DevToolbox. Read this file first, then [DESIGN.md](DESIGN.md), [docs/UI-REVIEW.md](docs/UI-REVIEW.md) and [CONTRIBUTING.md](CONTRIBUTING.md) before changing UI code.

## What this project is

DevToolbox is a static, client-only React app with **129 browser-based developer tools** across 12 categories. Every input is processed locally: there is no backend, no account system, no telemetry and no network call for tool data. The catalogue is the product; it is a dense utility workspace, not a marketing site.

Non-negotiables:

- Keep the MIT license and the existing README screenshots.
- Do not add a backend, API key, analytics, tracking or remote storage.
- Do not add Lovable artifacts, generated landing-page copy or unrelated branding.
- Keep the current major versions: React 18, TypeScript 5, Tailwind CSS 3, Vite 8, React Router 7.
- Do not redesign the product as part of a bug fix. Visual changes need an explicit request and a UI review.

## Commands

Use Node 22 (`.nvmrc`, `engines >=22.12.0`). Run `nvm use` if available.

| Task | Command |
| --- | --- |
| Install | `npm ci` |
| Dev server | `npm run dev` (port 8080) |
| Production build + SEO | `npm run build` |
| Preview the build | `npm run preview` |
| Design contract lint | `npm run design:lint` |
| ESLint (includes `jsx-a11y`) | `npm run lint` |
| App typecheck | `npm run typecheck` |
| E2E typecheck | `npm run typecheck:e2e` |
| Unit tests | `npm test` |
| Playwright + axe | `npm run test:e2e` |

Before calling work complete, run at minimum: `npm run design:lint`, `npm run lint`, `npm run typecheck`, `npm run typecheck:e2e`, `npm test`, `npm run build`. Run `npm run test:e2e` for any change that affects a route, a control, layout, copy or accessibility. Do not disable or skip a failing test to make the suite green.

## UI work

The design contract is [DESIGN.md](DESIGN.md). It is normative for tokens, type, layout, components, motion and copy. If a change needs a new token or pattern, update DESIGN.md in the same pull request and keep `npm run design:lint` at **0 errors**.

Follow these rules unless the user explicitly asks otherwise:

- **Dark-only.** Keep `<html class="dark">`, `color-scheme: dark` and a `theme-color` that matches `#0b0d13`. Do not build a light theme.
- **One accent.** Cyan `#06d0f9` is for the primary action, active state, links and focus. Do not use it for body text, large surfaces or decoration.
- **Type.** Inter for UI copy; JetBrains Mono for tool names, IDs, code, output and numbers. Do not set prose in mono. Do not introduce new text below 11px.
- **Surfaces.** Use `background`, `card`, `secondary` / `muted`, `border` and `popover`. Use 1px borders and tonal steps instead of shadows. Floating overlays may use one soft neutral shadow; no glows or gradients.
- **Containers.** Catalogue/header `max-w-6xl` (1152px); tool pages `max-w-5xl` (1024px); 16px page gutters. Keep the dense 2/3/4/5-column grid and 8px gaps.
- **Touch.** New interactive targets need a 44×44px hit area on coarse pointers. Do not hide a primary action until hover.
- **Focus.** Every interactive element needs a visible `focus-visible` ring. Never use `outline-none` without a replacement.
- **Motion.** 150–200ms, functional only, `prefers-reduced-motion` respected, no `transition: all`, no scroll reveals.
- **Semantics.** Use `<button>` for actions and `<a>`/`<Link>` for navigation. Icon-only buttons need `aria-label`; decorative icons need `aria-hidden`.
- **Labels.** Every control needs a real label or `aria-label`. Do not use a placeholder as the only label. A visible caption that is not associated with a control must be a `<span>`, not an orphan `<label>`.
- **Errors.** Use `text-danger` (`#f87171`) for error text. `destructive` (`#7c1d1d`) is a filled-surface token and must not be used as text; it fails contrast on dark surfaces. Pair status colour with a word or icon, and use `role="alert"` / `aria-live` for async feedback.
- **Copy.** Active voice, second person, specific labels. Use `…`, curly quotes, `⌘&nbsp;K` and numerals for counts. Error copy should say what to do next.
- **Content handling.** Add `min-w-0` to flex children that truncate. Handle long, empty and Unicode input. Never let output widen the page.

For a UI change, also follow the review gate in [docs/UI-REVIEW.md](docs/UI-REVIEW.md). Fetch the live Vercel Web Interface Guidelines at review time rather than copying them into the repo.

## Code conventions

- React 18 function components and hooks. TypeScript strict mode. Avoid `any`.
- Reuse `src/components/ui/*` (shadcn/ui + Radix) instead of adding another component library. Icons come from `lucide-react`.
- Tool pages are registered in `src/data/tools.ts` and resolved by `src/data/toolRegistry.ts`. Keep the id/filename convention (`my-tool` ↔ `MyToolTool.tsx`).
- Put pure, testable logic in `src/lib/` and add `src/lib/*.test.ts` coverage. Do not bury parsing or conversion logic in a component.
- Tool components are lazy-loaded by `ToolPage`. Do not eagerly import every tool into the catalogue.
- Use `useSEO` on pages. Keep canonical URLs, Open Graph tags and JSON-LD generation working through `scripts/generate-seo.mjs`.
- Use Web Crypto (`crypto.randomUUID`, `crypto.getRandomValues`) for security-sensitive randomness. Do not use `Math.random` for passwords, tokens or UUIDs.
- No `console.log` in shipped code. No dead utilities or commented-out blocks.
- `src/components/ui/**` is generated shadcn/ui code. Prefer wrapping or composing it over hand-editing it. The ESLint override intentionally downgrades its accessibility rules to warnings; do not copy that exemption to hand-written components.

## Tests

- Add unit tests for new parsing, conversion, validation and edge cases: empty input, invalid input, Unicode, very large values.
- Playwright route coverage is automatic: every entry in `src/data/tools.ts` is rendered and checked with axe. Add interaction coverage in `e2e/tool-behaviour.spec.ts` when changing controls.
- Do not weaken `e2e/helpers.ts` or exclude routes to pass.
- If a UI change adds a new state (error, loading, empty, overlay), test that state or add a focused Playwright assertion.
- The known baseline gaps are listed in [docs/UI-REVIEW.md](docs/UI-REVIEW.md#baseline-gaps). Do not expand them; fix one when it is small and directly related to your change.

## Pull requests

- Branch from `main`; keep the diff focused and avoid unrelated refactors.
- Describe the problem, approach and verification. Link the issue if there is one.
- Include before/after screenshots for visual changes.
- Do not commit `dist/`, `node_modules/`, test reports, secrets or `.env` files.
- Keep CI green: install, design lint, lint, typechecks, unit tests, build and Playwright.

When a request conflicts with this file, ask before changing the product direction. When a change is purely internal (logic, tests, docs), you do not need a UI review, but the automated checks still apply.
