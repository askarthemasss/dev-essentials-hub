import { useState } from "react";
import { Input } from "@/components/ui/input";
const mimeTypes: Record<string, string> = {
  html:"text/html",css:"text/css",js:"application/javascript",json:"application/json",xml:"application/xml",
  png:"image/png",jpg:"image/jpeg",gif:"image/gif",svg:"image/svg+xml",webp:"image/webp",
  pdf:"application/pdf",zip:"application/zip",mp3:"audio/mpeg",mp4:"video/mp4",woff2:"font/woff2",
  txt:"text/plain",csv:"text/csv",md:"text/markdown",yaml:"application/yaml",wasm:"application/wasm",
};
const MimeTypesTool = () => {
  const [search, setSearch] = useState("");
  const filtered = Object.entries(mimeTypes).filter(([k, v]) => k.includes(search.toLowerCase()) || v.includes(search.toLowerCase()));
  return (
    <div className="space-y-4">
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by extension or MIME type…" className="font-mono bg-secondary border-border max-w-md" />
      <div className="space-y-1">{filtered.map(([ext, mime]) => (
        <div key={ext} className="flex justify-between rounded bg-secondary p-2 font-mono text-sm"><span>.{ext}</span><span className="text-muted-foreground">{mime}</span></div>
      ))}</div>
    </div>
  );
};
export default MimeTypesTool;
