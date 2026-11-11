# DevToolbox

A collection of 129 browser-based developer tools: formatters, converters, encoders, generators, CSS helpers, networking calculators and more. Every tool runs locally in the browser — inputs are never uploaded.

## Requirements

- Node.js 22 (see `.nvmrc`; the minimum is Node 20.19)
- npm

## Development

```sh
nvm use
npm ci
npm run dev
```

The dev server runs at http://localhost:8080.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build the SPA and generate per-tool SEO pages, sitemap and robots.txt |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check the app |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |

## Project layout

- `src/data/tools.ts` — the catalogue of tool IDs, names, descriptions, categories and icons.
- `src/components/tools/<Name>Tool.tsx` — one lazily loaded component per tool. Adding a tool only requires a catalogue entry plus a matching component file; `src/data/toolRegistry.ts` discovers it with `import.meta.glob`.
- `src/lib/` — pure logic with unit tests: safe expression evaluation, JWT signing/decoding, IP and subnet maths, number bases, Markdown/HTML conversion and URL helpers.
- `scripts/generate-seo.mjs` — after `vite build`, writes static metadata for every tool page plus `sitemap.xml`, `robots.txt` and `404.html`.

## SEO and deployment

Set the canonical origin before building:

```sh
cp .env.example .env
# edit VITE_SITE_URL
npm run build
```

`VITE_SITE_URL` is used for canonical links, Open Graph URLs, the sitemap and robots.txt. The build produces `dist/tool/<id>/index.html` for every tool, so static hosts can serve real HTML to crawlers and social scrapers. Configure the host to serve those files before falling back to `index.html` for client-side routes.

## Privacy

All processing happens in the browser. There are no API calls for tool inputs, no accounts and no telemetry.
