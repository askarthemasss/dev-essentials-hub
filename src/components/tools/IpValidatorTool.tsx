import { useState } from "react";
import { Input } from "@/components/ui/input";
import { classifyIp, parseIPv4, parseIPv6, parseIp } from "@/lib/ip";

const IpValidatorTool = () => {
  const [input, setInput] = useState("192.168.1.1");

  const ipv4 = parseIPv4(input);
  const ipv6 = parseIPv6(input);
  const parsed = parseIp(input);

  return (
    <div className="max-w-lg space-y-4">
      <div>
        <label htmlFor="ip-address" className="mb-1 block font-mono text-xs text-muted-foreground">
          IP address
        </label>
        <Input
          id="ip-address"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="192.168.1.1 or 2001:db8::1"
          spellCheck={false}
          className="border-border bg-secondary font-mono"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Accepts a single IPv4 or IPv6 address. Use the Subnet or CIDR calculator for prefixed addresses.
        </p>
      </div>

      <div className="space-y-2">
        <div
          className={`rounded border p-3 font-mono text-sm ${
            ipv4 !== null
              ? "border-green-500/50 bg-green-500/10 text-green-400"
              : "border-border bg-secondary text-muted-foreground"
          }`}
        >
          {ipv4 !== null ? "Valid IPv4 address" : "Not an IPv4 address"}
        </div>
        <div
          className={`rounded border p-3 font-mono text-sm ${
            ipv6 !== null
              ? "border-green-500/50 bg-green-500/10 text-green-400"
              : "border-border bg-secondary text-muted-foreground"
          }`}
        >
          {ipv6 !== null ? "Valid IPv6 address" : "Not an IPv6 address"}
        </div>
      </div>

      {parsed && (
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded border border-border bg-secondary p-3 font-mono text-sm">
            <span className="text-muted-foreground">Version</span>
            <span className="text-foreground">IPv{parsed.version}</span>
          </div>
          <div className="flex items-center justify-between rounded border border-border bg-secondary p-3 font-mono text-sm">
            <span className="text-muted-foreground">Normalized</span>
            <span className="break-all text-foreground">{parsed.normalized}</span>
          </div>
          <div className="flex items-center justify-between rounded border border-border bg-secondary p-3 font-mono text-sm">
            <span className="text-muted-foreground">Type</span>
            <span className="text-foreground">{classifyIp(parsed)}</span>
          </div>
          {parsed.version === 4 && (
            <div className="flex items-center justify-between rounded border border-border bg-secondary p-3 font-mono text-sm">
              <span className="text-muted-foreground">Integer</span>
              <span className="break-all text-foreground">{parsed.value.toString()}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IpValidatorTool;
