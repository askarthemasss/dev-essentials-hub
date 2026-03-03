import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
const RobotsTxtTool = () => {
  const [sitemap, setSitemap] = useState("https://example.com/sitemap.xml");
  const [allowAll, setAllowAll] = useState(true);
  const [disallowPaths, setDisallowPaths] = useState("/admin\n/private");
  const output = `User-agent: *\n${allowAll ? "Allow: /" : disallowPaths.split("\n").filter(Boolean).map(p => `Disallow: ${p}`).join("\n")}\n\nSitemap: ${sitemap}`;
  return (
    <div className="space-y-4 max-w-lg">
      <div><label className="text-xs text-muted-foreground font-mono">Sitemap URL</label><Input value={sitemap} onChange={(e) => setSitemap(e.target.value)} className="font-mono bg-secondary border-border" /></div>
      <label className="flex items-center gap-2 text-sm"><Checkbox checked={allowAll} onCheckedChange={(v) => setAllowAll(!!v)} />Allow all</label>
      {!allowAll && <div><label className="text-xs text-muted-foreground font-mono">Disallow paths (one per line)</label><Textarea value={disallowPaths} onChange={(e) => setDisallowPaths(e.target.value)} className="min-h-[80px] font-mono text-sm bg-secondary border-border" /></div>}
      <Textarea value={output} readOnly className="min-h-[120px] font-mono text-sm bg-secondary border-border" />
    </div>
  );
};
export default RobotsTxtTool;
