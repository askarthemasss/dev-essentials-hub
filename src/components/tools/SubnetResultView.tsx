import type { SubnetDetails } from "@/lib/ip";

interface SubnetResultViewProps {
  details: SubnetDetails;
}

export default function SubnetResultView({ details }: SubnetResultViewProps) {
  const rows: Array<[string, string]> = [
    ["CIDR", details.cidr],
    ["Network", details.network],
    ["Netmask", details.netmask],
    ["Wildcard", details.wildcard],
    [details.version === 4 ? "Broadcast" : "Last address", details.lastAddress],
    ["First usable", details.firstUsable],
    ["Last usable", details.lastUsable],
    ["Total addresses", details.totalAddresses.toLocaleString()],
    [details.version === 4 ? "Usable hosts" : "Usable addresses", details.usableAddresses.toLocaleString()],
  ];

  return (
    <div className="space-y-2">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex flex-col justify-between gap-1 rounded border border-border bg-secondary p-3 font-mono text-sm sm:flex-row sm:items-center"
        >
          <span className="text-muted-foreground">{label}</span>
          <span className="break-all text-foreground">{value}</span>
        </div>
      ))}
    </div>
  );
}
