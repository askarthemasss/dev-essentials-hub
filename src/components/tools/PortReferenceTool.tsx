import { useState } from "react";
import { Input } from "@/components/ui/input";
const ports = [
  {port:20,desc:"FTP Data"},{port:21,desc:"FTP Control"},{port:22,desc:"SSH"},{port:23,desc:"Telnet"},{port:25,desc:"SMTP"},{port:53,desc:"DNS"},{port:80,desc:"HTTP"},{port:110,desc:"POP3"},{port:143,desc:"IMAP"},{port:443,desc:"HTTPS"},{port:993,desc:"IMAPS"},{port:995,desc:"POP3S"},{port:3000,desc:"Dev Server"},{port:3306,desc:"MySQL"},{port:5432,desc:"PostgreSQL"},{port:6379,desc:"Redis"},{port:8080,desc:"HTTP Alt"},{port:8443,desc:"HTTPS Alt"},{port:27017,desc:"MongoDB"},{port:9200,desc:"Elasticsearch"},
];
const PortReferenceTool = () => {
  const [search, setSearch] = useState("");
  const filtered = ports.filter(p => p.port.toString().includes(search) || p.desc.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-3">
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search ports…" className="font-mono bg-secondary border-border max-w-md" />
      <div className="space-y-1">{filtered.map(p => <div key={p.port} className="flex justify-between rounded bg-secondary p-2 font-mono text-sm"><span className="text-primary font-bold">{p.port}</span><span>{p.desc}</span></div>)}</div>
    </div>
  );
};
export default PortReferenceTool;
