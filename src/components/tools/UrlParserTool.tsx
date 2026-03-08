import { useState } from "react";
import { Input } from "@/components/ui/input";

const UrlParserTool = () => {
  const [url, setUrl] = useState("https://user:pass@example.com:8080/path/to/page?q=search&lang=en#section1");

  let parsed: URL | null = null;
  try { parsed = new URL(url); } catch {}

  const rows = parsed ? [
    ["Protocol", parsed.protocol],
    ["Username", parsed.username],
    ["Password", parsed.password],
    ["Hostname", parsed.hostname],
    ["Port", parsed.port || "(default)"],
    ["Pathname", parsed.pathname],
    ["Search", parsed.search],
    ["Hash", parsed.hash],
    ["Origin", parsed.origin],
  ] : [];

  const params = parsed ? Array.from(parsed.searchParams.entries()) : [];

  return (
    <div className="space-y-4">
      <Input value={url} onChange={(e) => setUrl(e.target.value)} className="font-mono text-sm bg-secondary border-border" placeholder="Enter URL…" />
      {parsed ? (
        <div className="space-y-4">
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <tbody>
                {rows.map(([key, val]) => (
                  <tr key={key} className="border-b border-border last:border-0">
                    <td className="px-4 py-2 font-mono text-xs text-muted-foreground bg-secondary/50 w-32">{key}</td>
                    <td className="px-4 py-2 font-mono text-sm text-foreground break-all">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {params.length > 0 && (
            <div>
              <h3 className="font-mono text-sm font-medium text-foreground mb-2">Query Parameters</h3>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {params.map(([k, v], i) => (
                      <tr key={i} className="border-b border-border last:border-0">
                        <td className="px-4 py-2 font-mono text-xs text-primary bg-secondary/50 w-32">{k}</td>
                        <td className="px-4 py-2 font-mono text-sm text-foreground">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground font-mono">Enter a valid URL to parse</p>
      )}
    </div>
  );
};

export default UrlParserTool;
