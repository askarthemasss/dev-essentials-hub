import { useState } from "react";
import { Input } from "@/components/ui/input";
const IpValidatorTool = () => {
  const [ip, setIp] = useState("192.168.1.1");
  const isV4 = /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) && ip.split(".").every(n => parseInt(n) >= 0 && parseInt(n) <= 255);
  const isV6 = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(ip);
  const isPrivate = isV4 && (ip.startsWith("10.") || ip.startsWith("192.168.") || /^172\.(1[6-9]|2\d|3[01])\./.test(ip));
  return (
    <div className="space-y-3 max-w-md">
      <Input value={ip} onChange={(e) => setIp(e.target.value)} placeholder="Enter IP address" className="font-mono bg-secondary border-border" />
      <div className="space-y-1">
        <div className="rounded bg-secondary p-2 font-mono text-sm">IPv4: {isV4 ? "✅ Valid" : "❌ Invalid"}</div>
        <div className="rounded bg-secondary p-2 font-mono text-sm">IPv6: {isV6 ? "✅ Valid" : "❌ Invalid"}</div>
        {isV4 && <div className="rounded bg-secondary p-2 font-mono text-sm">Type: {isPrivate ? "Private" : "Public"}</div>}
      </div>
    </div>
  );
};
export default IpValidatorTool;
