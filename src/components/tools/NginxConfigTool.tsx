import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Copy } from "lucide-react";

const NginxConfigTool = () => {
  const [domain, setDomain] = useState("example.com");
  const [port, setPort] = useState("3000");
  const [ssl, setSsl] = useState(true);
  const [gzip, setGzip] = useState(true);
  const [ws, setWs] = useState(false);

  const config = `server {
    listen ${ssl ? "443 ssl http2" : "80"};
    server_name ${domain};
${ssl ? `
    ssl_certificate /etc/letsencrypt/live/${domain}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${domain}/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
` : ""}${gzip ? `
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
    gzip_min_length 1000;
` : ""}
    location / {
        proxy_pass http://127.0.0.1:${port};
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;${ws ? `
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";` : ""}
    }
}${ssl ? `

server {
    listen 80;
    server_name ${domain};
    return 301 https://$server_name$request_uri;
}` : ""}`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Domain" className="font-mono text-sm bg-secondary border-border" />
        <Input value={port} onChange={(e) => setPort(e.target.value)} placeholder="Upstream port" className="font-mono text-sm bg-secondary border-border" />
      </div>
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-mono text-muted-foreground"><Switch checked={ssl} onCheckedChange={setSsl} />SSL/TLS</label>
        <label className="flex items-center gap-2 text-sm font-mono text-muted-foreground"><Switch checked={gzip} onCheckedChange={setGzip} />Gzip</label>
        <label className="flex items-center gap-2 text-sm font-mono text-muted-foreground"><Switch checked={ws} onCheckedChange={setWs} />WebSocket</label>
      </div>
      <div className="relative">
        <Textarea value={config} readOnly rows={20} className="font-mono text-sm bg-secondary border-border" />
        <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => navigator.clipboard.writeText(config)}><Copy className="h-4 w-4" /></Button>
      </div>
    </div>
  );
};

export default NginxConfigTool;
