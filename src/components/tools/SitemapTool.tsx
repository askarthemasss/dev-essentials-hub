import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { escapeXml } from "@/lib/markup";

const SitemapTool = () => {
  const [urls, setUrls] = useState("https://example.com\nhttps://example.com/about\nhttps://example.com/contact");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.split("\n").filter((url) => url.trim()).map((url) => `  <url>\n    <loc>${escapeXml(url.trim())}</loc>\n    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>\n  </url>`).join("\n")}\n</urlset>`;
  return (
    <div className="space-y-4">
      <div><span className="text-xs text-muted-foreground font-mono">URLs (one per line)</span><Textarea value={urls} onChange={(e) => setUrls(e.target.value)} aria-label="URLs, one per line" className="min-h-[100px] font-mono text-sm bg-secondary border-border" /></div>
      <Textarea value={xml} readOnly aria-label="Sitemap XML output" className="min-h-[200px] font-mono text-sm bg-secondary border-border" />
    </div>
  );
};
export default SitemapTool;
