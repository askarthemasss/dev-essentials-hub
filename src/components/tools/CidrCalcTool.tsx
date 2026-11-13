import { useState } from "react";
import { Input } from "@/components/ui/input";
import SubnetResultView from "./SubnetResultView";
import { getSubnet, parseCidr } from "@/lib/ip";

const CidrCalcTool = () => {
  const [input, setInput] = useState("192.168.1.0/24");
  const parsed = parseCidr(input);
  const details = parsed ? getSubnet(parsed.ip, parsed.prefix) : null;

  return (
    <div className="max-w-2xl space-y-4">
      <div>
        <label htmlFor="cidr-input" className="mb-1 block font-mono text-xs text-muted-foreground">
          CIDR block
        </label>
        <Input
          id="cidr-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="192.168.1.0/24 or 2001:db8::/32"
          spellCheck={false}
          aria-invalid={input.trim() !== "" && !parsed}
          className="border-border bg-secondary font-mono"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Host bits are allowed; the network address is calculated automatically.
        </p>
      </div>

      {!parsed && input.trim() !== "" && (
        <p role="alert" className="font-mono text-sm text-destructive">
          Enter a valid IPv4 or IPv6 address followed by a prefix, e.g. 192.168.1.0/24.
        </p>
      )}

      {details && <SubnetResultView details={details} />}
    </div>
  );
};

export default CidrCalcTool;
