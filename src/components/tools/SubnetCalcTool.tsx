import { useState } from "react";
import { Input } from "@/components/ui/input";
import SubnetResultView from "./SubnetResultView";
import { getSubnet, parseIp } from "@/lib/ip";

const SubnetCalcTool = () => {
  const [ipInput, setIpInput] = useState("192.168.1.10");
  const [prefixInput, setPrefixInput] = useState("24");

  const parsed = parseIp(ipInput);
  const prefix = Number(prefixInput);
  const maxPrefix = parsed?.version === 6 ? 128 : 32;
  const prefixValid =
    prefixInput.trim() !== "" && Number.isInteger(prefix) && prefix >= 0 && prefix <= maxPrefix;
  const details = parsed && prefixValid ? getSubnet(parsed, prefix) : null;

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="subnet-ip" className="mb-1 block font-mono text-xs text-muted-foreground">
            IP address
          </label>
          <Input
            id="subnet-ip"
            value={ipInput}
            onChange={(event) => setIpInput(event.target.value)}
            placeholder="192.168.1.10"
            spellCheck={false}
            className="border-border bg-secondary font-mono"
          />
        </div>
        <div>
          <label htmlFor="subnet-prefix" className="mb-1 block font-mono text-xs text-muted-foreground">
            Prefix
          </label>
          <div className="flex items-center gap-2">
            <span className="font-mono text-muted-foreground">/</span>
            <Input
              id="subnet-prefix"
              inputMode="numeric"
              value={prefixInput}
              onChange={(event) => setPrefixInput(event.target.value)}
              placeholder="24"
              className="w-24 border-border bg-secondary font-mono"
            />
          </div>
        </div>
      </div>

      {!parsed && ipInput.trim() !== "" && (
        <p role="alert" className="font-mono text-sm text-destructive">
          Enter a valid IPv4 or IPv6 address.
        </p>
      )}
      {parsed && !prefixValid && (
        <p role="alert" className="font-mono text-sm text-destructive">
          Prefix must be a whole number from 0 to {maxPrefix}.
        </p>
      )}

      {details && <SubnetResultView details={details} />}

      <p className="text-xs text-muted-foreground">
        IPv4 /31 and /32 ranges report their actual address count as usable (RFC 3021). IPv6 has no broadcast address.
      </p>
    </div>
  );
};

export default SubnetCalcTool;
