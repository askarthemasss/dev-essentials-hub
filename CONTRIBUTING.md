# Contributing to DevToolbox

Thanks for helping make DevToolbox better. This guide covers local setup, how tools are built, and what a good pull request looks like.

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

- Fix a broken or inaccurate tool.
- Add a new tool (there are 129 today; more are welcome).
- Improve accessibility, responsiveness or performance.
- Add tests for tool logic and edge cases.
- Improve documentation or screenshots.
- Triage issues and review pull requests.

For anything larger than a bug fix, open an issue first so we can agree on the approach before you invest time.

## Development setup

Requirements: Node.js 20.19+ (Node 22 recommended) and npm.

```sh
git clone https://github.com/askarthemasss/dev-essentials-hub.git
cd dev-essentials-hub
nvm use          # optional, reads .nvmrc
npm ci
npm run dev      # http://localhost:8080
```

Do not commit `.env` files or credentials. The app has no backend and needs no API keys.

## Project conventions

- React 18 + TypeScript, function components and hooks.
- Tailwind CSS 3 with the existing shadcn/ui primitives. Reuse `src/components/ui/*` instead of adding a new component library.
- Keep the terminal-inspired visual language: mono type for data, muted surfaces, a single primary accent.
- Icons come from `lucide-react`.
- Put reusable, testable logic in `src/lib/`, not inside components.
- No network calls for tool inputs. Everything must work locally in the browser.

## Adding a tool

1. **Add metadata** to `src/data/tools.ts`:

   ```ts
   {
     id: "my-tool",
     name: "My Tool",
     description: "One short sentence describing what it does",
     category: "Generators",
     icon: Sparkles,
   }
   ```

2. **Create the component** at `src/components/tools/MyToolTool.tsx`. The registry normalises the filename and the tool id, so `MyToolTool` matches `my-tool`. Export the component as default. `ToolPage` already wraps it in `ToolLayout`.

   ```tsx
   const MyToolTool = () => (
     <div className="space-y-4">
       {/* controls and output only */}
     </div>
   );

   export default MyToolTool;
   ```

3. **Extract logic** that deserves tests into `src/lib/myTool.ts` and add `src/lib/myTool.test.ts`.

4. **Verify** the tool appears in search, the <kbd>⌘</kbd>+<kbd>K</kbd> palette, its category filter and its own `/tool/my-tool` page.

Tool ids must be unique. Prefer short, lowercase, hyphenated ids. Avoid duplicating an existing tool under a new name.

## Testing and quality

Run the full suite before opening a pull request:

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

- Add tests for parsing, conversion and edge cases (empty input, invalid input, Unicode, very large values).
- Tests use Vitest and Testing Library; files live next to the code as `*.test.ts(x)`.
- `npm run lint` currently reports six known `react-refresh` warnings from generated shadcn/ui files. Do not add new warnings or errors.
- `npm run build` must finish with the SEO generation step and produce tool pages.

## Pull requests

- Branch from `main` and keep changes focused.
- Use a clear title and describe the problem, the approach and how you verified it.
- Link the issue it closes, if any.
- Include screenshots or a short recording for UI changes.
- Keep commits readable; squashing on merge is fine.
- Make sure CI is green. A maintainer will review and merge.

Small, well-tested pull requests are reviewed fastest. Please avoid unrelated refactors in a bug-fix PR.

## Reporting bugs

Open a [bug report](https://github.com/askarthemasss/dev-essentials-hub/issues/new?template=bug_report.yml) and include:

- the tool and URL,
- what you expected and what happened,
- steps to reproduce,
- browser and OS versions,
- a sample input that triggers the problem, with secrets removed.

## Requesting a tool

Open a [feature request](https://github.com/askarthemasss/dev-essentials-hub/issues/new?template=feature_request.yml) describing the use case. Explain what the tool should do, example inputs and outputs, and whether it can run fully client-side. Tools that require a server or external API are out of scope.

## Reporting security issues

Please do not open a public issue for security problems. Use GitHub's [private vulnerability reporting](https://github.com/askarthemasss/dev-essentials-hub/security/advisories/new) and include reproduction steps. We will acknowledge the report as soon as possible and coordinate a fix and disclosure.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
