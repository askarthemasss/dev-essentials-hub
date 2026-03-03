import { useState } from "react";
import { Input } from "@/components/ui/input";
const SubnetCalcTool = () => {
  const [ip, setIp] = useState("192.168.1.0");
  const [cidr, setCidr] = useState("24");
  const c = parseInt(cidr);
  const mask = c >= 0 && c <= 32 ? Array.from({length: 4}, (_, i) => { const bits = Math.min(Math.max(c - i * 8, 0), 8); return 256 - Math.pow(2, 8 - bits); }).join(".") : "";
  const hosts = Math.pow(2, 32 - c) - 2;
  return (
    <div className="space-y-3 max-w-md">
      <div className="flex gap-2"><Input value={ip} onChange={(e) => setIp(e.target.value)} className="font-mono bg-secondary border-border" /><span className="self-center text-muted-foreground">/</span><Input value={cidr} onChange={(e) => setCidr(e.target.value)} className="w-20 font-mono bg-secondary border-border" /></div>
      <div className="rounded bg-secondary p-2 font-mono text-sm">Subnet mask: {mask}</div>
      <div className="rounded bg-secondary p-2 font-mono text-sm">Usable hosts: {hosts > 0 ? hosts : 0}</div>
    </div>
  );
};
export default SubnetCalcTool;
