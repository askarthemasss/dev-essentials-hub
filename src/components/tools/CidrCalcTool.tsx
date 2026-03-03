import { useState } from "react";
import { Input } from "@/components/ui/input";
const CidrCalcTool = () => {
  const [cidr, setCidr] = useState("192.168.1.0/24");
  const [ip, prefix] = cidr.split("/");
  const p = parseInt(prefix);
  const totalIps = Math.pow(2, 32 - (p || 0));
  return (
    <div className="space-y-3 max-w-md">
      <Input value={cidr} onChange={(e) => setCidr(e.target.value)} placeholder="e.g. 192.168.1.0/24" className="font-mono bg-secondary border-border" />
      <div className="rounded bg-secondary p-2 font-mono text-sm">Network: {ip}</div>
      <div className="rounded bg-secondary p-2 font-mono text-sm">Prefix: /{p || 0}</div>
      <div className="rounded bg-secondary p-2 font-mono text-sm">Total IPs: {totalIps.toLocaleString()}</div>
      <div className="rounded bg-secondary p-2 font-mono text-sm">Usable hosts: {Math.max(totalIps - 2, 0).toLocaleString()}</div>
    </div>
  );
};
export default CidrCalcTool;
