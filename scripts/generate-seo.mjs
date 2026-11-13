import fs from "node:fs/promises";
import path from "node:path";
import { loadEnv } from "vite";

const root = process.cwd();
const distDir = path.join(root, "dist");
const fileEnv = loadEnv(process.env.NODE_ENV || "production", root, "");
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "";
const siteUrl = (
  process.env.VITE_SITE_URL ||
  fileEnv.VITE_SITE_URL ||
  vercelProductionUrl ||
  "https://dev-essentials-hub.vercel.app"
).replace(/\/+$/, "");
const today = new Date().toISOString().slice(0, 10);

const source = await fs.readFile(path.join(root, "src/data/tools.ts"), "utf8");
const toolPattern =
  /\{\s*id:\s*"((?:\\.|[^"\\])*)",\s*name:\s*"((?:\\.|[^"\\])*)",\s*description:\s*"((?:\\.|[^"\\])*)",[\s\S]*?category:\s*"((?:\\.|[^"\\])*)"/g;

const decode = (value) => JSON.parse(`"${value}"`);
const tools = [...source.matchAll(toolPattern)].map((match) => ({
  id: decode(match[1]),
  name: decode(match[2]),
  description: decode(match[3]),
  category: decode(match[4]),
}));

if (tools.length === 0) {
  throw new Error("SEO generation could not find any tools in src/data/tools.ts");
}

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const replaceMeta = (html, attribute, key, value) =>
  html.replace(
    new RegExp(`<meta ${attribute}="${key}" content="[^"]*"\\s*\\/?>`),
    `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`
  );

function withMetadata(html, { title, description, url, jsonLd }) {
  let output = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`)
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>`
    );

  output = replaceMeta(output, "name", "description", description);
  output = replaceMeta(output, "property", "og:title", title);
  output = replaceMeta(output, "property", "og:description", description);
  output = replaceMeta(output, "property", "og:url", url);
  output = replaceMeta(output, "property", "og:image", `${siteUrl}/og-image.png`);
  output = replaceMeta(output, "name", "twitter:title", title);
  output = replaceMeta(output, "name", "twitter:description", description);
  output = replaceMeta(output, "name", "twitter:image", `${siteUrl}/og-image.png`);
  return output;
}

const baseHtml = await fs.readFile(path.join(distDir, "index.html"), "utf8");

const homeTitle = `DevToolbox — ${tools.length} Free Online Developer Tools`;
const homeDescription = `Free collection of ${tools.length} browser-based developer tools. JSON formatter, Base64, UUID, regex tester, color picker, JWT decoder, and more.`;
const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "DevToolbox",
  url: `${siteUrl}/`,
  description: `A free collection of ${tools.length} online developer tools including encoders, formatters, generators, converters, and more.`,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const homeHtml = withMetadata(baseHtml, {
  title: homeTitle,
  description: homeDescription,
  url: `${siteUrl}/`,
  jsonLd: homeJsonLd,
});
await fs.writeFile(path.join(distDir, "index.html"), homeHtml);

await fs.mkdir(path.join(distDir, "tool"), { recursive: true });

for (const tool of tools) {
  const url = `${siteUrl}/tool/${tool.id}`;
  const title = `${tool.name} — DevToolbox`;
  const description = `${tool.description}. Free online developer tool that runs entirely in your browser.`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    url,
    description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  const html = withMetadata(homeHtml, { title, description, url, jsonLd });
  const toolDir = path.join(distDir, "tool", tool.id);
  await fs.mkdir(toolDir, { recursive: true });
  await fs.writeFile(path.join(toolDir, "index.html"), html);
  // Also write the extensionless variant for hosts that map /tool/id -> id.html.
  await fs.writeFile(path.join(distDir, "tool", `${tool.id}.html`), html);
}

const urls = [
  `<url><loc>${siteUrl}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
  ...tools.map(
    (tool) =>
      `<url><loc>${siteUrl}/tool/${tool.id}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
  "\n"
)}\n</urlset>\n`;
await fs.writeFile(path.join(distDir, "sitemap.xml"), sitemap);

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
await fs.writeFile(path.join(distDir, "robots.txt"), robots);

// SPA hosts that use 404.html (GitHub Pages, Netlify) get a working 404 page.
const notFoundHtml = withMetadata(homeHtml, {
  title: "Page not found — DevToolbox",
  description: `The page you requested does not exist. Browse ${tools.length} free browser-based developer tools.`,
  url: `${siteUrl}/404`,
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Page not found — DevToolbox",
    url: `${siteUrl}/404`,
  },
});
await fs.writeFile(path.join(distDir, "404.html"), notFoundHtml);

console.log(`SEO: generated metadata for ${tools.length} tools, sitemap.xml, robots.txt and 404.html`);
